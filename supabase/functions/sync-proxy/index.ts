// Supabase Edge Function: sync-proxy
// 方案 C —— 客户端不再直连 REST，所有云同步读写经此函数中转。
// 函数内用 service_role 访问表（绕过 RLS），并在服务端强制 space_key 隔离：
//   1) 先用 auth_proof 校验调用者确实是该 space 的主人（spaces 表 verifier）
//   2) 校验通过后，只允许读写该 space_key 对应的那一行
// 由此 anon key 可以完全撤销对 sync 表的权限 —— 拿到链接也读不到任何人的数据。
//
// 隐私说明：客户端传的是 auth_proof = sha256("zqdd-auth|" + 口令)，不是原始口令，
// 也不是 AES 数据密钥（PBKDF2 60 万轮独立派生），服务端无法解密任何 payload。
//
// 环境变量（Supabase 自动注入）：SUPABASE_URL、SUPABASE_SERVICE_ROLE_KEY

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function hexToBytes(hex: string): Uint8Array {
  return Uint8Array.from(hex.match(/.{2}/g)!.map((h) => parseInt(h, 16)));
}

// 服务端验证器派生（输入已是客户端哈希过的 auth_proof，再加盐迭代防彩虹表）
async function deriveVerifier(proof: string, salt: Uint8Array): Promise<string> {
  const km = await crypto.subtle.importKey("raw", new TextEncoder().encode(proof), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    km,
    256,
  );
  return bufToHex(bits);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const op: string = body.op;
    const spaceKey: string = body.space_key;
    const proof: string = body.auth_proof;

    if (!op || !spaceKey || !proof) return json({ error: "missing params" }, 400);
    if (op !== "get" && op !== "put") return json({ error: "bad op" }, 400);
    // space_key 必须是 64 位 hex（sha256），杜绝注入类奇怪值
    if (!/^[0-9a-f]{64}$/.test(spaceKey)) return json({ error: "bad space_key" }, 400);
    if (!/^[0-9a-f]{64}$/.test(proof)) return json({ error: "bad auth_proof" }, 400);

    const db = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    // ---- 1. 身份校验：该 space 的主人才放行 ----
    // 验证器行的主键用 "<space_key>:p" —— 与旧 auth-mint 时代（口径不同）的遗留行完全隔开，
    // 避免历史数据导致新代理误判「口令不匹配」，也无需人工清表。
    const vkey = spaceKey + ":p";
    const { data: space, error: selErr } = await db
      .from("spaces")
      .select("space_key, verifier, salt")
      .eq("space_key", vkey)
      .maybeSingle();
    if (selErr) throw selErr;

    if (space) {
      const verifier = await deriveVerifier(proof, hexToBytes(space.salt));
      if (verifier !== space.verifier) return json({ error: "unauthorized" }, 401);
    } else {
      // 首次使用：注册为该 space 的主人（先到先得，与本地口令一一对应）
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const verifier = await deriveVerifier(proof, salt);
      const { error: insErr } = await db.from("spaces").insert({
        space_key: vkey,
        verifier,
        salt: bytesToHex(salt),
      });
      // 并发首注册可能撞主键，重查一次再校验
      if (insErr) {
        const { data: again } = await db
          .from("spaces").select("verifier, salt").eq("space_key", vkey).maybeSingle();
        if (!again) throw insErr;
        const v2 = await deriveVerifier(proof, hexToBytes(again.salt));
        if (v2 !== again.verifier) return json({ error: "unauthorized" }, 401);
      }
    }

    // ---- 2. 只操作自己那一行（sync 表以 space_key 为主键，没有 id 列）----
    if (op === "get") {
      const { data, error } = await db
        .from("sync")
        .select("space_key, payload, pushed_at")
        .eq("space_key", spaceKey)
        .maybeSingle();
      if (error) throw error;
      return json({ row: data || null });
    }

    // op === 'put'
    const payload = body.payload;
    const pushedAt = body.pushed_at;
    if (typeof payload !== "string" || !pushedAt) return json({ error: "missing payload" }, 400);

    const { error: upErr } = await db
      .from("sync")
      .upsert({ space_key: spaceKey, payload, pushed_at: pushedAt }, { onConflict: "space_key" });
    if (upErr) throw upErr;
    return json({ ok: true });
  } catch (e) {
    const msg = e && (e as any).message ? (e as any).message : String(e);
    return json({ error: msg }, 500);
  }
});
