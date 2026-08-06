// Supabase Edge Function: auth-mint
// 安全版 Route B —— 先验证 space_key 主人身份，再签发带 space_key 声明的短期 JWT。
// 仅凭客户端传 space_key 不会发令牌：必须用密码通过服务端 verifier 校验。
// 依赖环境变量（Supabase 自动注入）：SUPABASE_URL、SUPABASE_SERVICE_ROLE_KEY
// 需用户手动设置：SUPABASE_JWT_SECRET（项目设置 → API → JWT Secret）

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------- 工具 ----------
function b64url(input: string): string {
  return btoa(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function strB64url(s: string): string {
  return b64url(unescape(encodeURIComponent(s)));
}
function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
function hexToBytes(hex: string): Uint8Array {
  return Uint8Array.from(hex.match(/.{2}/g)!.map((h) => parseInt(h, 16)));
}

// 服务端 KDF（与客户端加密 KDF 独立，仅用于验证器）
async function deriveVerifier(password: string, salt: Uint8Array): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  return bufToHex(bits);
}

async function signHS256(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return b64url(bufToHex(sig));
}

async function mintJwt(spaceKey: string, secret: string): Promise<{ token: string; exp: number }> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600; // 1 小时有效期
  const payload = {
    role: "authenticated",
    space_key: spaceKey,
    sub: spaceKey,
    iss: "auth-mint",
    aud: "authenticated",
    iat: now,
    exp,
  };
  const h = strB64url(JSON.stringify(header));
  const p = strB64url(JSON.stringify(payload));
  const sig = await signHS256(h + "." + p, secret);
  return { token: `${h}.${p}.${sig}`, exp };
}

// ---------- 主逻辑 ----------
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const secret = Deno.env.get("SUPABASE_JWT_SECRET");
    if (!secret) throw new Error("missing SUPABASE_JWT_SECRET");

    const body = await req.json().catch(() => ({}));
    const spaceKey: string = body.space_key;
    const password: string = body.password;
    if (!spaceKey || !password) {
      return new Response(JSON.stringify({ error: "missing params" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    // 查已有验证器
    const { data: existing, error: selErr } = await supabase
      .from("spaces")
      .select("space_key, verifier, salt")
      .eq("space_key", spaceKey)
      .maybeSingle();
    if (selErr) throw selErr;

    if (existing) {
      const salt = hexToBytes(existing.salt);
      const verifier = await deriveVerifier(password, salt);
      if (verifier !== existing.verifier) {
        // 密码不对 → 拒绝签发（攻击者无法冒领他人 space_key）
        return new Response(JSON.stringify({ error: "密码错误" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      // 首次：服务端随机盐生成验证器并入库
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const verifier = await deriveVerifier(password, salt);
      const { error: insErr } = await supabase.from("spaces").insert({
        space_key: spaceKey,
        verifier,
        salt: bytesToHex(salt),
      });
      if (insErr) throw insErr;
    }

    const { token, exp } = await mintJwt(spaceKey, secret);
    return new Response(JSON.stringify({ token, exp }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e && (e as any).message ? (e as any).message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
