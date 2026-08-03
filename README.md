# 我的工作台 (PWA)

个人生活记录工作台：灵光、待办、身体、学习、修身、资产、日历、设置。
纯静态 PWA，可离线使用，数据存本地 IndexedDB + 可选 Supabase 加密云同步。

## 部署到 GitHub Pages
本目录即站点根目录。推送至仓库 `main` 分支后，在仓库 **Settings → Pages** 选择：
- Source: `Deploy from a branch`
- Branch: `main` / `(root)`

保存后几分钟即可通过 `https://<用户名>.github.io/<仓库名>/` 访问。

## 文件说明
- `index.html` 入口
- `app.js` 主逻辑
- `style.css` 样式
- `sw.js` Service Worker（离线缓存）
- `manifest.json` + `icon-*.png` PWA 图标
- `build_single.js` 生成单文件镜像 `个人工作台.html`
