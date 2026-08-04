const fs = require('fs');
const css = fs.readFileSync('style.css', 'utf8');
const add = `

/* ==== 正在学习 / 已阅读（学习模块） ==== */
.reading-list { display: flex; flex-direction: column; gap: 8px; }
.reading-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 10px;
  background: var(--card-bg, rgba(255,255,255,.6));
  border: 1px solid var(--border, rgba(0,0,0,.07));
  transition: background .2s, box-shadow .2s;
}
.reading-item:hover { box-shadow: 0 2px 10px rgba(0,0,0,.06); }
.reading-check { flex-shrink: 0; width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--purple-mid, #9b7ed9); cursor: pointer; appearance: none; -webkit-appearance: none; position: relative; transition: all .15s; }
.reading-check:checked { background: var(--purple-deep, #6f4fb8); border-color: var(--purple-deep, #6f4fb8); }
.reading-check:checked::after { content:'\\2713'; position:absolute; top:50%;left:50%; transform:translate(-50%,-50%); color:#fff; font-size:12px; font-weight:700; }
.reading-info { flex:1; min-width:0; }
.reading-title { font-size:14px; font-weight:600; color:var(--text-1, #2f2b36); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.reading-progress { font-size:12px; color:var(--text-sub, #888); margin-top:2px; }
.reading-page-input { width:48px; text-align:center; border:1px solid var(--border); border-radius:6px; padding:2px 4px; font-size:12px; color:var(--purple-deep, #6f4fb8); font-weight:600; background:transparent; }
.reading-del { flex-shrink:0; width:24px; height:24px; border:none; background:none; color:var(--text-light, #aaa); cursor:pointer; font-size:16px; border-radius:6px; display:flex; align-items:center; justify-content:center; transition: all .15s; }
.reading-del:hover { color:#c0392b; background:rgba(192,57,43,.08); }
.reading-done-list .reading-item { opacity:.7; }
.reading-done-list .reading-item .reading-title { text-decoration:line-through; color:var(--text-sub, #888); }

/* ==== 收藏夹模块 ==== */
.fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
.fav-card {
  border-radius: 12px; border: 1px solid var(--border, rgba(0,0,0,.07));
  background: var(--card-bg, rgba(255,255,255,.55));
  padding: 12px; cursor: pointer; transition: all .2s; position:relative;
}
.fav-card:hover { box-shadow: 0 4px 16px rgba(111,79,184,.12); transform: translateY(-1px); }
.fav-card-type { font-size:11px; color:var(--purple-deep, #6f4fb8); font-weight:600; text-transform:uppercase; letter-spacing:.5px; margin-bottom:4px; }
.fav-card-title { font-size:13px; font-weight:600; color:var(--text-1, #2f2b36); line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.fav-card-preview { font-size:11px; color:var(--text-sub, #999); margin-top:4px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.fav-card-date { font-size:10px; color:var(--text-light, #bbb); margin-top:6px; }
.fav-tag { display:inline-block; font-size:10px; padding:1px 7px; border-radius:8px; background:rgba(111,79,184,.1); color:var(--purple-deep, #6f4fb8); margin-right:4px; margin-top:4px; }
.fav-detail { max-width:700px; margin:0 auto; }
.fav-detail-title { font-size:18px; font-weight:700; color:var(--text-1, #2f2b36); margin-bottom:4px; }
.fav-detail-meta { font-size:12px; color:var(--text-sub, #888); margin-bottom:12px; }
.fav-detail-body { font-size:14px; line-height:1.85; color:var(--text-1, #2f2b36); white-space:pre-wrap; word-break:break-word; }
.fav-detail-link { display:block; margin-top:12px; padding:10px 14px; border-radius:10px; background:rgba(111,79,184,.06); border:1px solid rgba(111,79,184,.18); color:var(--purple-deep, #6f4fb8); font-size:13px; text-decoration:none; word-break:break-all; }
.fav-detail-link:hover { background:rgba(111,79,184,.1); }
.fav-form-row { margin-bottom:10px; }
.fav-form-label { font-size:12px; font-weight:600; color:var(--text-1, #2f2b36); margin-bottom:4px; }
.fav-type-chips { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; }
.fav-type-chip { font-size:12px; padding:5px 12px; border-radius:20px; border:1px solid var(--border, rgba(0,0,0,.12)); background:transparent; cursor:pointer; transition:all .15s; color:var(--text-2, #5a5563); }
.fav-type-chip.active { border-color:var(--purple-deep, #6f4fb8); background:rgba(111,79,184,.1); color:var(--purple-deep, #6f4fb8); font-weight:600; }
.fav-empty-hint { text-align:center; padding:30px 16px; color:var(--text-light, #bbb); font-size:13px; }
#favSearchInput { margin-bottom:12px; }
`;
fs.writeFileSync('style.css', css + add);
console.log('CSS appended OK');
