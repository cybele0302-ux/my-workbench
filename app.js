
    
const APP_VERSION = 'wobench-v27.18';

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
      news: '<rect x="3" y="4" width="13" height="16" rx="2"/><path d="M7 8 H13 M7 11 H13 M7 14 H10"/><path d="M16 8 H18.5 A1.5 1.5 0 0 1 20 9.5 V20 H18"/>',
      star: '<path d="M12 3 L14.6 8.6 L20.5 9.4 L16 13.6 L17.3 19.5 L12 16.4 L6.7 19.5 L8 13.6 L3.5 9.4 L9.4 8.6 Z"/>'
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
      ],
      guiguzi: [
        { title: '捭阖之道', chapter: '捭阖第一', source: '《鬼谷子》', text: '捭阖者，道之大化，说之变也。必豫审其变化。', explain: '捭是开启、是表达，阖是闭合、是缄默。开口与静观，是游说与处世的两种根本力量。懂得在何时言说、何时收束，便能把握人心与事态的流转。于内修而言，也是一种张弛有度的节奏：收放自如，方得从容。' },
        { title: '反以知古', chapter: '反应第二', source: '《鬼谷子》', text: '反以观往，覆以验来；反以知古，覆以知今。', explain: '回头考察过去，用来验证将来；反思古代，用来理解当下。鬼谷子极重"反复"的功夫——让信息在来回回应中显出真相。修行人亦可借回顾自省，照见自己的成长与盲区。' },
        { title: '内揵', chapter: '内揵第三', source: '《鬼谷子》', text: '欲说者务隐度，计事者务循顺。', explain: '想说服别人，要先暗中揣度对方心意；谋划事情，要顺着情理自然推进。这是在教我们：真正的智慧不是强求，而是先理解、再顺势。待人接物若能以对方为起点，关系便通畅无碍。' },
        { title: '揣情', chapter: '揣篇', source: '《鬼谷子》', text: '揣情者，必以其甚喜之时，往而极其欲也；其有欲也，不能隐其情。', explain: '揣摩人心，要在对方最欢喜、欲望最盛时去体会——此时真情难以隐藏。鬼谷子把"识人"变成一门可习的技艺。于修身而言，认识自己亦需在对境起念时观照，方能看清本心的真实取向。' }
      ],
      yinfujing: [
        { title: '观天之道', chapter: '上篇', source: '《阴符经》', text: '观天之道，执天之行，尽矣。', explain: '观察天地自然的运行规律，并按照这个规律去行动，就足够了。这短短十个字，是整部《阴符经》的总纲——天人合一不是空谈，而是切实可行的修行路径。' },
        { title: '天人合发', chapter: '上篇', source: '《阴符经》', text: '天人合发，万化定基。', explain: '天道与人道相合而发动，万物变化的根基便由此确定。修行人若能将自己的节律与天地同步，便能借天地之力成就自身，此即"盗机"之正用。' },
        { title: '心生于物', chapter: '中篇', source: '《阴符经》', text: '心生于物，死于物，机在于目。', explain: '心因外物而生起执着，也因外物而陷溺消亡；关键在于你用什么眼光去看它。"机在于目"——觉悟的契机就在你如何看待万物的那一刻。' },
        { title: '知之修练', chapter: '下篇', source: '《阴符经》', text: '圣人知自然之道不可违，因而制之。', explain: '圣人明白自然规律不可违背，于是顺应它、节制自己。不是征服自然，而是与之和谐共处。修身亦然：不与本性对抗，而是引导它回归正道。' }
      ],
      yizhou: [
        { title: '天行健', chapter: '乾卦·象传', source: '《周易》', text: '天行健，君子以自强不息。', explain: '天的运行刚健有力，君子效法它，自我图强永不停息。这不是外在的拼搏，而是内在生命力的自然流露——如日月运行，不求而自成。' },
        { title: '地势坤', chapter: '坤卦·象传', source: '《周易》', text: '地势坤，君子以厚德载物。', explain: '大地的气势柔顺厚重，君子效法它，以深厚的德行承载万物。刚柔相济才是完整的修养：有自强之志，亦有包容之量。' },
        { title: '一阴一阳', chapter: '系辞上传', source: '《周易》', text: '一阴一阳之谓道。继之者善也，成之者性也。', explain: '阴阳的交互运化就是"道"。能够承继道的是善，能够成就道的是性。这句话点出了宇宙的根本法则——二元对立统一，生生不息。' },
        { title: '穷则变', chapter: '系辞下传', source: '《周易》', text: '穷则变，变则通，通则久。', explain: '路走不通了就要变革，变革了才能通达，通达了才能长久。人生困顿时不必焦虑，因为困境本身就是转机的起点。易学的精髓在于"变"中求通。' }
      ],
      zhuangzi: [
        { title: '逍遥游', chapter: '逍遥游', source: '《庄子》', text: '北冥有鱼，其名为鲲。鲲之大，不知其几千里也。', explain: '庄子开篇即以鲲鹏之喻，打破我们对"大小""长短"的固有执念。真正的自由不是身体的无拘无束，而是心灵不被成见和欲望所束缚。' },
        { title: '庄周梦蝶', chapter: '齐物论', source: '《庄子》', text: '昔者庄周梦为蝴蝶，栩栩然蝴蝶也……不知周之梦为蝴蝶与？', explain: '庄子通过梦蝶提出终极追问：究竟什么是真实的？人生如梦，梦如人生，与其纠结真假，不如放下分别心，体验当下的自在。' },
        { title: '无用之用', chapter: '人间世', source: '《庄子》', text: '人皆知有用之用，而莫知无用之用也。', explain: '人人都知道"有用"的好处，却不知道"无用"的大用。歪脖子树因"不成材"而得以终其天年——有时候，不争不抢、看似无用，恰恰是最大的保全与智慧。' },
        { title: '相濡以沫', chapter: '大宗师', source: '《庄子》', text: '相濡以沫，不如相忘于江湖。', explain: '泉水干涸时鱼儿以唾沫相互润湿，这固然感人，但不如各自在江湖中畅游、彼此遗忘。庄子告诉我们：最高境界的慈悲是不需要互相拖累的各自安好。' }
      ],
      taiyi: [
        { title: '回光守中', chapter: '第一章', source: '《太乙金华宗旨》', text: '回光者，返照也。返照者，返其本有之性也。', explain: '"回光"就是将向外追逐的心光收回，照见自性本有的光明。这部丹经的核心功夫极其简洁：不需要复杂的仪式，只需将意识从外境收回，安住于当下。' },
        { title: '两眼交光', chapter: '第二章', source: '《太乙金华宗旨》', text: '两目之光，乃元神真意之体。双目谛观鼻端，自得神凝气聚。', explain: '将双眼的目光轻轻凝聚于鼻端（或眉心），是金华功法的入门关键。目光内敛则神不外散，神凝则气自然聚集，久之心光透发，如金华灿烂。' },
        { title: '守中勿忘', chapter: '第三章', source: '《太乙金华宗旨》', text: '守此一点，勿忘勿助，久之自有光明发现。', explain: '守住这一点灵光，既不忘记它（昏沉），也不刻意去助长它（急躁）。这种"不即不离"的状态正是道家修炼的中道——任其自然生长，不拔苗助长。' },
        { title: '金华乍现', chapter: '第四章', source: '《太乙金华宗旨》', text: '金华只是这一念，普现无边。才涉有为，便落边际。', explain: '"金华"就是当下一念的清净觉知，它本来遍满一切处。一旦你刻意去追求、去造作，反而落入局限。真正的修行不在作为，而在歇下一切造作后的本然显现。' }
      ]
    };
    let currentJing = 'daodejing';
    function renderXiushenDaily(ds) {
      const d = new Date(ds.replace(/-/g, '/'));
      const idx = d.getDate() - 1;
      renderJingwen(currentJing, idx);
    }

    // ============ 每日养护打卡（独立数据 · 即勾即存）============
    const YANGHU_KEYS = ['推腹', '按摩头皮', '驻颜术', '练习金刚功', '震背', '午时午睡', '经络拉伸操', '泡脚', '梳理经络/按揉穴位', '11点前睡觉', '五脏排毒法'];
    function yanghuActiveDs() { return editingDate || todayStr; }
    function loadYanghu(ds) {
      const r = store[ds + '|yanghu'];
      let f = (r && !isEnc(r)) ? r.fields : {};
      if (f['梳理经络或按重要穴位10分钟']) { f['梳理经络/按揉穴位'] = f['梳理经络或按重要穴位10分钟']; delete f['梳理经络或按重要穴位10分钟']; }
      if (f['靠墙震背呵3分钟']) { f['震背'] = f['靠墙震背呵3分钟']; delete f['靠墙震背呵3分钟']; }
      // v26.11 label migration
      if (f['按摩头皮3分钟']) { f['按摩头皮'] = f['按摩头皮3分钟']; delete f['按摩头皮3分钟']; }
      if (f['震背3分钟']) { f['震背'] = f['震背3分钟']; delete f['震背3分钟']; }
      if (f['午时午睡30分钟']) { f['午时午睡'] = f['午时午睡30分钟']; delete f['午时午睡30分钟']; }
      if (f['泡脚20分钟']) { f['泡脚'] = f['泡脚20分钟']; delete f['泡脚20分钟']; }
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
    const FOLD_MAP = { zhuyan: 'foldZhuyan', jingong: 'foldJingong', lashen: 'foldLashen', wuzang: 'foldWuzang' };
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
      const mods = ['lingguang', 'todo', 'shiti', 'study', 'xiushen', 'zichan', 'yanghu', 'tcm'];
      const tds = ymd(new Date());
      let cnt = 0;
      mods.forEach(function (m) { if (recordsForDay(tds, m).length) cnt++; });
      setText('todayMods', cnt);
      const t = loadTodo();
      const done = t.filter(function (x) { return x.done; }).length;
      setText('todoRate', (t.length ? Math.round(done / t.length * 100) : 0) + '%');
    }

    var DAILY_QUOTES = [
      '道可道，非常道；名可名，非常名。——《道德经》第一章',
      '上善若水，水善利万物而不争。——《道德经》第八章',
      '知人者智，自知者明；胜人者有力，自胜者强。——《道德经》第三十三章',
      '为学日益，为道日损。——《道德经》第四十八章',
      '千里之行，始于足下。——《道德经》第六十四章',
      '祸兮福之所倚，福兮祸之所伏。——《道德经》第五十八章',
      '天之道，利而不害；圣人之道，为而不争。——《道德经》第八十一章',
      '知足者富，强行者有志。——《道德经》第三十三章',
      '天下难事，必作于易；天下大事，必作于细。——《道德经》第六十三章',
      '大巧若拙，大辩若讷。——《道德经》第四十五章',
      '夫唯不争，故天下莫能与之争。——《道德经》第二十二章',
      '飘风不终朝，骤雨不终日。——《道德经》第二十三章',
      '合抱之木，生于毫末；九层之台，起于累土。——《道德经》第六十四章',
      '知足不辱，知止不殆，可以长久。——《道德经》第四十四章',
      '见素抱朴，少私寡欲。——《道德经》第十九章',
      '道生一，一生二，二生三，三生万物。——《道德经》第四十二章',
      '曲则全，枉则直，洼则盈，敝则新。——《道德经》第二十二章',
      '致虚极，守静笃。——《道德经》第十六章',
      '人法地，地法天，天法道，道法自然。——《道德经》第二十五章',
      '静为躁君，重为轻根。——《道德经》第二十六章',
      '少则得，多则惑。——《道德经》第二十二章',
      '上士闻道，勤而行之。——《道德经》第四十一章',
      '我有三宝，持而保之：一曰慈，二曰俭，三曰不敢为天下先。——《道德经》第六十七章',
      '图难于其易，为大于其细。——《道德经》第六十三章'
    ];

    // 首页问候里显示的称呼（想改直接改这里）
    var USER_NICKNAME = 'na';

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
        gEl.innerHTML = '<div class="greeting-main">' + USER_NICKNAME + '，' + g + ' ' + icon + '</div><div class="greeting-sub">' + sub + '</div>';
      }

      var q = DAILY_QUOTES[sum % DAILY_QUOTES.length].replace(/\s*——《[^》]*》.*$/, '');
      var qEl = document.getElementById('dailyQuote');
      if (qEl) qEl.textContent = q;
    }

    var lastDetailDs = ymd(new Date());
    function renderDetail(ds) {
      lastDetailDs = ds;
      const lunar = lunarCn(ds);
      const wd = weekCn(new Date(ds.replace(/-/g, '/')));
      const title = document.getElementById('detailTitle');
      const body = document.getElementById('detailBody');
      if (title) title.textContent = (ds === todayStr ? '今 · ' : '') + ds + ' · ' + lunar + ' · ' + wd;
      if (!body) return;
      const mods = [['lingguang', '灵光闪现'], ['todo', '待办事项'], ['shiti', '实体感录'], ['study', '学习'], ['xiushen', '修身养性'], ['zichan', '理财'], ['yanghu', '每日养护打卡'], ['tcm', '中医学习打卡']];
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
    const DB_NAME = 'zqdd', DB_VER = 3, STORE = 'records', BAK_STORE = 'backups';
    const BAK_LS_KEY = 'zqdd:backupMeta'; // 兜底：备份元数据（IDB 不可用时保证列表能显示）
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
          else if (inp.type === 'range') evt = 'input';
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
    const INSP_TAGS = ['全部', '创作', '工作', '生活', '赚钱', '健康', '学习'];
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
        return '<div class="insp-item" data-insp-id="' + r.id + '"><div class="insp-tags">' + tags + '</div><div class="insp-content">' + escapeHtml(r.fields['灵感内容'] || '') + '</div><div class="insp-foot"><span>' + r.date.slice(5) + ' · ' + lm + '</span><span class="hi-del" data-del="' + r.id + '">删除</span><span class="hi-edit" data-insp-edit="' + r.id + '">编辑</span></div></div>';
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

    // ---- 灵感编辑模式 ----
    function enterInspEdit(id) {
      var r = store[id];
      if (!r || isEnc(r)) return;
      var item = document.querySelector('[data-insp-id="' + id + '"]');
      if (!item) return;
      var content = r.fields['灵感内容'] || '';
      var tags = r.fields['灵感标签'] || '';
      item.innerHTML = '<div class="insp-edit-form">'
        + '<div class="insp-edit-row"><label style="font-size:11px;color:var(--text-sub,#8f82ad);">灵感内容</label><textarea class="field-input" id="inspEditContent" rows="4" style="width:100%;box-sizing:border-box;font-size:14px;">' + escapeHtml(content) + '</textarea></div>'
        + '<div class="insp-edit-row"><label style="font-size:11px;color:var(--text-sub,#8f82ad);">标签（用顿号分隔）</label><input class="field-input" id="inspEditTags" value="' + escapeHtml(tags) + '" placeholder="例如：中医、经典"></div>'
        + '<div class="insp-edit-actions"><button class="ghost-btn" data-insp-save="' + id + '" style="flex:1;font-size:13px;padding:6px;background:linear-gradient(135deg,#8B6FE0,#D8B25E);color:#fff;border:none;border-radius:8px;">保存</button>'
        + '<button class="ghost-btn" data-insp-cancel="' + id + '" style="flex:1;font-size:13px;padding:6px;margin-left:6px;">取消</button></div></div>';
    }
    function saveInspEdit(id) {
      var r = store[id];
      if (!r) return;
      var content = (document.getElementById('inspEditContent').value || '').trim();
      var tags = (document.getElementById('inspEditTags').value || '').trim();
      if (!content) { showToast('灵感内容不能为空'); return; }
      r.fields['灵感内容'] = content;
      r.fields['灵感标签'] = tags;
      r.updatedAt = Date.now();
      dbPut(r).then(function () {
        store[id] = r;
        renderInspirationList();
        showToast('已更新');
      });
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
              + '<div style="width:64px; text-align:right; color:var(--text-main); flex:none;">' + '¥' + Math.round(e[1]).toLocaleString() + '</div></div>';
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
      const sum = '<div style="display:flex; gap:14px; margin-bottom:10px; font-size:12px; padding:4px 0;"><span style="color:#c44569;">支出 ' + '¥' + Math.round(exp).toLocaleString() + '</span><span style="color:#1d9e75;">收入 ' + '¥' + Math.round(inc).toLocaleString() + '</span><span style="color:var(--text-main); font-weight:600;">结余 ' + '¥' + Math.round(inc - exp).toLocaleString() + '</span></div>';
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
      const selfTotalEl = document.getElementById('studySelfTotal');
      if (selfTotalEl) selfTotalEl.textContent = selfMins + ' 分钟';
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
      // 同步更新「学习时长」汇总面板的显示
      const focusEl = document.getElementById('studyFocusTotal');
      let fm = 0;
      if (focusEl) { const m = (focusEl.textContent || '0').match(/\d+/); fm = m ? parseInt(m[0], 10) : 0; }
      const selfTotalEl = document.getElementById('studySelfTotal');
      if (selfTotalEl) selfTotalEl.textContent = v + ' 分钟';
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
      const inspEd = e.target.closest('[data-insp-edit]');
      if (inspEd) { enterInspEdit(inspEd.getAttribute('data-insp-edit')); return; }
      const inspSave = e.target.closest('[data-insp-save]');
      if (inspSave) { saveInspEdit(inspSave.getAttribute('data-insp-save')); return; }
      const inspCancel = e.target.closest('[data-insp-cancel]');
      if (inspCancel) { renderInspirationList(); return; }
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

    // 学习计时：专注计时 / 学习时长 切换 tab
    document.addEventListener('click', function (e) {
      const st = e.target.closest('[data-stimer]');
      if (st) {
        const key = st.getAttribute('data-stimer');
        document.querySelectorAll('[data-stimer]').forEach(function (el) { el.classList.toggle('active', el.getAttribute('data-stimer') === key); });
        document.querySelectorAll('[data-stimer-panel]').forEach(function (p) { p.classList.toggle('hidden', p.getAttribute('data-stimer-panel') !== key); });
      }
      const sh = e.target.closest('[data-shiti]');
      if (sh) {
        const key = sh.getAttribute('data-shiti');
        document.querySelectorAll('[data-shiti]').forEach(function (el) { el.classList.toggle('active', el.getAttribute('data-shiti') === key); });
        document.querySelectorAll('[data-shiti-panel]').forEach(function (p) { p.classList.toggle('hidden', p.getAttribute('data-shiti-panel') !== key); });
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
      let idbOk = false;
      try {
        await backupStorePut({ ts: ts, name: name, encrypted: encrypted, count: arr.length, data: storeData });
        idbOk = true;
        const all = await backupStoreAll();
        if (all.length > BACKUP_MAX) {
          all.sort(function (x, y) { return x.ts - y.ts; });
          await Promise.all(all.slice(0, all.length - BACKUP_MAX).map(function (e) { return backupStoreDelete(e.ts); }));
        }
      } catch (e) {
        console.error('[backup] IDB写入失败:', e);
        showToast('应用内备份写入失败（本地存储不可用或空间不足）；文件已下载到本地，可改从文件恢复');
      }
      // localStorage 兜底：确保列表一定能显示最新备份（解决 IDB 升级/权限/阻塞 等静默失败问题）
      try {
        var lsRaw = localStorage.getItem(BAK_LS_KEY);
        var lsList = lsRaw ? JSON.parse(lsRaw) : [];
        lsList = lsList.filter(function (x) { return x.ts !== ts; }); // 去重
        lsList.push({ ts: ts, name: name, encrypted: encrypted, count: arr.length });
        lsList.sort(function (x, y) { return y.ts - x.ts; });
        if (lsList.length > BACKUP_MAX) lsList = lsList.slice(0, BACKUP_MAX);
        localStorage.setItem(BAK_LS_KEY, JSON.stringify(lsList));
      } catch (e2) { /* localStorage 也不可用就彻底无法兜底 */ }
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
        // IDB 有数据就直接用（权威源）
        if (all && all.length) { renderBackupRows(box, all); return; }
        // IDB 为空时，尝试从 localStorage 兜底读取
        try {
          var lsRaw = localStorage.getItem(BAK_LS_KEY);
          var lsList = lsRaw ? JSON.parse(lsRaw) : [];
          if (lsList && lsList.length) {
            renderBackupRows(box, lsList);
            box.insertAdjacentHTML('afterbegin', '<div class="backup-hint-ls" style="font-size:11px;color:var(--text-light);margin-bottom:6px;">⚠️ 当前显示本地缓存记录，IndexedDB 可能不可用。建议「清除缓存并强制刷新」后重试。</div>');
            return;
          }
        } catch (e) {}
        box.innerHTML = '<div class="backup-empty">暂无应用内备份</div>';
      }).catch(function (err) {
        console.error('[backup] IDB读取失败:', err);
        // IDB 彻底失败时，完全依赖 localStorage 兜底
        try {
          var lsRaw2 = localStorage.getItem(BAK_LS_KEY);
          var lsList2 = lsRaw2 ? JSON.parse(lsRaw2) : [];
          if (lsList2 && lsList2.length) {
            renderBackupRows(box, lsList2);
            box.insertAdjacentHTML('afterbegin', '<div class="backup-hint-ls" style="font-size:11px;color:#c44569;margin-bottom:6px;">⚠️ IndexedDB 不可用，当前显示本地缓存记录。</div>');
            return;
          }
        } catch (e2) {}
        box.innerHTML = '<div class="backup-empty">备份读取失败（本地存储不可用）</div>';
      });
    }
    function renderBackupRows(box, all) {
      all.sort(function (x, y) { return y.ts - x.ts; });
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
    }
    function trimBackups() {
      return backupStoreAll().then(function (all) {
        if (all.length > BACKUP_MAX) {
          all.sort(function (x, y) { return x.ts - y.ts; });
          var removed = all.slice(0, all.length - BACKUP_MAX);
          return Promise.all(removed.map(function (e) { return backupStoreDelete(e.ts); })).then(function () {
            // 同步清理 localStorage 兜底
            try {
              var lsRaw = localStorage.getItem(BAK_LS_KEY);
              var lsList = lsRaw ? JSON.parse(lsRaw) : [];
              var removeTs = removed.map(function (e) { return e.ts; });
              lsList = lsList.filter(function (x) { return removeTs.indexOf(x.ts) === -1; });
              localStorage.setItem(BAK_LS_KEY, JSON.stringify(lsList));
            } catch (e) {}
          });
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
      backupStoreDelete(Number(ts)).then(function () {
        // 同步清理 localStorage 兜底
        try {
          var lsRaw = localStorage.getItem(BAK_LS_KEY);
          var lsList = lsRaw ? JSON.parse(lsRaw) : [];
          lsList = lsList.filter(function (x) { return String(x.ts) !== String(ts); });
          localStorage.setItem(BAK_LS_KEY, JSON.stringify(lsList));
        } catch (e) {}
        renderBackupList();
      });
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
      // 文件/图片二进制体积大，不走云端（Supabase 单次请求有大小上限），仅本地保留，避免同步失败
      var recs = Object.keys(store).map(function (k) {
        var r = store[k];
        if (!r || !r.fields) return r;
        if (r.fields.file || r.fields.image) {
          var c = JSON.parse(JSON.stringify(r));
          if (c.fields.file) c.fields.file = { name: c.fields.file.name, mime: c.fields.file.mime, size: c.fields.file.size, _localOnly: true };
          if (c.fields.image) c.fields.image = null;
          return c;
        }
        return r;
      });
      return {
        records: recs,
        todo: loadTodo(),
        salt: localStorage.getItem(SALT_KEY),
        verifier: localStorage.getItem(VERIFIER_KEY),
        goals: localStorage.getItem(GOAL_KEY),
        aiCfg: localStorage.getItem('zqdd:ai_cfg')
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
          var cloudEnc = !!(c.fields && c.fields._enc);
          var localEnc = !!(local.fields && local.fields._enc);
          // 云端是密文、本地是可见明文：保留本地明文，避免云端密文副本把可见数据覆盖成不可见
          if (cloudEnc && !localEnc) {
            localWins = true; delete cloudById[id]; return;
          }
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
      if (data.aiCfg != null) { localStorage.setItem('zqdd:ai_cfg', data.aiCfg); window.dispatchEvent(new CustomEvent('zqdd:aiCfgSynced')); }
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
      } catch (e) {
        console.error('cloudAutoStart 失败:', e);
        var m = e && e.message ? e.message : '';
        var msg = m ? ('同步失败: ' + m) : '连接失败';
        // 413=请求体过大（通常是收藏的文件/图片太大）；401/403=权限/RLS；网络错=项目可能已被暂停
        if (/413/.test(m)) msg = '同步失败：收藏的文件/图片过大，已改为仅本地保存';
        else if (/40[13]/.test(m)) msg = '同步失败：权限被拒，请检查 Supabase RLS 策略';
        else if (/Failed to fetch|NetworkError|timeout/i.test(m)) msg = '同步失败：无法连接 Supabase（项目可能已暂停或网络问题）';
        setCloudStatus(msg, false);
      }
    }

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
      var w = 300, h = 88, pad = 10;
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
      var gid = 'grad_' + containerId;
      var dots = pts.map(function (p, i) {
        var label = dates[i].slice(5);
        return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.4" fill="#fff" stroke="' + color + '" stroke-width="2"/>' +
          '<text x="' + p[0].toFixed(1) + '" y="' + (h - 1) + '" text-anchor="middle" font-size="7" fill="var(--text-light)">' + label + '</text>';
      }).join('');
      el.innerHTML = '<div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-sub); margin-bottom:4px;"><span>均值 ' + avg + unit + '</span><span>' + (data.length ? ('最高 ' + max + unit) : '') + '</span></div>' +
        '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%; height:' + h + 'px; overflow:visible;">' +
        '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="' + color + '" stop-opacity="0.24"/>' +
        '<stop offset="100%" stop-color="' + color + '" stop-opacity="0"/></linearGradient></defs>' +
        '<path d="' + areaD + '" fill="url(#' + gid + ')"/>' +
        '<path d="' + pathD + '" fill="none" stroke="' + color + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 3px 4px rgba(var(--accent-deep-rgb),0.30));"/>' +
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
      // 养护打卡日目标（今天完成的打卡项数）
      if (goals.yanghu) {
        var ygRec = store[todayStr + '|yanghu'];
        var ygDone = 0;
        if (ygRec && ygRec.fields) {
          Object.keys(ygRec.fields).forEach(function (k) { if (ygRec.fields[k] === true) ygDone++; });
        }
        var pctY = Math.min(100, Math.round(ygDone / goals.yanghu * 100));
        updateGoalBadge('yanghu', pctY, ygDone + '项/' + goals.yanghu + '项', pctY >= 100);
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
    // 目标输入框即时自动保存（blur / 回车触发）
    document.querySelectorAll('.goal-input').forEach(function (inp) {
      inp.addEventListener('blur', saveGoals);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); saveGoals(); } });
    });

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
      text += '\n💰 支出 ' + '¥' + Math.round(exp).toLocaleString() + ' / 收入 ' + '¥' + Math.round(inc).toLocaleString() + ' / 结余 ' + '¥' + Math.round(inc - exp).toLocaleString() + '。';

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

    // ============ 正在阅读 / 已阅读（学习模块） ============
    var READING_KEY = 'readingList';  // localStorage key for today's reading list
    function getReadingData() {
      try { return JSON.parse(localStorage.getItem(READING_KEY) || '[]'); } catch (e) { return []; }
    }
    function saveReadingData(arr) {
      try { localStorage.setItem(READING_KEY, JSON.stringify(arr)); } catch (e) {}
    }
    var READING_EDIT_SVG = '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
    var READING_RESTORE_SVG = '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>';
    var readingEditId = null;

    function renderReadingList() {
      var data = getReadingData();
      var needSave = false;
      data.forEach(function (r) { if (!r.id) { r.id = 'r' + Date.now() + Math.floor(Math.random() * 1000); needSave = true; } });
      if (needSave) saveReadingData(data);
      var active = data.filter(function (r) { return !r.done; });
      var done = data.filter(function (r) { return r.done; });

      var rl = document.getElementById('readingList');
      var re = document.getElementById('readingEmpty');
      var dl = document.getElementById('readDoneList');
      var de = document.getElementById('readDoneEmpty');

      if (rl) rl.innerHTML = '';
      if (dl) dl.innerHTML = '';

      active.forEach(function (item) {
        var el = document.createElement('div');
        el.className = 'reading-item';
        el.innerHTML =
          '<input type="checkbox" class="reading-check" data-rid="' + item.id + '">' +
          '<div class="reading-info">' +
            '<div class="reading-title" title="' + escapeHtml(item.title) + '">' + escapeHtml(item.title) + '</div>' +
            '<div class="reading-progress">' +
              '<input type="number" class="reading-page-input" data-rid="' + item.id + '" value="' + (item.page || 0) + '" min="0"> / ' + (item.total || '?') + ' 页' +
            '</div>' +
          '</div>' +
          '<button class="reading-edit" data-rid="' + item.id + '" title="编辑">' + READING_EDIT_SVG + '</button>' +
          '<button class="reading-del" data-rid="' + item.id + '" title="删除">×</button>';
        if (rl) rl.appendChild(el);
      });
      if (re) re.style.display = (active.length === 0) ? '' : 'none';

      done.forEach(function (item) {
        var el = document.createElement('div');
        el.className = 'reading-item';
        el.innerHTML =
          '<input type="checkbox" class="reading-check" checked disabled>' +
          '<div class="reading-info">' +
            '<div class="reading-title" title="' + escapeHtml(item.title) + '">' + escapeHtml(item.title) + '</div>' +
            '<div class="reading-progress">已完成 · 共 ' + (item.total || '?') + ' 页</div>' +
          '</div>' +
          '<button class="reading-edit" data-rid="' + item.id + '" title="编辑">' + READING_EDIT_SVG + '</button>' +
          '<button class="reading-restore" data-rid="' + item.id + '" title="回到正在阅读">' + READING_RESTORE_SVG + '</button>';
        if (dl) dl.appendChild(el);
      });
      if (de) de.style.display = (done.length === 0) ? '' : 'none';

      function findRec(id) { return data.find(function (r) { return r.id === id; }); }

      if (rl) rl.querySelectorAll('.reading-check').forEach(function (cb) {
        cb.addEventListener('change', function () {
          var rec = findRec(this.getAttribute('data-rid'));
          if (this.checked && rec) { rec.done = true; rec.doneDate = todayStr; saveReadingData(data); renderReadingList(); showToast('已移入「已阅读」'); }
        });
      });
      if (rl) rl.querySelectorAll('.reading-page-input').forEach(function (inp) {
        inp.addEventListener('change', function () {
          var rec = findRec(this.getAttribute('data-rid'));
          if (rec) { rec.page = +this.value || 0; saveReadingData(data); }
        });
      });
      if (rl) rl.querySelectorAll('.reading-del').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var rec = findRec(this.getAttribute('data-rid'));
          if (rec && confirm('删除「' + rec.title + '」？')) { data = data.filter(function (r) { return r.id !== rec.id; }); saveReadingData(data); renderReadingList(); }
        });
      });
      if (rl) rl.querySelectorAll('.reading-edit').forEach(function (btn) {
        btn.addEventListener('click', function () { openEditForm(findRec(this.getAttribute('data-rid'))); });
      });
      if (dl) dl.querySelectorAll('.reading-edit').forEach(function (btn) {
        btn.addEventListener('click', function () { openEditForm(findRec(this.getAttribute('data-rid'))); });
      });
      if (dl) dl.querySelectorAll('.reading-restore').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var rec = findRec(this.getAttribute('data-rid'));
          if (rec) { rec.done = false; rec.doneDate = null; saveReadingData(data); renderReadingList();
            var rt = document.querySelector('.study-reading-tab[data-sread="reading"]'); if (rt) rt.click(); showToast('已移回「正在阅读」'); }
        });
      });
    }

    // 编辑阅读项：打开内联表单并填充
    function openEditForm(rec) {
      if (!rec) return;
      readingEditId = rec.id;
      var t = document.getElementById('newReadTitle');
      var p = document.getElementById('newReadPage');
      var tot = document.getElementById('newReadTotal');
      var ft = document.getElementById('readingFormTitle');
      if (t) t.value = rec.title || '';
      if (p) p.value = rec.page || 0;
      if (tot) tot.value = rec.total || '';
      if (ft) ft.textContent = '编辑阅读项';
      if (readingAddForm) readingAddForm.style.display = '';
      var rt = document.querySelector('.study-reading-tab[data-sread="reading"]'); if (rt) rt.click();
      if (t) t.focus();
    }

    // 添加 / 编辑阅读项
    var btnAddReading = document.getElementById('btnAddReading');
    var readingAddForm = document.getElementById('readingAddForm');
    if (btnAddReading) btnAddReading.addEventListener('click', function () {
      readingEditId = null;
      var ft = document.getElementById('readingFormTitle'); if (ft) ft.textContent = '添加阅读项';
      var t = document.getElementById('newReadTitle'); if (t) t.value = '';
      var p = document.getElementById('newReadPage'); if (p) p.value = '';
      var tot = document.getElementById('newReadTotal'); if (tot) tot.value = '';
      if (readingAddForm) readingAddForm.style.display = '';
      var rt = document.querySelector('.study-reading-tab[data-sread="reading"]'); if (rt) rt.click();
      if (t) t.focus();
    });
    var btnCancelReading = document.getElementById('btnCancelReading');
    if (btnCancelReading) btnCancelReading.addEventListener('click', function () {
      readingEditId = null;
      if (readingAddForm) readingAddForm.style.display = 'none';
    });
    var btnSaveReading = document.getElementById('btnSaveReading');
    if (btnSaveReading) btnSaveReading.addEventListener('click', function () {
      var title = (document.getElementById('newReadTitle').value || '').trim();
      var page = +(document.getElementById('newReadPage').value || 0);
      var total = +(document.getElementById('newReadTotal').value || 0);
      if (!title) { showToast('请输入书名或内容名称'); return; }
      var data = getReadingData();
      var isEdit = !!readingEditId;
      if (readingEditId) {
        var rec = data.find(function (r) { return r.id === readingEditId; });
        if (rec) { rec.title = title; rec.page = page; rec.total = total; }
        readingEditId = null;
      } else {
        data.push({ id: 'r' + Date.now() + Math.floor(Math.random() * 1000), title: title, page: page, total: total, done: false, addedDate: todayStr });
      }
      saveReadingData(data);
      renderReadingList();
      if (readingAddForm) readingAddForm.style.display = 'none';
      var ft = document.getElementById('readingFormTitle'); if (ft) ft.textContent = '添加阅读项';
      showToast(isEdit ? '已保存修改' : '已添加「' + title + '」');
    });

    // 今日学习：正在阅读 / 已阅读 切换 tab
    document.querySelectorAll('.study-reading-tab').forEach(function (t) {
      t.addEventListener('click', function () {
        document.querySelectorAll('.study-reading-tab').forEach(function (x) { x.classList.remove('active'); });
        t.classList.add('active');
        var panel = t.getAttribute('data-sread');
        document.querySelectorAll('[data-sread-panel]').forEach(function (p) {
          p.classList.toggle('hidden', p.getAttribute('data-sread-panel') !== panel);
        });
      });
    });

    // ============ 收藏夹模块 ============
    var FAV_MODULE = 'favorite';
    var currentFavId = null;
    var favTypeActive = 'note';
    var favNewImageData = '';   // 添加收藏时选中的图片 base64
    var favEditImageData = '';  // 编辑时新选中的图片 base64
    var favNewFileData = null;  // 添加收藏时选中的文件 {name,mime,size,data}
    var favEditFileData = null; // 编辑时新选中的文件
    var favCurrentBlobUrl = null; // 详情页当前打开文件的 blob URL（切换时释放）

    // 读取图片文件为 base64 dataURL（用于收藏夹图片类型）
    function readImageFile(input, onLoaded) {
      if (!input || !input.files || !input.files[0]) { onLoaded(''); return; }
      var fr = new FileReader();
      fr.onload = function () { onLoaded(fr.result); };
      fr.onerror = function () { onLoaded(''); };
      fr.readAsDataURL(input.files[0]);
    }

    // 读取任意文件为 base64 dataURL（用于收藏夹文件类型）
    function readFileData(input, onLoaded) {
      if (!input || !input.files || !input.files[0]) { onLoaded(null); return; }
      var f = input.files[0];
      var fr = new FileReader();
      fr.onload = function () {
        onLoaded({ name: f.name, mime: f.type || 'application/octet-stream', size: f.size, data: fr.result });
      };
      fr.onerror = function () { onLoaded(null); };
      fr.readAsDataURL(f);
    }

    function fmtFileSize(bytes) {
      if (!bytes && bytes !== 0) return '';
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
      return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    }

    // 把 base64 dataURL 转成 Blob（用于可靠地打开/预览文件，尤其是 PDF）
    function dataUrlToBlob(dataUrl) {
      try {
        var arr = ('' + dataUrl).split(',');
        var mimeMatch = arr[0].match(/:(.*?);/);
        var mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8 = new Uint8Array(n);
        while (n--) u8[n] = bstr.charCodeAt(n);
        return new Blob([u8], { type: mime });
      } catch (e) { return null; }
    }

    // 直接打开收藏的文件（新标签页预览；大文件用 Blob URL 比 dataURL 更可靠）
    function openFavFile(fileObj) {
      if (!fileObj || !fileObj.data) { showToast('文件数据丢失，无法打开'); return; }
      var blob = dataUrlToBlob(fileObj.data);
      if (!blob) { showToast('文件解析失败，无法打开'); return; }
      var url = URL.createObjectURL(blob);
      var w = window.open(url, '_blank');
      if (!w) showToast('浏览器拦截了弹窗，请允许后重试');
      // 新标签页加载完成后释放（延迟释放，避免预览中失效）
      setTimeout(function () { try { URL.revokeObjectURL(url); } catch (e) {} }, 60000);
    }

    function getFavRecords() {
      var out = [];
      Object.keys(store).forEach(function (id) {
        var r = store[id];
        if (r.module === FAV_MODULE && !isEnc(r)) out.push(r);
      });
      out.sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
      return out;
    }

    function renderFavGrid(filterText) {
      filterText = (filterText || '').toLowerCase().trim();
      var recs = getFavRecords();
      if (filterText) recs = recs.filter(function (r) {
        var t = (r.fields.title || '') + ' ' + (r.fields.tags || '') + ' ' + (r.fields.body || '');
        return t.toLowerCase().indexOf(filterText) >= 0;
      });
      var grid = document.getElementById('favGrid');
      var hint = document.getElementById('favEmptyHint');
      var detail = document.getElementById('favDetailCard');
      if (grid) grid.innerHTML = '';
      if (detail) detail.classList.add('hidden');

      if (recs.length === 0) {
        if (hint) hint.style.display = ''; return;
      }
      if (hint) hint.style.display = 'none';

      recs.forEach(function (r) {
        var card = document.createElement('div');
        card.className = 'fav-card';
        var typeLabel = r.fields.favType || 'note';
        var typeMap = { note:'摘抄', link:'链接', text:'记录', image:'图片', file:'文件' };
        card.innerHTML =
          '<div class="fav-card-type">' + escapeHtml(typeMap[typeLabel] || typeLabel) + '</div>' +
          (r.fields.image ? '<img class="fav-card-thumb" src="' + r.fields.image + '" style="width:100%;max-height:160px;object-fit:cover;border-radius:8px;margin:2px 0 6px;display:block;">' : '') +
          '<div class="fav-card-title">' + escapeHtml(r.fields.title || '无标题') + '</div>' +
          (r.fields.body ? '<div class="fav-card-preview">' + escapeHtml(r.fields.body.substring(0, 80)) + '</div>' : '') +
          (r.fields.file ? '<div class="fav-card-file" data-open-file="1" style="cursor:pointer;">📎 ' + escapeHtml(r.fields.file.name) + ' · ' + fmtFileSize(r.fields.file.size) + '</div>' : '') +
          (r.fields.tags ? '<div><span class="fav-tag">' + r.fields.tags.split(',').map(function(t){return escapeHtml(t.trim());}).join('</span><span class="fav-tag">') + '</span></div>' : '') +
          '<div class="fav-card-date">' + (r.updatedAt ? new Date(r.updatedAt).toLocaleDateString('zh-CN') : '') + '</div>';
        card.addEventListener('click', function () { showFavDetail(r.id); });
        if (r.fields.file) {
          var fchip = card.querySelector('[data-open-file]');
          if (fchip) fchip.addEventListener('click', function (e) { e.stopPropagation(); openFavFile(r.fields.file); });
        }
        if (grid) grid.appendChild(card);
      });
    }

    function showFavDetail(id) {
      var r = store[id];
      if (!r || isEnc(r)) return;
      currentFavId = id;
      favEditing = false;
      var detail = document.getElementById('favDetailCard');
      var grid = document.getElementById('favGrid');
      var hint = document.getElementById('favEmptyHint');
      if (grid) grid.classList.add('hidden');
      if (hint) hint.style.display = 'none';
      if (detail) detail.classList.remove('hidden');

      // 恢复按钮可见性 + 清理编辑操作栏
      var editBtn = document.getElementById('favEditBtn');
      var delBtn = document.getElementById('favDeleteBtn');
      if (editBtn) editBtn.classList.remove('hidden');
      if (delBtn) delBtn.classList.remove('hidden');
      var actionBar = document.getElementById('favEditActionBar');
      if (actionBar) actionBar.remove();

      var typeMap = { note:'摘抄', link:'链接', text:'记录', image:'图片', file:'文件' };
      var dt = document.getElementById('favDTitle');
      var dm = document.getElementById('favDMeta');
      var db = document.getElementById('favDBody');
      var dl = document.getElementById('favDLink');
      var df = document.getElementById('favDFile');
      if (dt) dt.textContent = r.fields.title || '无标题';
      if (dm) dm.textContent = (typeMap[r.fields.favType] || r.fields.favType || '摘抄') + (r.fields.tags ? ' · 标签：' + r.fields.tags : '') + (r.addedDate ? ' · 收藏于 ' + r.addedDate : '');
      if (db) db.textContent = r.fields.body || '(无正文内容)';
      var dImg = document.getElementById('favDImage');
      if (dImg) dImg.innerHTML = r.fields.image ? '<img src="' + r.fields.image + '" style="max-width:100%;border-radius:10px;display:block;">' : '';
      if (dl) {
        if (r.fields.url) { dl.href = r.fields.url; dl.textContent = '打开原始链接 →'; dl.classList.remove('hidden'); }
        else dl.classList.add('hidden');
      }
      if (df) {
        if (r.fields.file && r.fields.file.data) {
          var blob = dataUrlToBlob(r.fields.file.data);
          if (blob) {
            if (favCurrentBlobUrl) { try { URL.revokeObjectURL(favCurrentBlobUrl); } catch (e) {} }
            favCurrentBlobUrl = URL.createObjectURL(blob);
            df.href = favCurrentBlobUrl;
          } else {
            df.href = r.fields.file.data;
          }
          df.removeAttribute('download');
          df.textContent = '📎 打开文件：' + (r.fields.file.name || '未命名文件') + (r.fields.file.size ? ' · ' + fmtFileSize(r.fields.file.size) : '') + ' →';
          df.classList.remove('hidden');
        } else df.classList.add('hidden');
      }
    }

    function hideFavDetail() {
      currentFavId = null;
      favEditing = false;
      var detail = document.getElementById('favDetailCard');
      var grid = document.getElementById('favGrid');
      if (detail) detail.classList.add('hidden');
      if (grid) grid.classList.remove('hidden');
      renderFavGrid(document.getElementById('favSearchInput') ? document.getElementById('favSearchInput').value : '');
    }

    // ---- 收藏编辑模式 ----
    var favEditing = false;
    function enterFavEditMode() {
      if (!currentFavId || favEditing) return;
      var r = store[currentFavId];
      if (!r || isEnc(r)) return;
      favEditing = true;

      var detail = document.getElementById('favDetailCard');
      var dt = document.getElementById('favDTitle');
      var dm = document.getElementById('favDMeta');
      var db = document.getElementById('favDBody');
      var dl = document.getElementById('favDLink');

      // 隐藏按钮行中的 编辑/删除，显示 保存/取消
      var editBtn = document.getElementById('favEditBtn');
      var delBtn = document.getElementById('favDeleteBtn');
      if (editBtn) editBtn.classList.add('hidden');
      if (delBtn) delBtn.classList.add('hidden');

      // 构建编辑表单（内联替换只读内容）
      var typeMapInv = { '摘抄':'note', '链接':'link', '记录':'text', '图片':'image', '文件':'file' };
      var fType = r.fields.favType || 'note';

      dt.innerHTML = '<input class="field-input" id="favEditTitle" style="font-size:16px;font-weight:600;width:100%;box-sizing:border-box;" value="' + escapeHtml(r.fields.title || '') + '" placeholder="标题">';
      dm.innerHTML = '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">'
        + '<div class="fav-type-chips" id="favEditTypeChips" style="flex:1;">'
        + '<span class="fav-type-chip' + (fType==='note'?' active':'') + '" data-favtype="note">摘抄</span>'
        + '<span class="fav-type-chip' + (fType==='link'?' active':'') + '" data-favtype="link">链接</span>'
        + '<span class="fav-type-chip' + (fType==='text'?' active':'') + '" data-favtype="text">记录</span>'
        + '<span class="fav-type-chip' + (fType==='image'?' active':'') + '" data-favtype="image">图片</span>'
        + '<span class="fav-type-chip' + (fType==='file'?' active':'') + '" data-favtype="file">文件</span>'
        + '</div></div>'
        + '<div class="fav-form-row" style="margin-top:6px;"><div class="fav-form-label" style="font-size:11px;">标签</div><input class="field-input" id="favEditTags" value="' + escapeHtml(r.fields.tags || '') + '" placeholder="用逗号分隔"></div>'
        + '<div class="fav-form-row" id="favEditLinkRow" style="margin-top:6px;' + (fType!=='link'?'display:none;':'') + '"><div class="fav-form-label" style="font-size:11px;">链接地址</div><input class="field-input" id="favEditUrl" value="' + escapeHtml(r.fields.url || '') + '" placeholder="https://..."></div>'
        + '<div class="fav-form-row" id="favEditImageRow" style="margin-top:6px;' + (fType!=='image'?'display:none;':'') + '"><div class="fav-form-label" style="font-size:11px;">图片</div><input type="file" accept="image/*" id="favEditImage" class="field-input" style="padding:6px;"><div id="favEditImagePreview" style="margin-top:6px;">' + (r.fields.image ? '<img src="' + r.fields.image + '" style="max-width:140px;border-radius:8px;display:block;">' : '') + '</div></div>'
        + '<div class="fav-form-row" id="favEditFileRow" style="margin-top:6px;' + (fType!=='file'?'display:none;':'') + '"><div class="fav-form-label" style="font-size:11px;">文件</div><input type="file" id="favEditFile" class="field-input" style="padding:6px;"><div id="favEditFilePreview" style="margin-top:6px;color:var(--text-sub,#888);font-size:12px;">' + (r.fields.file ? ('当前：' + escapeHtml(r.fields.file.name) + ' · ' + fmtFileSize(r.fields.file.size)) : '') + '</div></div>';

      db.innerHTML = '<textarea class="field-input" id="favEditBody" rows="8" style="width:100%;box-sizing:border-box;font-size:14px;line-height:1.6;" placeholder="正文内容">' + escapeHtml(r.fields.body || '') + '</textarea>';

      dl.classList.add('hidden');

      // 底部操作栏：保存 / 取消
      var actionBar = document.createElement('div');
      actionBar.id = 'favEditActionBar';
      actionBar.style.cssText = 'display:flex;gap:8px;margin-top:10px;';
      actionBar.innerHTML = '<button class="ghost-btn" id="favSaveEditBtn" style="flex:1;font-size:13px;padding:6px;background:linear-gradient(135deg,#8B6FE0,#D8B25E);color:#fff;border:none;border-radius:8px;">保存修改</button>'
        + '<button class="ghost-btn" id="favCancelEditBtn" style="flex:1;font-size:13px;padding:6px;">取消</button>';
      detail.querySelector('.fav-detail').appendChild(actionBar);

      // 编辑模式：图片选择（重置为新图，保存时若未重选则保留原图）
      favEditImageData = '';
      var feImg = document.getElementById('favEditImage');
      if (feImg) feImg.addEventListener('change', function () {
        readImageFile(feImg, function (data) {
          favEditImageData = data;
          var pv = document.getElementById('favEditImagePreview');
          if (pv) pv.innerHTML = data ? '<img src="' + data + '" style="max-width:140px;border-radius:8px;display:block;">' : '';
        });
      });

      // 编辑模式：文件选择（重置为新文件，保存时若未重选则保留原文件）
      favEditFileData = null;
      var feFile = document.getElementById('favEditFile');
      if (feFile) feFile.addEventListener('change', function () {
        readFileData(feFile, function (f) {
          favEditFileData = f;
          var pv = document.getElementById('favEditFilePreview');
          if (pv) pv.innerHTML = f ? ('已选择：' + escapeHtml(f.name) + ' · ' + fmtFileSize(f.size)) : '';
        });
      });

      // 绑定类型 chip 切换
      document.querySelectorAll('#favEditTypeChips .fav-type-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          document.querySelectorAll('#favEditTypeChips .fav-type-chip').forEach(function (c) { c.classList.remove('active'); });
          this.classList.add('active');
          var t = this.getAttribute('data-favtype');
          var linkRow = document.getElementById('favEditLinkRow');
          if (linkRow) linkRow.style.display = t === 'link' ? '' : 'none';
          var imgRow = document.getElementById('favEditImageRow');
          if (imgRow) imgRow.style.display = t === 'image' ? '' : 'none';
          var fileRow = document.getElementById('favEditFileRow');
          if (fileRow) fileRow.style.display = t === 'file' ? '' : 'none';
        });
      });

      // 绑定保存/取消
      document.getElementById('favSaveEditBtn').addEventListener('click', saveFavEdit);
      document.getElementById('favCancelEditBtn').addEventListener('click', cancelFavEdit);
    }

    function saveFavEdit() {
      if (!currentFavId) return;
      var title = (document.getElementById('favEditTitle').value || '').trim();
      if (!title) { showToast('请输入标题'); return; }

      var activeChip = document.querySelector('#favEditTypeChips .fav-type-chip.active');
      var favType = activeChip ? activeChip.getAttribute('data-favtype') : 'note';
      var tags = (document.getElementById('favEditTags').value || '').trim();
      var url = (document.getElementById('favEditUrl').value || '').trim();
      var body = (document.getElementById('favEditBody').value || '').trim();

      var r = store[currentFavId];
      if (!r) return;
      r.fields.title = title;
      r.fields.favType = favType;
      r.fields.tags = tags;
      r.fields.body = body;
      r.updatedAt = Date.now();
      if (url) r.fields.url = url; else delete r.fields.url;
      if (favEditImageData) r.fields.image = favEditImageData;
      else if (favType !== 'image') delete r.fields.image;
      if (favEditFileData) r.fields.file = favEditFileData;
      else if (favType !== 'file') delete r.fields.file;

      dbPut(r).then(function () { favEditing = false; favEditImageData = ''; favEditFileData = null; showFavDetail(currentFavId); showToast('已更新'); renderFavGrid(); });
    }

    function cancelFavEdit() {
      favEditing = false;
      showFavDetail(currentFavId);
    }

    function escapeHtml(s) {
      var d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }

    // 收藏夹事件绑定
    var favBackBtn = document.getElementById('favBackBtn');
    if (favBackBtn) favBackBtn.addEventListener('click', hideFavDetail);

    var favDeleteBtn = document.getElementById('favDeleteBtn');
    if (favDeleteBtn) favDeleteBtn.addEventListener('click', function () {
      if (!currentFavId) return;
      if (confirm('确定删除这条收藏吗？')) {
        dbDelete(currentFavId).then(function () { delete store[currentFavId]; hideFavDetail(); showToast('已删除'); });
      }
    });

    var favEditBtn = document.getElementById('favEditBtn');
    if (favEditBtn) favEditBtn.addEventListener('click', enterFavEditMode);

    var favSearchInput = document.getElementById('favSearchInput');
    if (favSearchInput) favSearchInput.addEventListener('input', function () { renderFavGrid(this.value); });

    // 类型选择
    document.querySelectorAll('#favTypeChips .fav-type-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('#favTypeChips .fav-type-chip').forEach(function (c) { c.classList.remove('active'); });
        this.classList.add('active');
        favTypeActive = this.getAttribute('data-favtype') || 'note';
        var linkRow = document.getElementById('favLinkRow');
        if (linkRow) linkRow.style.display = (favTypeActive === 'link') ? '' : 'none';
        var imgRow = document.getElementById('favImageRow');
        if (imgRow) imgRow.style.display = (favTypeActive === 'image') ? '' : 'none';
        var fileRow = document.getElementById('favFileRow');
        if (fileRow) fileRow.style.display = (favTypeActive === 'file') ? '' : 'none';
      });
    });

    // 添加收藏：图片类型插入图片
    var favNewImage = document.getElementById('favNewImage');
    if (favNewImage) favNewImage.addEventListener('change', function () {
      readImageFile(favNewImage, function (data) {
        favNewImageData = data;
        var pv = document.getElementById('favImagePreview');
        if (pv) pv.innerHTML = data ? '<img src="' + data + '" style="max-width:140px;border-radius:8px;display:block;">' : '';
      });
    });

    // 添加收藏：文件类型插入文件
    var favNewFile = document.getElementById('favNewFile');
    if (favNewFile) favNewFile.addEventListener('change', function () {
      readFileData(favNewFile, function (f) {
        favNewFileData = f;
        var pv = document.getElementById('favFilePreview');
        if (pv) pv.innerHTML = f ? ('已选择：' + escapeHtml(f.name) + ' · ' + fmtFileSize(f.size)) : '';
      });
    });

    // 保存收藏
    var btnFavSave = document.getElementById('btnFavSave');
    if (btnFavSave) btnFavSave.addEventListener('click', function () {
      var title = (document.getElementById('favNewTitle').value || '').trim();
      if (!title) { showToast('请输入标题'); return; }
      var tags = (document.getElementById('favNewTags').value || '').trim();
      var url = (document.getElementById('favNewUrl').value || '').trim();
      var body = (document.getElementById('favNewBody').value || '').trim();

      var fields = {
        title: title,
        favType: favTypeActive,
        tags: tags,
        body: body,
        addedDate: ymd(new Date())
      };
      if (url) fields.url = url;
      if (favTypeActive === 'image') { if (favNewImageData) fields.image = favNewImageData; }
      else delete fields.image;
      if (favTypeActive === 'file') { if (favNewFileData) fields.file = favNewFileData; }
      else delete fields.file;

      var id = FAV_MODULE + '|' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      var rec = { id: id, module: FAV_MODULE, fields: fields, updatedAt: Date.now(), addedDate: ymd(new Date()) };
      dbPut(rec).then(function () { store[id] = rec; })
        .then(function () {
          document.getElementById('favNewTitle').value = '';
          document.getElementById('favNewTags').value = '';
          document.getElementById('favNewUrl').value = '';
          document.getElementById('favNewBody').value = '';
          favNewImageData = '';
          favNewFileData = null;
          var fi = document.getElementById('favNewImage'); if (fi) fi.value = '';
          var pf = document.getElementById('favNewFile'); if (pf) pf.value = '';
          var pv = document.getElementById('favImagePreview'); if (pv) pv.innerHTML = '';
          var fpv = document.getElementById('favFilePreview'); if (fpv) fpv.innerHTML = '';
          showToast('收藏成功：' + title);
          switchModuleTab(FAV_MODULE, 'today');
          renderFavGrid();
        });
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
          ['lingguang', 'todo', 'shiti', 'study', 'xiushen', 'zichan', 'favorite'].forEach(function (m) { updateModuleHeaderDate(m); switchModuleTab(m, 'today'); });
          // 日记类模块：初始加载即回填当天记录到表单，否则滑杆/输入框会停留在 HTML 默认值（刷新后显示“回到 60”）
          DAILY_MODS.forEach(function (mod) {
            const el = document.getElementById(mod);
            if (!el) return;
            const rec = loadRecord(ymd(new Date()), mod);
            if (Object.keys(rec).length) fillForm(el, rec); else clearForm(el);
          });
          cloudAutoStart();
          checkBackupReminder();
          renderBackupList();
          // 自愈检查：存在加密未解密的记录时提示去「数据诊断与修复」
          setTimeout(function () {
            try {
              var n = encRecords().length;
              if (n > 0) {
                var card = document.getElementById('repairCard');
                if (card) { card.style.display = ''; card.classList.add('repair-alert'); }
                if (!hasPassword()) showToast('检测到 ' + n + ' 条记录处于加密状态，请到设置→数据诊断与修复');
              }
            } catch (e) {}
          }, 800);
          trimBackups().then(renderBackupList);
          renderReadingList();
          renderFavGrid();
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
          ['lingguang', 'todo', 'shiti', 'study', 'xiushen', 'zichan', 'favorite'].forEach(function (m) { updateModuleHeaderDate(m); switchModuleTab(m, 'today'); });
        });
    })();

    // ============ 主题换肤 ============
    function applyTheme(name) {
      if (!name || !document.querySelector('.theme-swatch[data-theme-set="' + name + '"]')) name = 'zichen';
      document.documentElement.setAttribute('data-theme', name);
      localStorage.setItem('zqdd:theme', name);
      document.querySelectorAll('.theme-swatch').forEach(function (s) {
        s.classList.toggle('active', s.getAttribute('data-theme-set') === name);
      });
    }
    applyTheme(localStorage.getItem('zqdd:theme') || 'zichen');
    document.querySelectorAll('.theme-swatch').forEach(function (s) {
      s.addEventListener('click', function () { applyTheme(s.getAttribute('data-theme-set')); });
    });

    // ============ PWA：Service Worker（网络优先，自动接管更新） ============
    let swReg = null;
    if ('serviceWorker' in navigator) {
      // updateViaCache:'none' → 浏览器永远绕过 HTTP 缓存去拉 sw.js，新版本即时生效
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) {
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

    // 强制刷新：清掉所有 SW 缓存 → 跳过等待中的新 SW → 重新加载（拿到最新文件）
    async function forceRefresh() {
      try {
        const ks = await caches.keys();
        await Promise.all(ks.map(function (k) { return caches.delete(k); }));
      } catch (e) {}
      if (swReg && swReg.waiting) { swReg.waiting.postMessage({ type: 'SKIP_WAITING' }); }
      if (swReg) { try { await swReg.update(); } catch (e) {} }
      window.location.reload();
    }
    var btnCheckUpdate = document.getElementById('btnCheckUpdate');
    if (btnCheckUpdate) btnCheckUpdate.addEventListener('click', forceRefresh);
    var btnForceRefresh = document.getElementById('btnForceRefresh');
    if (btnForceRefresh) btnForceRefresh.addEventListener('click', forceRefresh);
    var appVersionLabel = document.getElementById('appVersionLabel');
    if (appVersionLabel) appVersionLabel.textContent = APP_VERSION;

    // ============ 隐私加密（Web Crypto: PBKDF2 + AES-GCM） ============
    const ENC_MODS = ['shiti', 'zichan']; // 需要加密的敏感模块
    const SALT_KEY = 'zqdd:salt', VERIFIER_KEY = 'zqdd:verifier';
    let cryptoKey = null;       // 解锁后持有
    let isLocked = false;
    // 未被「自动加密」包装过的原始写库函数（在下方包装 dbPut 时赋值）。
    // 解密落库必须用它，否则会被包装层重新加密，导致刷新后记录又变密文而不可见。
    var rawDbPut = null;

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
        return decryptFields(r.fields, key).then(function (dec) {
          store[r.id].fields = dec;
          // 用原始写库函数，绕过「自动加密」包装，真正把明文落库
          return (rawDbPut || dbPut)(store[r.id]);
        }).catch(function () {});
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
        // 把敏感记录明文写回 DB（必须绕过自动加密包装，否则又被加密回去）
        var _put = rawDbPut || dbPut;
        var tasks = Object.keys(store).map(function (id) {
          var r = store[id];
          if (ENC_MODS.indexOf(r.module) >= 0 && r.fields && !r.fields._enc) return _put(r);
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

    // ============ 数据诊断与修复 ============
    var MOD_LABEL = { shiti: '实体感录', zichan: '理财', study: '学习', xiushen: '修身', yanghu: '养护', tcm: '中医', inspiration: '灵感' };
    function modLabel(m) { return MOD_LABEL[m] || m; }
    function encRecords() {
      return Object.keys(store).map(function (k) { return store[k]; })
        .filter(function (r) { return r && r.fields && r.fields._enc; });
    }
    function runDiagnose() {
      var out = document.getElementById('repairOutput');
      if (!out) return;
      var byMod = {}, encMod = {};
      Object.keys(store).forEach(function (id) {
        var r = store[id], m = r.module || '(未知)';
        byMod[m] = (byMod[m] || 0) + 1;
        if (r.fields && r.fields._enc) encMod[m] = (encMod[m] || 0) + 1;
      });
      var encTotal = encRecords().length;
      var rows = Object.keys(byMod).sort().map(function (m) {
        var e = encMod[m] || 0;
        var tag = e ? '<span style="color:#c0392b;">（其中 ' + e + ' 条加密未解密）</span>' : '';
        return '<div>· ' + escapeHtml(modLabel(m)) + '：' + byMod[m] + ' 条 ' + tag + '</div>';
      }).join('');
      var st = '';
      st += '<div style="margin-top:8px;">密钥盐(salt)：' + (localStorage.getItem(SALT_KEY) ? '存在' : '<b style="color:#c0392b;">缺失</b>') + '</div>';
      st += '<div>校验器(verifier)：' + (localStorage.getItem(VERIFIER_KEY) ? '存在' : '缺失') + '</div>';
      st += '<div>当前是否已解锁：' + (cryptoKey ? '是' : '否') + '</div>';
      var concl = '';
      if (encTotal > 0) {
        concl = '<div class="repair-warn">检测到 <b>' + encTotal + '</b> 条记录仍是加密状态，因此在历史记录里看不到。请在下方输入曾经设置过的密码，一键解密恢复。</div>';
        var box = document.getElementById('repairPwdBox'); if (box) box.style.display = 'block';
      } else {
        concl = '<div class="repair-ok">没有加密未解密的记录。若某模块条数为 0，说明这些记录本身不在本机，可尝试「立即同步」或导入备份。</div>';
      }
      out.innerHTML = '<div class="repair-report"><div>版本：' + APP_VERSION + '</div><div><b>本机共 ' + Object.keys(store).length + ' 条记录</b></div>' + rows + st + concl + '</div>';
    }
    // 一键解密恢复：解密全部密文记录并以明文落库，同时解除加密设置，避免复发
    async function repairDecryptAll(pwd) {
      var targets = encRecords();
      if (!targets.length) return { ok: true, n: 0, msg: '没有需要解密的记录。' };
      var saltB64 = localStorage.getItem(SALT_KEY);
      if (!saltB64) {
        // 本机 salt 已丢失，尝试从云端备份里取回
        try {
          if (cloudCfg && cloudSpaceKey) {
            var obj = await cloudFind();
            if (obj && obj.payload) {
              var data = await cloudDecrypt(obj.payload, cloudPass);
              if (data && data.salt) { saltB64 = data.salt; localStorage.setItem(SALT_KEY, saltB64); }
            }
          }
        } catch (e) { console.warn('从云端取 salt 失败', e); }
      }
      if (!saltB64) return { ok: false, msg: '本机缺少密钥盐（salt），无法解密。请在曾设置过密码的旧设备或旧链接上导出备份后再导入。' };
      var salt = b642buf(saltB64);
      var key = null, iters = [PBKDF2_ITER, 250000, 100000];
      for (var i = 0; i < iters.length; i++) {
        try {
          var k = await deriveKey(pwd, salt, iters[i]);
          await decryptFields(targets[0].fields, k);
          key = k; break;
        } catch (e) { /* 试下一个迭代次数 */ }
      }
      if (!key) return { ok: false, msg: '密码不正确，或与这批数据加密时使用的密码不一致。' };
      var put = rawDbPut || dbPut, n = 0, fail = 0;
      for (var j = 0; j < targets.length; j++) {
        try {
          var dec = await decryptFields(targets[j].fields, key);
          store[targets[j].id].fields = dec;
          await put(store[targets[j].id]);
          n++;
        } catch (e) { fail++; }
      }
      // 解除加密设置：还原云端口令为明文，清掉 salt/verifier，之后新记录不再加密
      try {
        var raw = localStorage.getItem(CLOUD_PASS_KEY) || '';
        if (raw.indexOf('enc:') === 0) {
          try { var dp = await decryptFields(JSON.parse(raw.slice(4)), key); cloudPass = (dp && dp._p) || cloudPass; } catch (e) {}
          localStorage.setItem(CLOUD_PASS_KEY, cloudPass);
        }
      } catch (e) {}
      localStorage.removeItem(SALT_KEY);
      localStorage.removeItem(VERIFIER_KEY);
      cryptoKey = null; isLocked = false;
      updatePrivacyBadge();
      return { ok: true, n: n, fail: fail };
    }
    var btnDiagnose = document.getElementById('btnDiagnose');
    if (btnDiagnose) btnDiagnose.addEventListener('click', runDiagnose);
    var btnRepairDecrypt = document.getElementById('btnRepairDecrypt');
    if (btnRepairDecrypt) btnRepairDecrypt.addEventListener('click', function () {
      var inp = document.getElementById('repairPwd');
      var out = document.getElementById('repairOutput');
      var pwd = inp ? inp.value : '';
      if (!pwd) { showToast('请输入密码'); return; }
      btnRepairDecrypt.disabled = true; btnRepairDecrypt.textContent = '解密中…';
      repairDecryptAll(pwd).then(function (res) {
        btnRepairDecrypt.disabled = false; btnRepairDecrypt.textContent = '解密恢复';
        if (!res.ok) { if (out) out.innerHTML = '<div class="repair-warn">' + escapeHtml(res.msg) + '</div>'; showToast('恢复失败'); return; }
        if (inp) inp.value = '';
        renderAllCloud();
        if (out) out.innerHTML = '<div class="repair-ok">已恢复 <b>' + res.n + '</b> 条记录' + (res.fail ? '（' + res.fail + ' 条失败）' : '') + '，并已解除加密。请回到实体感录 / 理财查看历史记录。</div>';
        showToast('已恢复 ' + res.n + ' 条记录');
        schedulePush();
      }).catch(function (e) {
        btnRepairDecrypt.disabled = false; btnRepairDecrypt.textContent = '解密恢复';
        console.error(e); showToast('恢复出错');
      });
    });

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
    rawDbPut = _origDbPut;
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
    var editingTodoTag = '';
    function todoRow(t) {
      if (editingTodoId === t.id) {
        var editTags = ['', '生活', '工作', '学习'].map(function (tg) {
          var label = tg || '无';
          var active = (editingTodoTag || '') === tg ? ' active' : '';
          return '<span class="todo-tag' + active + '" data-todo-edittag="' + tg + '">' + label + '</span>';
        }).join('');
        return '<div class="history-item" style="flex-wrap:wrap;"><div class="hi-main" style="flex:1 1 100%;"><input class="field-input" id="todoEditInput" value="' + escapeAttr(t.text) + '" style="width:100%;"></div>'
          + '<div class="todo-tag-row" id="todoEditTagRow" style="flex:1 1 100%; margin-top:8px;">' + editTags + '</div>'
          + '<div class="hi-actions" style="flex:1 1 100%; justify-content:flex-end; margin-top:8px;"><span class="hi-edit" data-todo-save="' + t.id + '">保存</span><span class="hi-del" data-todo-cancel="' + t.id + '">取消</span></div></div>';
      }
      var tagChip = (t.tag) ? '<span class="todo-tag-chip">' + escapeHtml(t.tag) + '</span>' : '';
      var done = t.done ? ' style="opacity:0.5; text-decoration:line-through;"' : '';
      return '<div class="history-item"' + done + '><div class="hi-main" data-todo-toggle="' + t.id + '" style="cursor:pointer; flex:1;"><div class="hi-sum">' + tagChip + escapeHtml(t.text) + '</div></div><div class="hi-actions"><span class="hi-edit" data-todo-edit="' + t.id + '">编辑</span><span class="hi-del" data-todo-del="' + t.id + '">×</span></div></div>';
    }
    function renderTodo() {
      // 渲染筛选 Tab
      var fb = document.getElementById('todoFilterBar');
      if (fb) {
        fb.innerHTML = TODO_FILTER_TAGS.map(function (t) {
          return '<span class="filter-chip' + (t === todoFilterTag ? ' active' : '') + '" data-todo-filter="' + t + '">' + t + '</span>';
        }).join('');
      }
      var allPending = loadTodo().filter(function (t) { return !t.done; });
      var allDone = loadTodo().filter(function (t) { return t.done; });
      // 按标签筛选
      var pending = todoFilterTag === '全部' ? allPending : allPending.filter(function (t) { return (t.tag || '') === todoFilterTag || (todoFilterTag === '无' && !t.tag); });
      var done = todoFilterTag === '全部' ? allDone : allDone.filter(function (t) { return (t.tag || '') === todoFilterTag || (todoFilterTag === '无' && !t.tag); });
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
    var todoFilterTag = '全部';
    var TODO_FILTER_TAGS = ['全部', '生活', '工作', '学习', '无'];
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
        var arrX = loadTodo();
        var itX = arrX.filter(function (t) { return t.id === editingTodoId; })[0];
        editingTodoTag = itX ? (itX.tag || '') : '';
        renderTodo();
        var inp = document.getElementById('todoEditInput');
        if (inp) inp.focus();
        return;
      }
      var etg = e.target.closest('[data-todo-edittag]');
      if (etg) {
        editingTodoTag = etg.getAttribute('data-todo-edittag') || '';
        renderTodo();
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
        if (it2) { it2.text = v; it2.tag = editingTodoTag; }
        saveTodo(arr2);
        editingTodoId = null; editingTodoTag = ''; renderTodo();
        return;
      }
      var cx = e.target.closest('[data-todo-cancel]');
      if (cx) { editingTodoId = null; editingTodoTag = ''; renderTodo(); return; }
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
      var tf = e.target.closest('[data-todo-filter]');
      if (tf) { todoFilterTag = tf.getAttribute('data-todo-filter'); renderTodo(); return; }
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

    /* ================= AI 小助手 ================= */
    var AI_PROVIDERS = {
      deepseek: { base: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
      openai: { base: 'https://api.openai.com/v1', model: 'gpt-4o-mini' },
      qwen: { base: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-plus' },
      glm: { base: 'https://open.bigmodel.cn/api/paas/v4', model: 'glm-4-flash' },
      custom: { base: '', model: '' }
    };
    var AI_MODULES = [
      { key: 'lingguang', name: '灵光闪现' },
      { key: 'todo', name: '待办事项' },
      { key: 'shiti', name: '实体感录' },
      { key: 'study', name: '学习' },
      { key: 'xiushen', name: '修身养性' },
      { key: 'zichan', name: '理财' },
      { key: 'yanghu', name: '每日养护' },
      { key: 'tcm', name: '中医打卡' },
      { key: 'fav', name: '收藏夹' }
    ];
    var AI_CARDS = {
      lingguang: [{ label: '灵感内容', field: '灵感内容' }],
      todo: [{ label: '全部待办', field: '__all__' }],
      shiti: [
        { label: '日记随感', field: '日记随感' },
        { label: '天气·心情', field: '__weather_mood__' },
        { label: '身体变化', field: '身体变化' }
      ],
      study: [
        { label: '专注计时', field: '专注计时' },
        { label: '自主计时', field: '自主时长' },
        { label: '学习时长(合计)', field: '__duration__' },
        { label: '正在阅读', field: '正在阅读' },
        { label: '已阅读', field: '已阅读' }
      ],
      xiushen: [{ label: '每日经文', field: '每日经文' }, { label: '冥想', field: '冥想' }],
      zichan: [{ label: '收支记录', field: '__all__' }],
      yanghu: [{ label: '打卡项', field: '__all__' }],
      tcm: [{ label: '打卡项', field: '__all__' }, { label: '笔记', field: '笔记' }],
      fav: [{ label: '全部收藏', field: '__all__' }]
    };

    function loadAiCfg() {
      try { return JSON.parse(localStorage.getItem('zqdd:ai_cfg') || 'null'); } catch (e) { return null; }
    }
    function saveAiCfg(cfg) { localStorage.setItem('zqdd:ai_cfg', JSON.stringify(cfg)); }

    function aiFormatVal(v) {
      if (v === null || v === undefined) return '';
      if (Array.isArray(v)) {
        return v.map(function (it) {
          if (it && typeof it === 'object') return Object.keys(it).map(function (k) { return k + '=' + it[k]; }).join('/');
          return String(it);
        }).join('、');
      }
      if (typeof v === 'object') return Object.keys(v).map(function (k) { return k + '=' + v[k]; }).join('/');
      return String(v);
    }
    function aiSerializeRecord(r, cardField) {
      if (cardField && cardField !== '__all__') {
        if (cardField === '__weather_mood__') {
          var wm = [];
          if (r.fields && r.fields['天气']) wm.push('天气:' + r.fields['天气']);
          if (r.fields && r.fields['今日心情']) wm.push('心情:' + r.fields['今日心情']);
          return wm.length ? wm.join('；') : '(无)';
        }
        if (cardField === '__duration__') {
          var f = Number((r.fields && r.fields['专注计时']) || 0), s = Number((r.fields && r.fields['自主时长']) || 0);
          return '专注 ' + f + ' 分 + 自主 ' + s + ' 分 = ' + (f + s) + ' 分';
        }
        var v = r.fields ? r.fields[cardField] : undefined;
        if (v === undefined || v === '') return '(无)';
        return aiFormatVal(v);
      }
      var parts = [];
      var flds = r.fields || {};
      Object.keys(flds).forEach(function (k) { if (flds[k] !== '' && flds[k] !== undefined) parts.push(k + ':' + aiFormatVal(flds[k])); });
      return parts.length ? parts.join('；') : '(空)';
    }
    function aiModName(key) { var m = AI_MODULES.filter(function (x) { return x.key === key; })[0]; return m ? m.name : key; }

    function buildAnalysisContext() {
      var scopeType = document.getElementById('aiScopeType').value;
      var scopeVal = document.getElementById('aiScopeVal').value;
      var days = parseInt(document.getElementById('aiDays').value, 10) || 0;
      var cutoff = days > 0 ? ymd(new Date(Date.now() - days * 86400000)) : '';
      var recs = [];
      var scopeLabel = '';
      var cardField = '__all__';

      if (scopeType === 'all') {
        recs = Object.keys(store).map(function (k) { return store[k]; }).filter(function (r) { return !isEnc(r); });
        scopeLabel = '全部工作台';
      } else if (scopeType === 'module') {
        recs = recordsForModule(scopeVal).filter(function (r) { return !isEnc(r); });
        scopeLabel = '模块：' + aiModName(scopeVal);
      } else if (scopeType === 'card') {
        var parts = (scopeVal || '').split('::');
        var mod = parts[0], field = parts[1] || '__all__';
        cardField = field;
        recs = recordsForModule(mod).filter(function (r) { return !isEnc(r); });
        var cardLabel = field;
        if (AI_CARDS[mod]) { var c = AI_CARDS[mod].filter(function (x) { return x.field === field; })[0]; if (c) cardLabel = c.label; }
        scopeLabel = '卡片：' + aiModName(mod) + ' · ' + cardLabel;
      }

      if (cutoff) recs = recs.filter(function (r) { return r.date >= cutoff; });
      recs.sort(function (a, b) { return a.date < b.date ? -1 : 1; });

      var wantTodo = scopeType === 'all' || (scopeType === 'module' && scopeVal === 'todo') || (scopeType === 'card' && (scopeVal || '').indexOf('todo::') === 0);
      if (wantTodo) {
        try {
          var todos = JSON.parse(localStorage.getItem('zqdd:todo') || '[]');
          todos.forEach(function (t) {
            recs.push({ date: '(待办)', module: 'todo', fields: { 内容: t.text, 标签: t.tag || '无', 状态: t.done ? '已完成' : '未完成' } });
          });
        } catch (e) {}
      }

      if (!recs.length) return { label: scopeLabel, empty: true, text: '' };

      var lines = recs.map(function (r) {
        var body = aiSerializeRecord(r, cardField);
        var modName = (r.module === 'todo') ? '' : (' · ' + aiModName(r.module));
        return '【' + r.date + modName + '】' + body;
      });
      return { label: scopeLabel, empty: false, text: lines.join('\n') };
    }

    function aiAppendMsg(role, text) {
      var chat = document.getElementById('aiChat');
      if (!chat) return;
      var div = document.createElement('div');
      div.className = 'ai-msg ' + (role === 'user' ? 'ai-user' : 'ai-ai');
      div.textContent = text;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
      return div;
    }

    function aiCall(userMsg, ctx, doneCb) {
      var cfg = loadAiCfg();
      if (!cfg || !cfg.key) {
        doneCb('⚠️ 还没配置 API Key。请去「设置 → AI 小助手配置」选服务商并填入 Key（如 DeepSeek）后再试。');
        return;
      }
      var sysPrompt = '你是"我的工作台"这款个人自律记录 App 的 AI 小助手。用户的 App 记录了他/她的学习、待办、实体感录（日记/天气/心情/身体）、修身养性（每日经文/冥想）、理财收支、每日养护打卡、中医打卡、灵感收藏等。'
        + '当用户让你"分析记录"时，会附上【分析范围】和【用户记录数据】（每行一条，格式【日期 · 模块】字段:值）。请你：'
        + '1) 基于真实数据给出客观总结（趋势、频率、完成度）；2) 发现亮点与可改进的短板；3) 给出 2-4 条具体、可执行的建议；4) 语气温柔鼓励、像懂他的朋友。'
        + '如果用户只是闲聊或问问题，自然回答即可。回答用中文，条理清晰，可用简短分点。';
      var userContent = (ctx && !ctx.empty ? ('【分析范围】' + ctx.label + '\n【用户记录数据】\n' + ctx.text + '\n\n') : '') + userMsg;

      fetch(cfg.base.replace(/\/$/, '') + '/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.key },
        body: JSON.stringify({
          model: cfg.model,
          messages: [
            { role: 'system', content: sysPrompt },
            { role: 'user', content: userContent }
          ],
          temperature: 0.7
        })
      }).then(function (res) {
        if (!res.ok) return res.text().then(function (t) { throw new Error('HTTP ' + res.status + '：' + t.slice(0, 200)); });
        return res.json();
      }).then(function (data) {
        var txt = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : '(无返回)';
        doneCb(txt);
      }).catch(function (err) {
        doneCb('❌ 调用失败：' + err.message + '\n\n请检查：① API Key 是否正确；② Base URL 是否完整（需含 /v1）；③ 当前网络能否访问该服务。');
      });
    }

    function aiPopulateScopeVal() {
      var type = document.getElementById('aiScopeType').value;
      var sel = document.getElementById('aiScopeVal');
      if (!sel) return;
      sel.innerHTML = '';
      if (type === 'module') {
        AI_MODULES.forEach(function (m) {
          var o = document.createElement('option'); o.value = m.key; o.textContent = m.name; sel.appendChild(o);
        });
        sel.style.display = '';
      } else if (type === 'card') {
        AI_MODULES.forEach(function (m) {
          var cards = AI_CARDS[m.key] || [{ label: '全部', field: '__all__' }];
          cards.forEach(function (c) {
            var o = document.createElement('option'); o.value = m.key + '::' + c.field; o.textContent = m.name + ' · ' + c.label; sel.appendChild(o);
          });
        });
        sel.style.display = '';
      } else {
        sel.style.display = 'none';
      }
    }

    function aiResetOptions() {
      var st = document.getElementById('aiScopeType');
      var sv = document.getElementById('aiScopeVal');
      var days = document.getElementById('aiDays');
      if (st) st.value = 'all';
      if (sv) { sv.innerHTML = ''; sv.style.display = 'none'; }
      if (days) days.value = '7';
      showToast('已清除选项，恢复默认状态');
    }
    function aiResetChat() {
      var chat = document.getElementById('aiChat');
      if (chat) chat.innerHTML = '';
      showToast('已清除对话，恢复默认状态');
    }

    function aiInit() {
      var scopeType = document.getElementById('aiScopeType');
      var aiSend = document.getElementById('aiSend');
      var aiInput = document.getElementById('aiInput');
      if (scopeType) { aiPopulateScopeVal(); scopeType.addEventListener('change', aiPopulateScopeVal); }
      function doSend() {
        var msg = aiInput ? aiInput.value.trim() : '';
        if (!msg) { showToast('请输入问题'); return; }
        aiAppendMsg('user', msg);
        if (aiInput) aiInput.value = '';
        var loading = aiAppendMsg('ai', '思考中…');
        var ctx = buildAnalysisContext();
        if (ctx.empty) ctx = null;
        aiCall(msg, ctx, function (resp) { if (loading) loading.textContent = resp; });
      }
      if (aiSend) aiSend.addEventListener('click', doSend);
      if (aiInput) aiInput.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); } });

      var aiClearBtn = document.getElementById('aiClearBtn');
      var aiClearMenu = document.getElementById('aiClearMenu');
      if (aiClearBtn && aiClearMenu) {
        aiClearBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          aiClearMenu.classList.toggle('hidden');
        });
        var aiClearOpts = document.getElementById('aiClearOpts');
        var aiClearChat = document.getElementById('aiClearChat');
        if (aiClearOpts) aiClearOpts.addEventListener('click', function () { aiClearMenu.classList.add('hidden'); aiResetOptions(); });
        if (aiClearChat) aiClearChat.addEventListener('click', function () { aiClearMenu.classList.add('hidden'); aiResetChat(); });
        document.addEventListener('click', function (e) {
          if (!aiClearMenu.classList.contains('hidden') && !aiClearMenu.contains(e.target) && e.target !== aiClearBtn) {
            aiClearMenu.classList.add('hidden');
          }
        });
      }

      var provider = document.getElementById('aiProvider');
      var baseUrl = document.getElementById('aiBaseUrl');
      var model = document.getElementById('aiModel');
      var apiKey = document.getElementById('aiApiKey');
      var saveCfg = document.getElementById('aiSaveCfg');
      var testCfg = document.getElementById('aiTestCfg');
      var cfgStatus = document.getElementById('aiCfgStatus');
      var saved = loadAiCfg();
      if (saved) {
        if (provider && saved.provider) provider.value = saved.provider;
        if (baseUrl && saved.base) baseUrl.value = saved.base;
        if (model && saved.model) model.value = saved.model;
        if (apiKey && saved.key) apiKey.value = saved.key;
      } else if (provider) {
        provider.value = 'deepseek';
        if (baseUrl) baseUrl.value = AI_PROVIDERS.deepseek.base;
        if (model) model.value = AI_PROVIDERS.deepseek.model;
      }
      if (provider) provider.addEventListener('change', function () {
        var p = AI_PROVIDERS[provider.value];
        if (p && p.base) { if (baseUrl) baseUrl.value = p.base; if (model) model.value = p.model; }
      });
      window.addEventListener('zqdd:aiCfgSynced', function () {
        var s2 = loadAiCfg();
        if (s2) {
          if (provider && s2.provider) provider.value = s2.provider;
          if (baseUrl && s2.base) baseUrl.value = s2.base;
          if (model && s2.model) model.value = s2.model;
          if (apiKey && s2.key) apiKey.value = s2.key;
        }
      });
      if (saveCfg) saveCfg.addEventListener('click', function () {
        var cfg = {
          provider: provider ? provider.value : 'deepseek',
          base: baseUrl ? baseUrl.value.trim() : '',
          model: model ? model.value.trim() : '',
          key: apiKey ? apiKey.value.trim() : ''
        };
        if (!cfg.key) { if (cfgStatus) { cfgStatus.className = 'ai-cfg-status err'; cfgStatus.textContent = '请填写 API Key'; } return; }
        if (!cfg.base) { if (cfgStatus) { cfgStatus.className = 'ai-cfg-status err'; cfgStatus.textContent = '请填写接口地址 Base URL'; } return; }
        saveAiCfg(cfg);
        schedulePush();
        var synced = !!(cloudCfg && cloudSpaceKey);
        if (cfgStatus) { cfgStatus.className = 'ai-cfg-status ok'; cfgStatus.textContent = '✅ 已保存' + (synced ? '（已同步云端，其他设备自动可用）' : '（本机，连上云端后自动同步）'); }
        showToast('AI 配置已保存');
      });
      if (testCfg) testCfg.addEventListener('click', function () {
        var cfg = {
          provider: provider ? provider.value : 'deepseek',
          base: baseUrl ? baseUrl.value.trim() : '',
          model: model ? model.value.trim() : '',
          key: apiKey ? apiKey.value.trim() : ''
        };
        if (!cfg.key || !cfg.base) { if (cfgStatus) { cfgStatus.className = 'ai-cfg-status err'; cfgStatus.textContent = '请先填 Key 和 Base URL'; } return; }
        if (cfgStatus) { cfgStatus.className = 'ai-cfg-status'; cfgStatus.textContent = '连接测试中…'; }
        fetch(cfg.base.replace(/\/$/, '') + '/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.key },
          body: JSON.stringify({ model: cfg.model, messages: [{ role: 'user', content: 'ping' }], temperature: 0.5 })
        }).then(function (res) {
          if (!res.ok) return res.text().then(function (t) { throw new Error('HTTP ' + res.status + '：' + t.slice(0, 160)); });
          return res.json();
        }).then(function () {
          if (cfgStatus) { cfgStatus.className = 'ai-cfg-status ok'; cfgStatus.textContent = '✅ 连接成功，可以开始使用了'; }
        }).catch(function (err) {
          if (cfgStatus) { cfgStatus.className = 'ai-cfg-status err'; cfgStatus.textContent = '❌ 测试失败：' + err.message; }
        });
      });
    }
    aiInit();
