-- Route B 迁移：服务端验证器表 + 范围策略
-- ⚠️ 分阶段执行：先确保 Edge Function(auth-mint) 已部署且 App 验证过范围令牌同步正常，
--    再执行「2) 替换策略」这一段（DROP anon_full_sync + 建 scoped_by_claim）。
--    过渡期内保留 anon_full_sync，App 的 anon 回退可保证不中断。

-- 1) spaces 表：存服务端密码验证器（仅 service_role 访问，函数内部使用）
CREATE TABLE IF NOT EXISTS public.spaces (
  space_key  text primary key,
  verifier   text not null,
  salt       text not null,
  created_at timestamptz not null default now()
);
GRANT ALL ON public.spaces TO service_role;
-- sync 表允许 authenticated 角色（范围令牌持有者）CRUD
GRANT ALL ON public.sync TO authenticated;

-- 2) 收口策略（分两阶段，防锁死）
-- 2a) 阶段A：加范围策略给 authenticated，同时保留 anon 兜底（App 同步验证无误前不删 anon）
-- DROP POLICY IF EXISTS "anon_full_sync" ON public.sync;
-- CREATE POLICY "scoped_by_claim" ON public.sync
--   FOR ALL TO authenticated
--   USING (space_key = (auth.jwt() ->> 'space_key'))
--   WITH CHECK (space_key = (auth.jwt() ->> 'space_key'));
-- CREATE POLICY "anon_fallback" ON public.sync
--   FOR ALL TO anon
--   USING (true)
--   WITH CHECK (true);
-- 2b) 阶段B（确认 App 用范围令牌同步正常后执行，真隔离）：
-- DROP POLICY IF EXISTS "anon_fallback" ON public.sync;
