/*
 * Tanuki Box トップページの動き
 * ・games.js のゲームを「いちおし」と「棚の箱」にならべる
 * ・絞りこみのタブ（すべて / ブラウザで遊べる / Steam / もうすぐ）。1本もないタブは出さない
 * ・箱の窓の映像：PC は箱にカーソルを乗せたとき、スマホは画面に見えているときに流す
 * ・日本語 / 英語の切りかえ（?lang=en / 前にえらんだ言語 / ブラウザの言語）
 */
(function () {
  'use strict';
  var GAMES = window.TB_GAMES || [];
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var filter = 'all';

  var UI = {
    ja: { play: 'あそぶ', steam: 'Steam で見る', wish: 'Steam でウィッシュリスト', soon: 'もうすぐ', isNew: 'NEW', free: '無料',
      all: 'すべて', browser: 'ブラウザで遊べる', steamTab: 'Steam', soonTab: 'もうすぐ', phone: 'スマホ', pc: 'PC', empty: 'この棚は まだからっぽ…', pick: 'いちおし' },
    en: { play: 'PLAY', steam: 'View on Steam', wish: 'Wishlist on Steam', soon: 'Soon', isNew: 'NEW', free: 'FREE',
      all: 'All', browser: 'Play in browser', steamTab: 'Steam', soonTab: 'Coming soon', phone: 'Phone', pc: 'PC', empty: 'This shelf is empty… for now.', pick: "Today's pick" }
  };

  function lang() { return root.getAttribute('data-lang') || 'ja'; }
  function t(key) { return UI[lang()][key]; }
  function L(v) { return v && typeof v === 'object' ? (v[lang()] || v.ja) : v; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // ---- 小さな絵（アイコン） ----
  var ICON = {
    time: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8" fill="#fff" stroke="currentColor" stroke-width="2.5"/><path d="M12 9v4l3 2M9 2h6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>',
    tap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11V5.5a1.8 1.8 0 0 1 3.6 0V11l4 .8a2 2 0 0 1 1.6 2.3l-.9 5a2.5 2.5 0 0 1-2.5 2H10a2.5 2.5 0 0 1-2-1l-3.2-4.3a1.6 1.6 0 0 1 2.4-2.1L9 15" fill="#fff" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5" fill="#fff" stroke="currentColor" stroke-width="2.3"/><circle cx="12" cy="18" r="1.2" fill="currentColor"/></svg>',
    pc: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" fill="#fff" stroke="currentColor" stroke-width="2.3"/><path d="M8 20h8M12 16v4" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/></svg>',
    steam: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="#1b2838" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="9.5" r="3" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="9" cy="15" r="2.2" fill="#fff"/><path d="M9 15l5-4.5" stroke="#fff" stroke-width="1.8"/></svg>'
  };

  function metaChips(g) {
    var out = [];
    if (g.time) out.push('<li>' + ICON.time + esc(L(g.time)) + '</li>');
    if (g.control) out.push('<li>' + ICON.tap + esc(L(g.control)) + '</li>');
    (g.devices || []).forEach(function (d) {
      if (d === 'phone') out.push('<li>' + ICON.phone + t('phone') + '</li>');
      if (d === 'pc') out.push('<li>' + ICON.pc + t('pc') + '</li>');
      if (d === 'steam') out.push('<li>' + ICON.steam + 'Steam</li>');
    });
    return out.length ? '<ul class="chips">' + out.join('') + '</ul>' : '';
  }

  function buttons(g, big) {
    var b = [];
    if (g.play) b.push('<a class="btn btn-play' + (big ? ' big' : '') + '" href="' + esc(g.play) + '">' + t('play') + ' <span aria-hidden="true">▶</span></a>');
    if (g.steam && g.steam.url) {
      b.push('<a class="btn btn-steam' + (big ? ' big' : '') + '" href="' + esc(g.steam.url) + '" target="_blank" rel="noopener">' + ICON.steam + (g.steam.wishlist ? t('wish') : t('steam')) + '</a>');
    }
    return b.length ? '<div class="btns">' + b.join('') + '</div>' : '';
  }

  // 窓の中：映像（あれば）か、止まった絵
  function windowMedia(g) {
    if (g.status === 'soon') return '<div class="mystery" aria-hidden="true">?</div>';
    var poster = esc(g.poster || L(g.art) || '');
    if (g.video && !reduceMotion) {
      return '<video class="media" muted loop playsinline preload="none" poster="' + poster + '" aria-hidden="true"><source src="' + esc(g.video) + '" type="video/mp4"></video>';
    }
    return '<img class="media" src="' + poster + '" alt="" loading="lazy">';
  }

  // 棚の箱 1つ
  function boxHTML(g) {
    var soon = g.status === 'soon';
    var link = g.play || (g.steam && g.steam.url) || null;
    var tag = link ? 'a' : 'div';
    var attrs = link ? ' href="' + esc(link) + '"' + (g.play ? '' : ' target="_blank" rel="noopener"') : '';
    return '' +
      '<article class="gbox' + (soon ? ' is-soon' : '') + '" style="--box:' + esc(g.box || '#f3cf8e') + '" data-id="' + esc(g.id) + '">' +
        '<' + tag + ' class="gbox-art"' + attrs + ' aria-label="' + esc(g.title) + '">' +
          '<span class="flap flap-l" aria-hidden="true"></span><span class="flap flap-r" aria-hidden="true"></span>' +
          '<span class="gbox-face">' +
            '<span class="win">' + windowMedia(g) + '</span>' +
            '<span class="gbox-title">' + esc(g.title) + '</span>' +
            '<span class="gbox-brand" aria-hidden="true"><img src="assets/tanuki-96.png" alt="">Tanuki Box</span>' +
            (soon ? '<span class="tape" aria-hidden="true"></span>' : '<span class="stamp" aria-hidden="true">' + t('free') + '</span>') +
            (g.isNew ? '<span class="ribbon" aria-hidden="true">' + t('isNew') + '</span>' : '') +
          '</span>' +
        '</' + tag + '>' +
        '<div class="gbox-info">' +
          '<h3>' + esc(g.title) + '<small>' + esc(L(g.sub)) + '</small></h3>' +
          (soon ? '<p class="soon-note">' + esc(L(g.desc)) + '</p>' : metaChips(g) + buttons(g, false)) +
        '</div>' +
      '</article>';
  }

  // いちおし（大きく）
  function featuredHTML(g) {
    var art = L(g.art) || g.poster;
    return '' +
      '<div class="feat-box" style="--box:' + esc(g.box || '#f3cf8e') + '">' +
        '<span class="flap flap-l" aria-hidden="true"></span><span class="flap flap-r" aria-hidden="true"></span>' +
        '<div class="feat-win">' +
          (g.video && !reduceMotion
            ? '<video class="media" autoplay muted loop playsinline poster="' + esc(g.poster || art) + '" aria-hidden="true"><source src="' + esc(g.video) + '" type="video/mp4"></video>'
            : '<img class="media" src="' + esc(art) + '" alt="">') +
        '</div>' +
        (g.isNew ? '<span class="ribbon" aria-hidden="true">' + t('isNew') + '</span>' : '') +
      '</div>' +
      '<div class="feat-text">' +
        '<p class="feat-label">★ ' + t('pick') + '</p>' +
        '<h2 class="feat-title">' + esc(g.title) + '<small>' + esc(L(g.sub)) + '</small></h2>' +
        '<p>' + esc(L(g.desc)) + '</p>' +
        metaChips(g) +
        buttons(g, true) +
      '</div>';
  }

  var TABS = [
    { id: 'all', label: 'all', test: function () { return true; } },
    { id: 'browser', label: 'browser', test: function (g) { return g.status !== 'soon' && !!g.play; } },
    { id: 'steam', label: 'steamTab', test: function (g) { return !!(g.steam && g.steam.url); } },
    { id: 'soon', label: 'soonTab', test: function (g) { return g.status === 'soon'; } }
  ];

  function render() {
    var feat = GAMES.filter(function (g) { return g.featured && g.status !== 'soon'; })[0];
    var featEl = document.getElementById('featured');
    if (feat) {
      featEl.innerHTML = featuredHTML(feat); featEl.hidden = false;
      var fv = featEl.querySelector('video'); // innerHTML で入れた autoplay は動かないことがあるので、自分で流す
      if (fv) { var fp = fv.play(); if (fp && fp.catch) fp.catch(function () {}); }
    } else { featEl.hidden = true; }

    // タブ（1本もないタブは出さない）
    var tabs = TABS.filter(function (tb) { return tb.id === 'all' || GAMES.some(tb.test); });
    if (!tabs.some(function (tb) { return tb.id === filter; })) filter = 'all';
    var tabEl = document.getElementById('tabs');
    tabEl.innerHTML = tabs.map(function (tb) {
      var n = GAMES.filter(tb.test).length;
      return '<button type="button" role="tab" aria-selected="' + (tb.id === filter) + '" data-tab="' + tb.id + '">' + t(tb.label) + '<span class="n">' + n + '</span></button>';
    }).join('');

    var cur = TABS.filter(function (tb) { return tb.id === filter; })[0];
    var list = GAMES.filter(cur.test);
    document.getElementById('shelf').innerHTML = list.length ? list.map(boxHTML).join('') : '<p class="empty">' + t('empty') + '</p>';
    hookVideos();
  }

  // ---- 箱の窓の映像 ----
  var io = null;
  function hookVideos() {
    if (io) io.disconnect();
    var boxes = document.querySelectorAll('.gbox');
    var canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;
    Array.prototype.forEach.call(boxes, function (box) {
      var v = box.querySelector('video');
      if (!v) return;
      if (canHover) {
        box.addEventListener('mouseenter', function () { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); });
        box.addEventListener('mouseleave', function () { v.pause(); });
      }
    });
    // スマホ：画面に見えている箱の映像だけ流す（ふたも開く）
    if (!canHover && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var box = en.target, v = box.querySelector('video');
          box.classList.toggle('in-view', en.isIntersecting);
          if (!v) return;
          if (en.isIntersecting) { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
        });
      }, { threshold: 0.6 });
      Array.prototype.forEach.call(boxes, function (b) { io.observe(b); });
    }
  }

  // ---- 言語 ----
  function saved() { try { return localStorage.getItem('tb-lang'); } catch (e) { return null; } }
  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.lang = l;
    try { localStorage.setItem('tb-lang', l); } catch (e) { /* 保存できなくても表示は切りかえる */ }
    render();
  }

  document.getElementById('tabs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-tab]');
    if (!b) return;
    filter = b.getAttribute('data-tab');
    render();
  });
  document.getElementById('lang').addEventListener('click', function () { setLang(lang() === 'ja' ? 'en' : 'ja'); });

  var q = /[?&]lang=(ja|en)/.exec(location.search);
  var nav = (navigator.language || 'en').toLowerCase().indexOf('ja') === 0 ? 'ja' : 'en';
  setLang(q ? q[1] : saved() || nav);
})();
