/*
 * Tanuki Box のゲーム一覧（ここを書きかえると、トップページの棚にならぶ箱が変わる）
 *
 * 1本ぶんの書き方：
 * {
 *   id: 'dust-dash',                         // 半角の名前（かぶらないように）
 *   status: 'out',                           // 'out' = 遊べる / 'soon' = 準備中
 *   isNew: true,                             // 「NEW」の札をつける
 *   featured: true,                          // いちばん上の「いちおし」に出す（1本だけ）
 *   title: 'DUST DASH',
 *   sub:  { ja: '砂けむりダッシュ', en: '…' },   // 箱の下の小さな名前
 *   desc: { ja: '…', en: '…' },              // 説明（2〜3行）
 *   play: 'DUST-DASH/',                      // ブラウザ版の場所（ないときは null）
 *   steam: null,                             // Steam 版ができたら { url: 'https://store.steampowered.com/app/番号/', wishlist: true }
 *                                            //   wishlist: true のあいだは「ウィッシュリストに追加」ボタンになる
 *   video: 'assets/games/dust-dash.mp4',     // 箱の窓で流れるプレイ映像（なければ null）
 *   poster: 'assets/games/dust-dash-poster.jpg', // 映像が始まる前の絵
 *   art: { ja: 'assets/games/dust-dash.png', en: 'assets/games/dust-dash-en.png' }, // いちおしの大きな絵
 *   box: '#f3cf8e',                          // 箱の色
 *   time: { ja: '1プレイ約1分', en: '~1 min per run' },
 *   control: { ja: '片手でタップ', en: 'One tap' },
 *   devices: ['phone', 'pc']                 // 'phone' / 'pc' / 'steam'
 * }
 */
window.TB_GAMES = [
  {
    id: 'dino-duel',
    status: 'out',
    isNew: true,
    title: 'DINO DUEL',
    sub: { ja: '恐竜カードバトル', en: 'Dino card battle' },
    desc: {
      ja: '技が当たる瞬間にタップ！ 3体対3体の恐竜カードバトル。賞金でパックを引いて40種の恐竜を集め、5つの大会を勝ちぬこう。',
      en: 'Tap as each move lands! A 3-vs-3 dino card battle. Win prize money, pull packs, collect 40 dinos and conquer 5 cups.'
    },
    play: 'DINO-DUEL/',
    steam: null,
    video: null,
    poster: 'assets/games/dino-duel-poster.jpg',
    art: { ja: 'assets/games/dino-duel.png', en: 'assets/games/dino-duel-en.png' },
    box: '#f6b26b',
    time: { ja: '1試合約2分', en: '~2 min per match' },
    control: { ja: '片手でタップ', en: 'One tap' },
    devices: ['phone', 'pc']
  },
  {
    id: 'dust-dash',
    status: 'out',
    isNew: true,
    featured: true,
    title: 'DUST DASH',
    sub: { ja: '砂けむりダッシュ', en: 'Desert one-tap runner' },
    desc: {
      ja: '獲物を上から踏んで食べて加速！ 追ってくるタカから逃げきる、片手でタップするだけのランナーゲーム。全10ステージとエンドレスモード。',
      en: 'Stomp prey to speed up and outrun the hawk in this one-tap runner. 10 stages plus an endless mode.'
    },
    play: 'DUST-DASH/',
    steam: null,
    video: 'assets/games/dust-dash.mp4',
    poster: 'assets/games/dust-dash-poster.jpg',
    art: { ja: 'assets/games/dust-dash.png', en: 'assets/games/dust-dash-en.png' },
    box: '#f3cf8e',
    time: { ja: '1プレイ約1分', en: '~1 min per run' },
    control: { ja: '片手でタップ', en: 'One tap' },
    devices: ['phone', 'pc']
  },
  {
    id: 'next',
    status: 'soon',
    title: '???',
    sub: { ja: 'つぎの箱を準備中…', en: 'Next box in the works…' },
    desc: { ja: 'たぬきが せっせと箱づめ中。おたのしみに！', en: 'The tanuki is busy packing it. Stay tuned!' },
    play: null,
    steam: null,
    box: '#e6d3b0'
  }
];
