// Static markup for the /Lefkada trip page. Rendered via dangerouslySetInnerHTML
// in LefkadaPage.tsx, which also drives the countdown and reveal animations.
export const LEFKADA_HTML = `
<style>
  :root {
    --abyss: #04131D;
    --deep: #0A3245;
    --sea: #0E5E77;
    --turq: #17B2C4;
    --turq-soft: #DDF2F5;
    --foam: #EAF4F5;
    --paper: #F4F8F8;
    --card: #FFFFFF;
    --ink: #0F2430;
    --ink-soft: #47616E;
    --line: #D8E4E7;
    --sand: #E9DFC8;
    --sun: #F4B860;
    --olive: #75803B;
    --olive-soft: #F0F1E0;
    --hero-text: #F2FAFB;
    --shadow: 0 2px 4px rgba(6, 30, 42, .05), 0 12px 32px rgba(6, 30, 42, .09);
    --shadow-lift: 0 4px 8px rgba(6, 30, 42, .07), 0 20px 44px rgba(6, 30, 42, .14);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --paper: #081C27;
      --foam: #0B2230;
      --card: #102937;
      --ink: #E2EEF2;
      --ink-soft: #93ACB8;
      --line: #1F3D4E;
      --turq-soft: #10394A;
      --olive-soft: #22290F;
      --sand: #2E2A1B;
      --shadow: 0 2px 4px rgba(0,0,0,.3), 0 12px 32px rgba(0,0,0,.35);
      --shadow-lift: 0 4px 8px rgba(0,0,0,.35), 0 20px 44px rgba(0,0,0,.5);
    }
  }
  :root[data-theme="dark"] {
    --paper: #081C27;
    --foam: #0B2230;
    --card: #102937;
    --ink: #E2EEF2;
    --ink-soft: #93ACB8;
    --line: #1F3D4E;
    --turq-soft: #10394A;
    --olive-soft: #22290F;
    --sand: #2E2A1B;
    --shadow: 0 2px 4px rgba(0,0,0,.3), 0 12px 32px rgba(0,0,0,.35);
    --shadow-lift: 0 4px 8px rgba(0,0,0,.35), 0 20px 44px rgba(0,0,0,.5);
  }
  :root[data-theme="light"] {
    --paper: #F4F8F8;
    --foam: #EAF4F5;
    --card: #FFFFFF;
    --ink: #0F2430;
    --ink-soft: #47616E;
    --line: #D8E4E7;
    --turq-soft: #DDF2F5;
    --olive-soft: #F0F1E0;
    --sand: #E9DFC8;
    --shadow: 0 2px 4px rgba(6, 30, 42, .05), 0 12px 32px rgba(6, 30, 42, .09);
    --shadow-lift: 0 4px 8px rgba(6, 30, 42, .07), 0 20px 44px rgba(6, 30, 42, .14);
  }

  html { scroll-behavior: smooth; }
  body { margin: 0; background: var(--paper); }

  .lfk {
    direction: rtl;
    font-family: "Noto Sans Hebrew", "Segoe UI", "Arial Hebrew", Arial, sans-serif;
    color: var(--ink);
    background: var(--paper);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }
  .lfk * { box-sizing: border-box; }
  .wrap { max-width: 1020px; margin: 0 auto; padding: 0 22px; }

  /* ============ reveal (progressive enhancement) ============ */
  @media (prefers-reduced-motion: no-preference) {
    .lfk.js [data-reveal] { opacity: 0; transform: translateY(18px); }
    .lfk.js [data-reveal].in { opacity: 1; transform: none; transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
  }

  /* ============ HERO ============ */
  .hero {
    position: relative;
    background:
      radial-gradient(120% 90% at 80% -10%, #10516B 0%, transparent 55%),
      radial-gradient(100% 80% at 10% 110%, #0E5E77 0%, transparent 50%),
      linear-gradient(185deg, #03101A 0%, #062334 42%, #0A4157 78%, #0E5E77 100%);
    color: var(--hero-text);
    padding: 0 0 130px;
    overflow: hidden;
  }
  .hero::before {
    content: "";
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(255,255,255,.14) 1px, transparent 1.4px);
    background-size: 26px 26px;
    mask-image: linear-gradient(180deg, rgba(0,0,0,.5), transparent 55%);
    -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,.5), transparent 55%);
    pointer-events: none;
  }
  .hero-inner { position: relative; padding-top: 92px; text-align: center; }
  .hero .kicker {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 12.5px; font-weight: 700; letter-spacing: .22em;
    color: #9FD9E4; text-transform: uppercase;
    border: 1px solid rgba(159, 217, 228, .35); border-radius: 999px;
    padding: 8px 20px; backdrop-filter: blur(4px); background: rgba(255,255,255,.04);
  }
  .hero h1 {
    margin: 34px 0 0; font-weight: 900; line-height: 1.04;
    font-size: clamp(52px, 11vw, 118px); letter-spacing: -0.01em; text-wrap: balance;
  }
  .hero h1 .grad {
    background: linear-gradient(100deg, #7FE3F0 10%, #2FC6D8 45%, #F4B860 105%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .hero .sub {
    margin: 22px auto 0; max-width: 34em; font-size: clamp(16px, 2.4vw, 20px);
    color: #BFDDE6; font-weight: 400;
  }
  .hero .sub b { color: #fff; font-weight: 700; }
  .statbar {
    margin: 46px auto 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 14px;
  }
  .stat-card {
    min-width: 128px; padding: 16px 22px; border-radius: 16px;
    background: rgba(255, 255, 255, .07); border: 1px solid rgba(255,255,255,.14);
    backdrop-filter: blur(8px);
  }
  .stat-card b {
    display: block; font-size: 30px; font-weight: 900; color: #fff;
    font-variant-numeric: tabular-nums; line-height: 1.15;
  }
  .stat-card span { font-size: 13px; color: #9FC5D1; font-weight: 600; }
  .stat-card.hot b { color: var(--sun); }

  .boat-float { margin: 54px auto 0; width: 96px; opacity: .95; }
  @media (prefers-reduced-motion: no-preference) {
    .boat-float { animation: bob 5.2s ease-in-out infinite; }
    @keyframes bob {
      0%, 100% { transform: translateY(0) rotate(-1.6deg); }
      50% { transform: translateY(-10px) rotate(1.8deg); }
    }
  }
  .waves { position: absolute; bottom: -2px; left: 0; right: 0; pointer-events: none; }
  .waves svg { display: block; width: 100%; height: 110px; }
  .w1, .w2, .w3 { will-change: transform; }
  @media (prefers-reduced-motion: no-preference) {
    .w1 { animation: drift 13s linear infinite; }
    .w2 { animation: drift 8.5s linear infinite reverse; opacity: .55; }
    .w3 { animation: drift 19s linear infinite; opacity: .35; }
    @keyframes drift { from { transform: translateX(0); } to { transform: translateX(-260px); } }
  }

  /* ============ NAV ============ */
  .nav {
    position: sticky; top: 0; z-index: 50;
    background: color-mix(in srgb, var(--paper) 82%, transparent);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--line);
  }
  .nav-inner {
    display: flex; gap: 4px; overflow-x: auto; padding: 10px 18px;
    max-width: 1020px; margin: 0 auto; scrollbar-width: none;
  }
  .nav-inner::-webkit-scrollbar { display: none; }
  .nav a {
    flex: none; font-size: 14px; font-weight: 700; color: var(--ink-soft);
    text-decoration: none; padding: 7px 15px; border-radius: 999px;
    transition: background .15s ease, color .15s ease;
  }
  .nav a:hover, .nav a:focus-visible { background: var(--turq-soft); color: var(--sea); outline: none; }

  /* ============ SECTIONS ============ */
  .sec { padding: 88px 0 8px; }
  .eyebrow {
    font-size: 12px; font-weight: 800; letter-spacing: .24em; text-transform: uppercase;
    color: var(--turq); margin: 0 0 10px;
  }
  .sec h2 {
    margin: 0 0 14px; font-size: clamp(30px, 4.6vw, 44px); font-weight: 900;
    line-height: 1.12; letter-spacing: -0.01em; text-wrap: balance;
  }
  .sec .lead { margin: 0 0 40px; max-width: 46em; font-size: 17px; color: var(--ink-soft); }

  /* ============ GLANCE TIMELINE ============ */
  .glance { display: grid; grid-template-columns: repeat(auto-fit, minmax(215px, 1fr)); gap: 14px; }
  .g-day {
    background: var(--card); border: 1px solid var(--line); border-radius: 18px;
    padding: 18px 20px 16px; box-shadow: var(--shadow); position: relative; overflow: hidden;
  }
  .g-day::before {
    content: ""; position: absolute; inset-inline-start: 0; top: 0; bottom: 0; width: 4px;
    background: linear-gradient(180deg, var(--turq), var(--sea));
  }
  .g-day.land::before { background: linear-gradient(180deg, var(--sun), var(--olive)); }
  .g-date { font-size: 13px; font-weight: 800; color: var(--turq); font-variant-numeric: tabular-nums; letter-spacing: .06em; }
  .g-day.land .g-date { color: var(--olive); }
  .g-day h3 { margin: 4px 0 6px; font-size: 17px; font-weight: 800; line-height: 1.3; }
  .g-day p { margin: 0; font-size: 13.5px; color: var(--ink-soft); line-height: 1.55; }

  /* ============ MAP ============ */
  .map-shell {
    border-radius: 24px; overflow: hidden; box-shadow: var(--shadow-lift);
    border: 1px solid var(--line); background: var(--card);
  }
  .map-sea {
    background:
      radial-gradient(90% 90% at 15% 10%, #0F4A62 0%, transparent 60%),
      linear-gradient(160deg, #0A3245 0%, #0C4258 55%, #0E5670 100%);
    overflow-x: auto;
  }
  .map-sea svg { display: block; min-width: 620px; width: 100%; height: auto; }
  .map-foot {
    display: flex; flex-wrap: wrap; gap: 18px; align-items: center;
    padding: 14px 22px; font-size: 13px; color: var(--ink-soft); background: var(--card);
  }
  .map-key { display: inline-flex; align-items: center; gap: 7px; font-weight: 600; }
  .dot { width: 11px; height: 11px; border-radius: 50%; display: inline-block; }
  .dot.port { background: #7FE3F0; box-shadow: 0 0 0 3px rgba(127,227,240,.25); }
  .dot.swim { background: var(--sun); box-shadow: 0 0 0 3px rgba(244,184,96,.25); }

  /* ============ DAYS ============ */
  .day {
    display: grid; grid-template-columns: 92px 1fr; gap: 26px;
    padding: 34px 0; border-bottom: 1px solid var(--line);
  }
  .day:last-of-type { border-bottom: none; }
  .day-no { text-align: center; }
  .day-no b {
    display: block; font-size: 56px; font-weight: 900; line-height: 1;
    background: linear-gradient(160deg, var(--turq), var(--sea));
    -webkit-background-clip: text; background-clip: text; color: transparent;
    font-variant-numeric: tabular-nums;
  }
  .day-no span { font-size: 13px; font-weight: 700; color: var(--ink-soft); }
  .day-body h3 { margin: 2px 0 4px; font-size: 22px; font-weight: 800; }
  .day-route {
    display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
    margin: 10px 0 14px; font-size: 14.5px; font-weight: 700;
  }
  .hop {
    background: var(--turq-soft); color: var(--sea); border-radius: 999px; padding: 4px 14px;
  }
  :root[data-theme="dark"] .hop, :root:not([data-theme="light"]) .hop { color: var(--turq); }
  @media (prefers-color-scheme: light) { :root:not([data-theme="dark"]) .hop { color: var(--sea); } }
  .hop.swim { background: color-mix(in srgb, var(--sun) 22%, var(--card)); color: color-mix(in srgb, var(--sun) 60%, var(--ink)); }
  .arrow { color: var(--ink-soft); opacity: .6; transform: scaleX(-1); }
  .day-stats { display: flex; flex-wrap: wrap; gap: 18px; margin: 0 0 14px; font-size: 13.5px; color: var(--ink-soft); font-weight: 700; font-variant-numeric: tabular-nums; }
  .day-stats i { font-style: normal; color: var(--turq); margin-inline-end: 5px; }
  .day-body p { margin: 0 0 10px; font-size: 15.5px; max-width: 52em; }
  .day-alt {
    margin-top: 14px; padding: 12px 18px; border-radius: 12px; font-size: 14px;
    background: var(--foam); border: 1px dashed var(--line); color: var(--ink-soft); max-width: 52em;
  }
  .day-alt b { color: var(--ink); }

  /* ============ BOAT ============ */
  .boat-hero {
    background: linear-gradient(150deg, var(--abyss) 0%, var(--deep) 60%, var(--sea) 130%);
    color: var(--hero-text); border-radius: 26px; padding: 44px 42px;
    box-shadow: var(--shadow-lift); position: relative; overflow: hidden;
  }
  .boat-hero::after {
    content: "BALI 4.6"; position: absolute; inset-inline-end: -12px; bottom: -34px;
    font-size: 130px; font-weight: 900; letter-spacing: .02em; color: rgba(255,255,255,.045);
    pointer-events: none; line-height: 1;
  }
  .boat-hero .eyebrow { color: #7FE3F0; }
  .boat-hero h3 { margin: 0 0 8px; font-size: clamp(26px, 4vw, 36px); font-weight: 900; }
  .boat-hero .blurb { margin: 0 0 28px; max-width: 40em; color: #BFDDE6; font-size: 16px; }
  .specs { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; position: relative; }
  .spec {
    background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.13);
    border-radius: 14px; padding: 14px 16px;
  }
  .spec b { display: block; font-size: 21px; font-weight: 900; color: #fff; font-variant-numeric: tabular-nums; }
  .spec span { font-size: 12.5px; color: #9FC5D1; font-weight: 600; }
  .boat-notes { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 18px; }

  /* ============ CARDS / GRIDS ============ */
  .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .box {
    background: var(--card); border: 1px solid var(--line); border-radius: 18px;
    padding: 24px 26px; box-shadow: var(--shadow);
    transition: transform .18s ease, box-shadow .18s ease;
  }
  @media (prefers-reduced-motion: no-preference) {
    .box:hover { transform: translateY(-3px); box-shadow: var(--shadow-lift); }
  }
  .box h3 { margin: 0 0 12px; font-size: 17.5px; font-weight: 800; color: var(--sea); display: flex; align-items: center; gap: 9px; }
  :root[data-theme="dark"] .box h3 { color: var(--turq); }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .box h3 { color: var(--turq); } }
  .box h3 .ico { font-size: 19px; }
  .box ul { margin: 0; padding-inline-start: 18px; }
  .box li { margin-bottom: 8px; font-size: 15px; }
  .box li:last-child { margin-bottom: 0; }
  .land-sec .box h3 { color: var(--olive); }
  .rec {
    margin-top: 20px; padding: 18px 24px; border-radius: 16px; font-size: 15.5px;
    background: linear-gradient(120deg, var(--turq-soft), transparent 140%);
    border: 1px solid color-mix(in srgb, var(--turq) 30%, var(--line));
  }
  .land-sec .rec {
    background: linear-gradient(120deg, var(--olive-soft), transparent 140%);
    border-color: color-mix(in srgb, var(--olive) 30%, var(--line));
  }

  /* ============ VILLA ============ */
  .villa-band {
    background: linear-gradient(160deg, var(--olive-soft), var(--paper) 75%);
    border-block: 1px solid var(--line);
    padding: 88px 0 72px; margin-top: 88px;
  }
  .villa-band .eyebrow { color: var(--olive); }

  /* ============ BUDGET ============ */
  .tablewrap { overflow-x: auto; border: 1px solid var(--line); border-radius: 18px; background: var(--card); box-shadow: var(--shadow); }
  table { width: 100%; border-collapse: collapse; font-size: 15px; }
  th, td { text-align: right; padding: 13px 20px; border-bottom: 1px solid var(--line); vertical-align: top; }
  tr:last-child td { border-bottom: none; }
  th { font-size: 12.5px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft); }
  td.num, th.num { font-variant-numeric: tabular-nums; white-space: nowrap; font-weight: 700; }
  tr.total td { background: var(--turq-soft); font-weight: 900; font-size: 16px; }

  /* ============ CHECKLISTS ============ */
  .check { list-style: none; margin: 0; padding: 0; }
  .check li { display: flex; gap: 11px; align-items: baseline; margin-bottom: 9px; font-size: 15px; }
  .check li::before {
    content: ""; flex: none; width: 15px; height: 15px; border-radius: 5px;
    border: 2px solid var(--turq); transform: translateY(2px);
  }
  .land-sec .check li::before { border-color: var(--olive); }

  /* ============ FOOTER ============ */
  .last {
    margin-top: 96px; background: linear-gradient(185deg, var(--deep), var(--abyss));
    color: #9FC5D1; text-align: center; padding: 72px 22px 84px;
  }
  .last b { display: block; font-size: clamp(24px, 4vw, 34px); font-weight: 900; color: #fff; margin-bottom: 10px; }
  .last p { margin: 0 auto; max-width: 42em; font-size: 14.5px; }

  @media (max-width: 640px) {
    .sec { padding-top: 66px; }
    .day { grid-template-columns: 58px 1fr; gap: 16px; }
    .day-no b { font-size: 40px; }
    .boat-hero { padding: 32px 24px; }
    .boat-hero::after { font-size: 72px; bottom: -16px; }
    th, td { padding: 11px 14px; }
  }
</style>

<div class="lfk" id="lfk-root" lang="he">

  <!-- ================= HERO ================= -->
  <header class="hero">
    <div class="wrap hero-inner">
      <span class="kicker">Ionian Sea · Λευκάδα · 19–26.06.2027</span>
      <h1>שבוע אחד.<br><span class="grad">תשעה חברים. הים היוני.</span></h1>
      <p class="sub">
        חמישה ימי שיט נינוחים על ה־<b>Bali 4.6</b> בין האיים של לפקדה —
        אף יום לא יותר מ־3–4 שעות הפלגה — ואז סופ״ש בוילה בפורטו ראפטי עם הנשים.
      </p>
      <div class="statbar">
        <div class="stat-card"><b>9</b><span>חברים על הסיפון</span></div>
        <div class="stat-card"><b>5</b><span>ימי שיט · א׳–ה׳</span></div>
        <div class="stat-card"><b>‎~64</b><span>מייל ימי סה״כ</span></div>
        <div class="stat-card"><b>3–4</b><span>שעות שיט ביום</span></div>
        <div class="stat-card hot" id="countdown"><b>—</b><span>ימים להמראה</span></div>
      </div>
      <div class="boat-float" aria-hidden="true">
        <svg viewBox="0 0 96 78" fill="none">
          <path d="M46 6 L46 52" stroke="#9FD9E4" stroke-width="2.5" stroke-linecap="round"></path>
          <path d="M44 8 C 22 26, 16 40, 14 50 L 44 50 Z" fill="#7FE3F0" opacity=".9"></path>
          <path d="M50 12 C 66 26, 72 38, 74 50 L 50 50 Z" fill="#2FC6D8" opacity=".8"></path>
          <path d="M8 58 C 20 54, 76 54, 88 58 L 80 70 C 60 74, 36 74, 16 70 Z" fill="#F4B860"></path>
        </svg>
      </div>
    </div>
    <div class="waves" aria-hidden="true">
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
        <g class="w3">
          <path d="M-260 78 Q -130 58 0 78 T 260 78 T 520 78 T 780 78 T 1040 78 T 1300 78 T 1560 78 T 1820 78 V 110 H -260 Z" fill="#2FC6D8"></path>
        </g>
        <g class="w2">
          <path d="M-260 88 Q -130 70 0 88 T 260 88 T 520 88 T 780 88 T 1040 88 T 1300 88 T 1560 88 T 1820 88 V 110 H -260 Z" fill="#7FE3F0"></path>
        </g>
        <g class="w1">
          <path d="M-260 96 Q -130 82 0 96 T 260 96 T 520 96 T 780 96 T 1040 96 T 1300 96 T 1560 96 T 1820 96 V 110 H -260 Z" fill="var(--paper)"></path>
        </g>
      </svg>
    </div>
  </header>

  <!-- ================= NAV ================= -->
  <nav class="nav" aria-label="ניווט בעמוד">
    <div class="nav-inner">
      <a href="#glance">התמונה הגדולה</a>
      <a href="#map">המפה</a>
      <a href="#days">יום־יום</a>
      <a href="#boat">הסירה</a>
      <a href="#logistics">טיסות</a>
      <a href="#villa">הוילה</a>
      <a href="#budget">תקציב</a>
      <a href="#tasks">משימות</a>
    </div>
  </nav>

  <div class="wrap">

    <!-- ================= GLANCE ================= -->
    <section class="sec" id="glance">
      <p class="eyebrow">The Big Picture</p>
      <h2>שמונה ימים, שני עולמות</h2>
      <p class="lead">שבת עד חמישי על המים, חמישי עד שבת על היבשה. ככה זה נראה מלמעלה:</p>
      <div class="glance">
        <div class="g-day" data-reveal><span class="g-date">שבת · 19.06</span><h3>נחיתה וקבלת הסירה</h3><p>ת״א → אתונה → פרבזה. צ׳ק־אין על ה־Bali במרינת לפקדה, קניות גדולות, ערב פתיחה בעיירה.</p></div>
        <div class="g-day" data-reveal><span class="g-date">ראשון · 20.06</span><h3>מפליגים: מגניסי</h3><p>עצירת רחצה מול סקורפיוס, לילה בספרטוחורי או ואתי.</p></div>
        <div class="g-day" data-reveal><span class="g-date">שני · 21.06</span><h3>קסטוס</h3><p>מפרצון בקלמוס בצהריים, ערב באי של ה־50 תושבים.</p></div>
        <div class="g-day" data-reveal><span class="g-date">שלישי · 22.06</span><h3>קיוני, איתקה</h3><p>הנמל הכי צילומי ביוניים. אפרול על הרציף.</p></div>
        <div class="g-day" data-reveal><span class="g-date">רביעי · 23.06</span><h3>One House Bay → סיבוטה</h3><p>היום הכי “פוסטר” של השבוע. לילה אחרון על המים.</p></div>
        <div class="g-day" data-reveal><span class="g-date">חמישי · 24.06</span><h3>חזרה למרינה + מעבר לוילה</h3><p>החזרת סירה עד 13:00, מיניבוס לפורטו ראפטי, ערב עם הנשים.</p></div>
        <div class="g-day land" data-reveal><span class="g-date">שישי · 25.06</span><h3>יום הוילה הגדול</h3><p>חוף, דגים בנמל, שקיעה בסוניון, BBQ בוילה.</p></div>
        <div class="g-day land" data-reveal><span class="g-date">שבת · 26.06</span><h3>הביתה</h3><p>בוקר בריכה רגוע, 30 דק׳ לשדה, טיסה לת״א.</p></div>
      </div>
    </section>

    <!-- ================= MAP ================= -->
    <section class="sec" id="map">
      <p class="eyebrow">The Route · Ν. Ιόνιο</p>
      <h2>מסלול במים מוגנים, בלי ים פתוח</h2>
      <p class="lead">לולאה דרום־מזרחה מלפקדה: קטעים קצרים בין איים שמגינים זה על זה מהרוח. שיט בבקרים השקטים, עוגנים לפני שהמייסטרו של אחה״צ מתעורר.</p>
      <div class="map-shell" data-reveal>
        <div class="map-sea">
          <svg viewBox="0 0 720 500" role="img" aria-label="מפה סכמטית של המסלול: לפקדה, סקורפיוס, מגניסי, קלמוס, קסטוס, קיוני באיתקה, אטוקוס וסיבוטה">
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#F4B860"></path>
              </marker>
            </defs>
            <!-- depth rings -->
            <g fill="none" stroke="#FFFFFF" opacity=".05" stroke-width="1.5">
              <circle cx="420" cy="250" r="120"></circle>
              <circle cx="420" cy="250" r="200"></circle>
              <circle cx="420" cy="250" r="280"></circle>
            </g>
            <!-- compass -->
            <g transform="translate(72 84)" opacity=".8">
              <circle r="26" fill="none" stroke="#7FE3F0" stroke-width="1.4" opacity=".5"></circle>
              <path d="M0 -20 L6 6 L0 1 L-6 6 Z" fill="#7FE3F0"></path>
              <text y="-33" text-anchor="middle" fill="#7FE3F0" font-size="13" font-weight="700">N</text>
            </g>
            <!-- land -->
            <g fill="#E9DFC8" stroke="#C9B98E" stroke-width="1.5">
              <ellipse cx="500" cy="120" rx="95" ry="75"></ellipse>
              <ellipse cx="415" cy="235" rx="40" ry="26"></ellipse>
              <ellipse cx="470" cy="180" rx="14" ry="11"></ellipse>
              <ellipse cx="250" cy="250" rx="24" ry="42"></ellipse>
              <ellipse cx="205" cy="330" rx="16" ry="30"></ellipse>
              <ellipse cx="330" cy="395" rx="70" ry="45"></ellipse>
              <ellipse cx="255" cy="415" rx="14" ry="10"></ellipse>
            </g>
            <g font-size="11.5" font-weight="700" fill="#8A7A50" text-anchor="middle">
              <text x="500" y="105">ΛΕΥΚΑΔΑ</text>
              <text x="415" y="238">ΜΕΓΑΝΗΣΙ</text>
              <text x="250" y="252">ΚΑΛΑΜΟΣ</text>
              <text x="330" y="398">ΙΘΑΚΗ</text>
            </g>
            <!-- route -->
            <g fill="none" stroke="#F4B860" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round">
              <path d="M 545 75 C 520 130, 495 160, 472 178" marker-end="url(#arr)"></path>
              <path d="M 465 192 C 450 210, 440 220, 430 226" marker-end="url(#arr)"></path>
              <path d="M 400 255 C 340 290, 260 300, 218 322" marker-end="url(#arr)"></path>
              <path d="M 210 355 C 235 385, 270 390, 300 383" marker-end="url(#arr)"></path>
              <path d="M 300 400 L 262 410" marker-end="url(#arr)"></path>
              <path d="M 268 405 C 330 370, 400 320, 442 260" marker-end="url(#arr)"></path>
              <path d="M 455 240 C 500 200, 530 140, 545 85" marker-end="url(#arr)"></path>
            </g>
            <!-- ports -->
            <g font-size="15" font-weight="800" fill="#F2FAFB">
              <circle cx="548" cy="72" r="7.5" fill="#7FE3F0"></circle>
              <text x="562" y="66">מרינת לפקדה</text>
              <text x="562" y="84" font-size="11.5" font-weight="600" fill="#9FC5D1">התחלה + סיום</text>
              <circle cx="470" cy="182" r="5.5" fill="#F4B860"></circle>
              <text x="490" y="172">סקורפיוס</text>
              <circle cx="420" cy="240" r="7.5" fill="#7FE3F0"></circle>
              <text x="437" y="264">מגניסי · לילה 1</text>
              <circle cx="252" cy="252" r="5.5" fill="#F4B860"></circle>
              <text x="268" y="242">קלמוס</text>
              <circle cx="207" cy="335" r="7.5" fill="#7FE3F0"></circle>
              <text x="118" y="328">קסטוס · לילה 2</text>
              <circle cx="308" cy="385" r="7.5" fill="#7FE3F0"></circle>
              <text x="318" y="452">קיוני · לילה 3</text>
              <circle cx="258" cy="412" r="5.5" fill="#F4B860"></circle>
              <text x="146" y="422">אטוקוס</text>
              <circle cx="450" cy="248" r="7.5" fill="#7FE3F0"></circle>
              <text x="464" y="300">סיבוטה · לילה 4</text>
            </g>
          </svg>
        </div>
        <div class="map-foot">
          <span class="map-key"><span class="dot port"></span> עגינת לילה</span>
          <span class="map-key"><span class="dot swim"></span> עצירת רחצה</span>
          <span>מפה סכמטית — לא לניווט. הסקיפר מנווט, אנחנו על הרשת.</span>
        </div>
      </div>
    </section>

    <!-- ================= DAYS ================= -->
    <section class="sec" id="days">
      <p class="eyebrow">Day by Day</p>
      <h2>המסלול, יום אחרי יום</h2>
      <p class="lead">
        קצב שיוט: ‎5.5–6 קשר. שגרה קבועה: קפה על הרשת, יציאה ~09:30, עצירת רחצה בדרך,
        קשורים בנמל עד 14:00–15:00. אחר הצהריים — חוף, טברנה, סיאסטה.
      </p>

      <div class="day" data-reveal>
        <div class="day-no"><b>01</b><span>ראשון<br>20.06</span></div>
        <div class="day-body">
          <h3>פתיחה קלאסית: מגניסי</h3>
          <div class="day-route"><span class="hop">מרינת לפקדה</span><span class="arrow">←</span><span class="hop swim">סקורפיוס 🏊</span><span class="arrow">←</span><span class="hop">ספרטוחורי / ואתי</span></div>
          <div class="day-stats"><span><i>◷</i>‎2.5–3 שע׳</span><span><i>⚓</i>‎~12 מייל ימי</span><span><i>☀</i>עצירת רחצה אחת</span></div>
          <p>יציאה רגועה דרומה בתעלה המוגנת. עוגנים לרחצה ראשונה מול האי של אונאסיס — מים טורקיז, פתיחת פלייליסט. ממשיכים לספרטוחורי: כפר על צוק עם סמטאות לבנות וטברנות שנשפכות על המים.</p>
          <p><b>ערב:</b> Porto Spilia (קושרים מטרים מהשולחן) או הנמל של ואתי.</p>
          <div class="day-alt"><b>חלופה רגועה עוד יותר:</b> לילה בנידרי (‎~8 מייל, שעה וחצי) והמשך למגניסי בבוקר.</div>
        </div>
      </div>

      <div class="day" data-reveal>
        <div class="day-no"><b>02</b><span>שני<br>21.06</span></div>
        <div class="day-body">
          <h3>הצד השקט: קסטוס</h3>
          <div class="day-route"><span class="hop">מגניסי</span><span class="arrow">←</span><span class="hop swim">מפרצון בקלמוס 🏊</span><span class="arrow">←</span><span class="hop">קסטוס</span></div>
          <div class="day-stats"><span><i>◷</i>‎~2.5 שע׳</span><span><i>⚓</i>‎~11 מייל ימי</span><span><i>☀</i>עגינת צהריים ארוכה</span></div>
          <p>חוצים דרומה לצמד האיים שהזמן שכח: קלמוס וקסטוס. עצירת שחייה במפרץ מבודד, וממשיכים לרציף הקטן של קסטוס — אי עם ‎~50 תושבים, טחנת רוח אחת ואפס לחץ.</p>
          <p><b>ערב:</b> טברנת הדגים של האי + בר הטחנה על הגבעה לשקיעה.</p>
          <div class="day-alt"><b>טיפ:</b> הרציף בקסטוס קטן — מגיעים עד 14:00 ותופסים מקום טוב.</div>
        </div>
      </div>

      <div class="day" data-reveal>
        <div class="day-no"><b>03</b><span>שלישי<br>22.06</span></div>
        <div class="day-body">
          <h3>האי של אודיסאוס: קיוני</h3>
          <div class="day-route"><span class="hop">קסטוס</span><span class="arrow">←</span><span class="hop swim">סרקיניקו 🏊</span><span class="arrow">←</span><span class="hop">קיוני, איתקה</span></div>
          <div class="day-stats"><span><i>◷</i>‎~3 שע׳</span><span><i>⚓</i>‎~12 מייל ימי</span><span><i>☀</i>חצייה קצרה של התעלה</span></div>
          <p>הקטע היפה של השבוע: חציית התעלה לאיתקה. קיוני — קשת בתים פסטליים סביב מפרצון, שלוש טחנות רוח על הכניסה, והרציף הכי מבוקש ביוניים.</p>
          <p><b>ערב:</b> אפרול על הרציף ומסעדות ברמה של חופשה אחרת.</p>
          <div class="day-alt"><b>חלופה:</b> פיסקרדו שבקפלוניה (‎~14 מייל, ‎3.5 שע׳) — שיקית, ונציאנית, עמוסה יותר. מחליטים בבוקר לפי הרוח.</div>
        </div>
      </div>

      <div class="day" data-reveal>
        <div class="day-no"><b>04</b><span>רביעי<br>23.06</span></div>
        <div class="day-body">
          <h3>יום הפוסטר: One House Bay</h3>
          <div class="day-route"><span class="hop">קיוני</span><span class="arrow">←</span><span class="hop swim">אטוקוס · One House Bay 🏊</span><span class="arrow">←</span><span class="hop">סיבוטה</span></div>
          <div class="day-stats"><span><i>◷</i>‎3.5–4 שע׳</span><span><i>⚓</i>‎~15 מייל ימי</span><span><i>☀</i>עגינת הצהריים הכי יפה בשבוע</span></div>
          <p>עוגנים באי הלא־מיושב אטוקוס: מצוק גיר לבן, מים שקופים, בית בודד אחד על החוף. צהריים ארוכים במים — סנפלינג מהרשת, שנורקלים, אוכל טוב. לקראת ערב קפיצה קצרה לפיורד המוגן של סיבוטה.</p>
          <p><b>ערב:</b> ערב סיום ימי בטברנות שעל קו המים. לילה אחרון על הסירה.</p>
        </div>
      </div>

      <div class="day" data-reveal>
        <div class="day-no"><b>05</b><span>חמישי<br>24.06</span></div>
        <div class="day-body">
          <h3>סוגרים מעגל — ועוברים ליבשה</h3>
          <div class="day-route"><span class="hop">סיבוטה</span><span class="arrow">←</span><span class="hop">מרינת לפקדה</span><span class="arrow">←</span><span class="hop swim">מיניבוס לפורטו ראפטי 🚐</span></div>
          <div class="day-stats"><span><i>◷</i>‎~3 שע׳ שיט + ‎5 שע׳ נסיעה</span><span><i>⚓</i>‎~14 מייל ימי</span><span><i>☀</i>יציאה 08:30</span></div>
          <p>שיט בוקר אחרון צפונה לאורך החוף המזרחי. תדלוק, החזרת סירה עד 13:00, מקלחות במרינה — ועולים על המיניבוס. הגעה לוילה ‎~19:00, בדיוק לארוחת ערב עם הנשים.</p>
          <p><b>חשוב:</b> ההחזרה ביום חמישי בצהריים נסגרת מראש בחוזה מול חברת הצ׳רטר (הסטנדרט הוא שבת–שבת).</p>
        </div>
      </div>
    </section>

    <!-- ================= BOAT ================= -->
    <section class="sec" id="boat">
      <p class="eyebrow">The Boat</p>
      <h2>הסירה שלנו: Bali 4.6</h2>
      <p class="lead">כמו תמיד. אנחנו מכירים אותה, היא מכירה אותנו — הסלון הפתוח, הדלת המתרוממת, הרשת הקדמית הענקית. אין סיבה להתנסות במשהו אחר.</p>
      <div class="boat-hero" data-reveal>
        <p class="eyebrow">Catana Group · Open-Space Catamaran</p>
        <h3>‏Bali 4.6 — הבית שלנו לשבוע</h3>
        <p class="blurb">
          קטמרן 46 רגל עם הקונספט הפתוח המפורסם של Bali: סלון־קוקפיט אחד ענק ברמת סיפון אחת,
          דלת גיליוטינה שהופכת הכול למרפסת אחת על המים, רשת שמש קדמית בגודל של סלון, ופלייברידג׳ לסקיפר ולמצטרפים.
        </p>
        <div class="specs">
          <div class="spec"><b>‎14.28 מ׳</b><span>אורך כללי</span></div>
          <div class="spec"><b>‎7.61 מ׳</b><span>רוחב</span></div>
          <div class="spec"><b>5</b><span>קבינות + תאי חרטום</span></div>
          <div class="spec"><b>‎€10K</b><span>לשבוע (המחיר שלנו)</span></div>
          <div class="spec"><b>‎€200</b><span>סקיפר / יום</span></div>
          <div class="spec"><b>‎~€1,270</b><span>לאיש · סירה + סקיפר</span></div>
        </div>
      </div>
      <div class="boat-notes">
        <div class="box" data-reveal>
          <h3><span class="ico">🛏</span>סידור שינה ל־9</h3>
          <ul>
            <li>4 קבינות זוגיות — 8 חברים.</li>
            <li>התשיעי בקבינה החמישית / תא החרטום המרווח.</li>
            <li>הסקיפר בתא חרטום נפרד — לא על חשבוננו.</li>
            <li>הגרלת קבינות בערב הראשון. בלי ויכוחים. 🎲</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">📝</span>מה סוגרים בחוזה</h3>
          <ul>
            <li>‎check-in מוקדם בשבת 19.06 (עד 16:00).</li>
            <li><b>drop-off חמישי 24.06 עד 13:00</b> — כתוב, לא בעל־פה.</li>
            <li>סקיפר: ‎€200 ליום × 6 ימים = ‎€1,200 (+ ארוחות).</li>
            <li>SUP / ציוד שנורקל כלולים? לוודא מראש.</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">⏰</span>למה לסגור עד אוקטובר 2026</h3>
          <ul>
            <li>יוני הוא שיא העונה — ה־Bali 4.6 נחטפות ראשונות.</li>
            <li>‏Early-Bird אצל רוב החברות: ‎5–15% הנחה.</li>
            <li>מקדמה טיפוסית 50%, יתרה ‎~60 יום לפני ההפלגה.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ================= LOGISTICS ================= -->
    <section class="sec" id="logistics">
      <p class="eyebrow">Getting There</p>
      <h2>טיסות, מעברים ולוגיסטיקה</h2>
      <div class="grid2">
        <div class="box" data-reveal>
          <h3><span class="ico">🛫</span>הלוך · שבת 19.06</h3>
          <ul>
            <li><b>ת״א → אתונה:</b> טיסת בוקר (‎~2 שע׳).</li>
            <li><b>אתונה → פרבזה (PVK):</b> פנימית ‎~55 דק׳, או מיניבוס ‎~4.5 שע׳.</li>
            <li>פרבזה → מרינת לפקדה: ‎~25 דק׳ טרנספר.</li>
            <li>יעד: על הסירה עד 16:00–17:00.</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">🚐</span>חמישי · מעבר לוילה</h3>
          <ul>
            <li><b>מומלץ:</b> מיניבוס פרטי ישיר לפקדה → פורטו ראפטי. ‎~5 שע׳, ‎€650–850 לקבוצה (‎~€80 לאיש).</li>
            <li>יציאה 14:00 → הגעה ‎~19:00, בדיוק לארוחת ערב.</li>
            <li>חלופה: טיסה PVK → אתונה + טרנספר 45 דק׳ (תלוי בלו״ז 2027).</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">🛬</span>חזרה · שבת 26.06</h3>
          <ul>
            <li>הוילה נמצאת ‎~30 דק׳ משדה התעופה של אתונה.</li>
            <li>טיסת צהריים/ערב לת״א — לפי מה שנוח לזוגות.</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">💙</span>הנשים</h3>
          <ul>
            <li>נוחתות באתונה בחמישי 24.06 (או קודם — יום שופינג באתונה).</li>
            <li>טרנספר קצר לוילה, מתמקמות לפנינו.</li>
            <li>לתאם טיסות משותפות לכולן.</li>
          </ul>
        </div>
      </div>
    </section>
  </div>

  <!-- ================= VILLA ================= -->
  <section class="villa-band land-sec" id="villa">
    <div class="wrap">
      <p class="eyebrow">Shore Leave · Πόρτο Ράφτη</p>
      <h2>הוילה בפורטו ראפטי</h2>
      <p class="lead">סוף שבוע של יבשה: הוילה של החבר׳ה מול מפרץ פורטו ראפטי — 40 דק׳ מאתונה, טברנות דגים על הנמל, והנשים כבר שם.</p>
      <div class="grid2">
        <div class="box" data-reveal>
          <h3><span class="ico">🌅</span>חמישי בערב · האיחוד</h3>
          <ul>
            <li>הגעה ‎~19:00, מקלחות והתארגנות.</li>
            <li>ערב פתיחה: טברנת דגים על הנמל — כל ה־18.</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">🏖</span>שישי · היום הגדול</h3>
          <ul>
            <li><b>בוקר:</b> חוף Avlaki או המפרצון הסלעי Erotospilia.</li>
            <li><b>צהריים:</b> דגים ואוזו על המים.</li>
            <li><b>שקיעה:</b> מקדש פוסידון בכף סוניון (‎~35 דק׳) — מהשקיעות היפות ביוון.</li>
            <li><b>ערב:</b> BBQ גדול בוילה. סיפורי ההפלגה, בגרסה המצונזרת.</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">🧳</span>שבת · סיום רגוע</h3>
          <ul>
            <li>בריכה וקפה, אריזה בנחת.</li>
            <li>יציאה מדורגת לשדה לפי הטיסות — 30 דק׳ בלבד.</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">🛒</span>לוגיסטיקת וילה</h3>
          <ul>
            <li>הזמנת סופר מראש ליום חמישי בבוקר לוילה.</li>
            <li>מול בעל הבית: מצעים ומגבות ל־18, בריכה, גריל וגז.</li>
            <li>2–3 רכבים שכורים לערב סוניון ולחופים.</li>
          </ul>
        </div>
      </div>
      <div class="rec" data-reveal>
        <b>חלוקת אחריות:</b> בעל הוילה מתאם את הבית · אחראי האוכל סוגר סופר ו־BBQ · הנשים בוחרות את מסעדת חמישי. 🍷
      </div>
    </div>
  </section>

  <div class="wrap">

    <!-- ================= BUDGET ================= -->
    <section class="sec" id="budget">
      <p class="eyebrow">The Numbers</p>
      <h2>תקציב לאיש</h2>
      <p class="lead">מבוסס על המחירים המוכרים שלנו: ‎Bali 4.6 ב־‎€10,000 לשבוע + סקיפר ‎€200 ליום. חלוקה ל־9.</p>
      <div class="tablewrap" data-reveal>
        <table>
          <thead>
            <tr><th>סעיף</th><th class="num">לאיש</th><th>הערות</th></tr>
          </thead>
          <tbody>
            <tr><td>‏Bali 4.6 · שבוע</td><td class="num">‎€1,111</td><td>‎€10,000 ÷ 9</td></tr>
            <tr><td>סקיפר · 6 ימים</td><td class="num">‎€134</td><td>‎€200 × 6 = ‎€1,200 ÷ 9 (+ ארוחות שלו איתנו)</td></tr>
            <tr><td>טיסות ת״א ↔ אתונה</td><td class="num">‎€300–450</td><td>הזמנה מוקדמת = הקצה הנמוך</td></tr>
            <tr><td>אתונה ↔ פרבזה + מיניבוס לוילה</td><td class="num">‎€90–160</td><td>הלוך בטיסה פנימית, חזרה במיניבוס</td></tr>
            <tr><td>דלק, מרינות, מים</td><td class="num">‎€60–90</td><td>ביוניים רוב הרציפים זולים או חינם</td></tr>
            <tr><td>קניות לסירה</td><td class="num">‎€60–80</td><td>קנייה גדולה בשבת בלפקדה, קופה משותפת</td></tr>
            <tr><td>טברנות וברים · 5 ערבים</td><td class="num">‎€250–350</td><td>‎€50–70 לערב כולל יין</td></tr>
            <tr><td>וילה: אוכל, BBQ, רכבים</td><td class="num">‎€120–180</td><td>לינה חינם 🙏 תודה לבעל הבית</td></tr>
            <tr class="total"><td>סה״כ משוער</td><td class="num">‎€2,100–2,550</td><td>סירה + סקיפר קבועים, השאר טווחים</td></tr>
          </tbody>
        </table>
      </div>
      <div class="rec" data-reveal>
        <b>קופה משותפת:</b> הגזבר גובה ‎€400 לאיש לפני הטיסה (קניות, דלק, מרינות, מיניבוס) ומתחשבנים בסוף. טברנות מתחלקות במקום.
      </div>
    </section>

    <!-- ================= WEATHER ================= -->
    <section class="sec" id="weather">
      <p class="eyebrow">Conditions</p>
      <h2>יוני בים היוני</h2>
      <div class="grid2">
        <div class="box" data-reveal>
          <h3><span class="ico">🌤</span>מה מצפה לנו</h3>
          <ul>
            <li><b>אוויר:</b> ‎27–31° ביום, ‎20–22° בלילה · <b>מים:</b> ‎23–25°.</li>
            <li><b>רוח:</b> בקרים שקטים; המייסטרו (NW‏ ‎12–18 קשר) נכנס אחה״צ — כשאנחנו כבר קשורים.</li>
            <li><b>גשם:</b> כמעט אפסי. הים בין האיים מוגן ושטוח.</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">🧭</span>איך זה בנוי בתכנון</h3>
          <ul>
            <li>שיט בחלון הבוקר הרגוע 09:30–13:30 — בדיוק ה־3–4 שעות שלנו.</li>
            <li>אחה״צ בעגינה: רחצה, SUP, טברנה.</li>
            <li>הסקיפר מחליט סופית כל בוקר; יש חלופה לכל יום.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ================= TASKS ================= -->
    <section class="sec" id="tasks">
      <p class="eyebrow">Make It Happen</p>
      <h2>משימות ולוח הזמנות</h2>
      <div class="grid2">
        <div class="box" data-reveal>
          <h3><span class="ico">1️⃣</span>עכשיו → אוקטובר 2026</h3>
          <ul class="check">
            <li>וידוא 9 משתתפים + מקדמה פנימית ‎€500 לאיש</li>
            <li>סגירת ‎Bali 4.6 + סקיפר (מקדמה 50%)</li>
            <li>בחוזה: drop-off חמישי 13:00</li>
            <li>בעל הוילה חוסם 24–26.06</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">2️⃣</span>אוקטובר 2026 → ינואר 2027</h3>
          <ul class="check">
            <li>טיסות ת״א↔אתונה לכל ה־18 כשנפתחות</li>
            <li>פנימיות אתונה↔פרבזה או מיניבוסים</li>
            <li>יתרת תשלום לסירה (‎~60 יום לפני)</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">3️⃣</span>מרץ → מאי 2027</h3>
          <ul class="check">
            <li>מיניבוס חמישי לפקדה → פורטו ראפטי</li>
            <li>רכבים לוילה + ביטוחי נסיעות</li>
            <li>שולחנות בקסטוס ובקיוני לערבים שלנו</li>
            <li>רשימת קניות לסירה + הזמנת סופר לוילה</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">👔</span>חלוקת תפקידים</h3>
          <ul>
            <li><b>מנהל הפלגה:</b> מול חברת הצ׳רטר והסקיפר</li>
            <li><b>גזבר:</b> קופה משותפת + התחשבנות</li>
            <li><b>טיסות והסעות:</b> ריכוז כרטיסים ל־18</li>
            <li><b>אוכל:</b> קניות סירה + BBQ</li>
            <li><b>וילה:</b> בעל הבית + תיאום מול הנשים</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ================= PACKING ================= -->
    <section class="sec" id="packing">
      <p class="eyebrow">Sea Bag</p>
      <h2>מה מביאים</h2>
      <div class="grid2">
        <div class="box" data-reveal>
          <h3><span class="ico">🎒</span>חובה</h3>
          <ul class="check">
            <li>תיק רך בלבד — למזוודה קשיחה אין מקום בסירה</li>
            <li>דרכון בתוקף 6 חודשים + ביטוח נסיעות</li>
            <li>כובע, משקפי שמש עם שרוך, קרם הגנה 50</li>
            <li>נעלי סיפון עם סוליה בהירה + סנדלים</li>
            <li>סווטשירט לערבים, מטען נייד</li>
          </ul>
        </div>
        <div class="box" data-reveal>
          <h3><span class="ico">😎</span>שווה להביא</h3>
          <ul class="check">
            <li>מסכת שנורקל — המים שקופים ברמות</li>
            <li>רמקול בלוטות׳ + פלייליסט מוכן מראש</li>
            <li>קלפים / שש־בש מגנטי</li>
            <li>חולצות קבוצה 🌊</li>
            <li>כדור נגד מחלת ים לרגישים — ליתר ביטחון</li>
          </ul>
        </div>
      </div>
    </section>
  </div>

  <!-- ================= FOOTER ================= -->
  <footer class="last">
    <b>יאללה, סוגרים סירה? ⚓</b>
    <p>
      תכנון ראשוני · יוני 2027 · זמנים ומרחקים לפי קצב שיוט של ‎5.5–6 קשר במסלול החוף המוגן.
      סירה וסקיפר לפי המחירים המוכרים שלנו; שאר המחירים הערכות להזמנה מוקדמת.
    </p>
  </footer>
</div>
`;
