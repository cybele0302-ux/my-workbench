
    
    const ICONS = {
      sparkle: '<path d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z"/>',
      leaf: '<path d="M5 19 C5 10 11 5 19 5 C19 14 13 19 5 19 Z"/><path d="M5 19 C9 16 13 12 17 9"/>',
      gem: '<path d="M6 4 H18 L21 9 L12 21 L3 9 Z"/><path d="M3 9 H21"/><path d="M9 4 L7 9 L12 21 L17 9 L15 4"/>',
      book: '<path d="M12 6 C10 4.8 7 4.5 4 5 V17 C7 16.5 10 16.8 12 18"/><path d="M12 6 C14 4.8 17 4.5 20 5 V17 C17 16.5 14 16.8 12 18"/><path d="M12 6 V18"/><path d="M6 9 H9.5"/><path d="M6 12 H9.5"/><path d="M14.5 9 H18"/><path d="M14.5 12 H18"/>',
      lotus: '<path d="M12 19 C12 13 8 11 4 11 C5.5 16 9 19 12 19 C15 19 18.5 16 20 11 C16 11 12 13 12 19 Z"/><path d="M12 19 C12 14 10 12 7 11.5 C8 15 10 17 12 19 C14 17 16 15 17 11.5 C14 12 12 14 12 19 Z"/>',
      bulb: '<path d="M9 18 h6"/><path d="M10 21 h4"/><path d="M12 3 a6 6 0 0 0 -4 10.5 c.8.9 1.2 1.8 1.2 2.5 h5.6 c0 -.7.4 -1.6 1.2 -2.5 a6 6 0 0 0 -4 -10.5 Z"/>',
      bowl: '<path d="M3.5 11 h17 a8.5 8.5 0 0 1 -17 0 Z"/><path d="M7 8 V6 M12 8 V5 M17 8 V6"/>',
      car: '<path d="M5 12 L6.5 7.5 A1.8 1.8 0 0 1 8.3 6.2 H15.7 A1.8 1.8 0 0 1 17.5 7.5 L19 12"/><rect x="3.5" y="12" width="17" height="5" rx="2.2"/><circle cx="7.5" cy="17.5" r="1.4"/><circle cx="16.5" cy="17.5" r="1.4"/>',
      note: '<path d="M9 17 V5 L19 3 V15"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="15.5" r="2.5"/>',
      person: '<circle cx="12" cy="6.5" r="2.8"/><path d="M12 9.3 C9 9.3 7 10.5 7 13 V19 H9 V14 C9 12.5 10.2 11.5 12 11.5 C13.8 11.5 15 12.5 15 14 V19 H17 V13 C17 10.5 15 9.3 12 9.3 Z"/>',
      tree: '<path d="M12 3 L7.5 10 H10.5 L6.5 17 H17.5 L13.5 10 H16.5 Z"/><path d="M12 17 V20.5"/>',
      moon: '<path d="M20 13.5 A8 8 0 1 1 11 4.5 A6 6 0 0 0 20 13.5 Z"/>',
      home: '<path d="M4 11 L12 4 L20 11"/><path d="M6 10 V20 H18 V10"/><path d="M10 20 V14 H14 V20"/>',
      calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5 H20.5"/><path d="M8 3 V6.5 M16 3 V6.5"/>',
      gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M5 5 L7 7 M17 17 L19 19 M19 5 L17 7 M7 17 L5 19"/>',
      check: '<path d="M5 12 L10 17 L19 7"/>',
      study: '<path d="M12 3 L21 8 V16 L12 21 L3 16 V8 Z"/><path d="M12 12 L21 8"/><path d="M12 12 V21"/><path d="M12 12 L3 8"/>',
      news: '<rect x="3" y="4" width="13" height="16" rx="2"/><path d="M7 8 H13 M7 11 H13 M7 14 H10"/><path d="M16 8 H18.5 A1.5 1.5 0 0 1 20 9.5 V20 H18"/>'
    };

    document.querySelectorAll('[data-icon]').forEach(function (el) {
      var k = el.getAttribute('data-icon');
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[k] || '') + '</svg>';
    });

    const navItems = document.querySelectorAll('.nav-item');
    const modules = document.querySelectorAll('.module');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.module;
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        modules.forEach(m => {
          m.classList.toggle('hidden', m.id !== target);
        });
        updateModuleHeaderDate(target);
        switchModuleTab(target, 'today');
        if (target === 'home') { renderCal(); renderDetail(todayStr); renderHomeSummary(); renderReview('week'); renderStreakBadges(); }
        else if (target === 'homepage') { renderHomepage(); renderReport('week'); renderTrend(7); }
        else if (target === 'lingguang') renderInspirationList();
        else if (target === 'zichan') { renderTransactions(); renderTodayTx(); renderAssetSummary(); }
        else if (DAILY_MODS.indexOf(target) >= 0) {
          const rec = store[ymd(new Date()) + '|' + target];
          if (rec) { const el = document.getElementById(target); if (el) fillForm(el, rec.fields); }
          renderHistory(target);
          if (target === 'xiushen') { renderXiushenDaily(todayStr); renderYanghu(); renderYanghuHistory(); }
          if (target === 'study') { renderStudyMonth(); renderTcm(); renderStudyTimeCard(); }
        }
        else if (target === 'todo') renderTodo();
      });
    });

    // 通用单选（标签 / 选项）
    document.querySelectorAll('.choice-row').forEach(row => {
      row.addEventListener('click', e => {
        const choice = e.target.closest('.choice');
        if (!choice) return;
        row.querySelectorAll('.choice').forEach(c => c.classList.remove('active'));
        choice.classList.add('active');
      });
    });

    // 灵光闪现标签多选
    document.querySelectorAll('.tag-group').forEach(group => {
      group.addEventListener('click', e => {
        const tag = e.target.closest('.tag');
        if (tag) tag.classList.toggle('active');
      });
    });

    // 天气 / 心情 图标选择
    document.querySelectorAll('.pick-grid').forEach(grid => {
      grid.addEventListener('click', e => {
        const item = e.target.closest('.pick-item');
        if (!item) return;
        grid.querySelectorAll('.pick-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });

    // ============ 农历（动态计算，数据表 1900-2099，已与 cnlunar 校验） ============
    var LUNAR_INFO = [0x4bd8,0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x16554,0x56a0,0x9ad0,0x55d2,0x4ae0,0xa5b6,0xa4d0,0xd250,0x1d255,0xb540,0xd6a0,0xada2,0x95b0,0x14977,0x4970,0xa4b0,0xb4b5,0x6a50,0x6d40,0x1ab54,0x2b60,0x9570,0x52f2,0x4970,0x6566,0xd4a0,0xea50,0x6e95,0x5ad0,0x2b60,0x186e3,0x92e0,0x1c8d7,0xc950,0xd4a0,0x1d8a6,0xb550,0x56a0,0x1a5b4,0x25d0,0x92d0,0xd2b2,0xa950,0xb557,0x6ca0,0xb550,0x15355,0x4da0,0xa5b0,0x14573,0x52b0,0xa9a8,0xe950,0x6aa0,0xaea6,0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,0x96d0,0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x195a6,0x95b0,0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,0x4af5,0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x55c0,0xab60,0x96d5,0x92e0,0xc960,0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,0xa950,0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x15176,0x52b0,0xa930,0x7954,0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,0x5aa0,0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0x1d0b6,0xd250,0xd520,0xdd45,0xb5a0,0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0x1b255,0x6d20,0xada0,0x14b63,0x9370,0x49f8,0x4970,0x64b0,0x168a6,0xea50,0x6b20,0x1a6c4,0xaae0,0xa2e0,0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,0x52d0,0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,0xb273,0x6930,0x7337,0x6aa0,0xad50,0x14b55,0x4b60,0xa570,0x54e4,0xd160,0xe968,0xd520,0xdaa0,0x16aa6,0x56d0,0x4ae0,0xa9d4,0xa2d0,0xd150,0xf252,0xd520];
    var GAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    var ZHI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    var L_MONTHS = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
    var L_DAY2 = ['日','一','二','三','四','五','六','七','八','九','十'];
    function lLeapMonth(y){ return LUNAR_INFO[y-1900] & 0xf; }
    function lLeapDays(y){ if(lLeapMonth(y)) return (LUNAR_INFO[y-1900] & 0x10000) ? 30 : 29; return 0; }
    function lMonthDays(y,m){ return (LUNAR_INFO[y-1900] & (0x10000 >> m)) ? 30 : 29; }
    function lYearDays(y){ var s=348,i=0x8000; while(i>0x8){ if(LUNAR_INFO[y-1900]&i) s++; i>>=1; } return s+lLeapDays(y); }
    function lunarCn(dateStr){
      var p = String(dateStr).split('-');
      var y = parseInt(p[0],10), m = parseInt(p[1],10), d = parseInt(p[2],10);
      var off = Math.round((Date.UTC(y,m-1,d) - Date.UTC(1900,0,31))/86400000);
      var i=1900;
      while(i<2101 && off>0){ off-=lYearDays(i); i++; }
      if(off<0){ off+=lYearDays(i-1); i--; }
      var ly=i, leap=lLeapMonth(ly), isLeap=false, lm=1, temp=0;
      while(lm<13 && off>0){
        if(leap>0 && lm==(leap+1) && !isLeap){ lm--; isLeap=true; temp=lLeapDays(ly); }
        else { temp=lMonthDays(ly,lm); }
        if(isLeap && lm==(leap+1)) isLeap=false;
        off-=temp; lm++;
      }
      if(off==0 && leap>0 && lm==leap+1){ if(isLeap){ isLeap=false; } else { isLeap=true; lm--; } }
      if(off<0){ off+=temp; lm--; }
      var ld=off+1;
      var gy=(ly-1984)%10, gz=(ly-1984)%12; gy=(gy+10)%10; gz=(gz+12)%12;
      var ys=GAN[gy]+ZHI[gz];
      var ms = isLeap ? ('闰'+L_MONTHS[leap-1]+'月') : (L_MONTHS[lm-1]+'月');
      var dstr;
      if(ld<=10) dstr='初'+L_DAY2[ld];
      else if(ld<20) dstr='十'+L_DAY2[ld-10];
      else if(ld==20) dstr='二十';
      else if(ld<30) dstr='廿'+L_DAY2[ld-20];
      else dstr='三十';
      return ys+'年'+ms+dstr;
    }
    function ymd(d) {
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }
    function weekCn(d) {
      return '周' + '日一二三四五六'[d.getDay()];
    }
    const todayStr = ymd(new Date());

    // ============ 修身养性 · 每日内容（按日期循环）============
    const JINGWEN = {
      daodejing: [
        { title: '上善若水', chapter: '第八章', source: '《道德经》', text: '上善若水。水善利万物而不争，处众人之所恶，故几于道。', explain: '最高的善如同水。水滋养万物而不争抢，停留在众人厌恶的低处，所以最接近“道”。修行人当学水之德：利他、不争、处下、柔弱。柔能克刚，低能聚流，这是道家处世的大智慧。' },
        { title: '知人者智', chapter: '第三十三章', source: '《道德经》', text: '知人者智，自知者明。胜人者有力，自胜者强。', explain: '能了解别人是聪明，能认识自己才是高明。能战胜别人是有力量，能战胜自己才是真正的强大。修身的关键，在于向内观照、克己自律。' },
        { title: '大音希声', chapter: '第四十一章', source: '《道德经》', text: '大音希声，大象无形，道隐无名。', explain: '最大的声音听来反而稀疏，最大的形象反而没有形迹，真正的“道”幽隐而无名。提醒我们：不要被表象迷惑，真正的力量往往沉静而不张扬。' },
        { title: '致虚极', chapter: '第十六章', source: '《道德经》', text: '致虚极，守静笃。万物并作，吾以观复。', explain: '心灵虚寂到极点，生活清静到坚定。万物蓬勃生长，我从中观察它们循环往复的规律。现代人若能每日留一段静默时光，便能恢复内在秩序。' }
      ],
      vajra: [
        { title: '应无所住', chapter: '第十品', source: '《金刚经》', text: '应无所住而生其心。', explain: '心不执着于任何外境，方能生起清净智慧。修行的要点不是压抑念头，而是不黏着、不追逐，如雁过长空，影沉寒水。' },
        { title: '一切有为法', chapter: '第三十二品', source: '《金刚经》', text: '一切有为法，如梦幻泡影，如露亦如电，应作如是观。', explain: '世间一切因缘和合而生的事物，都如梦、如幻、如泡影、如露、如电，转瞬即逝。以这样的眼光看待得失，心便不易被外境牵动。' },
        { title: '无我相', chapter: '第十四品', source: '《金刚经》', text: '无我相，无人相，无众生相，无寿者相。', explain: '不执着自我的形象，也不执着他人、众生、寿命的分别。放下“我”的边界，才能减少对立与烦恼，体会到更宽广的慈悲。' },
        { title: '法尚应舍', chapter: '第六品', source: '《金刚经》', text: '法尚应舍，何况非法。', explain: '连正确的法门都应当放下，更不必说不正确的执着。方法是指月之手，目的是觉醒。不要在工具上停留，而要指向真正的内心自由。' }
      ],
      neijing: [
        { title: '法于阴阳', chapter: '上古天真论', source: '《黄帝内经》', text: '法于阴阳，和于术数，食饮有节，起居有常，不妄作劳。', explain: '养生要效法天地阴阳的变化，调和身心术数，饮食有节制，作息有规律，不妄自劳累。看似简单的道理，却是健康长寿的根本。' },
        { title: '正气存内', chapter: '刺法论', source: '《黄帝内经》', text: '正气存内，邪不可干。', explain: '人体自身的正气充足，外邪就难以入侵。不仅是身体，心理亦然：内心清明坚定，外界的干扰自然减少。' },
        { title: '春夏养阳', chapter: '四气调神大论', source: '《黄帝内经》', text: '春夏养阳，秋冬养阴。', explain: '春夏季节宜养护阳气，宜早起、多动、舒展；秋冬宜滋养阴精，宜早睡、少耗、收敛。顺应四时，是中医养生的核心原则。' },
        { title: '形神合一', chapter: '素问', source: '《黄帝内经》', text: '形与神俱，而尽终其天年。', explain: '身体与心神和谐统一，才能尽享天年。现代人常忽视情绪对身体的伤害，修身养性正是让形与神重新合一。' }
      ],
      zhongyi: [
        { title: '气血流通', chapter: '养生总则', source: '中医养生', text: '气血流通，百病不生。', explain: '气血是生命活动的物质基础。气行则血行，气滞则血瘀。通过运动、呼吸、情志调节，让气血畅通，自然少生病痛。' },
        { title: '药食同源', chapter: '食疗篇', source: '中医养生', text: '五谷为养，五果为助，五畜为益，五菜为充。', explain: '谷物是养生的根本，水果是辅助，肉类是补益，蔬菜是充实。饮食多样化、以植物为主，与现代营养学不谋而合。' },
        { title: '子时熟睡', chapter: '子午流注', source: '中医养生', text: '子时一阳生，胆气始旺，宜熟睡以养少阳。', explain: '晚上 11 点至凌晨 1 点是子时，阳气初生，胆经当令。此时熟睡，有助于阳气生发和肝胆排毒，是最经济的养生法。' },
        { title: '恬淡虚无', chapter: '情志养生', source: '中医养生', text: '恬淡虚无，真气从之；精神内守，病安从来。', explain: '心境淡泊宁静，真气自然顺畅；精神内守而不外耗，疾病又从何而生？情绪稳定，是最高级的养生。' }
      ]
    };
    let currentJing = 'daodejing';
    function renderXiushenDaily(ds) {
      const d = new Date(ds.replace(/-/g, '/'));
      const idx = d.getDate() - 1;
      renderJingwen(currentJing, idx);
    }

    // ============ 每日养护打卡（独立数据 · 即勾即存）============
    const YANGHU_KEYS = ['推腹', '按摩头皮3分钟', '驻颜术', '练习金刚功', '震背3分钟', '午时午睡30分钟', '经络拉伸操', '泡脚20分钟', '梳理经络/按揉穴位', '11点前睡觉'];
    function yanghuActiveDs() { return editingDate || todayStr; }
    function loadYanghu(ds) {
      const r = store[ds + '|yanghu'];
      let f = (r && !isEnc(r)) ? r.fields : {};
      if (f['梳理经络或按重要穴位10分钟']) { f['梳理经络/按揉穴位'] = f['梳理经络或按重要穴位10分钟']; delete f['梳理经络或按重要穴位10分钟']; }
      if (f['靠墙震背呵3分钟']) { f['震背3分钟'] = f['靠墙震背呵3分钟']; delete f['靠墙震背呵3分钟']; }
      return f;
    }
    function renderYanghu() {
      const ds = yanghuActiveDs();
      const f = loadYanghu(ds);
      const boxes = document.querySelectorAll('#yanghuList input[data-yanghu]');
      let done = 0;
      boxes.forEach(function (b) {
        const on = !!f[YANGHU_KEYS[+b.getAttribute('data-yanghu')]];
        b.checked = on;
        if (on) done++;
      });
      const p = document.getElementById('yanghuProgress');
      if (p) p.textContent = done + '/' + YANGHU_KEYS.length;
    }
    function saveYanghu() {
      const ds = yanghuActiveDs();
      const f = {};
      document.querySelectorAll('#yanghuList input[data-yanghu]').forEach(function (b) {
        if (b.checked) f[YANGHU_KEYS[+b.getAttribute('data-yanghu')]] = true;
      });
      const id = ds + '|yanghu';
      store[id] = { id: id, date: ds, module: 'yanghu', fields: f, updatedAt: Date.now() };
      dbPut(store[id]).then(function () { renderYanghu(); renderYanghuHistory(); renderCal(); renderDetail(ds); renderStreakBadges(); });
    }
    function renderYanghuHistory() {
      const c = document.querySelector('[data-history="yanghu"]');
      if (!c) return;
      const recs = recordsForModule('yanghu').filter(function (r) { return !isEnc(r); }).sort(function (a, b) { return b.date < a.date ? -1 : (b.date > a.date ? 1 : b.updatedAt - a.updatedAt); });
      if (!recs.length) { c.innerHTML = '<div class="history-empty">还没有记录</div>'; return; }
      c.innerHTML = recs.map(function (r) {
        const total = YANGHU_KEYS.length;
        const done = Object.keys(r.fields).length;
        const lm = lunarCn(r.date).replace(/^.+?年/, '');
        const names = Object.keys(r.fields).join(' · ');
        return '<div class="history-item"><div class="hi-main"><div class="hi-date">' + r.date.slice(5) + ' · ' + lm + ' · 完成 ' + done + '/' + total + '</div><div class="hi-sum">' + escapeHtml(names) + '</div></div></div>';
      }).join('');
    }
    document.querySelectorAll('#yanghuList input[data-yanghu]').forEach(function (b) { b.addEventListener('change', saveYanghu); });
    const FOLD_MAP = { zhuyan: 'foldZhuyan', jingong: 'foldJingong', lashen: 'foldLashen' };
    document.querySelectorAll('.fold-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const body = document.getElementById(FOLD_MAP[btn.getAttribute('data-fold')]);
        if (!body) return;
        const open = body.classList.toggle('open');
        btn.textContent = open ? '▾' : '▸';
      });
    });

    // ============ 中医学习打卡（独立数据 · 即勾即存）============
    const TCM_KEYS = ['针灸大成', '黄帝内经', '神农本草经', '伤寒论', '金匮要略', '案例解析', '精一书院', '实操学习'];
    function tcmActiveDs() { return editingDate || todayStr; }
    function loadTcm(ds) {
      const r = store[ds + '|tcm'];
      return (r && !isEnc(r)) ? r.fields : {};
    }
    function renderTcm() {
      const ds = tcmActiveDs();
      const f = loadTcm(ds);
      const boxes = document.querySelectorAll('#tcmList input[data-tcm]');
      let done = 0;
      boxes.forEach(function (b) {
        const on = !!f[TCM_KEYS[+b.getAttribute('data-tcm')]];
        b.checked = on;
        if (on) done++;
      });
      document.querySelectorAll('#tcmList input[data-tcmnote]').forEach(function (n) {
        const i = +n.getAttribute('data-tcmnote');
        const v = (f[TCM_KEYS[i] + '笔记']) || '';
        if (document.activeElement !== n && n.value !== v) n.value = v;
      });
      const p = document.getElementById('tcmProgress');
      if (p) p.textContent = done + '/' + TCM_KEYS.length;
    }
    function saveTcm() {
      const ds = tcmActiveDs();
      const f = {};
      document.querySelectorAll('#tcmList input[data-tcm]').forEach(function (b) {
        if (b.checked) {
          const i = +b.getAttribute('data-tcm');
          f[TCM_KEYS[i]] = true;
        }
      });
      document.querySelectorAll('#tcmList input[data-tcmnote]').forEach(function (n) {
        const i = +n.getAttribute('data-tcmnote');
        if (n.value.trim()) {
          f[TCM_KEYS[i] + '笔记'] = n.value.trim();
          f[TCM_KEYS[i]] = true;
        }
      });
      const id = ds + '|tcm';
      store[id] = { id: id, date: ds, module: 'tcm', fields: f, updatedAt: Date.now() };
      dbPut(store[id]).then(function () { renderTcm(); renderTcmHistory(); renderCal(); renderDetail(ds); renderStreakBadges(); renderGoalProgress(); });
    }
    function renderTcmHistory() {
      const c = document.querySelector('[data-history="tcm"]');
      if (!c) return;
      const recs = recordsForModule('tcm').filter(function (r) { return !isEnc(r); }).sort(function (a, b) { return b.date < a.date ? -1 : (b.date > a.date ? 1 : b.updatedAt - a.updatedAt); });
      if (!recs.length) { c.innerHTML = '<div class="history-empty">还没有打卡记录</div>'; return; }
      c.innerHTML = recs.map(function (r) {
        const total = TCM_KEYS.length;
        const done = Object.keys(r.fields).length;
        const lm = lunarCn(r.date).replace(/^.+?年/, '');
        const names = Object.keys(r.fields).join(' · ');
        return '<div class="history-item"><div class="hi-main"><div class="hi-date">' + r.date.slice(5) + ' · ' + lm + ' · 完成 ' + done + '/' + total + '</div><div class="hi-sum">' + escapeHtml(names) + '</div></div></div>';
      }).join('');
    }
    document.querySelectorAll('#tcmList input[data-tcm]').forEach(function (b) { b.addEventListener('change', saveTcm); });
    document.querySelectorAll('#tcmList input[data-tcmnote]').forEach(function (n) { n.addEventListener('input', saveTcm); });

    function renderJingwen(key, idx) {
      const list = JINGWEN[key] || JINGWEN.daodejing;
      const item = list[idx % list.length];
      const t = document.getElementById('jwTitle');
      const s = document.getElementById('jwSource');
      const tx = document.getElementById('jwText');
      const ex = document.getElementById('jwExplain');
      if (t) t.textContent = item.title;
      if (s) s.textContent = '出处：' + item.source + ' · ' + item.chapter;
      if (tx) tx.textContent = '「' + item.text + '」';
      if (ex) ex.textContent = item.explain;
    }

    var SOLAR_TERMS = {
      '2026-01-05': '小寒', '2026-01-20': '大寒', '2026-02-04': '立春', '2026-02-18': '雨水', '2026-03-05': '惊蛰', '2026-03-20': '春分', '2026-04-05': '清明', '2026-04-20': '谷雨', '2026-05-05': '立夏', '2026-05-21': '小满', '2026-06-05': '芒种', '2026-06-21': '夏至', '2026-07-07': '小暑', '2026-07-23': '大暑', '2026-08-07': '立秋', '2026-08-23': '处暑', '2026-09-07': '白露', '2026-09-23': '秋分', '2026-10-08': '寒露', '2026-10-23': '霜降', '2026-11-07': '立冬', '2026-11-22': '小雪', '2026-12-07': '大雪', '2026-12-22': '冬至',
      '2027-01-05': '小寒', '2027-01-20': '大寒', '2027-02-04': '立春', '2027-02-18': '雨水', '2027-03-06': '惊蛰', '2027-03-21': '春分', '2027-04-05': '清明', '2027-04-20': '谷雨', '2027-05-06': '立夏', '2027-05-21': '小满', '2027-06-06': '芒种', '2027-06-21': '夏至', '2027-07-07': '小暑', '2027-07-23': '大暑', '2027-08-08': '立秋', '2027-08-23': '处暑', '2027-09-08': '白露', '2027-09-23': '秋分', '2027-10-09': '寒露', '2027-10-24': '霜降', '2027-11-08': '立冬', '2027-11-22': '小雪', '2027-12-07': '大雪', '2027-12-22': '冬至'
    };
    (function () {
      const t = new Date();
      const dsKey = ymd(t);
      const lunar = lunarCn(dsKey);
      const term = SOLAR_TERMS[dsKey];
      const main = document.getElementById('heroDateMain');
      const sub = document.getElementById('heroDateSub');
      if (main) main.textContent = dsKey.replace(/-/g, '.');
      if (sub) sub.textContent = lunar + ' · ' + weekCn(t) + (term ? ' · ' + term : '');
    })();

    // ============ 首页日历 ============
    let calYear = new Date().getFullYear();
    let calMonth = new Date().getMonth();

    function renderCal() {
      const title = document.getElementById('calTitle');
      const grid = document.getElementById('calGrid');
      if (!title || !grid) return;
      title.textContent = calYear + '年' + (calMonth + 1) + '月';
      const first = new Date(calYear, calMonth, 1);
      const startDow = first.getDay();
      const days = new Date(calYear, calMonth + 1, 0).getDate();
      var html = '';
      var day = 1;
      for (var row = 0; row < 6 && day <= days; row++) {
        html += '<tr>';
        for (var col = 0; col < 7; col++) {
          if (row === 0 && col < startDow) {
            html += '<td class="empty"></td>';
          } else if (day <= days) {
            var ds = calYear + '-' + String(calMonth + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
            var lunar = lunarCn(ds);
            var lm = lunar ? lunar.replace(/^.+?年.+?月/, '') : '';
            if (lm === '初一') lm = lunar.replace(/^.+?年/, '').replace('月', '');
            var cls = '';
            if (ds === todayStr) cls += ' today';
            if (hasRecord(ds)) cls += ' has-record';
            html += '<td class="' + cls.trim() + '" data-date="' + ds + '"><div class="cal-num">' + day + '</div><div class="cal-lunar">' + lm + '</div></td>';
            day++;
          } else {
            html += '<td class="empty"></td>';
          }
        }
        html += '</tr>';
      }
      grid.innerHTML = html;
      grid.querySelectorAll('td[data-date]').forEach(function (td) {
        td.addEventListener('click', function () { renderDetail(td.getAttribute('data-date')); });
      });
      renderHomeSummary();
    }

    function renderHomeSummary() {
      let streak = 0;
      let d = new Date();
      while (true) {
        const ds = ymd(d);
        if (hasRecord(ds)) { streak++; d.setDate(d.getDate() - 1); }
        else break;
      }
      setText('streakDays', streak);
      const mods = ['lingguang', 'todo', 'shiti', 'study', 'xiushen', 'zichan'];
      const tds = ymd(new Date());
      let cnt = 0;
      mods.forEach(function (m) { if (recordsForDay(tds, m).length) cnt++; });
      setText('todayMods', cnt);
      const t = loadTodo();
      const done = t.filter(function (x) { return x.done; }).length;
      setText('todoRate', (t.length ? Math.round(done / t.length * 100) : 0) + '%');
    }

    var DAILY_QUOTES = [
      '知人者智，自知者明。——《道德经》',
      '不积跬步，无以至千里；不积小流，无以成江海。——《荀子》',
      '宠辱不惊，看庭前花开花落；去留无意，望天上云卷云舒。',
      '吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎？——《论语》',
      '为学日益，为道日损。——《道德经》',
      '行有不得，反求诸己。——《孟子》',
      '心平气和，百福自集。',
      '世上本无事，庸人自扰之。',
      '尽人事，听天命。',
      '腹有诗书气自华。——苏轼',
      '路漫漫其修远兮，吾将上下而求索。——屈原',
      '淡泊以明志，宁静以致远。——诸葛亮',
      '海纳百川，有容乃大；壁立千仞，无欲则刚。——林则徐',
      '欲速则不达，见小利则大事不成。——《论语》',
      '君子坦荡荡，小人长戚戚。——《论语》',
      '不忘初心，方得始终。',
      '一念放下，万般自在。',
      '静坐常思己过，闲谈莫论人非。',
      '心若安处，便是吾乡。',
      '你若盛开，蝴蝶自来；你若精彩，天自安排。',
      '万物皆有裂痕，那是光照进来的地方。',
      '事来则应，事去则空。',
      '从容于内，从容于外。',
      '修身如执玉，种德如耕田。'
    ];

    var GREETING_SUBS = [
      '愿你稳步向理想的自己靠近',
      '今天也是充满可能性的一天',
      '心若向阳，何惧风雨',
      '慢慢来，比较快',
      '专注当下，自有光芒',
      '行有不得，反求诸己',
      '保持热爱，奔赴山海',
      '静水流深，厚积薄发'
    ];

    function renderHomepage() {
      var ds = ymd(new Date());
      var sum = 0;
      for (var i = 0; i < ds.length; i++) sum += ds.charCodeAt(i);

      var h = new Date().getHours();
      var g = '晚上好呀';
      var icon = '🌙';
      if (h >= 5 && h < 11) { g = '早上好呀'; icon = '☀️'; }
      else if (h >= 11 && h < 14) { g = '中午好呀'; icon = '🌤️'; }
      else if (h >= 14 && h < 18) { g = '下午好呀'; icon = '☕'; }
      var gEl = document.getElementById('greetingText');
      if (gEl) {
        var sub = GREETING_SUBS[sum % GREETING_SUBS.length];
        gEl.innerHTML = '<div class="greeting-main">' + g + ' ' + icon + '</div><div class="greeting-sub">' + sub + '</div>';
      }

      var q = DAILY_QUOTES[sum % DAILY_QUOTES.length];
      var qEl = document.getElementById('dailyQuote');
      if (qEl) qEl.textContent = q;
    }

    function renderDetail(ds) {
      const lunar = lunarCn(ds);
      const wd = weekCn(new Date(ds.replace(/-/g, '/')));
      const title = document.getElementById('detailTitle');
      const body = document.getElementById('detailBody');
      if (title) title.textContent = (ds === todayStr ? '今 · ' : '') + ds + ' · ' + lunar + ' · ' + wd;
      if (!body) return;
      const mods = [['lingguang', '灵光闪现'], ['todo', '待办事项'], ['shiti', '实体感录'], ['study', '学习'], ['xiushen', '修身养性'], ['zichan', '理财']];
      let html = '';
      mods.forEach(function (m) {
        const recs = recordsForDay(ds, m[0]);
        html += '<div class="detail-row"><div class="detail-mod">' + m[1] + '</div>';
        if (recs.length) {
          html += '<div class="detail-items">';
          recs.forEach(function (r) {
            Object.keys(r.fields).forEach(function (k) { html += '<span class="detail-chip">' + k + '：' + escapeHtml(r.fields[k]) + '</span>'; });
          });
          html += '</div>';
        } else {
          html += '<div class="detail-empty">这天还没有记录</div>';
        }
        html += '</div>';
      });
      body.innerHTML = html;
    }

    const calPrev = document.getElementById('calPrev');
    const calNext = document.getElementById('calNext');
    if (calPrev) calPrev.addEventListener('click', function () {
      calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCal();
    });
    if (calNext) calNext.addEventListener('click', function () {
      calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCal();
    });
    const calToday = document.getElementById('calToday');
    if (calToday) calToday.addEventListener('click', function () {
      const now = new Date(); calYear = now.getFullYear(); calMonth = now.getMonth(); renderCal();
    });

    // ============ 数据层（IndexedDB + 内存索引） ============
    const DB_NAME = 'zqdd', DB_VER = 2, STORE = 'records', BAK_STORE = 'backups';
    let _db = null;
    const store = {}; // id -> {id, date, module, fields, updatedAt}

    function openDB() {
      return new Promise(function (res, rej) {
        const req = indexedDB.open(DB_NAME, DB_VER);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' });
          if (!db.objectStoreNames.contains(BAK_STORE)) db.createObjectStore(BAK_STORE, { keyPath: 'ts' });
        };
        req.onsuccess = function (e) { _db = e.target.result; res(_db); };
        req.onerror = function (e) { rej(e); };
      });
    }
    function dbPut(rec) {
      return new Promise(function (res, rej) {
        const tx = _db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put(rec);
        tx.oncomplete = function () { res(); };
        tx.onerror = function () { rej(tx.error); };
      });
    }
    function dbGetAll() {
      return new Promise(function (res, rej) {
        const tx = _db.transaction(STORE, 'readonly');
        const r = tx.objectStore(STORE).getAll();
        r.onsuccess = function () { res(r.result || []); };
        r.onerror = function () { rej(r.error); };
      });
    }

    function dbDelete(id) {
      return new Promise(function (res) {
        const tx = _db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).delete(id);
        tx.oncomplete = function () { res(); };
      });
    }

    // ---- 工具 ----
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }
    // 实体感录：每天只保留最新一条（兼容旧数据中同一天多条的情况）
    function dedupeShiti() {
      const byDate = {};
      Object.keys(store).forEach(function (id) {
        if (id.indexOf('|shiti') < 0) return;
        const d = store[id].date;
        (byDate[d] = byDate[d] || []).push(store[id]);
      });
      Object.keys(byDate).forEach(function (d) {
        const arr = byDate[d].sort(function (a, b) { return b.updatedAt - a.updatedAt; });
        for (let i = 1; i < arr.length; i++) {
          const old = arr[i];
          delete store[old.id];
          dbDelete(old.id);
        }
      });
    }
    function setText(id, t) { const e = document.getElementById(id); if (e) e.textContent = t; }

    // ---- 模块头部日期 + 今日/历史分页 ----
    function updateModuleHeaderDate(mod) {
      const el = document.getElementById('mhcDate' + (mod[0].toUpperCase() + mod.slice(1)));
      if (!el) return;
      const d = new Date();
      el.textContent = (d.getMonth() + 1) + '/' + d.getDate() + ' ' + weekCn(d);
    }
    function switchModuleTab(mod, name) {
      const module = document.getElementById(mod);
      if (!module) return;
      module.querySelectorAll('.mhc-tab').forEach(function (t) {
        t.classList.toggle('active', t.dataset.tabName === name);
      });
      module.querySelectorAll('.tab-panel').forEach(function (p) {
        p.classList.toggle('active', p.classList.contains(name + '-panel'));
      });
    }
    document.querySelectorAll('.mhc-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        const mod = tab.dataset.tab;
        const name = tab.dataset.tabName;
        switchModuleTab(mod, name);
      });
    });

    // ---- 数据分析（日/周/月/年） ----
    let currentReport = 'week';
    function renderReport(period) {
      currentReport = period;
      const body = document.getElementById('reportBody');
      if (!body) return;
      document.querySelectorAll('.report-tab').forEach(function (t) { t.classList.toggle('active', t.dataset.report === period); });

      const now = new Date();
      let start, end, label;
      if (period === 'week') {
        const d = new Date(now);
        const day = d.getDay() || 7;
        d.setDate(d.getDate() - day + 1);
        start = ymd(d);
        d.setDate(d.getDate() + 6);
        end = ymd(d);
        label = start.slice(5) + ' ~ ' + end.slice(5);
      } else if (period === 'month') {
        start = ymd(new Date(now.getFullYear(), now.getMonth(), 1));
        end = ymd(new Date(now.getFullYear(), now.getMonth() + 1, 0));
        label = (now.getMonth() + 1) + '月';
      } else if (period === 'day') {
        start = end = ymd(now);
        label = (now.getMonth() + 1) + '月' + now.getDate() + '日';
      } else {
        start = now.getFullYear() + '-01-01';
        end = now.getFullYear() + '-12-31';
        label = now.getFullYear() + '年';
      }

      const recs = Object.values(store).filter(function (r) { return !isEnc(r) && r.date >= start && r.date <= end; });
      const counts = {};
      ['lingguang', 'todo', 'shiti', 'study', 'xiushen', 'zichan', 'yanghu'].forEach(function (m) { counts[m] = 0; });
      recs.forEach(function (r) { if (counts[r.module] != null) counts[r.module]++; });

      let sleepScores = [];
      recs.filter(function (r) { return r.module === 'shiti'; }).forEach(function (r) {
        const s = parseInt(r.fields['睡眠质量'], 10);
        if (!isNaN(s)) sleepScores.push(s);
      });
      const avgSleep = sleepScores.length ? Math.round(sleepScores.reduce(function (a, b) { return a + b; }, 0) / sleepScores.length) : null;

      let studyMins = 0;
      recs.filter(function (r) { return r.module === 'study'; }).forEach(function (r) { studyMins += studyMinsOf(r.fields); });

      let exp = 0, inc = 0;
      recs.filter(function (r) { return r.module === 'zichan'; }).forEach(function (r) {
        const amt = parseFloat(r.fields['金额']) || 0;
        if (r.fields['交易类型'] === '收入') inc += amt;
        else exp += amt;
      });

      const totalDays = new Set(recs.map(function (r) { return r.date; })).size;

      let html = '<div class="report-section"><div class="report-section-title">📅 ' + label + ' · 记录概览</div>';
      html += '<div class="report-grid">' +
        '<div class="report-stat"><div class="report-stat-value">' + totalDays + '</div><div class="report-stat-label">记录天数</div></div>' +
        '<div class="report-stat"><div class="report-stat-value">' + counts.shiti + '</div><div class="report-stat-label">实体感录</div></div>' +
        '<div class="report-stat"><div class="report-stat-value">' + counts.xiushen + '</div><div class="report-stat-label">修身养性</div></div>' +
        '<div class="report-stat"><div class="report-stat-value">' + counts.study + '</div><div class="report-stat-label">学习</div></div>' +
        '<div class="report-stat"><div class="report-stat-value">' + counts.lingguang + '</div><div class="report-stat-label">灵感</div></div>' +
        '<div class="report-stat"><div class="report-stat-value">' + counts.zichan + '</div><div class="report-stat-label">理财</div></div>' +
        '</div></div>';

      if (avgSleep != null) {
        html += '<div class="report-section"><div class="report-section-title">🌙 睡眠质量 ' + avgSleep + '分</div>';
        html += '<div class="report-row"><div class="report-row-name">平均</div><div class="report-row-bar"><div class="report-row-fill" style="width:' + avgSleep + '%"></div></div><div class="report-row-value">' + avgSleep + '</div></div></div>';
      }

      if (studyMins) {
        html += '<div class="report-section"><div class="report-section-title">📚 学习时长 ' + studyMins + '分钟</div>';
        html += '<div class="report-row"><div class="report-row-name">累计</div><div class="report-row-bar"><div class="report-row-fill" style="width:' + Math.min(100, Math.round(studyMins / 10)) + '%"></div></div><div class="report-row-value">' + studyMins + '分</div></div></div>';
      }

      if (exp || inc) {
        html += '<div class="report-section"><div class="report-section-title">💰 收支 ¥' + Math.round(inc - exp).toLocaleString() + '</div>';
        html += '<div class="report-row"><div class="report-row-name">支出</div><div class="report-row-bar"><div class="report-row-fill" style="width:' + Math.min(100, (exp / Math.max(exp, inc) * 100 || 0)) + '%; background:linear-gradient(90deg,#ff8fa3,#c44569)"></div></div><div class="report-row-value">¥' + Math.round(exp).toLocaleString() + '</div></div>';
        html += '<div class="report-row"><div class="report-row-name">收入</div><div class="report-row-bar"><div class="report-row-fill" style="width:' + Math.min(100, (inc / Math.max(exp, inc) * 100 || 0)) + '%; background:linear-gradient(90deg,#7fdcb3,#1d9e75)"></div></div><div class="report-row-value">¥' + Math.round(inc).toLocaleString() + '</div></div></div>';
      }

      if (!recs.length) html = '<div class="report-empty">该时段暂无记录，开始记录后就能在这里看到分析啦</div>';
      body.innerHTML = html;
    }
    document.querySelectorAll('.report-tab').forEach(function (tab) {
      tab.addEventListener('click', function () { renderReport(tab.dataset.report); });
    });

    function updateSleepUI() {
      const sleepInput = document.getElementById('sleepTimeInput');
      const wakeInput = document.getElementById('wakeTimeInput');
      const range = document.getElementById('sleepQualityRange');
      const score = document.getElementById('sleepQualityScore');
      if (sleepInput) {
        const v = sleepInput.value;
        const disp = document.getElementById('sleepTimeValue');
        if (disp) disp.textContent = v || '--:--';
      }
      if (wakeInput) {
        const v = wakeInput.value;
        const disp = document.getElementById('wakeTimeValue');
        if (disp) disp.textContent = v || '--:--';
      }
      if (range && score) {
        const v = parseInt(range.value, 10) || 0;
        let label = '很差';
        if (v >= 20) label = '较差';
        if (v >= 40) label = '一般';
        if (v >= 60) label = '良好';
        if (v >= 80) label = '很好';
        score.textContent = v + '分 · ' + label;
      }
    }

    // ---- 查询 ----
    function isEnc(r) { return r && r.fields && r.fields._enc; }
    function recordsForModule(mod) {
      return Object.keys(store).map(function (k) { return store[k]; }).filter(function (r) { return r.module === mod; });
    }
    function recordsForDay(ds, mod) {
      return recordsForModule(mod).filter(function (r) { return r.date === ds && !isEnc(r); });
    }
    function loadRecord(ds, key) {
      const r = store[ds + '|' + key];
      if (!r || isEnc(r)) return {};
      return r.fields;
    }
    function hasRecord(ds) {
      return Object.keys(store).some(function (k) { const r = store[k]; return r.date === ds && r.fields && !isEnc(r) && Object.keys(r.fields).length; });
    }

    // ---- 表单读写 ----
    function readFields(el) {
      const rec = {};
      el.querySelectorAll('[data-save]').forEach(function (inp) {
        const label = inp.getAttribute('data-save');
        let val = '';
        if (inp.tagName === 'INPUT' || inp.tagName === 'TEXTAREA') val = inp.value.trim();
        else if (inp.classList.contains('tag-group')) val = Array.prototype.map.call(inp.querySelectorAll('.tag.active'), function (t) { return t.textContent; }).join('、');
        else if (inp.classList.contains('choice-row')) { const c = inp.querySelector('.choice.active'); val = c ? (c.getAttribute('data-value') || c.textContent) : ''; }
        else if (inp.classList.contains('pick-grid')) { const p = inp.querySelector('.pick-item.active'); val = p ? p.querySelector('.pick-label').textContent : ''; }
        if (val) rec[label] = val;
      });
      return rec;
    }
    function clearForm(el) {
      el.querySelectorAll('[data-save]').forEach(function (inp) {
        if (inp.tagName === 'INPUT' || inp.tagName === 'TEXTAREA') {
          if (inp.type === 'range') inp.value = inp.getAttribute('value') || '60';
          else inp.value = '';
        }
        else if (inp.classList.contains('tag-group')) inp.querySelectorAll('.tag.active').forEach(function (t) { t.classList.remove('active'); });
        else if (inp.classList.contains('choice-row')) { inp.querySelectorAll('.choice').forEach(function (c) { c.classList.remove('active'); }); const f = inp.querySelector('.choice'); if (f) f.classList.add('active'); }
        else if (inp.classList.contains('pick-grid')) { inp.querySelectorAll('.pick-item').forEach(function (p) { p.classList.remove('active'); }); const f = inp.querySelector('.pick-item'); if (f) f.classList.add('active'); }
      });
      updateSleepUI();
    }
    function fillForm(el, fields) {
      el.querySelectorAll('[data-save]').forEach(function (inp) {
        const label = inp.getAttribute('data-save');
        const val = fields[label] || '';
        if (inp.tagName === 'INPUT' || inp.tagName === 'TEXTAREA') {
          if (inp.type === 'range' && !val) inp.value = '60';
          else inp.value = val;
        }
        else if (inp.classList.contains('tag-group')) { const set = val.split('、').filter(Boolean); inp.querySelectorAll('.tag').forEach(function (t) { t.classList.toggle('active', set.indexOf(t.textContent) >= 0); }); }
        else if (inp.classList.contains('choice-row')) inp.querySelectorAll('.choice').forEach(function (c) { c.classList.toggle('active', (c.getAttribute('data-value') || c.textContent) === val); });
        else if (inp.classList.contains('pick-grid')) inp.querySelectorAll('.pick-item').forEach(function (p) { p.classList.toggle('active', p.querySelector('.pick-label').textContent === val); });
      });
      updateSleepUI();
    }

    // ---- 日记类模块（实体感录 / 学习提升 / 致虚极）：每日一条，可编辑历史 ----
    const DAILY_MODS = ['shiti', 'study', 'xiushen'];
    let editingDate = null, editingId = null;
    const SAVE_LABELS = { shiti: '保存今日记录', study: '保存今日学习', xiushen: '保存今日记录' };
    function enterEdit(mod, id) {
      editingId = id;
      editingDate = (store[id] && store[id].date) ? store[id].date : id;
      switchModuleTab(mod, 'today');
      fillForm(document.getElementById(mod), (store[id] && store[id].fields) ? store[id].fields : {});
      const b = document.querySelector('[data-edit-banner="' + mod + '"]');
      if (b) { b.classList.remove('hidden'); b.querySelector('b').textContent = editingDate + ' · ' + lunarCn(editingDate).replace(/^.+?年/, ''); }
      const btn = document.querySelector('[data-save-btn="' + mod + '"]'); if (btn) btn.textContent = '更新 · ' + editingDate.slice(5);
      if (mod === 'xiushen') { renderYanghu(); renderYanghuHistory(); }
      if (mod === 'study') { renderTcm(); renderTcmHistory(); }
    }
    function exitEdit(mod) {
      editingId = null; editingDate = null;
      const el = document.getElementById(mod);
      const rec = loadRecord(ymd(new Date()), mod);
      if (Object.keys(rec).length) fillForm(el, rec); else clearForm(el);
      const b = document.querySelector('[data-edit-banner="' + mod + '"]'); if (b) b.classList.add('hidden');
      const btn = document.querySelector('[data-save-btn="' + mod + '"]'); if (btn) btn.textContent = SAVE_LABELS[mod] || '保存今日记录';
      if (mod === 'xiushen') { renderYanghu(); renderYanghuHistory(); }
      if (mod === 'study') { renderTcm(); renderTcmHistory(); }
    }
    function saveModule(key, opts) {
      opts = opts || {};
      const silent = !!opts.silent;
      const keepEdit = !!opts.keepEdit;
      const el = document.getElementById(key);
      if (!el) return;
      const fields = readFields(el);
      const ds = editingDate || ymd(new Date());
      let id;
      if (editingId) id = editingId;
      else id = ds + '|' + key;
      if (key === 'study' && store[id] && store[id].fields && store[id].fields['学习计时']) {
        fields['学习计时'] = store[id].fields['学习计时'];
      }
      store[id] = { id: id, date: ds, module: key, fields: fields, updatedAt: Date.now() };
      const wasEditing = !!editingId;
      dbPut(store[id]).then(function () {
        if (wasEditing && !keepEdit) exitEdit(key);
        renderHistory(key); renderCal(); renderDetail(ds);
        if (key === 'study') { renderStudyMonth(); renderStudyTimeCard(); }
        renderStreakBadges(); renderGoalProgress();
        if (!silent) showToast(wasEditing ? ('已更新 ' + ds + ' 的记录') : (key === 'shiti' ? '已保存今日实体感录' : ('已保存今日「' + key + '」记录')));
      });
    }
    // ---- 改动即自动保存（输入 / 选择 / 滑杆） ----
    const AUTOSAVE_MODS = ['shiti', 'study', 'xiushen'];
    const autoSaveTimers = {};
    function scheduleAutoSave(mod) {
      clearTimeout(autoSaveTimers[mod]);
      autoSaveTimers[mod] = setTimeout(function () { saveModule(mod, { silent: true, keepEdit: true }); }, 550);
    }
    function setupAutoSave() {
      AUTOSAVE_MODS.forEach(function (mod) {
        const el = document.getElementById(mod);
        if (!el) return;
        const panel = el.querySelector('.today-panel');
        if (!panel) return;
        panel.querySelectorAll('[data-save]').forEach(function (inp) {
          let evt;
          if (inp.tagName === 'TEXTAREA') evt = 'input';
          else if (inp.type === 'range') evt = 'change';
          else if (inp.classList.contains('choice-row') || inp.classList.contains('tag-group') || inp.classList.contains('pick-grid')) evt = 'click';
          else evt = 'change';
          inp.addEventListener(evt, function () { scheduleAutoSave(mod); });
        });
      });
    }
    function renderHistory(mod) {
      const c = document.querySelector('[data-history="' + mod + '"]');
      if (!c) return;
      const recs = recordsForModule(mod).filter(function (r) { return !isEnc(r); }).sort(function (a, b) { return b.date < a.date ? -1 : (b.date > a.date ? 1 : b.updatedAt - a.updatedAt); });
      if (!recs.length) { c.innerHTML = '<div class="history-empty">还没有记录</div>'; return; }
      c.innerHTML = recs.map(function (r) {
        const sum = Object.keys(r.fields).map(function (k) { return k + '：' + r.fields[k]; }).join(' · ') || '（空）';
        const lm = lunarCn(r.date).replace(/^.+?年/, '');
        return '<div class="history-item"><div class="hi-main"><div class="hi-date">' + r.date.slice(5) + ' · ' + lm + '</div><div class="hi-sum">' + escapeHtml(sum) + '</div></div><div class="hi-actions"><span class="hi-edit" data-edit-id="' + r.id + '" data-edit-mod="' + mod + '">编辑</span><span class="hi-del" data-del="' + r.id + '">×</span></div></div>';
      }).join('');
    }

    // ---- 灵光闪现：多条记录 + 标签筛选 + 搜索 ----
    let inspFilterTag = '全部';
    let inspSearch = '';
    const INSP_TAGS = ['全部', '创作', '工作', '生活', '人际关系', '健康', '学习'];
    function renderInspirationList() {
      const fb = document.getElementById('inspFilter');
      if (fb) fb.innerHTML = INSP_TAGS.map(function (t) { return '<span class="filter-chip' + (t === inspFilterTag ? ' active' : '') + '" data-ftag="' + t + '">' + t + '</span>'; }).join('');
      const c = document.getElementById('inspList');
      if (!c) return;
      let recs = recordsForModule('lingguang').sort(function (a, b) { return b.updatedAt - a.updatedAt; });
      if (inspFilterTag !== '全部') recs = recs.filter(function (r) { return (r.fields['灵感标签'] || '').indexOf(inspFilterTag) >= 0; });
      if (inspSearch) { const q = inspSearch.toLowerCase(); recs = recs.filter(function (r) { return (r.fields['灵感内容'] || '').toLowerCase().indexOf(q) >= 0; }); }
      if (!recs.length) { c.innerHTML = '<div class="history-empty">还没有灵感，记下第一条吧</div>'; return; }
      c.innerHTML = recs.map(function (r) {
        const tags = (r.fields['灵感标签'] || '').split('、').filter(Boolean).map(function (t) { return '<span class="insp-tag">' + escapeHtml(t) + '</span>'; }).join('');
        const lm = lunarCn(r.date).replace(/^.+?年/, '');
        return '<div class="insp-item"><div class="insp-tags">' + tags + '</div><div class="insp-content">' + escapeHtml(r.fields['灵感内容'] || '') + '</div><div class="insp-foot"><span>' + r.date.slice(5) + ' · ' + lm + '</span><span class="hi-del" data-del="' + r.id + '">删除</span></div></div>';
      }).join('');
    }
    function addInspiration() {
      const el = document.getElementById('lingguang');
      if (!el) return;
      const fields = readFields(el);
      if (!fields['灵感内容']) { showToast('先写点什么吧'); return; }
      const ds = ymd(new Date());
      const id = 'lingguang|' + ds + '|' + Date.now();
      store[id] = { id: id, date: ds, module: 'lingguang', fields: fields, updatedAt: Date.now() };
      dbPut(store[id]).then(function () { clearForm(el); renderInspirationList(); renderCal(); renderDetail(ds); renderStreakBadges(); renderGoalProgress(); showToast('灵感已记录'); });
    }

    // ---- 理财：交易流水 + 概览（日/周/月/年）+ 分类图表 ----
    let financePeriod = 'month';
    let txHistPeriod = 'all';
    const FINANCE_PERIODS = {
      day: { label: '今日', dayKey: function () { return ymd(new Date()); } },
      week: { label: '本周', dayKey: function () { const d = new Date(); d.setDate(d.getDate() - 6); return ymd(d); } },
      month: { label: '本月', dayKey: function () { return ymd(new Date()).slice(0, 7) + '-01'; } },
      year: { label: '本年', dayKey: function () { return ymd(new Date()).slice(0, 4) + '-01-01'; } }
    };
    function inPeriod(dateStr, period) {
      const cfg = FINANCE_PERIODS[period];
      if (!cfg) return true;
      const startStr = cfg.dayKey();
      if (period === 'day') return dateStr === startStr;
      if (period === 'month') return dateStr.indexOf(ymd(new Date()).slice(0, 7)) === 0;
      if (period === 'year') return dateStr.indexOf(ymd(new Date()).slice(0, 4)) === 0;
      return dateStr >= startStr;
    }
    function renderAssetSummary(period) {
      if (period) financePeriod = period;
      document.querySelectorAll('[data-finance]').forEach(function (t) { t.classList.toggle('active', t.dataset.finance === financePeriod); });
      const cfg = FINANCE_PERIODS[financePeriod] || FINANCE_PERIODS.month;
      const labelEl = document.getElementById('catChartLabel');
      if (labelEl) labelEl.textContent = cfg.label + '支出分类占比';
      const recs = recordsForModule('zichan').filter(function (r) { return !isEnc(r); });
      let exp = 0, inc = 0; const cats = {};
      recs.forEach(function (r) {
        const amt = parseFloat(r.fields['金额']) || 0;
        const t = r.fields['交易类型'] || '支出';
        if (inPeriod(r.date, financePeriod)) {
          if (t === '收入') inc += amt;
          else { exp += amt; const c = r.fields['分类'] || '其他'; cats[c] = (cats[c] || 0) + amt; }
        }
      });
      setText('expThisMonth', '¥' + Math.round(exp).toLocaleString());
      setText('incThisMonth', '¥' + Math.round(inc).toLocaleString());
      setText('balThisMonth', '¥' + Math.round(inc - exp).toLocaleString());
      const chart = document.getElementById('catChart');
      if (chart) {
        const entries = Object.keys(cats).map(function (k) { return [k, cats[k]]; }).sort(function (a, b) { return b[1] - a[1]; });
        if (!entries.length) { chart.innerHTML = '<div class="history-empty">' + cfg.label + '暂无支出</div>'; }
        else {
          const max = entries[0][1] || 1;
          chart.innerHTML = entries.map(function (e) {
            const w = Math.round(e[1] / max * 100);
            return '<div style="display:flex; align-items:center; gap:8px; margin:7px 0; font-size:12px;">'
              + '<div style="width:44px; color:var(--text-sub); flex:none;">' + e[0] + '</div>'
              + '<div style="flex:1; height:10px; background:rgba(var(--accent-rgb),0.12); border-radius:999px; overflow:hidden;"><div style="height:100%; width:' + w + '%; background:linear-gradient(90deg,var(--purple-main),var(--purple-deep)); border-radius:999px;"></div></div>'
              + '<div style="width:64px; text-align:right; color:var(--text-main); flex:none;">¥' + Math.round(e[1]).toLocaleString() + '</div></div>';
          }).join('');
        }
      }
    }
    document.querySelectorAll('[data-finance]').forEach(function (t) {
      t.addEventListener('click', function () { renderAssetSummary(t.dataset.finance); });
    });
    function renderTodayTx() {
      const c = document.getElementById('todayTxList');
      if (!c) return;
      const ds = ymd(new Date());
      const recs = recordsForModule('zichan').filter(function (r) { return !isEnc(r) && r.date === ds; }).sort(function (a, b) { return b.updatedAt - a.updatedAt; });
      if (!recs.length) { c.innerHTML = '<div class="history-empty">今日暂无交易</div>'; return; }
      let exp = 0, inc = 0;
      recs.forEach(function (r) {
        const amt = parseFloat(r.fields['金额']) || 0;
        if ((r.fields['交易类型'] || '支出') === '收入') inc += amt; else exp += amt;
      });
      const sum = '<div style="display:flex; gap:14px; margin-bottom:10px; font-size:12px; padding:4px 0;"><span style="color:#c44569;">支出 ¥' + Math.round(exp).toLocaleString() + '</span><span style="color:#1d9e75;">收入 ¥' + Math.round(inc).toLocaleString() + '</span><span style="color:var(--text-main); font-weight:600;">结余 ¥' + Math.round(inc - exp).toLocaleString() + '</span></div>';
      c.innerHTML = sum + recs.map(function (r) { return txItemHtml(r, true); }).join('');
    }
    const TX_CATS = ['餐饮', '交通', '购物', '居住', '医疗', '娱乐', '其他', '车'];
    function txItemHtml(r, editable) {
      const amt = parseFloat(r.fields['金额']) || 0;
      const t = r.fields['交易类型'] || '支出';
      const note = r.fields['备注'] || '';
      const cat = r.fields['分类'] || '';
      const sign = (t === '收入') ? '+' : '-';
      const color = (t === '收入') ? '#1d9e75' : 'var(--text-sub)';
      const badge = cat || '未分类';
      const catChips = TX_CATS.map(function (ct) { return '<span class="tx-cat-chip' + (ct === cat ? ' active' : '') + '">' + ct + '</span>'; }).join('');
      const editBtn = editable ? '<span class="tx-edit">编辑</span>' : '';
      const sub = '<div class="tx-sub">' + t + (editable ? '' : ' · ' + r.date) + '</div>';
      const editor = editable
        ? '<div class="tx-editor hidden"><div class="tx-editor-cats">' + catChips + '</div><div class="tx-editor-amt-row"><span class="tx-editor-label">金额（元）</span><input class="field-input tx-editor-amt" type="number" value="' + amt + '"></div><div class="tx-edit-actions"><button class="ghost-btn" data-tx-save="' + r.id + '">保存</button><button class="ghost-btn" data-tx-cancel>取消</button></div></div>'
        : '';
      return '<div class="tx-item' + (editable ? ' tx-editable' : '') + '" data-tx-id="' + r.id + '">'
        + '<div class="tx-row"><span class="tx-badge">' + escapeHtml(badge) + '</span>'
        + '<span class="tx-note">' + escapeHtml(note) + '</span>'
        + '<span class="tx-amt" style="color:' + color + '">' + sign + ' ¥' + Math.round(amt).toLocaleString() + '</span>' + editBtn + '<span class="hi-del" data-del="' + r.id + '">×</span></div>'
        + sub
        + editor
        + '</div>';
    }
    function renderTransactions(period) {
      if (period) txHistPeriod = period;
      document.querySelectorAll('[data-tx-filter]').forEach(function (t) { t.classList.toggle('active', t.dataset.txFilter === txHistPeriod); });
      const c = document.getElementById('txList');
      if (!c) return;
      let recs = recordsForModule('zichan').filter(function (r) { return !isEnc(r); }).sort(function (a, b) { return b.updatedAt - a.updatedAt; });
      if (txHistPeriod !== 'all') recs = recs.filter(function (r) { return inPeriod(r.date, txHistPeriod); });
      if (!recs.length) {
        const lbl = txHistPeriod === 'all' ? '' : (FINANCE_PERIODS[txHistPeriod] ? FINANCE_PERIODS[txHistPeriod].label : '');
        c.innerHTML = '<div class="history-empty">' + (lbl ? lbl : '') + '暂无交易记录</div>'; return;
      }
      c.innerHTML = recs.map(function (r) { return txItemHtml(r, false); }).join('');
    }
    function saveTxEdit(id) {
      const item = document.querySelector('.tx-item[data-tx-id="' + id + '"]');
      if (!item) return;
      const activeCat = item.querySelector('.tx-cat-chip.active');
      const cat = activeCat ? activeCat.textContent.trim() : '';
      const amt = item.querySelector('.tx-editor-amt').value;
      const rec = store[id];
      if (!rec) return;
      if (cat) rec.fields['分类'] = cat;
      if (amt !== '') rec.fields['金额'] = amt;
      rec.updatedAt = Date.now();
      dbPut(rec).then(function () {
        renderTransactions(); renderTodayTx(); renderAssetSummary(); renderCal(); renderDetail(ymd(new Date())); renderStreakBadges(); renderGoalProgress();
        showToast('已更新');
      });
    }
    document.querySelectorAll('[data-tx-filter]').forEach(function (t) {
      t.addEventListener('click', function () { renderTransactions(t.dataset.txFilter); });
    });
    function addTransaction() {
      const el = document.getElementById('zichan');
      if (!el) return;
      const fields = readFields(el);
      if (!fields['金额']) { showToast('请输入金额'); return; }
      const ds = ymd(new Date());
      const id = 'zichan|' + ds + '|' + Date.now();
      store[id] = { id: id, date: ds, module: 'zichan', fields: fields, updatedAt: Date.now() };
      dbPut(store[id]).then(function () { clearForm(el); renderTransactions(); renderTodayTx(); renderAssetSummary(); renderCal(); renderDetail(ds); renderStreakBadges(); renderGoalProgress(); showToast('交易已记录'); });
    }

    // ---- 学习：专注计时 + 本月累计 ----
    let studyTimerInt = null, studyStartTs = 0, studyElapsed = 0;
    function fmtStudy(ms) { const s = Math.floor(ms / 1000); const m = Math.floor(s / 60), sec = s % 60; return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0'); }
    function studyMinsOf(f) {
      if (!f) return 0;
      let m = 0;
      if (f['学习计时']) m += parseInt((String(f['学习计时']).match(/\d+/) || [0])[0], 10) || 0;
      if (f['自主时长']) m += parseInt((String(f['自主时长']).match(/\d+/) || [0])[0], 10) || 0;
      if (f['学习时长']) {
        const s = String(f['学习时长']);
        if (s.indexOf('小时') >= 0) m += Math.round(parseFloat(s) * 60);
        else m += parseInt((s.match(/\d+/) || [0])[0], 10) || 0;
      }
      return m;
    }
    const studyTimerEl = document.getElementById('studyTimer');
    const studyStartBtn = document.getElementById('studyStart');
    const studyStopBtn = document.getElementById('studyStop');
    const studyLogBtn = document.getElementById('studyLog');
    if (studyStartBtn) studyStartBtn.addEventListener('click', function () {
      studyStartTs = Date.now(); studyElapsed = 0;
      if (studyTimerEl) studyTimerEl.textContent = '00:00';
      studyStartBtn.style.display = 'none'; studyStopBtn.style.display = ''; studyLogBtn.style.display = 'none';
      studyTimerInt = setInterval(function () { studyElapsed = Date.now() - studyStartTs; if (studyTimerEl) studyTimerEl.textContent = fmtStudy(studyElapsed); }, 1000);
    });
    if (studyStopBtn) studyStopBtn.addEventListener('click', function () {
      clearInterval(studyTimerInt);
      if (studyTimerEl) studyTimerEl.textContent = fmtStudy(studyElapsed);
      studyStopBtn.style.display = 'none'; studyLogBtn.style.display = ''; studyStartBtn.style.display = 'none';
    });
    if (studyLogBtn) studyLogBtn.addEventListener('click', function () {
      const mins = Math.round(studyElapsed / 60000);
      if (mins < 1) { showToast('至少 1 分钟才能计入'); return; }
      const ds = ymd(new Date());
      const baseId = ds + '|study';
      const rec = store[baseId] || { id: baseId, date: ds, module: 'study', fields: {}, updatedAt: Date.now() };
      const prev = parseInt((rec.fields['学习计时'] || '0').match(/\d+/) || [0], 10);
      rec.fields['学习计时'] = (prev + mins) + ' 分钟';
      rec.updatedAt = Date.now();
      store[baseId] = rec;
      dbPut(rec).then(function () {
        renderHistory('study'); renderStudyMonth(); renderStudyTimeCard(); renderCal(); renderDetail(ds); renderStreakBadges(); renderGoalProgress();
        studyElapsed = 0; if (studyTimerEl) studyTimerEl.textContent = '00:00';
        studyLogBtn.style.display = 'none'; studyStartBtn.style.display = '';
        showToast('已计入今日 ' + mins + ' 分钟');
      });
    });
    function renderStudyMonth() {
      const ym = ymd(new Date()).slice(0, 7);
      let total = 0;
      recordsForModule('study').filter(function (r) { return !isEnc(r) && r.date.indexOf(ym) === 0; }).forEach(function (r) {
        const f = r.fields;
        total += studyMinsOf(f);
      });
      setText('studyMonthTotal', total + ' 分钟');
    }
    function renderStudyTimeCard() {
      const ds = ymd(new Date());
      const rec = store[ds + '|study'];
      const f = rec ? rec.fields : {};
      const focusMins = f['学习计时'] ? (parseInt((String(f['学习计时']).match(/\d+/) || [0])[0], 10) || 0) : 0;
      const selfMins = f['自主时长'] ? (parseInt((String(f['自主时长']).match(/\d+/) || [0])[0], 10) || 0) : 0;
      const focusEl = document.getElementById('studyFocusTotal');
      if (focusEl) focusEl.textContent = focusMins + ' 分钟';
      setSelfMins(selfMins);
    }
    function setSelfMins(v) {
      v = Math.max(0, Math.min(600, Math.round(v / 5) * 5));
      const inp = document.getElementById('selfStudyInput');
      if (inp) inp.value = v;
      const vEl = document.getElementById('selfStudyVal');
      if (vEl) vEl.textContent = v + ' 分钟';
      const slider = document.getElementById('selfStudySlider');
      if (slider) slider.value = v;
      const wrap = document.getElementById('selfStudyPresets');
      if (wrap) wrap.querySelectorAll('.preset-pill').forEach(function (x) { x.classList.toggle('active', parseInt(x.dataset.min, 10) === v); });
      const focusEl = document.getElementById('studyFocusTotal');
      let fm = 0;
      if (focusEl) { const m = (focusEl.textContent || '0').match(/\d+/); fm = m ? parseInt(m[0], 10) : 0; }
      const totalEl = document.getElementById('studyDayTotal');
      if (totalEl) totalEl.textContent = (fm + v) + ' 分钟';
    }
    const selfPresets = document.getElementById('selfStudyPresets');
    if (selfPresets) selfPresets.querySelectorAll('.preset-pill').forEach(function (p) {
      p.addEventListener('click', function () { setSelfMins(parseInt(p.dataset.min, 10) || 0); });
    });
    const selfSlider = document.getElementById('selfStudySlider');
    if (selfSlider) selfSlider.addEventListener('input', function () { setSelfMins(parseInt(selfSlider.value, 10) || 0); });
    const selfMinus = document.getElementById('selfMinus');
    if (selfMinus) selfMinus.addEventListener('click', function () { const inp = document.getElementById('selfStudyInput'); setSelfMins((parseInt(inp ? inp.value : 0, 10) || 0) - 5); });
    const selfPlus = document.getElementById('selfPlus');
    if (selfPlus) selfPlus.addEventListener('click', function () { const inp = document.getElementById('selfStudyInput'); setSelfMins((parseInt(inp ? inp.value : 0, 10) || 0) + 5); });

    // ---- 保存按钮分发 ----
    document.querySelectorAll('[data-save-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-save-btn');
        if (key === 'lingguang') addInspiration();
        else if (key === 'zichan') addTransaction();
        else saveModule(key);
      });
    });

    // ---- 日记类模块：改动即自动保存 ----
    setupAutoSave();

    // ---- 全局点击委托：删除 / 编辑 / 退出编辑 / 标签筛选 ----
    document.addEventListener('click', function (e) {
      const del = e.target.closest('[data-del]');
      if (del) {
        const id = del.getAttribute('data-del');
        const mod = id.split('|')[0];
        const rec = store[id];
        delete store[id];
        dbDelete(id).then(function () {
          if (mod === 'lingguang') renderInspirationList();
          else if (mod === 'zichan') { renderTransactions(); renderTodayTx(); renderAssetSummary(); }
          else renderHistory(mod);
          renderCal(); renderDetail(ymd(new Date())); renderStreakBadges(); renderGoalProgress();
        });
        if (rec) showUndoToast('已删除', function () {
          store[id] = rec;
          dbPut(rec).then(function () {
            if (mod === 'lingguang') renderInspirationList();
            else if (mod === 'zichan') { renderTransactions(); renderTodayTx(); renderAssetSummary(); }
            else renderHistory(mod);
            renderCal(); renderDetail(ymd(new Date())); renderStreakBadges(); renderGoalProgress();
            showToast('已恢复');
          });
        });
        return;
      }
      const ed = e.target.closest('[data-edit-id]');
      if (ed) { enterEdit(ed.getAttribute('data-edit-mod') || ed.getAttribute('data-edit-id').split('|')[0], ed.getAttribute('data-edit-id')); return; }
      const ex = e.target.closest('.exit-edit');
      if (ex) { const b = ex.closest('[data-edit-banner]'); if (b) exitEdit(b.getAttribute('data-edit-banner')); return; }
      const ft = e.target.closest('[data-ftag]');
      if (ft) { inspFilterTag = ft.getAttribute('data-ftag'); renderInspirationList(); return; }
      const txChip = e.target.closest('.tx-cat-chip');
      if (txChip) {
        const box = txChip.closest('.tx-editor-cats');
        if (box) box.querySelectorAll('.tx-cat-chip').forEach(function (c) { c.classList.toggle('active', c === txChip); });
        return;
      }
      const txEdit = e.target.closest('.tx-edit');
      if (txEdit) { const item = txEdit.closest('.tx-item'); const v = item.querySelector('.tx-row'); if (v) v.classList.add('hidden'); const ed = item.querySelector('.tx-editor'); if (ed) ed.classList.remove('hidden'); return; }
      const txSave = e.target.closest('[data-tx-save]');
      if (txSave) { saveTxEdit(txSave.getAttribute('data-tx-save')); return; }
      const txCancel = e.target.closest('[data-tx-cancel]');
      if (txCancel) { renderTransactions(); renderTodayTx(); renderAssetSummary(); return; }
    });
    const inspSearchEl = document.getElementById('inspSearch');
    if (inspSearchEl) inspSearchEl.addEventListener('input', function () { inspSearch = inspSearchEl.value; renderInspirationList(); });

    // 经文标签切换
    document.addEventListener('click', function (e) {
      const j = e.target.closest('[data-jing]');
      if (j) {
        currentJing = j.getAttribute('data-jing');
        document.querySelectorAll('[data-jing]').forEach(function (el) { el.classList.toggle('active', el.getAttribute('data-jing') === currentJing); });
        renderJingwen(currentJing, new Date().getDate() - 1);
      }
    });

    // 旧 localStorage 数据迁移到 IndexedDB
    function migrateFromLocalStorage() {
      const prefix = 'zqdd:';
      const out = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf(prefix) === 0) {
          const parts = k.slice(prefix.length).split(':');
          if (parts.length === 2) {
            const ds = parts[0], module = parts[1];
            let fields = {};
            try { fields = JSON.parse(localStorage.getItem(k) || '{}'); } catch (e) {}
            out.push({ id: ds + '|' + module, date: ds, module: module, fields: fields, updatedAt: Date.now() });
            localStorage.removeItem(k);
          }
        }
      }
      return Promise.all(out.map(dbPut));
    }

    // ============ 导出 / 导入 备份（本地加密 + 应用内轮转） ============
    const BACKUP_PASS_KEY = 'zqdd:backupPass';
    const BACKUP_MAX = 1;
    const BAK_SALT = 'zqdd-backup-v1';
    function getBackupPass() {
      try { return (localStorage.getItem(BACKUP_PASS_KEY) || '').trim(); } catch (e) { return ''; }
    }
    async function backupEncrypt(records, pass) {
      const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: new TextEncoder().encode(BAK_SALT), iterations: 600000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, new TextEncoder().encode(JSON.stringify({ records: records })));
      return { app: '我的工作台', version: 2, encrypted: true, exportedAt: Date.now(), iv: buf2b64(iv), ct: buf2b64(ct) };
    }
    async function backupDecrypt(obj, pass) {
      const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: new TextEncoder().encode(BAK_SALT), iterations: 600000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
      const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b642buf(obj.iv) }, key, b642buf(obj.ct));
      return JSON.parse(new TextDecoder().decode(pt)).records;
    }
    function backupStorePut(entry) {
      return new Promise(function (res, rej) {
        const tx = _db.transaction(BAK_STORE, 'readwrite');
        tx.objectStore(BAK_STORE).put(entry);
        tx.oncomplete = function () { res(); };
        tx.onerror = function () { rej(tx.error); };
      });
    }
    function backupStoreAll() {
      return new Promise(function (res, rej) {
        const tx = _db.transaction(BAK_STORE, 'readonly');
        const r = tx.objectStore(BAK_STORE).getAll();
        r.onsuccess = function () { res(r.result || []); };
        r.onerror = function () { rej(r.error); };
      });
    }
    function backupStoreDelete(ts) {
      return new Promise(function (res, rej) {
        const tx = _db.transaction(BAK_STORE, 'readwrite');
        tx.objectStore(BAK_STORE).delete(ts);
        tx.oncomplete = function () { res(); };
        tx.onerror = function () { rej(tx.error); };
      });
    }
    async function exportData() {
      const arr = await dbGetAll();
      const pass = getBackupPass();
      const ts = Date.now();
      const d = new Date(ts);
      const pad = function (n) { return (n < 10 ? '0' : '') + n; };
      const name = '我的工作台-备份-' + ymd(d) + '-' + pad(d.getHours()) + pad(d.getMinutes()) + '.json';
      let fileObj, encrypted = false;
      if (pass) { fileObj = await backupEncrypt(arr, pass); encrypted = true; }
      else { fileObj = { app: '我的工作台', version: 2, encrypted: false, exportedAt: ts, records: arr }; }
      const storeData = JSON.stringify(fileObj);
      // 尝试直接下载（iOS Safari 在 await 后可能拦截，可用下方列表的「下载」按钮兜底）
      try {
        const blob = new Blob([storeData], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = name;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      } catch (e) {}
      // 写入应用内轮转存储（保留最近 1 份）
      try {
        await backupStorePut({ ts: ts, name: name, encrypted: encrypted, count: arr.length, data: storeData });
        const all = await backupStoreAll();
        if (all.length > BACKUP_MAX) {
          all.sort(function (x, y) { return x.ts - y.ts; });
          await Promise.all(all.slice(0, all.length - BACKUP_MAX).map(function (e) { return backupStoreDelete(e.ts); }));
        }
      } catch (e) {}
      try { localStorage.setItem('zqdd:lastBackup', String(ts)); } catch (e) {}
      const br = document.getElementById('backupReminder'); if (br) br.classList.add('hidden');
      renderBackupList();
      showToast((encrypted ? '已加密备份 ' : '已备份(未加密) ') + arr.length + ' 条，应用内保留最近 ' + BACKUP_MAX + ' 份');
    }
    // 备份提醒：超过 7 天未备份则在首页弹横幅
    function checkBackupReminder() {
      var BR_DAYS = 7;
      var last = 0;
      try { last = parseInt(localStorage.getItem('zqdd:lastBackup') || '0', 10) || 0; } catch (e) {}
      var br = document.getElementById('backupReminder');
      if (!br) return;
      var overdue = !last || (Date.now() - last) > BR_DAYS * 86400000;
      br.classList.toggle('hidden', !overdue);
    }
    function clearAllDB() {
      return new Promise(function (res) {
        const tx = _db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).clear();
        tx.oncomplete = function () { res(); };
      });
    }
    function importData(file) {
      const reader = new FileReader();
      reader.onload = function () {
        try {
          const data = JSON.parse(reader.result);
          if (data.encrypted) {
            const pass = window.prompt('此备份已加密，请输入备份密码以解密：');
            if (pass == null) return;
            backupDecrypt(data, pass).then(function (dec) { applyImport(dec); })
              .catch(function () { showToast('解密失败：密码错误或文件损坏'); });
            return;
          }
          const recs = data.records || [];
          if (!recs.length) { showToast('备份里没有记录'); return; }
          applyImport(recs);
        } catch (e) {
          showToast('导入失败：文件格式不正确');
        }
      };
      reader.readAsText(file);
    }
    function applyImport(recs) {
      if (!recs || !recs.length) { showToast('备份里没有记录'); return; }
      const cover = window.confirm('导入方式：\n\n确定 = 覆盖全部现有数据（会清空当前记录，谨慎）\n取消 = 仅合并新记录（按 ID 去重，保留现有）');
      const task = cover
        ? clearAllDB().then(function () { return Promise.all(recs.map(dbPut)); })
        : Promise.all(recs.map(dbPut));
      task.then(dbGetAll).then(function (all) {
        Object.keys(store).forEach(function (k) { delete store[k]; });
        all.forEach(function (r) { if (r && r.id) store[r.id] = r; });
        renderCal(); renderDetail(todayStr); renderHomeSummary(); renderReport('week'); renderTrend(7); renderReview('week'); renderStreakBadges(); renderGoalProgress();
        renderInspirationList(); renderTransactions(); renderTodayTx(); renderAssetSummary();
        DAILY_MODS.forEach(renderHistory); renderTodo(); renderStudyMonth();
        renderBackupList();
        showToast((cover ? '已覆盖导入 ' : '已合并导入 ') + recs.length + ' 条记录');
      });
    }
    function fmtTs(ts) {
      const d = new Date(ts); const pad = function (n) { return (n < 10 ? '0' : '') + n; };
      return ymd(d) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }
    function renderBackupList() {
      const box = document.getElementById('backupList'); if (!box) return;
      backupStoreAll().then(function (all) {
        all.sort(function (x, y) { return y.ts - x.ts; });
        if (!all.length) { box.innerHTML = '<div class="backup-empty">暂无应用内备份</div>'; return; }
        box.innerHTML = '<div class="backup-sub">应用内备份（最近 ' + BACKUP_MAX + ' 份，加密存于本机）</div>' + all.map(function (e) {
          return '<div class="backup-row" data-ts="' + e.ts + '">' +
            '<div class="backup-meta"><div class="backup-name">' + e.name + '</div>' +
            '<div class="backup-info">' + fmtTs(e.ts) + ' · ' + e.count + ' 条' + (e.encrypted ? ' · 已加密' : ' · 明文') + '</div></div>' +
            '<div class="backup-row-btns">' +
            '<button class="ghost-btn sm" data-bk="download" data-ts="' + e.ts + '">下载</button>' +
            '<button class="ghost-btn sm" data-bk="restore" data-ts="' + e.ts + '">恢复</button>' +
            '<button class="ghost-btn sm danger" data-bk="delete" data-ts="' + e.ts + '">删除</button>' +
            '</div></div>';
        }).join('');
      });
    }
    function trimBackups() {
      return backupStoreAll().then(function (all) {
        if (all.length > BACKUP_MAX) {
          all.sort(function (x, y) { return x.ts - y.ts; });
          return Promise.all(all.slice(0, all.length - BACKUP_MAX).map(function (e) { return backupStoreDelete(e.ts); }));
        }
      });
    }
    function getBackupEntry(ts) {
      return backupStoreAll().then(function (all) { return all.filter(function (e) { return String(e.ts) === String(ts); })[0] || null; });
    }
    function downloadBackupEntry(e) {
      const blob = new Blob([e.data], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = e.name;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
    async function restoreBackup(ts) {
      const e = await getBackupEntry(ts); if (!e) return;
      let recs;
      if (e.encrypted) {
        let pass = getBackupPass();
        if (!pass) { pass = window.prompt('该备份已加密，请输入备份密码以恢复：'); if (pass == null) return; }
        try { recs = await backupDecrypt(JSON.parse(e.data), pass); }
        catch (err) { showToast('解密失败：密码错误'); return; }
      } else {
        recs = (JSON.parse(e.data).records) || [];
      }
      if (!window.confirm('将用该备份[' + e.name + ']覆盖当前全部数据？')) return;
      await clearAllDB();
      await Promise.all(recs.map(dbPut));
      const all = await dbGetAll();
      Object.keys(store).forEach(function (k) { delete store[k]; });
      all.forEach(function (r) { if (r && r.id) store[r.id] = r; });
      renderCal(); renderDetail(todayStr); renderHomeSummary(); renderReport('week'); renderTrend(7); renderReview('week'); renderStreakBadges(); renderGoalProgress();
      renderInspirationList(); renderTransactions(); renderTodayTx(); renderAssetSummary();
      DAILY_MODS.forEach(renderHistory); renderTodo(); renderStudyMonth();
      showToast('已恢复到 ' + e.name);
    }
    function deleteBackup(ts) {
      backupStoreDelete(Number(ts)).then(renderBackupList);
    }
    const btnExport = document.getElementById('btnExport');
    const btnImport = document.getElementById('btnImport');
    const fileImport = document.getElementById('fileImport');
    if (btnExport) btnExport.addEventListener('click', exportData);
    var btnBackupNow = document.getElementById('btnBackupNow');
    if (btnBackupNow) btnBackupNow.addEventListener('click', exportData);
    var btnBackupLater = document.getElementById('btnBackupLater');
    if (btnBackupLater) btnBackupLater.addEventListener('click', function () {
      var br = document.getElementById('backupReminder'); if (br) br.classList.add('hidden');
    });
    if (btnImport) btnImport.addEventListener('click', function () { if (fileImport) fileImport.click(); });
    var backupPassInput = document.getElementById('backupPass');
    if (backupPassInput) {
      backupPassInput.value = getBackupPass();
      backupPassInput.addEventListener('change', function () {
        try { localStorage.setItem(BACKUP_PASS_KEY, backupPassInput.value.trim()); } catch (e) {}
        showToast(backupPassInput.value.trim() ? '备份密码已保存，导出将自动加密' : '已清除备份密码，导出将为明文');
      });
    }
    var backupListBox = document.getElementById('backupList');
    if (backupListBox) {
      backupListBox.addEventListener('click', function (ev) {
        var btn = ev.target.closest('[data-bk]'); if (!btn) return;
        var ts = btn.getAttribute('data-ts');
        var kind = btn.getAttribute('data-bk');
        if (kind === 'download') { getBackupEntry(ts).then(function (e) { if (e) downloadBackupEntry(e); }); }
        else if (kind === 'restore') { restoreBackup(ts); }
        else if (kind === 'delete') { if (window.confirm('删除该应用内备份？')) deleteBackup(ts); }
      });
    }
    if (fileImport) fileImport.addEventListener('change', function (e) { if (e.target.files[0]) importData(e.target.files[0]); });

    var btnCloudConnect = document.getElementById('btnCloudConnect');
    var btnCloudPush = document.getElementById('btnCloudPush');
    var btnCloudDisconnect = document.getElementById('btnCloudDisconnect');
    if (btnCloudConnect) btnCloudConnect.addEventListener('click', function () {
      var pass = document.getElementById('cloudPass').value;
      if (!pass) { showToast('请填写空间口令'); return; }
      cloudConnect(pass);
    });
    if (btnCloudPush) btnCloudPush.addEventListener('click', function () {
      if (!cloudCfg) { showToast('请先连接'); return; }
      if (cloudPulling) { showToast('正在拉取数据，请稍候'); return; }
      if (Object.keys(store).length === 0) { showToast('本地无数据，无法上传'); return; }
      cloudPush(); showToast('已触发同步');
    });
    if (btnCloudDisconnect) btnCloudDisconnect.addEventListener('click', cloudDisconnect);

    // ============ 云端同步（Supabase · 单人跨设备 · 口令加密） ============
    const CLOUD_CFG_KEY = 'zqdd:cloud', CLOUD_PASS_KEY = 'zqdd:cloudPass';
    let cloudCfg = null, cloudSpaceKey = '', lastKnownCloudAt = 0, pushTimer = null, cloudTimer = null;
    let cloudPulling = false, lastPullRecordCount = 0, suppressDirty = false, cloudPass = '';

    function loadCloudCfg() {
      try { cloudCfg = JSON.parse(localStorage.getItem(CLOUD_CFG_KEY) || 'null'); } catch (e) { cloudCfg = null; }
      return cloudCfg;
    }
    async function sha256Hex(str) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
      return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    }
    const CLOUD_SALT = 'zqdd-cloud-sync-v1';
    async function deriveCloudKey(pass, iter) {
      const salt = new TextEncoder().encode(CLOUD_SALT);
      const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
      return crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: salt, iterations: iter || PBKDF2_ITER, hash: 'SHA-256' },
        base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
      );
    }
    async function cloudEncrypt(obj, pass) {
      const key = await deriveCloudKey(pass, PBKDF2_ITER);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, new TextEncoder().encode(JSON.stringify(obj)));
      return JSON.stringify({ iv: buf2b64(iv), ct: buf2b64(ct), it: PBKDF2_ITER });
    }
    async function cloudDecrypt(payload, pass) {
      const o = JSON.parse(payload);
      const key = await deriveCloudKey(pass, o.it || 200000);
      const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b642buf(o.iv) }, key, b642buf(o.ct));
      return JSON.parse(new TextDecoder().decode(pt));
    }
    function cloudHeaders() {
      return {
        'apikey': cloudCfg.appKey,
        'Authorization': 'Bearer ' + cloudCfg.appKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      };
    }
    // 云端口令：内存变量 + 有锁屏时以 cryptoKey 加密落盘（无锁则明文回退，保持现状）
    async function persistCloudPass() {
      if (cryptoKey) {
        const enc = await encryptFields({ _p: cloudPass }, cryptoKey);
        localStorage.setItem(CLOUD_PASS_KEY, 'enc:' + JSON.stringify(enc));
      } else {
        localStorage.setItem(CLOUD_PASS_KEY, cloudPass);
      }
    }
    async function loadCloudPass() {
      const raw = localStorage.getItem(CLOUD_PASS_KEY) || '';
      if (raw.indexOf('enc:') === 0) {
        try { const dec = await decryptFields(JSON.parse(raw.slice(4)), cryptoKey); cloudPass = (dec && dec._p) || ''; }
        catch (e) { cloudPass = ''; }
      } else {
        cloudPass = raw;
      }
      return cloudPass;
    }
    async function cloudFind() {
      const url = cloudCfg.api + '/rest/v1/sync?space_key=eq.' + encodeURIComponent(cloudSpaceKey);
      const r = await fetch(url, { headers: cloudHeaders() });
      if (!r.ok) throw new Error('find ' + r.status);
      const j = await r.json();
      return (Array.isArray(j) && j[0]) || null;
    }
    async function cloudUpsert(payloadObj, pushedAt) {
      const body = JSON.stringify({ space_key: cloudSpaceKey, payload: payloadObj, pushed_at: pushedAt });
      const r = await fetch(cloudCfg.api + '/rest/v1/sync', { method: 'POST', headers: cloudHeaders(), body: body });
      if (!r.ok) throw new Error('upsert ' + r.status);
    }
    function setCloudStatus(s, ok) {
      const el = document.getElementById('cloudStatus');
      if (el) { el.textContent = s; el.style.color = ok ? '#1d9e75' : (s === '未连接' ? 'var(--purple-main)' : '#c44569'); }
    }
    function cloudBuildPayload() {
      return {
        records: Object.keys(store).map(function (k) { return store[k]; }),
        todo: loadTodo(),
        salt: localStorage.getItem(SALT_KEY),
        verifier: localStorage.getItem(VERIFIER_KEY),
        goals: localStorage.getItem(GOAL_KEY)
      };
    }
    function renderAllCloud() {
      renderCal(); renderDetail(todayStr); renderHomeSummary(); renderReport('week'); renderTrend(7); renderReview('week'); renderStreakBadges(); renderGoalProgress();
      renderInspirationList(); renderTransactions(); renderTodayTx(); renderAssetSummary();
      DAILY_MODS.forEach(renderHistory); renderTodo(); renderStudyMonth();
    }
    async function cloudPush() {
      if (!cloudCfg || !cloudSpaceKey) return;
      if (cloudPulling) { console.warn('cloudPush 跳过：正在拉取云端数据'); return; }
      var recCount = Object.keys(store).length;
      if (recCount === 0) { console.warn('cloudPush 跳过：本地无数据，避免覆盖云端'); return; }
      if (lastPullRecordCount > 0 && recCount < lastPullRecordCount * 0.5) {
        console.warn('cloudPush 跳过：本地记录数仅为上次的 ' + recCount + '/' + lastPullRecordCount + '，疑似异常');
        showToast('数据异常，已阻止上传');
        return;
      }
      try {
        const pass = cloudPass;
        const payload = await cloudEncrypt(cloudBuildPayload(), pass);
        const pushedAt = Date.now();
        let obj = null;
        try { obj = await cloudFind(); } catch (e) { obj = null; }
        await cloudUpsert(payload, pushedAt);
        lastKnownCloudAt = pushedAt;
      } catch (e) {
        console.error('cloudPush 失败', e);
      }
    }
    async function cloudPull() {
      if (!cloudCfg || !cloudSpaceKey) return;
      cloudPulling = true;
      try {
        const obj = await cloudFind();
        if (!obj) { cloudPulling = false; return; }
        if ((obj.pushed_at || 0) <= lastKnownCloudAt) { cloudPulling = false; return; }
        const pass = cloudPass;
        const data = await cloudDecrypt(obj.payload, pass);
        await mergeCloudData(data);
        lastKnownCloudAt = obj.pushed_at || Date.now();
        lastPullRecordCount = Object.keys(store).length;
        if (hasPassword() && !cryptoKey) { isLocked = true; showLock('unlock'); }
        else if (hasPassword() && cryptoKey) { await decryptAllFromStore(cryptoKey); }
        renderAllCloud();
        showToast('已从云端同步');
      } catch (e) {
        console.error('cloudPull 失败', e);
      } finally {
        cloudPulling = false;
      }
    }
    async function mergeCloudData(data) {
      // 逐条合并：以 id + updatedAt 为准，云端更新采用云端，本地更新保留本地，本地独有记录不丢
      const cloudRecs = (data.records || []).filter(function (r) { return r && r.id; });
      const cloudById = {};
      cloudRecs.forEach(function (r) { cloudById[r.id] = r; });
      var localWins = false;
      Object.keys(store).forEach(function (id) {
        var local = store[id];
        var c = cloudById[id];
        if (c) {
          if ((c.updatedAt || 0) > (local.updatedAt || 0)) store[id] = c; // 云端更新，采用云端
          else localWins = true; // 本地更新，保留本地（稍后回传云端）
          delete cloudById[id];
        }
      });
      Object.keys(cloudById).forEach(function (id) { store[id] = cloudById[id]; }); // 云端独有，新增
      // 持久化合并后的 store（抑制逐条 markDirty，避免拉取后冗余上传）
      suppressDirty = true;
      try {
        await Promise.all(Object.keys(store).map(function (id) { return dbPut(store[id]); }));
      } finally {
        suppressDirty = false;
      }
      if (Array.isArray(data.todo)) localStorage.setItem('zqdd:todo', JSON.stringify(data.todo));
      if (data.salt != null) localStorage.setItem(SALT_KEY, data.salt);
      if (data.verifier != null) localStorage.setItem(VERIFIER_KEY, data.verifier);
      if (data.goals != null) localStorage.setItem(GOAL_KEY, data.goals);
      loadGoals();
      if (localWins) schedulePush(); // 仅当存在本地更新记录时统一回传一次
    }
    function schedulePush() {
      if (!cloudCfg || !cloudSpaceKey) return;
      if (pushTimer) clearTimeout(pushTimer);
      pushTimer = setTimeout(cloudPush, 1500);
    }
    function markDirty() { schedulePush(); }
    function startCloudTimer() {
      if (cloudTimer) clearInterval(cloudTimer);
      cloudTimer = setInterval(function () {
        if (document.visibilityState === 'visible') cloudPull();
      }, 60000);
    }
    const CLOUD_URL = 'https://woydduwlunnhueyoweoi.supabase.co';
    const CLOUD_ANON = 'sb_publishable_rda2p4NuAPLilS7GhNfZsA_KQsx1DeU';
    async function cloudConnect(pass) {
      cloudCfg = { appId: CLOUD_URL, appKey: CLOUD_ANON, api: CLOUD_URL };
      cloudSpaceKey = await sha256Hex(pass);
      cloudPass = pass;
      localStorage.setItem(CLOUD_CFG_KEY, JSON.stringify(cloudCfg));
      await persistCloudPass();
      setCloudStatus('连接中…', false);
      try {
        var localCount = Object.keys(store).length;
        var cloudObj = await cloudFind();
        if (!cloudObj || !cloudObj.payload) {
          if (localCount > 0) {
            await cloudPush();
            showToast('本地数据已上传至云端');
          } else {
            showToast('云端暂无数据');
          }
        } else {
          await cloudPull();
        }
        setCloudStatus('已同步', true);
        if (cloudTimer) clearInterval(cloudTimer);
        startCloudTimer();
        renderRecoveryCard();
      } catch (e) {
        console.error('cloudConnect 失败:', e);
        var msg = e && e.message ? e.message : String(e);
        var hint = '连接失败';
        if (msg.indexOf('find ') === 0) hint = '查询失败(' + msg + ')';
        else if (msg.indexOf('upsert ') === 0) hint = '上传失败(' + msg + ')';
        else if (msg.indexOf('Failed to fetch') >= 0 || msg.indexOf('NetworkError') >= 0) hint = '网络无法连接Supabase';
        else hint = '连接失败: ' + msg;
        setCloudStatus('连接失败', false);
        showToast(hint);
      }
    }
    function cloudDisconnect() {
      if (cloudTimer) { clearInterval(cloudTimer); cloudTimer = null; }
      cloudCfg = null; cloudSpaceKey = ''; lastKnownCloudAt = 0; cloudPass = '';
      localStorage.removeItem(CLOUD_PASS_KEY);
      localStorage.removeItem(CLOUD_CFG_KEY);
      setCloudStatus('未连接', false);
      showToast('已断开云端同步');
      renderRecoveryCard();
    }
    async function cloudAutoStart() {
      const cfg = loadCloudCfg();
      if (!cfg) return;
      const pass = await loadCloudPass();
      if (!pass) return;
      cloudCfg = cfg;
      cloudSpaceKey = await sha256Hex(pass);
      setCloudStatus('同步中…', false);
      try {
        await cloudPull();
        setCloudStatus('已同步', true);
        if (cloudTimer) clearInterval(cloudTimer);
        startCloudTimer();
        renderRecoveryCard();
      } catch (e) {
        setCloudStatus('连接失败', false);
      }
    }

    // ============ 换设备恢复指南 ============
    const REC_HINT_KEY = 'zqdd:recHint';
    function renderRecoveryCard() {
      var hintEl = document.getElementById('recHint');
      if (hintEl && !hintEl.value) {
        try { hintEl.value = localStorage.getItem(REC_HINT_KEY) || ''; } catch (e) {}
      }
    }
    var btnSaveHint = document.getElementById('btnSaveHint');
    if (btnSaveHint) btnSaveHint.addEventListener('click', function () {
      var v = (document.getElementById('recHint').value || '').trim();
      try { localStorage.setItem(REC_HINT_KEY, v); } catch (e) {}
      showToast(v ? '提示已保存' : '提示已清空');
    });
    renderRecoveryCard();

    // ============ 全局搜索（跨模块） ============
    const SEARCH_MODS = [['lingguang', '灵光闪现'], ['todo', '待办事项'], ['shiti', '实体感录'], ['study', '学习'], ['xiushen', '修身养性'], ['zichan', '理财']];
    let searchTimer = null;
    var globalSearchInput = document.getElementById('globalSearchInput');
    if (globalSearchInput) globalSearchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      var q = globalSearchInput.value.trim().toLowerCase();
      searchTimer = setTimeout(function () { doGlobalSearch(q); }, 250);
    });
    function doGlobalSearch(q) {
      var box = document.getElementById('globalSearchResults');
      if (!box) return;
      if (!q) { box.innerHTML = ''; return; }
      var results = [];
      SEARCH_MODS.forEach(function (m) {
        var recs = recordsForModule(m[0]).filter(function (r) { return !isEnc(r); });
        recs.forEach(function (r) {
          var matched = false;
          Object.keys(r.fields).forEach(function (k) {
            var val = String(r.fields[k] || '').toLowerCase();
            if (val.indexOf(q) >= 0 || k.toLowerCase().indexOf(q) >= 0) matched = true;
          });
          if (matched) results.push({ mod: m[1], modKey: m[0], date: r.date, fields: r.fields, id: r.id });
        });
      });
      if (!results.length) { box.innerHTML = '<div class="search-empty">没有找到匹配「' + escapeHtml(q) + '」的记录</div>'; return; }
      var grouped = {};
      results.forEach(function (r) { (grouped[r.mod] = grouped[r.mod] || []).push(r); });
      var html = '';
      Object.keys(grouped).forEach(function (modName) {
        html += '<div class="search-group"><div class="search-group-title">' + escapeHtml(modName) + ' <span class="search-group-count">(' + grouped[modName].length + ')</span></div>';
        html += grouped[modName].slice(0, 5).map(function (r) {
          var sum = Object.keys(r.fields).map(function (k) { return k + '：' + r.fields[k]; }).join(' · ');
          return '<div class="search-result-item" data-search-mod="' + r.modKey + '"><span class="search-date">' + r.date.slice(5) + '</span><span class="search-sum">' + escapeHtml(sum.slice(0, 80)) + '</span></div>';
        }).join('');
        if (grouped[modName].length > 5) html += '<div class="search-more">还有 ' + (grouped[modName].length - 5) + ' 条，进入' + escapeHtml(modName) + '查看</div>';
        html += '</div>';
      });
      box.innerHTML = html;
    }
    document.addEventListener('click', function (e) {
      var si = e.target.closest('[data-search-mod]');
      if (si) {
        var mod = si.getAttribute('data-search-mod');
        var navEl = document.querySelector('.nav-item[data-module="' + mod + '"]');
        if (navEl) navEl.click();
      }
    });

    // ============ 快捷记录浮动按钮 ============
    var fabBtn = document.getElementById('fabBtn');
    var fabMenu = document.getElementById('fabMenu');
    if (fabBtn) fabBtn.addEventListener('click', function () {
      fabMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', function (e) {
      if (fabBtn && !e.target.closest('#fabBtn') && !e.target.closest('#fabMenu')) {
        fabMenu.classList.add('hidden');
      }
    });
    document.addEventListener('click', function (e) {
      var qi = e.target.closest('[data-quick]');
      if (!qi) return;
      fabMenu.classList.add('hidden');
      var mod = qi.getAttribute('data-quick');
      var navEl = document.querySelector('.nav-item[data-module="' + mod + '"]');
      if (navEl) {
        navEl.click();
        setTimeout(function () {
          var focusMap = { lingguang: '灵感内容', zichan: '金额', todo: 'todoInput', study: '学习内容' };
          var sel = focusMap[mod];
          if (sel) {
            var el = document.getElementById(sel) || document.querySelector('[data-save="' + sel + '"]');
            if (el) el.focus();
          }
        }, 200);
      }
    });

    // ============ 趋势可视化（SVG 折线图） ============
    let trendDays = 7;
    function renderTrend(days) {
      if (days) trendDays = days;
      document.querySelectorAll('.trend-tab').forEach(function (t) { t.classList.toggle('active', parseInt(t.dataset.trend, 10) === trendDays); });
      var dates = [];
      var today = new Date();
      for (var i = trendDays - 1; i >= 0; i--) {
        var d = new Date(today); d.setDate(d.getDate() - i);
        dates.push(ymd(d));
      }
      var studyData = dates.map(function (ds) {
        var mins = 0;
        recordsForDay(ds, 'study').forEach(function (r) { mins += studyMinsOf(r.fields); });
        return mins;
      });
      var expData = dates.map(function (ds) {
        var exp = 0;
        recordsForDay(ds, 'zichan').forEach(function (r) { if ((r.fields['交易类型'] || '支出') !== '收入') exp += parseFloat(r.fields['金额']) || 0; });
        return Math.round(exp);
      });
      var sleepData = dates.map(function (ds) {
        var scores = [];
        recordsForDay(ds, 'shiti').forEach(function (r) { var s = parseInt(r.fields['睡眠质量'], 10); if (!isNaN(s)) scores.push(s); });
        return scores.length ? Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / scores.length) : 0;
      });
      var bowelData = dates.map(function (ds) {
        var vals = [];
        recordsForDay(ds, 'shiti').forEach(function (r) {
          var raw = r.fields['排便次数'];
          if (raw !== undefined && raw !== null && raw !== '') { var n = parseInt(raw, 10); if (!isNaN(n)) vals.push(n); }
        });
        return vals.length ? vals[vals.length - 1] : 0;
      });
      renderTrendChart('trendStudy', studyData, dates, '分钟', 'var(--purple-main)');
      renderTrendChart('trendExpense', expData, dates, '¥', '#c44569');
      renderTrendChart('trendSleep', sleepData, dates, '分', '#6f9fd8');
      renderTrendChart('trendBowel', bowelData, dates, '次', '#5cb87f');
    }
    function renderTrendChart(containerId, data, dates, unit, color) {
      var el = document.getElementById(containerId);
      if (!el) return;
      var w = 300, h = 80, pad = 8;
      var max = Math.max.apply(null, data.concat([1]));
      var min = Math.min.apply(null, data.concat([0]));
      var range = max - min || 1;
      var step = (w - pad * 2) / Math.max(1, data.length - 1);
      var pts = data.map(function (v, i) {
        var x = pad + i * step;
        var y = h - pad - ((v - min) / range) * (h - pad * 2);
        return [x, y];
      });
      var pathD = pts.map(function (p, i) { return (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
      var areaD = pathD + ' L' + pts[pts.length - 1][0].toFixed(1) + ' ' + (h - pad) + ' L' + pts[0][0].toFixed(1) + ' ' + (h - pad) + ' Z';
      var avg = data.length ? Math.round(data.reduce(function (a, b) { return a + b; }, 0) / data.length) : 0;
      var dots = pts.map(function (p, i) {
        var v = data[i];
        var label = dates[i].slice(5);
        return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.5" fill="' + color + '"/><text x="' + p[0].toFixed(1) + '" y="' + (h - 1) + '" text-anchor="middle" font-size="7" fill="var(--text-light)">' + label + '</text>';
      }).join('');
      el.innerHTML = '<div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-sub); margin-bottom:4px;"><span>均值 ' + avg + unit + '</span><span>' + (data.length ? ('最高 ' + max + unit) : '') + '</span></div>' +
        '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%; height:' + h + 'px;">' +
        '<path d="' + areaD + '" fill="' + color + '" opacity="0.08"/>' +
        '<path d="' + pathD + '" fill="none" stroke="' + color + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        dots + '</svg>';
    }
    document.querySelectorAll('.trend-tab').forEach(function (t) {
      t.addEventListener('click', function () { renderTrend(parseInt(t.dataset.trend, 10)); });
    });

    // ============ 目标与进度追踪 ============
    const GOAL_KEY = 'zqdd:goals';
    let goals = {};
    function loadGoals() {
      try { goals = JSON.parse(localStorage.getItem(GOAL_KEY) || '{}'); } catch (e) { goals = {}; }
      document.querySelectorAll('.goal-input').forEach(function (inp) {
        var k = inp.getAttribute('data-goal');
        if (goals[k]) inp.value = goals[k];
      });
    }
    function saveGoals() {
      document.querySelectorAll('.goal-input').forEach(function (inp) {
        var k = inp.getAttribute('data-goal');
        var v = inp.value.trim();
        if (v) goals[k] = parseFloat(v); else delete goals[k];
      });
      try { localStorage.setItem(GOAL_KEY, JSON.stringify(goals)); } catch (e) {}
      renderGoalProgress();
      schedulePush();
      showToast('目标已保存');
    }
    function renderGoalProgress() {
      var now = new Date();
      var weekStart = new Date(now); weekStart.setDate(now.getDate() - ((now.getDay() || 7) - 1));
      var weekStartStr = ymd(weekStart);
      var ym = ymd(now).slice(0, 7);
      // 学习周目标
      if (goals.study) {
        var studyMins = 0;
        Object.keys(store).forEach(function (id) {
          var r = store[id];
          if (r.module === 'study' && !isEnc(r) && r.date >= weekStartStr) {
            studyMins += studyMinsOf(r.fields);
          }
        });
        var targetMins = goals.study * 60;
        var pct = Math.min(100, Math.round(studyMins / targetMins * 100));
        updateGoalBadge('study', pct, Math.round(studyMins / 60 * 10) / 10 + 'h/' + goals.study + 'h');
      }
      // 中医周目标
      if (goals.tcm) {
        var tcmDays = 0;
        Object.keys(store).forEach(function (id) {
          var r = store[id];
          if (r.module === 'tcm' && !isEnc(r) && r.date >= weekStartStr && Object.keys(r.fields).length) tcmDays++;
        });
        var pct2 = Math.min(100, Math.round(tcmDays / goals.tcm * 100));
        updateGoalBadge('tcm', pct2, tcmDays + '天/' + goals.tcm + '天');
      }
      // 理财月支出上限
      if (goals.budget) {
        var exp = 0;
        Object.keys(store).forEach(function (id) {
          var r = store[id];
          if (r.module === 'zichan' && !isEnc(r) && r.date.indexOf(ym) === 0 && (r.fields['交易类型'] || '支出') !== '收入') exp += parseFloat(r.fields['金额']) || 0;
        });
        var pct3 = Math.min(100, Math.round(exp / goals.budget * 100));
        updateGoalBadge('zichan', pct3, '¥' + Math.round(exp) + '/¥' + goals.budget, pct3 >= 100);
      }
    }
    function updateGoalBadge(mod, pct, label, over) {
      var card = document.querySelector('[data-module-header="' + mod + '"] .mhc-info');
      if (!card) return;
      var bar = card.querySelector('.goal-bar');
      if (!bar) {
        bar = document.createElement('div');
        bar.className = 'goal-bar';
        bar.innerHTML = '<div class="goal-bar-track"><div class="goal-bar-fill"></div></div><span class="goal-bar-label"></span>';
        card.appendChild(bar);
      }
      bar.querySelector('.goal-bar-fill').style.width = pct + '%';
      bar.querySelector('.goal-bar-fill').style.background = over ? 'linear-gradient(90deg,#ff8fa3,#ff4d67)' : 'linear-gradient(90deg,#ffe27a,#ff9f1c)';
      bar.querySelector('.goal-bar-label').textContent = label;
    }
    var btnSaveGoals = document.getElementById('btnSaveGoals');
    if (btnSaveGoals) btnSaveGoals.addEventListener('click', saveGoals);

    // ============ 习惯连击（streak） ============
    function calcStreak(mod) {
      var dates = [];
      Object.keys(store).forEach(function (id) {
        var r = store[id];
        if (r.module === mod && !isEnc(r) && r.fields && Object.keys(r.fields).length) dates.push(r.date);
      });
      if (mod === 'tcm') {
        Object.keys(store).forEach(function (id) {
          var r = store[id];
          if (r.module === 'tcm' && !isEnc(r) && Object.keys(r.fields).length) dates.push(r.date);
        });
      }
      dates = Array.from(new Set(dates)).sort().reverse();
      if (!dates.length) return 0;
      var today = ymd(new Date());
      var yesterday = ymd(new Date(Date.now() - 86400000));
      if (dates[0] !== today && dates[0] !== yesterday) return 0;
      var streak = 0;
      var checkDate = new Date(dates[0].replace(/-/g, '/'));
      for (var i = 0; i < 400; i++) {
        var ds = ymd(checkDate);
        if (dates.indexOf(ds) >= 0) { streak++; checkDate.setDate(checkDate.getDate() - 1); }
        else break;
      }
      return streak;
    }
    function renderStreakBadges() {
      var streakMods = [['lingguang', '灵光闪现'], ['todo', '待办事项'], ['shiti', '实体感录'], ['study', '学习'], ['xiushen', '修身养性'], ['zichan', '理财']];
      streakMods.forEach(function (m) {
        var card = document.querySelector('[data-module-header="' + m[0] + '"] .mhc-info');
        if (!card) return;
        var existing = card.querySelector('.streak-badge');
        var streak = calcStreak(m[0]);
        if (streak >= 2) {
          if (!existing) {
            existing = document.createElement('span');
            existing.className = 'streak-badge';
            existing.setAttribute('data-streak', m[0]);
            card.querySelector('.mhc-title').appendChild(existing);
          }
          existing.innerHTML = '🔥 ' + streak + '天';
        } else if (existing) {
          existing.remove();
        }
      });
    }

    // ============ 周/月自动回顾 ============
    let reviewPeriod = 'week';
    let reviewTimer = null;
    function renderReview(period) {
      if (period) reviewPeriod = period;
      document.querySelectorAll('.review-tab').forEach(function (t) { t.classList.toggle('active', t.dataset.review === reviewPeriod); });
      var body = document.getElementById('reviewBody');
      if (!body) return;
      var now = new Date();
      var start, end, label;
      if (reviewPeriod === 'week') {
        var day = now.getDay() || 7;
        var s = new Date(now); s.setDate(s.getDate() - day + 1);
        start = ymd(s); end = ymd(now);
        label = start.slice(5) + ' ~ ' + end.slice(5);
      } else {
        start = ymd(new Date(now.getFullYear(), now.getMonth(), 1));
        end = ymd(now);
        label = (now.getMonth() + 1) + '月';
      }
      var recs = Object.values(store).filter(function (r) { return !isEnc(r) && r.date >= start && r.date <= end; });
      var studyMins = 0, exp = 0, inc = 0;
      var inspCount = 0, todoDone = 0, shitiCount = 0, xiushenCount = 0, yanghuDays = 0, tcmDays = 0;
      recs.forEach(function (r) {
        if (r.module === 'study') {
          studyMins += studyMinsOf(r.fields);
        }
        if (r.module === 'zichan') { var amt = parseFloat(r.fields['金额']) || 0; if (r.fields['交易类型'] === '收入') inc += amt; else exp += amt; }
        if (r.module === 'lingguang') inspCount++;
        if (r.module === 'shiti') shitiCount++;
        if (r.module === 'xiushen') xiushenCount++;
        if (r.module === 'yanghu' && Object.keys(r.fields).length) yanghuDays++;
        if (r.module === 'tcm' && Object.keys(r.fields).length) tcmDays++;
      });
      var todoArr = loadTodo().filter(function (t) { return t.done; });
      todoDone = todoArr.length;
      var totalDays = new Set(recs.map(function (r) { return r.date; })).size;
      var sleepScores = [];
      recs.filter(function (r) { return r.module === 'shiti'; }).forEach(function (r) { var s = parseInt(r.fields['睡眠质量'], 10); if (!isNaN(s)) sleepScores.push(s); });
      var avgSleep = sleepScores.length ? Math.round(sleepScores.reduce(function (a, b) { return a + b; }, 0) / sleepScores.length) : 0;

      var text = '【' + label + ' 回顾】\n\n';
      text += '📅 本期共记录 ' + totalDays + ' 天。\n';
      text += '📚 学习 ' + Math.round(studyMins / 60 * 10) / 10 + ' 小时（' + studyMins + ' 分钟）。\n';
      text += '🌿 中医打卡 ' + tcmDays + ' 天 / 养护打卡 ' + yanghuDays + ' 天。\n';
      text += '🧘 修身养性 ' + xiushenCount + ' 次。\n';
      text += '💡 灵感记录 ' + inspCount + ' 条。\n';
      text += '✅ 待办完成 ' + todoDone + ' 项。\n';
      text += '🚽 实体感录 ' + shitiCount + ' 天。';
      if (avgSleep) text += '\n🌙 平均睡眠质量 ' + avgSleep + ' 分。';
      text += '\n💰 支出 ¥' + Math.round(exp).toLocaleString() + ' / 收入 ¥' + Math.round(inc).toLocaleString() + ' / 结余 ¥' + Math.round(inc - exp).toLocaleString() + '。';

      var savedReview = '';
      try { savedReview = localStorage.getItem('zqdd:review_' + reviewPeriod + '_' + start) || ''; } catch (e) {}

      body.innerHTML = '<div class="review-generated">' + escapeHtml(text).replace(/\n/g, '<br>') + '</div>' +
        '<textarea class="field-input review-remark" id="reviewRemark" rows="3" placeholder="补充本期感悟…（会自动保存）">' + escapeHtml(savedReview) + '</textarea>';
      var ta = document.getElementById('reviewRemark');
      if (ta) {
        ta.addEventListener('input', function () {
          clearTimeout(reviewTimer);
          reviewTimer = setTimeout(function () {
            try { localStorage.setItem('zqdd:review_' + reviewPeriod + '_' + start, ta.value); } catch (e) {}
          }, 800);
        });
      }
    }
    document.querySelectorAll('.review-tab').forEach(function (t) {
      t.addEventListener('click', function () { renderReview(t.dataset.review); });
    });
    var btnGenReview = document.getElementById('btnGenReview');
    if (btnGenReview) btnGenReview.addEventListener('click', function () { renderReview(); showToast('已生成最新回顾'); });
    var btnSaveReview = document.getElementById('btnSaveReview');
    if (btnSaveReview) btnSaveReview.addEventListener('click', function () {
      var ta = document.getElementById('reviewRemark');
      if (ta) {
        var now = new Date();
        var start;
        if (reviewPeriod === 'week') { var day = now.getDay() || 7; var s = new Date(now); s.setDate(s.getDate() - day + 1); start = ymd(s); }
        else { start = ymd(new Date(now.getFullYear(), now.getMonth(), 1)); }
        try { localStorage.setItem('zqdd:review_' + reviewPeriod + '_' + start, ta.value); } catch (e) {}
        showToast('感悟已保存');
      }
    });

    // ============ 高级设置折叠 ============
    var advToggle = document.getElementById('advancedToggle');
    var advSettings = document.getElementById('advancedSettings');
    if (advToggle) advToggle.addEventListener('click', function () {
      var hidden = advSettings.classList.toggle('hidden');
      advToggle.querySelector('span').textContent = hidden ? '▾ 点击展开' : '▴ 点击收起';
    });

    loadGoals();
    renderHomepage();

    // ============ 初始化 ============
    (function initStore() {
      openDB()
        .then(migrateFromLocalStorage)
        .then(dbGetAll)
        .then(function (all) { all.forEach(function (r) { store[r.id] = r; }); dedupeShiti(); })
        .then(function () {
          renderCal(); renderDetail(todayStr); renderHomeSummary(); renderReport('week'); renderTrend(7); renderReview('week'); renderStreakBadges(); renderGoalProgress();
          renderInspirationList(); renderTransactions(); renderTodayTx(); renderAssetSummary();
          DAILY_MODS.forEach(renderHistory); renderTodo(); renderStudyMonth(); renderYanghu(); renderYanghuHistory(); renderTcmHistory();
          ['lingguang', 'todo', 'shiti', 'study', 'xiushen', 'zichan'].forEach(function (m) { updateModuleHeaderDate(m); switchModuleTab(m, 'today'); });
          cloudAutoStart();
          checkBackupReminder();
          trimBackups().then(renderBackupList);
          ['input', 'change'].forEach(function (evt) {
            const sleepInput = document.getElementById('sleepTimeInput');
            const wakeInput = document.getElementById('wakeTimeInput');
            if (sleepInput) sleepInput.addEventListener(evt, updateSleepUI);
            if (wakeInput) wakeInput.addEventListener(evt, updateSleepUI);
          });
          const range = document.getElementById('sleepQualityRange');
          if (range) range.addEventListener('input', updateSleepUI);
          const remark = document.querySelector('.sleep-remark');
          if (remark) remark.addEventListener('input', updateSleepUI);
          updateSleepUI();
        })
        .catch(function (e) {
          console.error(e); renderCal(); renderDetail(todayStr); renderHomeSummary(); renderReport('week'); renderTrend(7); renderReview('week'); renderStreakBadges(); renderGoalProgress();
          renderInspirationList(); renderTransactions(); renderTodayTx(); renderAssetSummary();
          DAILY_MODS.forEach(renderHistory); renderTodo(); renderStudyMonth();
          ['lingguang', 'todo', 'shiti', 'study', 'xiushen', 'zichan'].forEach(function (m) { updateModuleHeaderDate(m); switchModuleTab(m, 'today'); });
        });
    })();

    // ============ 主题换肤 ============
    function applyTheme(name) {
      if (!name || !document.querySelector('.theme-swatch[data-theme-set="' + name + '"]')) name = 'purple';
      if (name === 'purple') document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', name);
      localStorage.setItem('zqdd:theme', name);
      document.querySelectorAll('.theme-swatch').forEach(function (s) {
        s.classList.toggle('active', s.getAttribute('data-theme-set') === name);
      });
    }
    applyTheme(localStorage.getItem('zqdd:theme') || 'purple');
    document.querySelectorAll('.theme-swatch').forEach(function (s) {
      s.addEventListener('click', function () { applyTheme(s.getAttribute('data-theme-set')); });
    });

    // ============ PWA：Service Worker（网络优先，自动接管更新） ============
    let swReg = null;
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').then(function (reg) {
        swReg = reg;
        reg.addEventListener('updatefound', function () {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', function () {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateBanner();
              }
            });
          }
        });
      }).catch(function (e) { console.error('SW 注册失败', e); });
      navigator.serviceWorker.addEventListener('controllerchange', function () { window.location.reload(); });
    }
    function showUpdateBanner() {
      const b = document.getElementById('swUpdateBanner');
      if (b) b.classList.remove('hidden');
    }
    var swUpdateBanner = document.getElementById('swUpdateBanner');
    if (swUpdateBanner) swUpdateBanner.addEventListener('click', function () { window.location.reload(); });
    var btnCheckUpdate = document.getElementById('btnCheckUpdate');
    if (btnCheckUpdate) btnCheckUpdate.addEventListener('click', function () {
      if (!swReg) { showToast('暂未就绪，请稍后重试'); return; }
      swReg.update().then(function () {
        if (swReg.waiting) { swReg.waiting.postMessage({ type: 'SKIP_WAITING' }); }
        else { showToast('已经是最新版本'); }
      }).catch(function () { window.location.reload(); });
    });

    // ============ 隐私加密（Web Crypto: PBKDF2 + AES-GCM） ============
    const ENC_MODS = ['shiti', 'zichan']; // 需要加密的敏感模块
    const SALT_KEY = 'zqdd:salt', VERIFIER_KEY = 'zqdd:verifier';
    let cryptoKey = null;       // 解锁后持有
    let isLocked = false;

    function buf2b64(buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))); }
    function b642buf(b64) { return Uint8Array.from(atob(b64), function (c) { return c.charCodeAt(0); }).buffer; }
    const PBKDF2_ITER = 600000;
    function deriveKey(password, saltBuf, iter) {
      return crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey'])
        .then(function (k) {
          return crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt: saltBuf, iterations: iter || PBKDF2_ITER, hash: 'SHA-256' },
            k, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
          );
        });
    }
    function encryptFields(fields, key) {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const data = new TextEncoder().encode(JSON.stringify(fields));
      return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, data).then(function (ct) {
        return { _enc: true, iv: buf2b64(iv), ct: buf2b64(ct) };
      });
    }
    function decryptFields(encObj, key) {
      return crypto.subtle.decrypt({ name: 'AES-GCM', iv: b642buf(encObj.iv) }, key, b642buf(encObj.ct))
        .then(function (pt) { return JSON.parse(new TextDecoder().decode(pt)); });
    }

    function hasPassword() { return !!localStorage.getItem(SALT_KEY); }
    function getSalt() { return b642buf(localStorage.getItem(SALT_KEY)); }

    // 加密/解密 store 中的敏感记录
    function encryptStoreToDB(key) {
      const tasks = [];
      Object.keys(store).forEach(function (id) {
        const r = store[id];
        if (ENC_MODS.indexOf(r.module) >= 0 && r.fields && !r.fields._enc) {
          tasks.push(encryptFields(r.fields, key).then(function (enc) {
            return dbPut({ id: r.id, date: r.date, module: r.module, fields: enc, updatedAt: r.updatedAt });
          }));
        }
      });
      return Promise.all(tasks);
    }
    function decryptAllFromStore(key) {
      const recs = Object.keys(store).map(function (k) { return store[k]; }).filter(function (r) {
        return ENC_MODS.indexOf(r.module) >= 0 && r.fields && r.fields._enc;
      });
      return Promise.all(recs.map(function (r) {
        return decryptFields(r.fields, key).then(function (dec) { store[r.id].fields = dec; }).catch(function () {});
      }));
    }

    // 锁屏 UI
    const lockOverlay = document.getElementById('lockOverlay');
    const lockFields = document.getElementById('lockFields');
    const lockBtn = document.getElementById('lockBtn');
    const lockSub = document.getElementById('lockSub');
    const lockErr = document.getElementById('lockErr');
    const lockToggle = document.getElementById('lockToggle');
    const lockHint = document.getElementById('lockHint');
    let lockMode = 'unlock'; // unlock | setup | remove

    function showLock(mode) {
      lockMode = mode;
      lockErr.textContent = '';
      if (mode === 'setup') {
        lockSub.textContent = '设置一个密码，加密敏感记录';
        lockFields.innerHTML = '<div class="lock-field"><label>密码</label><input type="password" class="lock-input" id="pwd1" placeholder="至少 4 位"></div><div class="lock-field"><label>确认密码</label><input type="password" class="lock-input" id="pwd2" placeholder="再次输入"></div>';
        lockBtn.textContent = '确认设置';
        lockToggle.textContent = '已有密码？去解锁';
        lockHint.textContent = '密码仅存于本机，无法找回，请牢记。';
      } else if (mode === 'remove') {
        lockSub.textContent = '输入当前密码以移除加密';
        lockFields.innerHTML = '<div class="lock-field"><input type="password" class="lock-input" id="pwdOld" placeholder="当前密码"></div>';
        lockBtn.textContent = '移除加密';
        lockToggle.textContent = '返回解锁';
        lockHint.textContent = '移除后敏感数据将恢复明文存储。';
      } else {
        lockSub.textContent = '敏感数据已加密保护';
        lockFields.innerHTML = '<div class="lock-field"><input type="password" class="lock-input" id="pwdUnlock" placeholder="输入密码解锁"></div>';
        lockBtn.textContent = '解锁';
        lockToggle.textContent = hasPassword() ? '忘记密码？只能清空数据' : '';
        lockHint.textContent = '';
      }
      lockOverlay.classList.remove('hidden');
      var first = lockFields.querySelector('input'); if (first) first.focus();
    }
    function hideLock() { lockOverlay.classList.add('hidden'); }

    function doSetup() {
      var p1 = document.getElementById('pwd1').value, p2 = document.getElementById('pwd2').value;
      if (p1.length < 4) { lockErr.textContent = '密码至少 4 位'; return; }
      if (p1 !== p2) { lockErr.textContent = '两次输入不一致'; return; }
      var salt = crypto.getRandomValues(new Uint8Array(16));
      deriveKey(p1, salt).then(function (key) {
        cryptoKey = key;
        persistCloudPass();
        localStorage.setItem(SALT_KEY, buf2b64(salt));
        // verifier: 加密固定字符串，用于验证密码（同时记录迭代次数以兼容旧备份）
        return encryptFields({ v: 'zqdd' }, key);
      }).then(function (v) {
        localStorage.setItem(VERIFIER_KEY, JSON.stringify({ it: PBKDF2_ITER, enc: v }));
        return encryptStoreToDB(cryptoKey);
      }).then(function () {
        isLocked = false; hideLock(); updatePrivacyBadge();
        renderTransactions(); renderTodayTx(); renderHistory('shiti');
        markDirty();
        showToast('密码已设置，敏感数据已加密');
      });
    }
    function loadVerifier() {
      var parsed = JSON.parse(localStorage.getItem(VERIFIER_KEY) || '{}');
      return { iter: parsed.it || 100000, enc: parsed.enc || parsed };
    }
    function doUnlock() {
      var pwd = document.getElementById('pwdUnlock').value;
      if (!pwd) { lockErr.textContent = '请输入密码'; return; }
      var vf = loadVerifier();
      deriveKey(pwd, getSalt(), vf.iter).then(function (key) {
        return decryptFields(vf.enc, key).then(function (dec) {
          if (dec.v !== 'zqdd') throw new Error('bad');
          cryptoKey = key;
          return decryptAllFromStore(cryptoKey);
        });
      }).then(function () {
        isLocked = false; hideLock();
        renderTransactions(); renderTodayTx(); renderHistory('shiti');
        markDirty();
        showToast('已解锁');
        loadCloudPass().then(function () { cloudAutoStart(); }).catch(function () {});
      }).catch(function () { lockErr.textContent = '密码错误'; });
    }
    function doRemove() {
      var pwd = document.getElementById('pwdOld').value;
      var vf = loadVerifier();
      deriveKey(pwd, getSalt(), vf.iter).then(function (key) {
        return decryptFields(vf.enc, key).then(function (dec) {
          if (dec.v !== 'zqdd') throw new Error('bad');
          cryptoKey = key;
          return decryptAllFromStore(cryptoKey);
        });
      }).then(function () {
        // 把敏感记录明文写回 DB
        var tasks = Object.keys(store).map(function (id) {
          var r = store[id];
          if (ENC_MODS.indexOf(r.module) >= 0 && r.fields && !r.fields._enc) return dbPut(r);
        }).filter(Boolean);
        return Promise.all(tasks);
      }).then(async function () {
        localStorage.removeItem(SALT_KEY); localStorage.removeItem(VERIFIER_KEY);
        // 移除锁屏前，把加密存储的云端口令还原为明文，保证后续自动同步可用
        var raw = localStorage.getItem(CLOUD_PASS_KEY) || '';
        if (raw.indexOf('enc:') === 0) {
          try { var dec = await decryptFields(JSON.parse(raw.slice(4)), cryptoKey); cloudPass = (dec && dec._p) || ''; }
          catch (e) { cloudPass = ''; }
          localStorage.setItem(CLOUD_PASS_KEY, cloudPass);
        } else { cloudPass = raw; }
        cryptoKey = null; isLocked = false; hideLock(); updatePrivacyBadge();
        renderTransactions(); renderTodayTx(); renderHistory('shiti');
        markDirty();
        showToast('加密已移除');
      }).catch(function () { lockErr.textContent = '密码错误'; });
    }
    function doLock() {
      if (!hasPassword()) { showToast('请先设置密码'); return; }
      // 清除内存中的敏感明文
      Object.keys(store).forEach(function (id) {
        if (ENC_MODS.indexOf(store[id].module) >= 0) {
          // 从 DB 重新读（DB 里是加密的）
          var r = store[id];
          // 保留加密形态：从 DB 取回
        }
      });
      // 重新从 DB 加载加密形态
      dbGetAll().then(function (all) {
        Object.keys(store).forEach(function (k) { delete store[k]; });
        all.forEach(function (r) { store[r.id] = r; });
        cryptoKey = null; isLocked = true;
        renderTransactions(); renderTodayTx(); renderHistory('shiti');
        markDirty();
        showLock('unlock');
      });
    }

    function updatePrivacyBadge() {
      var b = document.getElementById('privacyBadge');
      if (b) { b.textContent = hasPassword() ? '已启用' : '未启用'; }
    }

    lockBtn.addEventListener('click', function () {
      if (lockMode === 'setup') doSetup();
      else if (lockMode === 'remove') doRemove();
      else doUnlock();
    });
    lockToggle.addEventListener('click', function () {
      if (lockMode === 'setup') showLock('unlock');
      else if (lockMode === 'remove') showLock('unlock');
      else if (hasPassword()) { showToast('密码无法找回，需清空全部数据'); }
      else showLock('setup');
    });
    var btnSetPwd = document.getElementById('btnSetPwd');
    var btnLock = document.getElementById('btnLock');
    var btnRemovePwd = document.getElementById('btnRemovePwd');
    if (btnSetPwd) btnSetPwd.addEventListener('click', function () {
      if (hasPassword()) { showToast('已设置密码，请用「立即上锁」或「移除密码」'); return; }
      showLock('setup');
    });
    if (btnLock) btnLock.addEventListener('click', doLock);
    if (btnRemovePwd) btnRemovePwd.addEventListener('click', function () {
      if (!hasPassword()) { showToast('尚未设置密码'); return; }
      showLock('remove');
    });
    updatePrivacyBadge();

    // ============ 邀请机制 ============
    const INVITE_TOKEN_KEY = 'zqdd:inviteToken';
    var inviteOverlay = document.getElementById('inviteOverlay');
    var inviteSub = document.getElementById('inviteSub');
    var inviteFields = document.getElementById('inviteFields');
    var inviteBtn = document.getElementById('inviteBtn');
    var inviteErr = document.getElementById('inviteErr');
    var inviteHint = document.getElementById('inviteHint');
    var inviteSkip = document.getElementById('inviteSkip');
    var inviteMode = '';
    var inviteTokenCur = '';
    var inviteBoundHash = '';

    function randToken() {
      var arr = crypto.getRandomValues(new Uint8Array(16));
      return Array.prototype.map.call(arr, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    }
    async function inviteInit(token) {
      var res = await fetch(CLOUD_URL + '/rest/v1/rpc/invite_lookup', {
        method: 'POST',
        headers: { 'apikey': CLOUD_ANON, 'Authorization': 'Bearer ' + CLOUD_ANON, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ p_token: token })
      });
      if (!res.ok) throw new Error('查询失败(' + res.status + ')');
      var rows = await res.json();
      if (!rows.length) throw new Error('邀请链接无效或已失效');
      return rows[0];
    }
    async function inviteBind(token, passHash) {
      var res = await fetch(CLOUD_URL + '/rest/v1/rpc/invite_bind', {
        method: 'POST',
        headers: { 'apikey': CLOUD_ANON, 'Authorization': 'Bearer ' + CLOUD_ANON, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_token: token, p_hash: passHash })
      });
      if (!res.ok) throw new Error('绑定失败(' + res.status + ')');
    }
    async function inviteCreate() {
      var token = randToken();
      var res = await fetch(CLOUD_URL + '/rest/v1/rpc/invite_create', {
        method: 'POST',
        headers: { 'apikey': CLOUD_ANON, 'Authorization': 'Bearer ' + CLOUD_ANON, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_token: token, p_owner: cloudSpaceKey || '' })
      });
      if (!res.ok) throw new Error('生成失败(' + res.status + ')');
      return token;
    }
    function showInvite(mode) {
      inviteMode = mode; inviteErr.textContent = '';
      if (mode === 'set') {
        inviteSub.textContent = '该邀请尚未绑定，请设置访问口令（至少 6 位）';
        inviteFields.innerHTML = '<div class="lock-field"><label>访问口令</label><input type="password" class="lock-input" id="invPwd1" placeholder="至少 6 位"></div><div class="lock-field"><label>确认口令</label><input type="password" class="lock-input" id="invPwd2" placeholder="再次输入"></div>';
        inviteBtn.textContent = '确认设置';
        inviteBtn.style.display = '';
        inviteHint.textContent = '口令将决定你的云端空间，请牢记；换设备重开链接时凭此口令恢复数据。';
        inviteSkip.textContent = '';
      } else if (mode === 'enter') {
        inviteSub.textContent = '该邀请已绑定，请输入访问口令';
        inviteFields.innerHTML = '<div class="lock-field"><label>访问口令</label><input type="password" class="lock-input" id="invPwd" placeholder="输入口令"></div>';
        inviteBtn.textContent = '确认';
        inviteBtn.style.display = '';
        inviteHint.textContent = '输入发出邀请时约定的访问口令。';
        inviteSkip.textContent = '';
      }
      inviteOverlay.classList.remove('hidden');
      var first = inviteFields.querySelector('input'); if (first) first.focus();
    }
    function hideInvite() { inviteOverlay.classList.add('hidden'); }

    async function startInviteFlow(token) {
      inviteTokenCur = token;
      inviteMode = 'loading'; inviteErr.textContent = '';
      inviteSub.textContent = '正在校验邀请链接…';
      inviteFields.innerHTML = '';
      inviteBtn.style.display = 'none';
      inviteHint.textContent = '';
      inviteSkip.textContent = '跳过，以本地模式进入';
      inviteOverlay.classList.remove('hidden');
      try {
        var row = await inviteInit(token);
        if (row.bound_pass_hash) { inviteBoundHash = row.bound_pass_hash; showInvite('enter'); }
        else { showInvite('set'); }
      } catch (e) {
        inviteSub.textContent = '邀请链接无效';
        inviteErr.textContent = (e && e.message) ? e.message : '校验失败';
        inviteFields.innerHTML = '';
        inviteBtn.style.display = 'none';
        inviteSkip.textContent = '跳过，以本地模式进入';
      }
    }
    async function finishInvite(pass) {
      try {
        localStorage.setItem(INVITE_TOKEN_KEY, inviteTokenCur);
        hideInvite();
        var ic = document.getElementById('inviteCard'); if (ic) ic.style.display = 'none';
        await cloudConnect(pass);
        showToast('邀请已激活，云端已同步');
      } catch (e) {
        inviteErr.textContent = '激活失败：' + ((e && e.message) ? e.message : e);
        inviteBtn.style.display = '';
        showInvite(inviteBoundHash ? 'enter' : 'set');
      }
    }
    inviteBtn.addEventListener('click', function () {
      if (inviteMode === 'set') {
        var p1 = document.getElementById('invPwd1').value, p2 = document.getElementById('invPwd2').value;
        if (p1.length < 6) { inviteErr.textContent = '口令至少 6 位'; return; }
        if (p1 !== p2) { inviteErr.textContent = '两次输入不一致'; return; }
        inviteErr.textContent = '';
        sha256Hex(inviteTokenCur + p1).then(function (h) { return inviteBind(inviteTokenCur, h); }).then(function () { return finishInvite(p1); }).catch(function (e) { inviteErr.textContent = (e && e.message) ? e.message : '绑定失败'; inviteBtn.style.display = ''; });
      } else if (inviteMode === 'enter') {
        var p = document.getElementById('invPwd').value;
        if (!p) { inviteErr.textContent = '请输入口令'; return; }
        sha256Hex(inviteTokenCur + p).then(function (h) {
          if (h !== inviteBoundHash) { inviteErr.textContent = '口令错误'; return; }
          inviteErr.textContent = '';
          finishInvite(p);
        });
      }
    });
    if (inviteSkip) inviteSkip.addEventListener('click', function () { hideInvite(); });

    // 生成邀请链接（设置页）
    var btnGenInvite = document.getElementById('btnGenInvite');
    var inviteResult = document.getElementById('inviteResult');
    var inviteLink = document.getElementById('inviteLink');
    var inviteStatus = document.getElementById('inviteStatus');
    if (btnGenInvite) btnGenInvite.addEventListener('click', function () {
      if (!cloudSpaceKey) { showToast('请先在「云端同步」连接或同步一次'); return; }
      btnGenInvite.disabled = true; btnGenInvite.textContent = '生成中…';
      inviteCreate().then(function (token) {
        var url = location.origin + location.pathname + '?invite=' + token;
        inviteLink.value = url;
        inviteResult.classList.remove('hidden');
        inviteStatus.textContent = '链接已生成，发出去即可。对方打开后会设置自己的访问口令。';
        btnGenInvite.disabled = false; btnGenInvite.textContent = '重新生成邀请链接';
      }).catch(function (e) {
        inviteStatus.textContent = '生成失败：' + ((e && e.message) ? e.message : e);
        btnGenInvite.disabled = false; btnGenInvite.textContent = '生成邀请链接';
      });
    });
    var btnCopyInvite = document.getElementById('btnCopyInvite');
    if (btnCopyInvite) btnCopyInvite.addEventListener('click', function () {
      if (!inviteLink.value) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(inviteLink.value).then(function () { showToast('链接已复制'); }).catch(function () { inviteLink.select(); try { document.execCommand('copy'); } catch (e) {} showToast('链接已复制'); });
      } else { inviteLink.select(); try { document.execCommand('copy'); } catch (e) {} showToast('链接已复制'); }
    });

    // 启动时检查：邀请链接优先于锁屏
    var INVITE_TOKEN = (function () { try { return new URLSearchParams(location.search).get('invite'); } catch (e) { return null; } })();
    if (INVITE_TOKEN) {
      startInviteFlow(INVITE_TOKEN);
    } else if (hasPassword()) {
      isLocked = true; showLock('unlock');
    }
    // 受邀实例（本地已存邀请令牌）不显示「邀请协作」卡片，仅本人工作台可见
    if (localStorage.getItem(INVITE_TOKEN_KEY)) {
      var ic = document.getElementById('inviteCard'); if (ic) ic.style.display = 'none';
    }

    // 保存敏感记录时自动加密写入
    var _origDbPut = dbPut;
    dbPut = function (rec) {
      var p = (ENC_MODS.indexOf(rec.module) >= 0 && rec.fields && !rec.fields._enc && cryptoKey)
        ? encryptFields(rec.fields, cryptoKey).then(function (enc) {
            return _origDbPut({ id: rec.id, date: rec.date, module: rec.module, fields: enc, updatedAt: rec.updatedAt });
          })
        : _origDbPut(rec);
      p.then(function () { if (!suppressDirty) markDirty(); });
      return p;
    };


    // ============ 待办事项 ============
    function loadTodo() {
      try {
        var arr = JSON.parse(localStorage.getItem('zqdd:todo') || '[]');
        // 兼容旧数据（无 id）：补全稳定 id
        var needSave = false;
        arr.forEach(function (t, i) { if (!t.id) { t.id = 't_' + Date.now() + '_' + i; needSave = true; } });
        if (needSave) localStorage.setItem('zqdd:todo', JSON.stringify(arr));
        return arr;
      } catch (e) { return []; }
    }
    function saveTodo(arr) { localStorage.setItem('zqdd:todo', JSON.stringify(arr)); }
    var editingTodoId = null;
    function todoRow(t) {
      if (editingTodoId === t.id) {
        return '<div class="history-item"><div class="hi-main" style="flex:1;"><input class="field-input" id="todoEditInput" value="' + escapeAttr(t.text) + '" style="flex:1;"></div><div class="hi-actions"><span class="hi-edit" data-todo-save="' + t.id + '">保存</span><span class="hi-del" data-todo-cancel="' + t.id + '">取消</span></div></div>';
      }
      var tagChip = (t.tag) ? '<span class="todo-tag-chip">' + escapeHtml(t.tag) + '</span>' : '';
      var done = t.done ? ' style="opacity:0.5; text-decoration:line-through;"' : '';
      return '<div class="history-item"' + done + '><div class="hi-main" data-todo-toggle="' + t.id + '" style="cursor:pointer; flex:1;"><div class="hi-sum">' + tagChip + escapeHtml(t.text) + '</div></div><div class="hi-actions"><span class="hi-edit" data-todo-edit="' + t.id + '">编辑</span><span class="hi-del" data-todo-del="' + t.id + '">×</span></div></div>';
    }
    function renderTodo() {
      var pending = loadTodo().filter(function (t) { return !t.done; });
      var done = loadTodo().filter(function (t) { return t.done; });
      var cp = document.getElementById('todoList');
      var cd = document.getElementById('todoDone');
      if (cp) cp.innerHTML = pending.length ? pending.map(todoRow).join('') : '<div class="history-empty">暂无待办，去添加一条吧</div>';
      if (cd) cd.innerHTML = done.length ? done.map(todoRow).join('') : '<div class="history-empty">还没有已完成的事项</div>';
      var cnt = document.getElementById('todoDoneCount');
      if (cnt) cnt.textContent = done.length ? ('（' + done.length + '）') : '';
    }
    var todoAdd = document.getElementById('todoAdd');
    var todoInput = document.getElementById('todoInput');
    var selectedTodoTag = '';
    var todoTagRow = document.getElementById('todoTagRow');
    if (todoAdd) todoAdd.addEventListener('click', function () {
      var v = todoInput.value.trim();
      if (!v) { showToast('请输入内容'); return; }
      var arr = loadTodo();
      arr.unshift({ id: 't_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6), text: v, done: false, tag: selectedTodoTag });
      saveTodo(arr); renderTodo(); todoInput.value = ''; selectedTodoTag = ''; updateTodoTagUI(); renderStreakBadges(); renderGoalProgress();
    });
    if (todoInput) todoInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') todoAdd.click(); });
    if (todoTagRow) {
      todoTagRow.querySelectorAll('.todo-tag').forEach(function (sp) {
        sp.addEventListener('click', function () {
          selectedTodoTag = sp.getAttribute('data-todo-tag') || '';
          updateTodoTagUI();
        });
      });
    }
    function updateTodoTagUI() {
      if (!todoTagRow) return;
      todoTagRow.querySelectorAll('.todo-tag').forEach(function (sp) {
        sp.classList.toggle('active', (sp.getAttribute('data-todo-tag') || '') === selectedTodoTag);
      });
    }
    updateTodoTagUI();
    document.addEventListener('click', function (e) {
      var tg = e.target.closest('[data-todo-toggle]');
      if (tg) {
        var id = tg.getAttribute('data-todo-toggle');
        var arr = loadTodo();
        var it = arr.filter(function (t) { return t.id === id; })[0];
        if (it) { it.done = !it.done; saveTodo(arr); renderTodo(); }
        return;
      }
      var ed = e.target.closest('[data-todo-edit]');
      if (ed) {
        editingTodoId = ed.getAttribute('data-todo-edit');
        renderTodo();
        var inp = document.getElementById('todoEditInput');
        if (inp) inp.focus();
        return;
      }
      var sv = e.target.closest('[data-todo-save]');
      if (sv) {
        var sid = sv.getAttribute('data-todo-save');
        var input = document.getElementById('todoEditInput');
        var v = input ? input.value.trim() : '';
        if (!v) { showToast('内容不能为空'); return; }
        var arr2 = loadTodo();
        var it2 = arr2.filter(function (t) { return t.id === sid; })[0];
        if (it2) it2.text = v;
        saveTodo(arr2);
        editingTodoId = null; renderTodo();
        return;
      }
      var cx = e.target.closest('[data-todo-cancel]');
      if (cx) { editingTodoId = null; renderTodo(); return; }
      var td = e.target.closest('[data-todo-del]');
      if (td) {
        var did = td.getAttribute('data-todo-del');
        var allT = loadTodo();
        var item = allT.filter(function (t) { return t.id === did; })[0];
        var arr3 = allT.filter(function (t) { return t.id !== did; });
        saveTodo(arr3); renderTodo();
        if (item) showUndoToast('已删除待办', function () {
          var cur = loadTodo();
          if (!cur.some(function (t) { return t.id === did; })) { cur.push(item); saveTodo(cur); renderTodo(); showToast('已恢复'); }
        });
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target && e.target.id === 'todoEditInput') {
        var sv = document.querySelector('[data-todo-save]');
        if (sv) sv.click();
      }
    });

    function showToast(msg) {
      const t = document.getElementById('toast');
      if (!t) return;
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(window.__toastT);
      window.__toastT = setTimeout(function () { t.classList.remove('show'); }, 1600);
    }
    // 删除后短暂可撤销（默认 5 秒）
    function showUndoToast(msg, undoFn, ms) {
      var old = document.getElementById('undoToast'); if (old) old.remove();
      var tip = document.createElement('div');
      tip.id = 'undoToast'; tip.className = 'undo-toast';
      var span = document.createElement('span'); span.textContent = msg;
      var btn = document.createElement('button'); btn.className = 'undo-btn'; btn.textContent = '撤销';
      tip.appendChild(span); tip.appendChild(btn);
      document.body.appendChild(tip);
      requestAnimationFrame(function () { tip.classList.add('show'); });
      var done = false;
      var timer = setTimeout(function () { if (!done) { done = true; tip.classList.remove('show'); setTimeout(function () { tip.remove(); }, 300); } }, ms || 5000);
      btn.addEventListener('click', function () {
        if (done) return; done = true; clearTimeout(timer);
        tip.classList.remove('show'); setTimeout(function () { tip.remove(); }, 300);
        undoFn();
      });
    }
