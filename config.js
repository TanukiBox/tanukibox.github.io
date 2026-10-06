/*
 * Tanuki Box のサイト全体の設定。書きかえたら `node tools/build.mjs` を実行する。
 */
window.TB_SITE = {
  // サイトの住所（最後の / はなし）。独自ドメインにしたら、ここを書きかえる
  url: 'https://tanukibox.github.io',
  // X（旧Twitter）のプロフィールの住所と名前。null のあいだは、X のボタンを出さない
  // 例：x: 'https://x.com/tanukibox', xName: '@tanukibox'
  x: null,
  xName: null
};
