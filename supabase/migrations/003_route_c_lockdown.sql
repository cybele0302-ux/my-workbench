-- ============================================================
-- 方案 C 收口：撤销 anon 对 sync 表的一切权限，实现真隔离
-- ⚠️ 执行前提：App 已升到 v28.4（云同步走 sync-proxy 函数）并真机验证同步正常。
--    执行后，光有 anon key（前端公开可见）再也读不到任何人的数据。
-- ============================================================

-- 1) 清掉调试期留下的测试行（不影响真实数据）
DELETE FROM public.sync   WHERE space_key IN (repeat('a',64), repeat('e',64));
DELETE FROM public.spaces WHERE space_key IN (repeat('a',64)||':p', repeat('e',64)||':p', 'verifytest');

-- 2) 移除所有旧策略（anon 全开 / 范围声明 / 兜底）
DROP POLICY IF EXISTS "anon_full_sync"  ON public.sync;
DROP POLICY IF EXISTS "scoped_by_claim" ON public.sync;
DROP POLICY IF EXISTS "anon_fallback"   ON public.sync;

-- 3) 保持 RLS 开启 + 零策略 = 默认全拒（service_role 自动绕过 RLS，函数照常工作）
ALTER TABLE public.sync   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;

-- 4) 连表级授权一并撤掉，双保险
REVOKE ALL ON public.sync   FROM anon, authenticated;
REVOKE ALL ON public.spaces FROM anon, authenticated;
GRANT  ALL ON public.sync   TO service_role;
GRANT  ALL ON public.spaces TO service_role;

-- ============================================================
-- 回滚（万一同步出问题，先跑这段恢复，再把 app.js 的 CLOUD_PROXY 改回 false）
-- GRANT ALL ON public.sync TO anon;
-- CREATE POLICY "anon_full_sync" ON public.sync FOR ALL TO anon USING (true) WITH CHECK (true);
-- ============================================================
