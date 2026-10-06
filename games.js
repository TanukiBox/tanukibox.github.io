/*
 * Tanuki Box のゲーム一覧（ここを書きかえて `node tools/build.mjs` を実行すると、
 * トップページの棚・ゲームごとの紹介ページ・サイトマップが、まとめて作り直される）
 *
 * 1本ぶんの書き方（★は必ず書く。ほかは、なければ省いてよい）：
 * {
 *   ★id: 'dust-dash',                        // 半角の名前（かぶらないように）。紹介ページの住所になる → /games/dust-dash/
 *   ★status: 'out',                          // 'out' = 遊べる / 'soon' = もうすぐ（テープでとじた箱になる）
 *   isNew: true,                              // 「NEW」の札をつける
 *   featured: true,                           // いちばん上の「いちおし」に出す（1本だけ）
 *   ★title: 'DUST DASH',
 *   ★sub:  { ja: '砂けむりダッシュ', en: '…' },  // 箱の下の小さな名前
 *   genre: { ja: 'ランナー', en: 'Runner' },     // 棚の札に出るジャンル
 *   ★desc: { ja: '…', en: '…' },             // 短い説明（2〜3行）
 *   play: '/DUST-DASH/',                      // ブラウザ版の場所（ほかのサイトなら https:// から。ないときは null）
 *   steam: null,                              // Steam 版ができたら { url: 'https://store.steampowered.com/app/番号/', wishlist: true }
 *   released: '2026-09-28',                   // 公開した日
 *   video: 'assets/games/dust-dash.mp4',      // 箱の窓で流れるプレイ映像（6秒くらい・640×360・音なし）
 *   poster: 'assets/games/dust-dash-poster.webp', // 映像が始まる前の絵
 *   art: { ja: '….webp', en: '….webp' },      // いちおしの大きな絵（1200×630）
 *   ogp: { ja: '….png', en: '….png' },        // X などに貼ったときのカードの絵（1200×630。png か jpg）
 *   box: '#f3cf8e',                           // 箱の色
 *   time: { ja: '1プレイ約1分', en: '~1 min per run' },
 *   control: { ja: '片手でタップ', en: 'One tap' },
 *   devices: ['phone', 'pc'],                 // 'phone' / 'pc' / 'steam'
 *
 *   // ---- 紹介ページ（/games/id/）に出すもの。status: 'out' のときだけページができる ----
 *   about: { ja: ['段落1', '段落2'], en: [...] },     // どんなゲーム？
 *   features: { ja: ['…', '…'], en: [...] },          // ここがおもしろい（箇条書き）
 *   howto: { ja: ['…', '…'], en: [...] },             // 遊び方（順番に）
 *   controls: [ { what: {ja,en}, phone: {ja,en}, pc: {ja,en} } ],  // 操作の表
 *   shots: [ { src: 'assets/games/dust-dash/title', alt: {ja,en} } ], // 画面写真（src.webp と src-s.webp を用意）
 *   updates: [ { date: '2026-09-29', ja: '…', en: '…' } ]           // 更新の記録（新しい順）
 * }
 */
