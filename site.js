/*
 * Tanuki Box のページの動き（どのページでも読みこむ）
 * ・日本語 / 英語の切りかえ（ページの文字は両方書いてあり、表示する方を切りかえるだけ）
 * ・棚の絞りこみのタブ（すべて / ブラウザで遊べる / Steam / もうすぐ）
 * ・箱の窓の映像：PC は箱にカーソルを乗せたとき、スマホは画面に見えているときに流す
 * ・たぬきの店主：さわると、ぴょんとはねて、ちがうことを話す
 * ・紹介ページ：シェア（X・スマホのシェア・リンクをコピー）と、画面写真の拡大
 * ページそのものは tools/build.mjs が作る。
 */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;
  function lang() { return root.getAttribute('data-lang') || 'ja'; }
  function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }

  // ---------------------------------------------------------------- 言語
  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.lang = l;
    try { localStorage.setItem('tb-lang', l); } catch (e) { /* 保存できなくても、表示は切りかえる */ }
  }
  $$('[data-lang-toggle]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(lang() === 'ja' ? 'en' : 'ja'); });
  });

  // ---------------------------------------------------------------- 箱の窓の映像
  function load(v) {
    if (v.getAttribute('data-src') && !v.src) { v.src = v.getAttribute('data-src'); v.preload = 'auto'; }
  }
  function play(v) {
    if (reduceMotion) return;
    load(v);
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  var boxes = $$('.gbox');
  boxes.forEach(function (box) {
    var v = box.querySelector('video');
    if (!v || !canHover) return;
    box.addEventListener('mouseenter', function () { play(v); });
    box.addEventListener('mouseleave', function () { v.pause(); });
  });
  // スマホ：画面に見えている箱だけ、ふたを開けて映像を流す
  if (!canHover && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var box = en.target, v = box.querySelector('video');
        box.classList.toggle('in-view', en.isIntersecting);
        if (!v) return;
        if (en.isIntersecting) play(v); else v.pause();
      });
    }, { threshold: 0.6 });
    boxes.forEach(function (b) { io.observe(b); });
  }
  // いちおし・紹介ページの大きな映像（動きを減らす設定のときは止める）
  $$('.feat-win video').forEach(function (v) {
    if (reduceMotion) { v.removeAttribute('autoplay'); v.pause(); return; }
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  });

  // ---------------------------------------------------------------- 棚のタブ
  var shelf = document.querySelector('.shelf[data-filter]');
  $$('[data-tab]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var id = tab.getAttribute('data-tab');
      $$('[data-tab]').forEach(function (t) { t.setAttribute('aria-selected', String(t === tab)); });
      shelf.setAttribute('data-filter', id);
      var shown = 0;
      $$('.gbox', shelf).forEach(function (b) {
        var ok = id === 'all' || (' ' + b.getAttribute('data-types') + ' ').indexOf(' ' + id + ' ') >= 0;
        b.hidden = !ok;
        if (ok) shown++;
      });
      var empty = shelf.querySelector('.empty');
      if (empty) empty.hidden = shown > 0;
    });
  });

  // ---------------------------------------------------------------- たぬきの店主
  var LINES = [
    { ja: 'いらっしゃい！<br>どの箱であそぶ？', en: 'Welcome in!<br>Which box will you open?' },
    { ja: 'ぽんぽこ！<br>きょうも 箱づめ中だよ', en: 'Pon-poko!<br>Packing boxes all day.' },
    { ja: '箱の中身は<br>あけてからのおたのしみ！', en: "What's inside?<br>Open it and see!" },
    { ja: 'ぜんぶ無料だよ。<br>気軽にどうぞ！', en: "It's all free.<br>Help yourself!" },
    { ja: 'つぎの箱も<br>いま つくってるよ', en: 'The next box<br>is on its way!' },
    { ja: 'しっぽ…さわった？', en: 'Did you… touch my tail?' }
  ];
  var line = 0;
  var keeper = document.querySelector('[data-keeper]');
  var bubble = document.querySelector('[data-bubble]');
  if (keeper && bubble) {
    keeper.addEventListener('click', function () {
      line = (line + 1) % LINES.length;
      var L = LINES[line];
      bubble.innerHTML = '<span lang="ja">' + L.ja + '</span><span lang="en">' + L.en + '</span>';
      keeper.classList.remove('hop');
      void keeper.offsetWidth; // アニメーションをもう一度はじめから
      keeper.classList.add('hop');
    });
  }

  // ---------------------------------------------------------------- シェア（紹介ページ）
  $$('[data-share]').forEach(function (box) {
    var url = box.getAttribute('data-url');
    function text() { return box.getAttribute('data-text-' + lang()) || box.getAttribute('data-text-ja'); }
    var x = box.querySelector('[data-share-x]');
    if (x) x.addEventListener('click', function () {
      var via = box.getAttribute('data-via');
      var u = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text()) + '&url=' + encodeURIComponent(url) + (via ? '&via=' + encodeURIComponent(via) : '');
      window.open(u, '_blank', 'noopener');
    });
    var nat = box.querySelector('[data-share-native]');
    if (nat && navigator.share && !canHover) {
      nat.hidden = false;
      nat.addEventListener('click', function () {
        navigator.share({ title: document.title, text: text(), url: url }).catch(function () {});
      });
    }
    var cp = box.querySelector('[data-copy]');
    if (cp) cp.addEventListener('click', function () {
      var label = cp.querySelector('[data-copy-label]');
      var old = label.innerHTML;
      function done() {
        label.innerHTML = '<span lang="ja">コピーしました！</span><span lang="en">Copied!</span>';
        setTimeout(function () { label.innerHTML = old; }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { window.prompt('URL', url); });
      else window.prompt('URL', url);
    });
  });

  // ---------------------------------------------------------------- 画面写真の拡大
  var lb = document.querySelector('[data-lightbox]');
  if (lb && typeof lb.showModal === 'function') {
    var img = lb.querySelector('img');
    $$('[data-shot]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        img.src = a.getAttribute('href');
        img.alt = (a.querySelector('img') || {}).alt || '';
        lb.showModal();
      });
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.hasAttribute('data-lb-close')) lb.close(); });
  }
})();
