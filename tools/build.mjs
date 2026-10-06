/*
 * Tanuki Box のページを作る道具。
 *   node tools/build.mjs
 * games.js（ゲーム一覧）・news.js（お知らせ）・config.js（サイトの設定）を読んで、次のファイルを作り直す：
 *   index.html（トップ）、games/<id>/index.html（ゲームごとの紹介）、news/index.html（お知らせ）、
 *   about/index.html（このお店について・お問い合わせ）、privacy/index.html（プライバシーポリシー）、
 *   404.html（迷子のページ）、sitemap.xml、robots.txt
 * 作ったファイルは、そのまま GitHub に保存（push）すれば公開される（GitHub Pages）。
 * 文字はすべて日本語と英語の両方を書き、表示する方を style.css と site.js で切りかえる。
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, s) => {
  const p = path.join(ROOT, f);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, s);
  console.log('  ' + f);
};

// ---- データを読む（ブラウザ用のファイルを、そのまま読む） ----
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of ['config.js', 'games.js', 'news.js']) vm.runInContext(read(f), sandbox, { filename: f });
const SITE = sandbox.window.TB_SITE;
const GAMES = sandbox.window.TB_GAMES;
const NEWS = sandbox.window.TB_NEWS || [];
const TODAY = new Date().toISOString().slice(0, 10);

// CSS・JS が変わったら、ブラウザに新しいものを読ませる（中身から作る短い番号）
const ver = (f) => crypto.createHash('md5').update(read(f)).digest('hex').slice(0, 8);
const V = { css: ver('style.css'), js: ver('site.js') };

// ---- 小さな道具 ----
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const ja = (v) => (v && typeof v === 'object' ? v.ja : v) ?? '';
const en = (v) => (v && typeof v === 'object' ? v.en ?? v.ja : v) ?? '';
/** 日本語と英語を並べる（表示しない方は CSS で隠す） */
const bi = (v, tag = 'span', cls = '') => {
  const c = cls ? ` class="${cls}"` : '';
  if (v == null) return '';
  if (typeof v !== 'object') return `<${tag}${c}>${esc(v)}</${tag}>`;
  return `<${tag} lang="ja"${c}>${esc(ja(v))}</${tag}><${tag} lang="en"${c}>${esc(en(v))}</${tag}>`;
};
/** 日英で中身（HTML）がちがうとき */
const biHTML = (jaHTML, enHTML, tag = 'div', cls = '') => {
  const c = cls ? ` class="${cls}"` : '';
  return `<${tag} lang="ja"${c}>${jaHTML}</${tag}><${tag} lang="en"${c}>${enHTML}</${tag}>`;
};
/** サイトの中の住所に。https:// から始まるものは、そのまま */
const abs = (p) => (!p ? '' : /^https?:\/\//.test(p) || p.startsWith('/') ? p : '/' + p);
const full = (p) => (/^https?:\/\//.test(p) ? p : SITE.url + abs(p));
const dateJa = (d) => d.replace(/-/g, '.');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dateEn = (d) => {
  const [y, m, dd] = d.split('-').map(Number);
  return `${MONTHS[m - 1]} ${dd}, ${y}`;
};
const dateBi = (d) => `<time datetime="${d}">${bi({ ja: dateJa(d), en: dateEn(d) })}</time>`;

const OUT = GAMES.filter((g) => g.status !== 'soon');
const hasPage = (g) => g.status !== 'soon' && g.page !== false;
const pageOf = (g) => `/games/${g.id}/`;
const FEATURED = OUT.find((g) => g.featured) || null;

// ---- 小さな絵（アイコン） ----
const ICON = {
  time: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8" fill="#fff" stroke="currentColor" stroke-width="2.5"/><path d="M12 9v4l3 2M9 2h6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>',
  tap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11V5.5a1.8 1.8 0 0 1 3.6 0V11l4 .8a2 2 0 0 1 1.6 2.3l-.9 5a2.5 2.5 0 0 1-2.5 2H10a2.5 2.5 0 0 1-2-1l-3.2-4.3a1.6 1.6 0 0 1 2.4-2.1L9 15" fill="#fff" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5" fill="#fff" stroke="currentColor" stroke-width="2.3"/><circle cx="12" cy="18" r="1.2" fill="currentColor"/></svg>',
  pc: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" fill="#fff" stroke="currentColor" stroke-width="2.3"/><path d="M8 20h8M12 16v4" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/></svg>',
  steam: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="#1b2838" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="9.5" r="3" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="9" cy="15" r="2.2" fill="#fff"/><path d="M9 15l5-4.5" stroke="#fff" stroke-width="1.8"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z"/></svg>',
  link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  share: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.6" fill="#fff" stroke="currentColor" stroke-width="2.2"/><circle cx="6" cy="12" r="2.6" fill="#fff" stroke="currentColor" stroke-width="2.2"/><circle cx="18" cy="19" r="2.6" fill="#fff" stroke="currentColor" stroke-width="2.2"/><path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4" stroke="currentColor" stroke-width="2.2"/></svg>'
};

const chips = (g) => {
  const out = [];
  if (g.time) out.push(`<li>${ICON.time}${bi(g.time)}</li>`);
  if (g.control) out.push(`<li>${ICON.tap}${bi(g.control)}</li>`);
  for (const d of g.devices || []) {
    if (d === 'phone') out.push(`<li>${ICON.phone}${bi({ ja: 'スマホ', en: 'Phone' })}</li>`);
    if (d === 'pc') out.push(`<li>${ICON.pc}PC</li>`);
    if (d === 'steam') out.push(`<li>${ICON.steam}Steam</li>`);
  }
  return out.length ? `<ul class="chips">${out.join('')}</ul>` : '';
};
const playBtn = (g, big) =>
  g.play ? `<a class="btn btn-play${big ? ' big' : ''}" href="${esc(abs(g.play))}">${bi({ ja: 'あそぶ', en: 'PLAY' })} <span aria-hidden="true">▶</span></a>` : '';
const steamBtn = (g, big) =>
  g.steam && g.steam.url
    ? `<a class="btn btn-steam${big ? ' big' : ''}" href="${esc(g.steam.url)}" target="_blank" rel="noopener">${ICON.steam}${bi(g.steam.wishlist ? { ja: 'Steam でウィッシュリスト', en: 'Wishlist on Steam' } : { ja: 'Steam で見る', en: 'View on Steam' })}</a>`
    : '';
const moreBtn = (g) => (hasPage(g) ? `<a class="btn btn-more" href="${pageOf(g)}">${bi({ ja: 'くわしく', en: 'Details' })}</a>` : '');

// ---- ページの部品 ----
const FONTS = 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;800&family=Mochiy+Pop+One&display=swap';
// 言語と時間帯を、絵が出る前に決める（ちらつかないように）
const BOOT = `<script>(function(){var d=document.documentElement,l=null;try{l=localStorage.getItem('tb-lang')}catch(e){}var q=/[?&]lang=(ja|en)/.exec(location.search);l=q?q[1]:l||((navigator.language||'').toLowerCase().indexOf('ja')===0?'ja':'en');d.setAttribute('data-lang',l);d.lang=l;var h=new Date().getHours();d.setAttribute('data-time',h>=5&&h<9?'morning':h>=9&&h<16?'day':h>=16&&h<19?'evening':'night')})();</script>`;

function head({ title, desc, url, image, imageAlt = 'Tanuki Box', type = 'website', jsonld = null, noindex = false }) {
  const img = full(image || 'assets/ogp.png');
  return `<!doctype html>
<html lang="ja" data-lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#9fd9ea">
${noindex ? '<meta name="robots" content="noindex">\n' : `<link rel="canonical" href="${esc(full(url))}">\n`}<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Tanuki Box">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(full(url))}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(imageAlt)}">
<meta property="og:locale" content="ja_JP">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(img)}">
<link rel="icon" type="image/png" href="/assets/favicon.png">
<link rel="apple-touch-icon" href="/assets/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/style.css?v=${V.css}">
${BOOT}
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>\n` : ''}</head>`;
}

const LANG_BTN = `<button class="lang" type="button" data-lang-toggle aria-label="Language"><span lang="ja">English</span><span lang="en">日本語</span></button>`;
const NAV = [
  { href: '/#pick', t: { ja: 'いちおし', en: 'Pick' } },
  { href: '/#news', t: { ja: 'お知らせ', en: 'News' } },
  { href: '/#shelf', t: { ja: '箱の棚', en: 'Shelf' } },
  { href: '/about/', t: { ja: 'このお店', en: 'About' } }
];
const nav = (cur = '') =>
  `<nav class="shop-nav" aria-label="Menu"><ul>${NAV.map((n) => `<li><a href="${n.href}"${n.href === cur ? ' aria-current="page"' : ''}>${bi(n.t)}</a></li>`).join('')}</ul></nav>`;

/** トップ以外のページの上の部分（小さなお店の正面） */
const miniHeader = (cur) => `<header class="shop mini">
  <div class="awning" aria-hidden="true"></div>
  ${LANG_BTN}
  <div class="mini-bar wrap">
    <a class="mini-sign" href="/"><img src="/assets/tanuki-96.png" alt="" width="48" height="48"><span>Tanuki Box</span></a>
  </div>
  <div class="counter" aria-hidden="true"></div>
  ${nav(cur)}
</header>`;

function footer() {
  const xLink = SITE.x
    ? `<li><a href="${esc(SITE.x)}" target="_blank" rel="noopener">${ICON.x}${SITE.xName ? esc(SITE.xName) : 'X'}</a></li>`
    : '';
  return `<footer class="site-foot">
  <div class="wrap foot-in">
    <a class="foot-logo" href="/"><img src="/assets/tanuki-96.png" alt="" width="44" height="44"><span>Tanuki Box</span></a>
    <ul class="foot-links">
      <li><a href="/#shelf">${bi({ ja: '箱の棚', en: 'Shelf' })}</a></li>
      <li><a href="/news/">${bi({ ja: 'お知らせ', en: 'News' })}</a></li>
      <li><a href="/about/">${bi({ ja: 'このお店について', en: 'About' })}</a></li>
      <li><a href="/about/#contact">${bi({ ja: 'お問い合わせ', en: 'Contact' })}</a></li>
      <li><a href="/privacy/">${bi({ ja: 'プライバシーポリシー', en: 'Privacy' })}</a></li>
      ${xLink}
    </ul>
    <p class="copy">© 2026 Tanuki Box</p>
  </div>
</footer>
<script src="/site.js?v=${V.js}" defer></script>
</body>
</html>
`;
}

// ---- 箱（棚の1つ） ----
function windowMedia(g, lazy = true) {
  if (g.status === 'soon') {
    return g.teaser
      ? `<img class="media teaser" src="${esc(abs(g.teaser))}" alt="" loading="lazy">`
      : '<span class="mystery" aria-hidden="true">?</span>';
  }
  const poster = esc(abs(g.poster || ja(g.art)));
  if (g.video) {
    return `<video class="media" muted loop playsinline preload="none" poster="${poster}" aria-hidden="true" data-src="${esc(abs(g.video))}"></video>`;
  }
  return `<img class="media" src="${poster}" alt="" ${lazy ? 'loading="lazy"' : ''}>`;
}

function box(g, { featuredHide = false } = {}) {
  const soon = g.status === 'soon';
  const link = hasPage(g) ? pageOf(g) : g.play ? abs(g.play) : g.steam && g.steam.url ? g.steam.url : null;
  const tag = link ? 'a' : 'div';
  const attrs = link ? ` href="${esc(link)}"${/^https?:/.test(link) ? ' target="_blank" rel="noopener"' : ''}` : '';
  const cls = ['gbox'];
  if (soon) cls.push('is-soon');
  if (featuredHide && g.featured) cls.push('is-featured');
  const types = [soon ? 'soon' : 'out', g.play && !soon ? 'browser' : '', g.steam && g.steam.url ? 'steam' : ''].filter(Boolean).join(' ');
  return `<article class="${cls.join(' ')}" style="--box:${esc(g.box || '#f3cf8e')}" data-types="${types}">
  <${tag} class="gbox-art"${attrs} aria-label="${esc(g.title)}">
    <span class="flap flap-l" aria-hidden="true"></span><span class="flap flap-r" aria-hidden="true"></span>
    <span class="gbox-face">
      <span class="win">${windowMedia(g)}</span>
      <span class="gbox-title">${esc(g.title)}</span>
      <span class="gbox-brand" aria-hidden="true"><img src="/assets/tanuki-96.png" alt="" width="22" height="22">Tanuki Box</span>
      ${soon ? '<span class="tape" aria-hidden="true"></span>' : `<span class="stamp" aria-hidden="true">${bi({ ja: '無料', en: 'FREE' })}</span>`}
      ${g.isNew ? '<span class="ribbon" aria-hidden="true">NEW</span>' : ''}
    </span>
  </${tag}>
  <div class="gbox-info">
    ${g.genre ? `<span class="tag">${bi(g.genre)}</span>` : ''}
    <h3>${esc(g.title)}${bi(g.sub, 'small')}</h3>
    ${soon ? bi(g.desc, 'p', 'soon-note') : chips(g) + `<div class="btns">${playBtn(g)}${steamBtn(g)}${moreBtn(g)}</div>`}
  </div>
</article>`;
}

// ---- お知らせの1行 ----
const newsItem = (n) => `<li class="news-item">
  ${dateBi(n.date)}
  ${n.link ? `<a href="${esc(abs(n.link))}">${bi({ ja: n.ja, en: n.en })}<span class="arrow" aria-hidden="true">›</span></a>` : `<p>${bi({ ja: n.ja, en: n.en })}</p>`}
</li>`;

// ================================================================ トップ
function topPage() {
  const tabs = [
    { id: 'all', t: { ja: 'すべて', en: 'All' }, n: GAMES.length },
    { id: 'browser', t: { ja: 'ブラウザで遊べる', en: 'Play in browser' }, n: GAMES.filter((g) => g.status !== 'soon' && g.play).length },
    { id: 'steam', t: { ja: 'Steam', en: 'Steam' }, n: GAMES.filter((g) => g.steam && g.steam.url).length },
    { id: 'soon', t: { ja: 'もうすぐ', en: 'Coming soon' }, n: GAMES.filter((g) => g.status === 'soon').length }
  ].filter((tb) => tb.id === 'all' || tb.n > 0);
  // スマホで「いちおし」と棚に同じゲームが続かないように：遊べるゲームが3本以上になったら、棚からいちおしを外す
  const featuredHide = OUT.length >= 3;

  const feat = FEATURED
    ? `<section class="wrap feat-wrap" id="pick" aria-labelledby="pick-h">
  <div class="featured">
    <div class="feat-box" style="--box:${esc(FEATURED.box || '#f3cf8e')}">
      <span class="flap flap-l" aria-hidden="true"></span><span class="flap flap-r" aria-hidden="true"></span>
      <a class="feat-win" href="${esc(hasPage(FEATURED) ? pageOf(FEATURED) : abs(FEATURED.play))}" aria-label="${esc(FEATURED.title)}">
        ${FEATURED.video
          ? `<video class="media" autoplay muted loop playsinline preload="metadata" poster="${esc(abs(FEATURED.poster || ja(FEATURED.art)))}" aria-hidden="true"><source src="${esc(abs(FEATURED.video))}" type="video/mp4"></video>`
          : `<img class="media" src="${esc(abs(ja(FEATURED.art)))}" alt="">`}
      </a>
      ${FEATURED.isNew ? '<span class="ribbon" aria-hidden="true">NEW</span>' : ''}
    </div>
    <div class="feat-text">
      <p class="feat-label" id="pick-h">★ ${bi({ ja: 'いちおし', en: "Today's pick" })}</p>
      <h2 class="feat-title">${esc(FEATURED.title)}${bi(FEATURED.sub, 'small')}</h2>
      ${bi(FEATURED.desc, 'p')}
      ${chips(FEATURED)}
      <div class="btns">${playBtn(FEATURED, true)}${steamBtn(FEATURED, true)}${moreBtn(FEATURED)}</div>
    </div>
  </div>
</section>`
    : '';

  const news = NEWS.length
    ? `<section class="wrap news" id="news" aria-labelledby="news-h">
  <div class="sec-head"><h2 id="news-h">${bi({ ja: 'お知らせ', en: 'News' })}</h2><a class="more" href="/news/">${bi({ ja: 'すべて見る', en: 'All news' })} ›</a></div>
  <ul class="news-list board">${NEWS.slice(0, 3).map(newsItem).join('')}</ul>
</section>`
    : '';

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tanuki Box',
    alternateName: 'たぬきのゲーム箱屋さん',
    url: SITE.url + '/',
    inLanguage: ['ja', 'en']
  };

  return `${head({
    title: 'Tanuki Box｜たぬきのゲーム箱屋さん',
    desc: 'Tanuki Box は、スマホでもPCでもブラウザですぐ遊べる無料のゲームを箱につめてならべている、たぬきのゲーム屋さんです。インストールも登録もいりません。',
    url: '/',
    image: 'assets/ogp.png',
    jsonld
  })}
<body class="top">

<!-- ===== お店の正面（日よけ・看板・カウンターのたぬき） ===== -->
<header class="shop">
  <div class="awning" aria-hidden="true"></div>
  ${LANG_BTN}
  <div class="sky" aria-hidden="true">
    <span class="sun"></span><span class="moon"></span>
    <span class="cloud c1"></span><span class="cloud c2"></span><span class="cloud c3"></span>
    <span class="stars"></span>
  </div>

  <h1 class="sign">
    <a href="/">
      <span class="sign-name">Tanuki Box</span>
      ${bi({ ja: 'ゲームの箱屋さん', en: 'Game Box Shop' }, 'span', 'sign-sub')}
    </a>
  </h1>

  <div class="wrap stage">
    <div class="deco deco-l" aria-hidden="true">
      <span class="crate c-a"><i></i></span><span class="crate c-b"><i></i></span><span class="crate c-c"><i></i></span>
    </div>
    <button class="keeper" type="button" data-keeper aria-label="${esc('たぬきの店主')}"><img src="/assets/tanuki.webp" alt="" width="170" height="170" fetchpriority="high"></button>
    <div class="bubble" aria-live="polite">
      <p class="bubble-hi" data-bubble>${bi({ ja: 'いらっしゃい！', en: 'Welcome in!' })}<br>${bi({ ja: 'どの箱であそぶ？', en: 'Which box will you open?' })}</p>
      ${bi({ ja: 'ブラウザですぐ遊べる無料ゲームを、箱につめてならべています。インストールも登録もいりません。', en: 'Free games you can play right in your browser, packed in boxes. No install, no sign-up.' }, 'p', 'bubble-sub')}
    </div>
    <div class="deco deco-r" aria-hidden="true">
      <span class="board-sign"><b>${bi({ ja: '本日のいちおし', en: "Today's pick" })}</b>${FEATURED ? `<em>${esc(FEATURED.title)}</em>` : ''}</span>
      <span class="lantern"></span>
    </div>
  </div>
  <svg class="dunes" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 40 Q150 8 320 30 T640 26 T960 20 T1200 32 V60 H0 Z" fill="#eec892"/>
  </svg>
  <div class="counter" aria-hidden="true"></div>
  ${nav()}
</header>

<main>
${feat}
${news}
  <!-- 箱の棚 -->
  <section class="wrap" id="shelf" aria-labelledby="shelf-h">
    <h2 id="shelf-h">${bi({ ja: '箱の棚', en: 'The Shelf' })}</h2>
    <div class="tabs" role="tablist" aria-label="Filter">
      ${tabs.map((tb, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-tab="${tb.id}">${bi(tb.t)}<span class="n">${tb.n}</span></button>`).join('')}
    </div>
    <div class="cabinet">
      <div class="shelf" data-filter="all" role="tabpanel">
        ${GAMES.map((g) => box(g, { featuredHide })).join('\n')}
        <p class="empty" hidden>${bi({ ja: 'この棚は まだからっぽ…', en: 'This shelf is empty… for now.' })}</p>
      </div>
    </div>
  </section>

  <!-- Tanuki Box について -->
  <section class="wrap about" aria-labelledby="about-h">
    <h2 id="about-h">${bi({ ja: 'このお店について', en: 'About the shop' })}</h2>
    <div class="points">
      ${point('¥0', 'var(--good)', { ja: 'ずっと無料', en: 'Always free' }, { ja: 'ブラウザ版はお金がかかりません。', en: 'Browser games cost nothing.' })}
      ${point('▶', 'var(--sky)', { ja: 'すぐ遊べる', en: 'Play instantly' }, { ja: 'インストールも会員登録もなし。', en: 'No install, no account.' })}
      ${point('✋', '#ff9ec4', { ja: '片手でOK', en: 'One hand' }, { ja: '電車の中でも、タップだけで。', en: 'Just tap, anywhere.' })}
    </div>
    <div class="keeper-note">
      <img src="/assets/tanuki-96.png" alt="" width="56" height="56" loading="lazy">
      <div>
        ${bi({ ja: '店主より', en: 'From the keeper' }, 'b')}
        ${bi({ ja: '森のはずれで、たぬきの店主がひとりでこつこつ箱づめしています。新しい箱ができたら、お知らせでお伝えします。', en: 'At the edge of the forest, a tanuki keeper packs every box by hand. New boxes are announced in the news.' }, 'p')}
        <a class="more" href="/about/">${bi({ ja: 'このお店について くわしく', en: 'More about the shop' })} ›</a>
      </div>
    </div>
  </section>
</main>
${footer()}`;
}

const point = (ic, bg, title, text) =>
  `<div class="point"><div class="ic" style="background: ${bg}">${ic}</div><div>${bi(title, 'b')}${bi(text)}</div></div>`;

// ================================================================ ゲームの紹介ページ
function gamePage(g) {
  const url = pageOf(g);
  const others = GAMES.filter((o) => o.id !== g.id);
  const list = (arr, tag = 'ul') => `<${tag}>${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</${tag}>`;
  const shareText = { ja: `${g.title}（${ja(g.sub)}）｜ブラウザで無料で遊べる #TanukiBox`, en: `${g.title} — free to play in your browser #TanukiBox` };

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: g.title,
    alternateName: ja(g.sub),
    description: ja(g.desc),
    url: full(url),
    image: full(ja(g.ogp) || ja(g.art) || 'assets/ogp.png'),
    genre: en(g.genre) || undefined,
    gamePlatform: ['Web browser'],
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    inLanguage: ['ja', 'en'],
    datePublished: g.released || undefined,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
    author: { '@type': 'Organization', name: 'Tanuki Box', url: SITE.url + '/' }
  };

  const sec = (id, title, body) => (body ? `<section class="g-sec" id="${id}" aria-labelledby="${id}-h"><h2 id="${id}-h">${bi(title)}</h2>${body}</section>` : '');

  const about = g.about ? biHTML(ja(g.about).map((p) => `<p>${esc(p)}</p>`).join(''), en(g.about).map((p) => `<p>${esc(p)}</p>`).join('')) : '';
  const features = g.features ? biHTML(list(ja(g.features)), list(en(g.features)), 'div', 'feature-list') : '';
  const howto = g.howto ? biHTML(list(ja(g.howto), 'ol'), list(en(g.howto), 'ol'), 'div', 'howto') : '';
  const controls = g.controls
    ? `<div class="table-wrap"><table class="controls"><thead><tr><th></th><th>${ICON.phone}${bi({ ja: 'スマホ', en: 'Phone' })}</th><th>${ICON.pc}PC</th></tr></thead><tbody>${g.controls
        .map((c) => `<tr><th scope="row">${bi(c.what)}</th><td>${bi(c.phone)}</td><td>${bi(c.pc)}</td></tr>`)
        .join('')}</tbody></table></div>`
    : '';
  const shots = g.shots
    ? `<ul class="shots">${g.shots
        .map(
          (s) =>
            `<li><a href="${esc(abs(s.src))}.webp" data-shot><img src="${esc(abs(s.src))}-s.webp" alt="${esc(ja(s.alt))}" width="640" height="360" loading="lazy"></a>${bi(s.alt, 'span', 'cap')}</li>`
        )
        .join('')}</ul>`
    : '';
  const updates = g.updates
    ? `<ul class="news-list updates">${g.updates.map((u) => `<li class="news-item">${dateBi(u.date)}<p>${bi({ ja: u.ja, en: u.en })}</p></li>`).join('')}</ul>`
    : '';

  return `${head({
    title: `${g.title}（${ja(g.sub)}）｜Tanuki Box`,
    desc: ja(g.desc),
    url,
    image: ja(g.ogp) || 'assets/ogp.png',
    imageAlt: g.title,
    jsonld
  })}
<body class="sub game-page">
${miniHeader('')}
<main class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Tanuki Box</a><span aria-hidden="true">›</span><a href="/#shelf">${bi({ ja: '箱の棚', en: 'Shelf' })}</a><span aria-hidden="true">›</span><span aria-current="page">${esc(g.title)}</span></nav>

  <section class="g-hero" aria-labelledby="g-title">
    <div class="feat-box" style="--box:${esc(g.box || '#f3cf8e')}">
      <span class="flap flap-l" aria-hidden="true"></span><span class="flap flap-r" aria-hidden="true"></span>
      <div class="feat-win">
        ${g.video
          ? `<video class="media" autoplay muted loop playsinline preload="metadata" poster="${esc(abs(g.poster || ja(g.art)))}" aria-hidden="true"><source src="${esc(abs(g.video))}" type="video/mp4"></video>`
          : `<img class="media" src="${esc(abs(ja(g.art) || g.poster))}" alt="">`}
      </div>
      ${g.isNew ? '<span class="ribbon" aria-hidden="true">NEW</span>' : ''}
    </div>
    <div class="feat-text">
      ${g.genre ? `<p class="feat-label">${bi(g.genre)}</p>` : ''}
      <h1 class="feat-title" id="g-title">${esc(g.title)}${bi(g.sub, 'small')}</h1>
      ${bi(g.desc, 'p')}
      ${chips(g)}
      <div class="btns">${playBtn(g, true)}${steamBtn(g, true)}</div>
      <div class="share" data-share data-url="${esc(full(url))}" data-text-ja="${esc(shareText.ja)}" data-text-en="${esc(shareText.en)}"${SITE.xName ? ` data-via="${esc(SITE.xName.replace(/^@/, ''))}"` : ''}>
        <button type="button" class="btn-mini" data-share-x>${ICON.x}${bi({ ja: 'ポストする', en: 'Post' })}</button>
        <button type="button" class="btn-mini" data-share-native hidden>${ICON.share}${bi({ ja: 'シェア', en: 'Share' })}</button>
        <button type="button" class="btn-mini" data-copy>${ICON.link}<span data-copy-label>${bi({ ja: 'リンクをコピー', en: 'Copy link' })}</span></button>
      </div>
      ${g.released ? `<p class="released">${bi({ ja: '公開日：', en: 'Released: ' })}${dateBi(g.released)}</p>` : ''}
    </div>
  </section>

  ${sec('about-game', { ja: 'どんなゲーム？', en: 'About the game' }, about + features)}
  ${sec('shots', { ja: '画面写真', en: 'Screenshots' }, shots)}
  ${sec('howto', { ja: '遊び方', en: 'How to play' }, howto)}
  ${sec('controls', { ja: '操作', en: 'Controls' }, controls)}
  ${sec('updates', { ja: '更新の記録', en: 'Updates' }, updates)}

  <section class="g-sec play-again">
    <img src="/assets/tanuki-96.png" alt="" width="64" height="64" loading="lazy">
    ${bi({ ja: '準備ができたら、さっそく あそんでみよう！', en: 'Ready? Open the box and play!' }, 'p')}
    <div class="btns">${playBtn(g, true)}</div>
  </section>

  ${others.length ? `<section class="g-sec" aria-labelledby="others-h"><h2 id="others-h">${bi({ ja: 'ほかの箱も見る', en: 'More boxes' })}</h2><div class="cabinet small"><div class="shelf">${others.map((o) => box(o)).join('\n')}</div></div></section>` : ''}
</main>

<dialog class="lightbox" data-lightbox>
  <img alt="">
  <button type="button" class="lb-close" data-lb-close aria-label="Close">×</button>
</dialog>
${footer()}`;
}

// ================================================================ お知らせ
function newsPage() {
  return `${head({ title: 'お知らせ｜Tanuki Box', desc: 'Tanuki Box の新しいゲーム・更新のお知らせ。', url: '/news/' })}
<body class="sub">
${miniHeader('')}
<main class="wrap page">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Tanuki Box</a><span aria-hidden="true">›</span><span aria-current="page">${bi({ ja: 'お知らせ', en: 'News' })}</span></nav>
  <h1 class="page-title">${bi({ ja: 'お知らせ', en: 'News' })}</h1>
  <ul class="news-list board">${NEWS.map(newsItem).join('')}</ul>
</main>
${footer()}`;
}

// ================================================================ このお店について
function aboutPage() {
  const contact = SITE.x
    ? biHTML(
        `<p>ご感想・不具合のお知らせ・お仕事のご相談は、Tanuki Box の X（旧Twitter）アカウントへの <b>DM（ダイレクトメッセージ）</b>でお送りください。</p><p><a class="btn btn-x" href="${esc(SITE.x)}" target="_blank" rel="noopener">${ICON.x}X で DM を送る${SITE.xName ? '（' + esc(SITE.xName) + '）' : ''}</a></p>`,
        `<p>For feedback, bug reports or business inquiries, please send a <b>direct message</b> to Tanuki Box on X (formerly Twitter).</p><p><a class="btn btn-x" href="${esc(SITE.x)}" target="_blank" rel="noopener">${ICON.x}Send a DM on X${SITE.xName ? ' (' + esc(SITE.xName) + ')' : ''}</a></p>`
      )
    : biHTML(
        '<p>ご感想・不具合のお知らせ・お仕事のご相談は、Tanuki Box の X（旧Twitter）アカウントへの <b>DM（ダイレクトメッセージ）</b>で受け付けます。</p><p class="notice">X のアカウントは、ただいま準備中です。開設したら、このページにリンクをのせます。</p>',
        '<p>Feedback, bug reports and business inquiries are welcome as a <b>direct message</b> to Tanuki Box on X (formerly Twitter).</p><p class="notice">Our X account is coming soon. We will add a link here once it is open.</p>'
      );
  return `${head({ title: 'このお店について｜Tanuki Box', desc: 'Tanuki Box は、ブラウザですぐ遊べる無料のゲームを箱につめてならべている、たぬきのゲーム屋さんです。', url: '/about/' })}
<body class="sub">
${miniHeader('/about/')}
<main class="wrap page">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Tanuki Box</a><span aria-hidden="true">›</span><span aria-current="page">${bi({ ja: 'このお店について', en: 'About' })}</span></nav>
  <h1 class="page-title">${bi({ ja: 'このお店について', en: 'About the shop' })}</h1>

  <section class="paper about-intro">
    <img src="/assets/tanuki.webp" alt="" width="150" height="150" loading="lazy">
    ${biHTML(
      '<p><b>Tanuki Box（たぬきのゲーム箱屋さん）</b>は、スマホでもPCでも、ブラウザを開けばすぐ遊べるゲームを、ひとつずつ箱につめてならべているお店です。</p><p>森のはずれで、たぬきの店主がひとりでこつこつ作っています。電車を待つあいだや、ひと休みのあいだに、片手でちょっと遊べるゲームを目指しています。</p>',
      '<p><b>Tanuki Box</b> is a little shop that packs games into boxes — games you can play right away in the browser on your phone or PC.</p><p>A tanuki keeper at the edge of the forest makes them one by one. We aim for games you can enjoy with one hand, while waiting for a train or taking a short break.</p>'
    )}
  </section>

  <section class="g-sec" aria-labelledby="promise-h">
    <h2 id="promise-h">${bi({ ja: 'お店のやくそく', en: 'Our promises' })}</h2>
    <div class="points">
      ${point('¥0', 'var(--good)', { ja: 'ずっと無料', en: 'Always free' }, { ja: 'ブラウザ版のゲームは、お金がかかりません。', en: 'Browser games cost nothing.' })}
      ${point('▶', 'var(--sky)', { ja: 'すぐ遊べる', en: 'Play instantly' }, { ja: 'インストールも、会員登録もいりません。', en: 'No install, no account.' })}
      ${point('🔒', '#c8e6a0', { ja: '個人情報を集めない', en: 'No personal data' }, { ja: '名前やメールアドレスは聞きません。', en: 'We never ask for your name or email.' })}
    </div>
  </section>

  <section class="g-sec" id="contact" aria-labelledby="contact-h">
    <h2 id="contact-h">${bi({ ja: 'お問い合わせ', en: 'Contact' })}</h2>
    <div class="paper">${contact}</div>
  </section>

  <p class="page-foot"><a class="more" href="/privacy/">${bi({ ja: 'プライバシーポリシー', en: 'Privacy policy' })} ›</a></p>
</main>
${footer()}`;
}

// ================================================================ プライバシーポリシー
function privacyPage() {
  const UPDATED = '2026-10-06';
  const contactJa = SITE.x ? `<a href="${esc(SITE.x)}" target="_blank" rel="noopener">X の DM</a>` : 'X の DM（アカウントは準備中です）';
  const contactEn = SITE.x ? `<a href="${esc(SITE.x)}" target="_blank" rel="noopener">a direct message on X</a>` : 'a direct message on X (account coming soon)';
  const jaBody = `
<p>Tanuki Box（以下「このお店」）は、このサイトと、このサイトで公開しているゲームでの情報の取りあつかいを、次のように定めます。</p>
<h2>1. 集める情報</h2>
<p>このお店は、お名前・メールアドレス・住所・電話番号などの個人情報を集めません。会員登録もありません。</p>
<h2>2. ブラウザの中に保存するもの</h2>
<p>ゲームの記録・コイン・設定（音のオン・オフ、言語など）は、お使いのブラウザの中（ローカルストレージ）に保存します。このお店のサーバーには送られません。ブラウザのデータを消すと、記録も消えます。</p>
<h2>3. ランキング</h2>
<p>ランキングがあるゲームで、ランキングに参加した場合だけ、えらんだ名前（用意された言葉の組み合わせ）と記録（距離・最高時速など）を、ランキング用のサーバー（Cloudflare）に送ります。送った名前と記録は、ランキングとして、ほかの遊んでいる人にも表示されます。</p>
<h2>4. 外部のサービス</h2>
<ul>
<li>このサイトは GitHub Pages（GitHub, Inc.）で公開しています。ページを開いたときの通信の記録（IPアドレスなど）は、GitHub が安全のために記録することがあります。</li>
<li>文字の形（フォント）を Google Fonts（Google LLC）から読み込んでいます。このとき、お使いの端末から Google のサーバーに通信が行われます。</li>
<li>ランキングのサーバーは Cloudflare, Inc. のサービスを使っています。</li>
</ul>
<h2>5. 広告とアクセス解析</h2>
<p>いまは、広告とアクセス解析（来た人の数を数える仕組み）は使っていません。使うことになったときは、このページでお知らせします。</p>
<h2>6. お問い合わせ</h2>
<p>このページについてのお問い合わせは、${contactJa}で受け付けます。</p>
<h2>7. 変更</h2>
<p>このページの内容は、必要に応じて変更することがあります。変更したときは、このページに最新の内容をのせます。</p>
<p class="updated">最終更新日：${dateJa(UPDATED)}</p>`;
  const enBody = `
<p>This page explains how Tanuki Box ("we") handles information on this website and in the games published here.</p>
<h2>1. What we collect</h2>
<p>We do not collect personal information such as your name, email address, postal address or phone number. There are no accounts.</p>
<h2>2. What is stored in your browser</h2>
<p>Game records, coins and settings (sound on/off, language, etc.) are saved in your own browser (local storage). They are not sent to our servers. Clearing your browser data also clears your records.</p>
<h2>3. Rankings</h2>
<p>Only if you choose to join a ranking in a game that has one, the name you picked (a combination of preset words) and your records (distance, top speed, etc.) are sent to the ranking server (Cloudflare). They are shown to other players as part of the ranking.</p>
<h2>4. Third-party services</h2>
<ul>
<li>This site is hosted on GitHub Pages (GitHub, Inc.). GitHub may log connection data such as IP addresses for security purposes.</li>
<li>Fonts are loaded from Google Fonts (Google LLC), which means your device connects to Google's servers.</li>
<li>The ranking server runs on Cloudflare, Inc.</li>
</ul>
<h2>5. Ads and analytics</h2>
<p>We currently use no advertising and no analytics. If that changes, we will announce it on this page.</p>
<h2>6. Contact</h2>
<p>Questions about this policy are welcome via ${contactEn}.</p>
<h2>7. Changes</h2>
<p>We may update this policy when needed. The latest version will always be on this page.</p>
<p class="updated">Last updated: ${dateEn(UPDATED)}</p>`;
  return `${head({ title: 'プライバシーポリシー｜Tanuki Box', desc: 'Tanuki Box の情報の取りあつかいについて。', url: '/privacy/' })}
<body class="sub">
${miniHeader('')}
<main class="wrap page">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Tanuki Box</a><span aria-hidden="true">›</span><span aria-current="page">${bi({ ja: 'プライバシーポリシー', en: 'Privacy policy' })}</span></nav>
  <h1 class="page-title">${bi({ ja: 'プライバシーポリシー', en: 'Privacy policy' })}</h1>
  ${biHTML(jaBody, enBody, 'article', 'paper legal')}
</main>
${footer()}`;
}

// ================================================================ 迷子のページ（404）
function notFoundPage() {
  return `${head({ title: '箱が見つかりません｜Tanuki Box', desc: 'お探しのページは見つかりませんでした。', url: '/404.html', noindex: true })}
<body class="sub lost">
${miniHeader('')}
<main class="wrap page lost-main">
  <div class="lost-box" aria-hidden="true"><span class="flap flap-l"></span><span class="flap flap-r"></span><span class="lost-face">?</span></div>
  <img class="lost-tanuki" src="/assets/tanuki.webp" alt="" width="140" height="140">
  <h1 class="page-title">${bi({ ja: 'あれれ、この箱は見つからないよ', en: "Hmm, we can't find that box" })}</h1>
  ${bi({ ja: '住所がまちがっているか、箱が棚から下ろされたのかもしれません。たぬきが棚まで案内します。', en: 'The address may be wrong, or the box was taken off the shelf. Let the tanuki take you back.' }, 'p', 'lost-text')}
  <div class="btns center"><a class="btn btn-play big" href="/#shelf">${bi({ ja: '箱の棚へ', en: 'To the shelf' })} ›</a><a class="btn btn-more" href="/">${bi({ ja: 'トップへ', en: 'Home' })}</a></div>
</main>
${footer()}`;
}

// ================================================================ サイトマップ
function sitemap() {
  const urls = ['/', '/news/', '/about/', '/privacy/', ...GAMES.filter(hasPage).map(pageOf)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE.url}${u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}
</urlset>
`;
}

// ---- 作る ----
console.log('Tanuki Box: ページを作ります');
write('index.html', topPage());
for (const g of GAMES.filter(hasPage)) write(`games/${g.id}/index.html`, gamePage(g));
write('news/index.html', newsPage());
write('about/index.html', aboutPage());
write('privacy/index.html', privacyPage());
write('404.html', notFoundPage());
write('sitemap.xml', sitemap());
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log('できました');
