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
 *   play: 'https://dust-dash.pages.dev/',     // ブラウザ版の場所（ほかのサイトなら https:// から。ないときは null）
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
    id: 'nom-nom-slime',
    status: 'out',
    isNew: true,
    featured: true,
    title: 'NOM NOM SLIME',
    sub: { ja: 'ぱくぱくスライム', en: 'Eat-everything slime' },
    genre: { ja: '育成', en: 'Idle growth' },
    desc: {
      ja: 'パンくずから銀河まで、なんでも食べて大きくなる！ 机の上から町、地球、そして宇宙へ。食べた物で色も変わる、スライム育成ゲーム。',
      en: 'Eat everything, from breadcrumbs to galaxies! Grow from a desk to a town, Earth and outer space. Your slime changes color with what it eats.'
    },
    play: 'https://nom-nom-slime.pages.dev/',
    steam: null,
    released: '2026-10-07',
    poster: 'assets/games/nom-nom-slime-poster.webp',
    art: { ja: 'assets/games/nom-nom-slime.webp', en: 'assets/games/nom-nom-slime.webp' },
    ogp: { ja: 'assets/games/nom-nom-slime.png', en: 'assets/games/nom-nom-slime.png' },
    box: '#bfe8c9',
    time: { ja: 'すきま時間に', en: 'Play in short bursts' },
    control: { ja: '片手でなぞる', en: 'One-finger swipe' },
    devices: ['phone', 'pc'],

    about: {
      ja: [
        '机の上に生まれた小さなスライム。パンくず、消しゴムのカス、クッキーのかけら…目の前のものを、ぱくぱく食べて大きくなります。',
        '大きくなるほど、食べられるものも大きくなる。部屋、家、町、都市、国、地球、そして宇宙へ。最後は銀河まで食べられるかな？ ゲームを閉じている間も、少しずつ大きくなります。'
      ],
      en: [
        'A tiny slime is born on a desk. Breadcrumbs, eraser crumbs, cookie bits — it eats whatever is in front of it and grows.',
        'The bigger it gets, the bigger the things it can eat: a room, a house, a town, a city, a country, Earth and outer space. Can it eat a galaxy? It keeps growing a little even while the game is closed.'
      ]
    },
    features: {
      ja: [
        '指でなぞるだけ。押したまま止めていると、近くの物を自動で食べる',
        '机の上から宇宙まで、24のエリア。くらべる物で、今の大きさがわかる',
        '食べた物で見た目が変わる（食べ物・布・植物・金属…そして虹色）',
        'ゼリーで5種類の強化。ためるとフィーバー、ときどき「おかしの雨」も',
        '分裂して遺伝子をためる「やり直し」で、どんどん速く育つ。図鑑と実績つき'
      ],
      en: [
        'Just swipe. Hold still and your slime eats everything nearby',
        '24 areas from a desk to outer space, with size comparisons as you grow',
        'Your look changes with what you eat — food, cloth, plants, metal… even rainbow',
        '5 upgrades with jelly, fever time, and the occasional candy shower',
        'Split to collect genes and grow faster each run. Collection book and achievements'
      ]
    },
    howto: {
      ja: [
        '食べ物をタップすると、スライムがそこまで行って食べる。',
        '押したまま左右になぞると、指を追いかけて次々に食べる。押したまま止めると、近くの物を自動で食べる。',
        'スライムより小さい物だけ食べられる。大きくなると、次のエリアへ進む。',
        'たまったゼリーで、下のカードの強化を買う（長押しで説明）。',
        '町まで来たら「分裂」できる。遺伝子をもらって、机の上からもう一度。前より速く大きくなる。'
      ],
      en: [
        'Tap something to eat it — your slime goes right to it.',
        'Hold and swipe left and right to chase food. Hold still to eat everything nearby.',
        'You can only eat things smaller than you. Grow big enough to move to the next area.',
        'Spend jelly on the upgrade cards at the bottom (long-press for details).',
        'Once you reach the town, you can split: get genes and start over from the desk, growing faster than before.'
      ]
    },
    controls: [
      { what: { ja: '食べる', en: 'Eat' }, phone: { ja: 'タップ', en: 'Tap' }, pc: { ja: 'クリック', en: 'Click' } },
      { what: { ja: '追いかけて食べる', en: 'Chase food' }, phone: { ja: '押したまま左右になぞる', en: 'Hold and swipe' }, pc: { ja: 'ドラッグ・← → キー', en: 'Drag / ← → keys' } },
      { what: { ja: '近くを自動で食べる', en: 'Auto-eat nearby' }, phone: { ja: '押したまま止める', en: 'Hold still' }, pc: { ja: '押したまま止める', en: 'Hold still' } },
      { what: { ja: '強化の説明', en: 'Upgrade details' }, phone: { ja: 'カードを長押し', en: 'Long-press a card' }, pc: { ja: 'カードを長押し', en: 'Long-press a card' } }
    ],
    shotsTall: true,
    shots: [
      { src: 'assets/games/nom-nom-slime/desk', alt: { ja: '勉強机', en: 'Study desk' } },
      { src: 'assets/games/nom-nom-slime/town', alt: { ja: '商店街', en: 'Shopping street' } },
      { src: 'assets/games/nom-nom-slime/mountain', alt: { ja: '山', en: 'Mountains' } },
      { src: 'assets/games/nom-nom-slime/earth', alt: { ja: '大陸', en: 'Continent' } },
      { src: 'assets/games/nom-nom-slime/moon', alt: { ja: '月', en: 'The Moon' } },
      { src: 'assets/games/nom-nom-slime/galaxy', alt: { ja: '銀河', en: 'Galaxy' } }
    ],
    updates: [
      { date: '2026-10-07', ja: '公開しました。', en: 'Released.' }
    ]
  },
  {
    id: 'dust-dash',
    status: 'out',
    title: 'DUST DASH',
    sub: { ja: '砂けむりダッシュ', en: 'Desert one-tap runner' },
    genre: { ja: 'ランナー', en: 'Runner' },
    desc: {
      ja: '獲物を上から踏んで食べて加速！ 追ってくるタカから逃げきる、片手でタップするだけのランナーゲーム。全10ステージとエンドレスモード。',
      en: 'Stomp prey to speed up and outrun the hawk in this one-tap runner. 10 stages plus an endless mode.'
    },
    play: 'https://dust-dash.pages.dev/',
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
      { date: '2026-10-06', ja: '遊ぶ場所が https://dust-dash.pages.dev/ に引っこしました。前の住所を開くと、記録（コイン・強化・最高記録）を引きついで案内します。', en: 'DUST DASH moved to https://dust-dash.pages.dev/. Opening the old address takes you there with your records (coins, upgrades, best runs).' },
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