window.TB_GAMES = [
  {
    id: 'dust-dash',
    status: 'out',
    isNew: true,
    featured: true,
    title: 'DUST DASH',
    sub: { ja: '砂けむりダッシュ', en: 'Desert one-tap runner' },
    genre: { ja: 'ランナー', en: 'Runner' },
    desc: {
      ja: '獲物を上から踏んで食べて加速！ 追ってくるタカから逃げきる、片手でタップするだけのランナーゲーム。全10ステージとエンドレスモード。',
      en: 'Stomp prey to speed up and outrun the hawk in this one-tap runner. 10 stages plus an endless mode.'
    },
    play: '/DUST-DASH/',
    steam: null,
    released: '2026-09-28',
    video: 'assets/games/dust-dash.mp4',
    poster: 'assets/games/dust-dash-poster.webp',
    art: { ja: 'assets/games/dust-dash.webp', en: 'assets/games/dust-dash-en.webp' },
    ogp: { ja: 'assets/games/dust-dash.png', en: 'assets/games/dust-dash-en.png' },
    box: '#f3cf8e',
    time: { ja: '1プレイ約1分', en: '~1 min per run' },
    control: { ja: '片手でタップ', en: 'One tap' },
    devices: ['phone', 'pc'],

    about: {
      ja: [
        '主人公は、砂漠を走る鳥・オオミチバシリ。虫やトカゲ、ヘビを上から踏んで食べるたびに、どんどん速くなります。空からは、おなかをすかせたタカが追いかけてきます。スタミナが切れる前に、食べて、走って、逃げきりましょう。',
        '朝の砂漠から夜明けのオアシスまで、景色の変わる全10ステージ。7000m先のゴールまで逃げきると、どこまでも走れるエンドレスモードが遊べるようになります。'
      ],
      en: [
        'You are a roadrunner racing across the desert. Every bug, lizard and snake you stomp makes you faster — and a hungry hawk is chasing you from the sky. Eat, run, and get away before your stamina runs out.',
        'Ten stages take you from the morning desert to a dawn oasis. Reach the goal 7,000 m away to unlock an endless mode with no finish line.'
      ]
    },
    features: {
      ja: [
        '片手でタップするだけ。1プレイ約1分で、すきま時間に遊べる',
        '景色が変わる全10ステージ。ステージごとに名物の仕掛けがある',
        'コインで5種類の強化（スタミナ・スタートダッシュ・受け身・食いしん坊・金運）',
        'みんなのランキング（距離・エンドレス・最高時速）',
        'ホーム画面に追加すると、アプリのように全画面で開けて、電波がなくても遊べる'
      ],
      en: [
        'Just tap with one hand. About a minute per run — perfect for short breaks',
        'Ten stages with changing scenery, each with its own signature challenge',
        'Spend coins on 5 upgrades: stamina, start dash, safe landing, big eater and lucky coins',
        'Global rankings for distance, endless mode and top speed',
        'Add it to your home screen to play full-screen — even offline'
      ]
    },
    howto: {
      ja: [
        'タップでジャンプ。空中でもう一度タップすると2段ジャンプ。',
        '虫・トカゲ・ヘビを上から踏むと、食べて加速。着地せずに踏み続けるとコンボになる。',
        'スタミナは少しずつ減っていく。食べると回復。0になるとバテて、タカにつかまる。',
        '岩・サボテン・穴はジャンプで、大サボテン・大穴は2段ジャンプでよける。ハゲワシは、ジャンプすると当たる。',
        'ゲージがたまるとフィーバー（無敵ダッシュ）。コインは、ジャンプの軌道どおりに並んでいる。'
      ],
      en: [
        'Tap to jump. Tap again in the air for a double jump.',
        'Land on bugs, lizards and snakes to eat them and speed up. Keep stomping without touching the ground for a combo.',
        'Your stamina keeps draining — eating restores it. Hit zero and the hawk catches you.',
        'Jump over rocks, cacti and holes; double-jump big cacti and wide gaps. Vultures hit you if you jump into them.',
        'Fill the gauge for a fever dash (you are invincible). Coins are laid out along the jump arcs.'
      ]
    },
    controls: [
      { what: { ja: 'ジャンプ', en: 'Jump' }, phone: { ja: 'タップ', en: 'Tap' }, pc: { ja: 'クリック・スペース', en: 'Click / Space' } },
      { what: { ja: '2段ジャンプ', en: 'Double jump' }, phone: { ja: '空中でもう一度タップ', en: 'Tap again in the air' }, pc: { ja: '空中でもう一度', en: 'Again in the air' } },
      { what: { ja: '一時停止', en: 'Pause' }, phone: { ja: '右上のボタン', en: 'Top-right button' }, pc: { ja: 'Esc キー', en: 'Esc key' } },
      { what: { ja: '音を消す', en: 'Mute' }, phone: { ja: '右上の音のボタン', en: 'Sound button' }, pc: { ja: 'M キー', en: 'M key' } }
    ],
    shots: [
      { src: 'assets/games/dust-dash/title', alt: { ja: 'タイトル画面', en: 'Title screen' } },
      { src: 'assets/games/dust-dash/canyon', alt: { ja: '赤い峡谷', en: 'Red canyon' } },
      { src: 'assets/games/dust-dash/salt-lake', alt: { ja: '白い塩の湖', en: 'White salt lake' } },
      { src: 'assets/games/dust-dash/cactus', alt: { ja: 'サボテンの森', en: 'Cactus forest' } },
      { src: 'assets/games/dust-dash/sunset', alt: { ja: '夕焼けのメサ', en: 'Sunset mesas' } },
      { src: 'assets/games/dust-dash/stars', alt: { ja: '星空の砂丘', en: 'Starlit dunes' } },
      { src: 'assets/games/dust-dash/moon', alt: { ja: '月夜の岩山', en: 'Moonlit crags' } },
      { src: 'assets/games/dust-dash/oasis', alt: { ja: '夜明けのオアシス', en: 'Dawn oasis' } }
    ],
    updates: [
      { date: '2026-09-29', ja: 'ホーム画面に追加すると、アプリのように開けて、電波がなくても遊べるようになりました。', en: 'Add it to your home screen to play like an app — even offline.' },
      { date: '2026-09-29', ja: 'みんなのランキング・一時停止・自分のベスト記録の旗・結果画面のコツを追加しました。', en: 'Added global rankings, pause, a best-distance flag and tips on the result screen.' },
      { date: '2026-09-28', ja: '公開しました。', en: 'Released.' }
    ]
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
