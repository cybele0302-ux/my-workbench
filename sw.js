const VERSION = 'wobench-v29.67';
// 稳定资源（图标 / manifest）在 install 时预缓存；壳文件（/、index.html、app.js、style.css）不在此预缓存，
// 改由下方「网络优先」fetch handler 在【首次成功请求时】才写入缓存——这样缓存里只可能存到真正从网络拉到的最新版，
// 杜绝「部署后 CDN 尚未同步 → install 预缓存到旧版 style.css → 之后网络闪断回退吐旧 CSS」导致 banner 先左后居中的竞态。
const PRECACHE_STABLE = ['./manifest.json', './icon-192.png', './icon-512.png', './icon-180.png'];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(PRECACHE_STABLE); }).catch(function () {}));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// 核心壳文件（index.html / app.js / style.css / manifest.json）走「网络优先 + 离线回退」：
// 联网时每次都拉最新（cache:'reload' 绕过 HTTP 缓存），确保 CSS/JS 改动立即生效，不再被旧缓存卡住；
// 离线时回退到本地缓存，仍可打开。新版本经 VERSION 升级 + skipWaiting/clients.claim 自动激活。
var SHELL_PATHS = ['/', '/index.html', '/app.js', '/style.css', '/manifest.json'];

self.addEventListener('fetch', function (e) {
  // 只处理同源 GET；跨域（如 Supabase）直接放行，避免吞掉真实错误
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  var isShell = SHELL_PATHS.some(function (p) {
    return url.pathname === p || url.pathname.endsWith(p);
  });

  if (isShell) {
    // 网络优先 + 离线回退缓存（联网时永远拉最新 CSS/JS，杜绝旧 style.css 卡住不更新）
    e.respondWith((async function () {
      const cache = await caches.open(VERSION);
      const cached = await cache.match(e.request);
      try {
        const network = await fetch(e.request, { cache: 'reload' });
        if (network && network.ok) cache.put(e.request, network.clone());
        return network;
      } catch (err) {
        return cached || Response.error();
      }
    })());
  } else {
    // 资源/图标：stale-while-revalidate（先返回缓存，后台静默更新）
    e.respondWith((async function () {
      const cache = await caches.open(VERSION);
      const cached = await cache.match(e.request);
      const network = fetch(e.request, { cache: 'no-cache' }).then(function (res) {
        if (res && res.ok) cache.put(e.request, res.clone());
        return res;
      }).catch(function () { return cached; });
      return cached || network;
    })());
  }
});
