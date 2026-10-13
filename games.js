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
 *   shotsTall: true, shotsRatio: '280 / 560', // スマホ縦画面のゲーム（小さい写真の幅 / 高さ。なければ 280 / 605）
 *   updates: [ { date: '2026-09-29', ja: '…', en: '…' } ]           // 更新の記録（新しい順）
 * }
 */
window.TB_GAMES = [
  {
    id: 'living-isle',
    status: 'out',
    isNew: true,
    featured: true,
    title: 'LIVING ISLE',
    sub: { ja: 'いのちの島', en: 'Island-building sandbox' },
    genre: { ja: '箱庭・3D', en: '3D sandbox' },
    desc: {
      ja: '何もない海から島を盛り上げ、川を流し、木を植えて、動物たちの「すみか」をつくる箱庭ゲーム。20種類の動物を招いて、島の主に会えるかな。',
      en: "Raise an island from the empty sea, let rivers flow and plant trees to build homes for animals. Welcome 20 kinds of creatures and meet the island's guardian."
    },
    play: 'https://living-isle.pages.dev/',
    steam: null,
    released: '2026-10-13',
    video: 'assets/games/living-isle.mp4',
    poster: 'assets/games/living-isle-poster.webp',
    art: { ja: 'assets/games/living-isle.webp', en: 'assets/games/living-isle.webp' },
    ogp: { ja: 'assets/games/living-isle.jpg', en: 'assets/games/living-isle.jpg' },
    box: '#9fd8e6',
    time: { ja: '島の主まで約30〜40分', en: 'About 30–40 min to the guardian' },
    control: { ja: 'タップと長押し', en: 'Tap and hold' },
    devices: ['phone', 'pc'],

    about: {
      ja: [
        '何もない海を長押しすると、島が盛り上がってきます。砂浜、草原、川辺、森、花畑…。地形と植物から、ゲームが自動で動物たちの「すみか」を見つけてくれます。',
        'お願いボードの動物が「こんな所に住みたい」と教えてくれるので、そのすみかを作って育て、ハートを集めて招待しよう。20種類の動物がそろうと、最後に島の主がやってきます。失敗で終わることはありません。'
      ],
      en: [
        'Press and hold on the empty sea, and an island rises up. Beaches, grasslands, riversides, forests, flower fields… the game finds animal homes in the land and plants you shape.',
        'Animals on the request board tell you where they want to live. Build and grow those homes, collect hearts and invite them in. Gather all 20 kinds and the island guardian finally appears. There is no way to fail.'
      ]
    },
    features: {
      ja: [
        '盛る・掘る・ならす、泉から川を引く、種をまく。指でなぞって島をつくる',
        '8種類のすみか（砂浜・草原・川辺・森・花畑・池・岩場・高原）を自動で見分ける',
        'カニ、ウサギ、キツネ、カワウソ、ウミガメ、イルカ…20種類の動物。なでると赤ちゃんも',
        '朝・昼・夜がめぐり、雨のあとには虹。動物どうしのできごとや、めずらしい色の動物も',
        '写真モードで島を撮ってシェア。日本語と英語'
      ],
      en: [
        'Raise, dig and flatten land, draw rivers from springs and sow seeds — shape the island with your finger',
        'The game spots 8 kinds of homes: beach, grassland, riverside, forest, flower field, pond, cliffs and plateau',
        '20 kinds of animals: crabs, rabbits, foxes, otters, sea turtles, dolphins and more. Pet them and babies are born',
        'Morning, day and night, rainbows after the rain, little animal moments and rare-colored animals',
        'Photo mode to snap and share your island. Japanese and English'
      ]
    },
    howto: {
      ja: [
        '「盛る」を選んで海を長押しすると、陸ができる。海辺の低い所が砂浜になる。',
        '「種」で草・花・木をまく。「泉」を坂の上に置いたり、なぞったりすると川が流れる。',
        'できたすみかの名札をタップすると、レベルを上げる条件が見られる。',
        '浮かぶハートを集めて、お願いボードの動物を招待する。',
        '「見る」で動物をタップすると追いかけて、もう一度タップでなでられる。'
      ],
      en: [
        'Pick "Raise" and hold on the sea to make land. Low ground by the water becomes beach.',
        'Use "Seeds" to sow grass, flowers and trees. Place a spring on a slope, or trace a path, to make a river.',
        'Tap a home\'s name tag to see what it needs to level up.',
        'Collect floating hearts and invite the animals on the request board.',
        'In "Look" mode, tap an animal to follow it, and tap again to pet it.'
      ]
    },
    controls: [
      { what: { ja: '道具を使う', en: 'Use a tool' }, phone: { ja: 'タップ・長押し', en: 'Tap / hold' }, pc: { ja: 'クリック・押したまま', en: 'Click / hold' } },
      { what: { ja: '島を回す', en: 'Rotate the view' }, phone: { ja: '1本指でドラッグ', en: 'Drag with one finger' }, pc: { ja: 'ドラッグ', en: 'Drag' } },
      { what: { ja: '寄る・離れる', en: 'Zoom' }, phone: { ja: 'ピンチ・＋ − ボタン', en: 'Pinch / + − buttons' }, pc: { ja: 'ホイール・＋ − ボタン', en: 'Wheel / + − buttons' } },
      { what: { ja: '元に戻す', en: 'Undo' }, phone: { ja: '↶ ボタン', en: '↶ button' }, pc: { ja: '↶ ボタン・Ctrl＋Z', en: '↶ button / Ctrl+Z' } }
    ],
    shotsTall: true,
    shotsRatio: '280 / 498',
    shots: [
      { src: 'assets/games/living-isle/island', alt: { ja: '育った島', en: 'A grown island' } },
      { src: 'assets/games/living-isle/fox', alt: { ja: 'キツネ', en: 'Fox' } },
      { src: 'assets/games/living-isle/turtle', alt: { ja: 'ウミガメ', en: 'Sea turtle' } }
    ],
    updates: [
      { date: '2026-10-13', ja: '公開しました。', en: 'Released.' }
    ]
  },
  {
    id: 'starting-village',
    status: 'out',
    title: 'Chief of the Starting Village',
    sub: { ja: 'はじまりの村の村長', en: 'Village management RPG' },
    genre: { ja: '村経営', en: 'Village management' },
    desc: {
      ja: '村長になって9つの施設を育て、村に来る勇者たちを支えよう。宿屋や鍛冶屋で勇者を送り出し、目指すは七魔王と魔神の討伐。ドット絵の村経営ゲーム。',
      en: 'Become the village Chief, grow 9 buildings and support the heroes who stop by. Send them off from your Inn and Smithy to defeat the seven demon lords and the demon god. A pixel-art village management game.'
    },
    play: 'https://starting-village.pages.dev/',
    steam: null,
    released: '2026-10-11',
    video: 'assets/games/starting-village.mp4',
    poster: 'assets/games/starting-village-poster.webp',
    art: { ja: 'assets/games/starting-village.webp', en: 'assets/games/starting-village.webp' },
    ogp: { ja: 'assets/games/starting-village.png', en: 'assets/games/starting-village.png' },
    box: '#c9b98f',
    time: { ja: '最初の魔王まで約1時間', en: 'About 1 hour to the first demon lord' },
    control: { ja: 'タップで操作', en: 'Tap controls' },
    devices: ['phone', 'pc'],

    about: {
      ja: [
        'あなたは今日から、はじまりの村の村長。宿屋・雑貨屋・鍛冶屋・ギルドなど9つの施設を育てて、旅の勇者たちが立ち寄りたくなる村にしていきます。',
        '勇者に装備と料理を持たせて遠征に送り出し、手に入れた素材で村はさらに大きくなる。開拓地から城下町へ育てながら、七魔王を一体ずつたおし、最後は魔神に挑もう。'
      ],
      en: [
        'Starting today, you are the Chief of the Starting Village. Grow 9 buildings, such as the Inn, General Store, Smithy and Guild, into a village traveling heroes love to visit.',
        'Equip and feed your heroes, then send them off on expeditions. The materials they bring back help your village grow even bigger. Grow from an outpost into a castle town, defeat the seven demon lords one by one, and finally face the demon god.'
      ]
    },
    features: {
      ja: [
        '畑・漁場、宿屋、雑貨屋、鍛冶屋、ギルド、治療院、錬金屋、スカウト所、貿易所。9つの施設をLv5まで育てる',
        '朝・昼・夜がめぐる村。旅の勇者が買い物をして宿に泊まり、なじみの客になる',
        '勇者を雇って装備を作り、7つの地方へ遠征。依頼や手配魔物、宝箱や旅の商人も',
        '七魔王にはそれぞれ弱点がある。作戦会議で対策の道具や料理をそろえて挑もう',
        '転職と上級職、スキル、個性と美徳。勇者の見た目は装備で変わる。日本語と英語'
      ],
      en: [
        'Farm & Fishery, Inn, General Store, Smithy, Guild, Clinic, Alchemy Shop, Scout Office and Trading Post: grow all 9 buildings up to Lv 5',
        'Morning, day and night pass in the village. Traveling heroes shop, stay at your Inn and become regulars',
        'Hire heroes, forge their gear and send them on expeditions to 7 regions, with requests, wanted monsters, treasure and traveling merchants',
        'Each demon lord has a weakness. Prepare the right items and meals at the War Council',
        'Class changes, advanced classes, skills, traits and virtues. Heroes look different with every piece of gear. Japanese and English'
      ]
    },
    howto: {
      ja: [
        '村の画面で施設を押すと、その施設の画面が開く。品物を作って棚に並べると、旅の勇者が買っていく。',
        'お金と素材で施設を強化する。名声が上がると村のランクが上がり、新しい施設が建てられる。',
        '地図の画面で勇者のパーティを組み、遠征に送り出す。帰ってきたら日誌で結果を見る。',
        '魔王の城に行く前に、作戦会議で対策（○ × ？）を確かめる。',
        '時間は「一時停止・ふつう・早送り」で切りかえられる。はじめは案内役のハナが教えてくれる。'
      ],
      en: [
        'Tap a building in the village to open it. Make goods and stock the shelves, and traveling heroes will buy them.',
        'Upgrade buildings with gold and materials. As your fame grows, your village rank goes up and new buildings unlock.',
        'Form a party on the map and send it on an expedition. When it returns, read the results in the journal.',
        'Before heading to a demon castle, check your counters (○ × ?) at the War Council.',
        'Switch time between pause, normal and fast-forward. Hana, the Village Clerk, will guide you at the start.'
      ]
    },
    controls: [
      { what: { ja: '施設・ボタンを押す', en: 'Buildings and buttons' }, phone: { ja: 'タップ', en: 'Tap' }, pc: { ja: 'クリック', en: 'Click' } },
      { what: { ja: '村・地図を見わたす', en: 'Look around the village and map' }, phone: { ja: 'スクロール', en: 'Scroll' }, pc: { ja: 'スクロール', en: 'Scroll' } },
      { what: { ja: '時間の速さ', en: 'Time speed' }, phone: { ja: '右下のボタン', en: 'Buttons at the bottom right' }, pc: { ja: '右下のボタン', en: 'Buttons at the bottom right' } }
    ],
    shotsTall: true,
    shotsRatio: '280 / 498',
    shots: [
      { src: 'assets/games/starting-village/title', alt: { ja: 'タイトル', en: 'Title screen' } },
      { src: 'assets/games/starting-village/village', alt: { ja: 'はじまりの村', en: 'The Starting Village' } },
      { src: 'assets/games/starting-village/battle', alt: { ja: '魔王戦', en: 'Demon lord battle' } }
    ],
    updates: [
      { date: '2026-10-11', ja: '公開しました。', en: 'Released.' }
    ]
  },
  {
    id: 'campfire-to-kingdom',
    status: 'out',
    title: 'CAMPFIRE TO KINGDOM',
    sub: { ja: '焚き火から王国へ', en: 'From a campfire to a kingdom' },
    genre: { ja: '建国・3D', en: '3D kingdom builder' },
    desc: {
      ja: '焚き火しか残っていない廃村を、木を切り、岩を割って、王国に育てよう。近づくだけで自動で切って・割って・戦う、3Dの建国ゲーム。',
      en: "All that's left of the village is a campfire. Chop trees and break rocks to grow it into a kingdom. Just walk up to things to chop, mine and fight automatically in this 3D kingdom builder."
    },
    play: 'https://campfire-to-kingdom.pages.dev/',
    steam: null,
    released: '2026-10-10',
    video: 'assets/games/campfire-to-kingdom.mp4',
    poster: 'assets/games/campfire-to-kingdom-poster.webp',
    art: { ja: 'assets/games/campfire-to-kingdom.webp', en: 'assets/games/campfire-to-kingdom-en.webp' },
    ogp: { ja: 'assets/games/campfire-to-kingdom.jpg', en: 'assets/games/campfire-to-kingdom-en.jpg' },
    box: '#b8dd8c',
    time: { ja: 'エンディングまで約3時間半', en: 'About 3.5 hours to the ending' },
    control: { ja: 'ドラッグで移動', en: 'Drag to move' },
    devices: ['phone', 'pc'],

    about: {
      ja: [
        '残っているのは、焚き火ひとつだけ。木を切り、岩を割って、素材を背中に積み上げ、建設マスに運んで、こわれた家を直していきます。',
        '家が直ると住民が増え、製材所やお店、鍛冶屋が動き出す。村から町、城下町、そして王国へ。4つの章を進めて、最後は戴冠式をめざそう。'
      ],
      en: [
        'All that is left is a single campfire. Chop trees, break rocks, stack the materials high on your back and carry them to building spots to repair the ruined houses.',
        'Fixed houses bring new villagers, and the sawmill, shop and smithy come to life. Grow from a village to a town, a castle town and finally a kingdom — four chapters all the way to your coronation.'
      ]
    },
    features: {
      ja: [
        '木や岩、モンスターに近づくだけで、自動で切る・割る・戦う',
        '拾った素材は背中に積み上がる。建設マスに立つと、流しこんで建物が直る',
        '加工場・お店・鍛冶屋・宿屋・港…住民を雇えば、運んで売るのも自動',
        '武器と防具を作って、ぬし（ボス）やドラゴンに挑む。宝箱や試練の塔も',
        '全4章・エンディングまで約3時間半。閉じている間も、お店の売上がたまる'
      ],
      en: [
        'Walk up to trees, rocks and monsters to chop, mine and fight automatically',
        'Materials stack up on your back — stand on a building spot to pour them in and repair it',
        'Sawmill, shop, smithy, inn, harbor… hire villagers to carry and sell for you',
        'Forge weapons and armor to take on bosses and a dragon. Treasure chests and a Trial Tower too',
        '4 chapters, about 3.5 hours to the ending. Your shops keep earning while you are away'
      ]
    },
    howto: {
      ja: [
        '画面のどこでもドラッグして歩く（指を置いた所がスティックになる）。',
        '木や岩に近づくと、自動で切る・割る。拾った素材は背中に積み上がる。',
        '建設マスの上に立つと、背中の素材が流しこまれ、そろうと建物が直る。',
        '製材所・石工場で素材を加工し、お店で売ってコインをかせぐ。コインで土地を買い、住民を雇う。',
        '狩り場のぬしを倒すと章クリア。次の章で、村はさらに大きくなる。'
      ],
      en: [
        'Drag anywhere on the screen to walk (wherever you touch becomes the stick).',
        'Walk up to trees and rocks to chop and break them. What you pick up stacks on your back.',
        'Stand on a building spot to pour in your materials; once it has enough, the building is repaired.',
        'Process materials at the sawmill and stonework, sell them at the shop, then buy land and hire villagers with your coins.',
        'Defeat the boss of the hunting ground to clear the chapter. The village grows bigger in the next one.'
      ]
    },
    controls: [
      { what: { ja: '歩く', en: 'Walk' }, phone: { ja: '画面のどこでもドラッグ', en: 'Drag anywhere' }, pc: { ja: 'WASD・矢印キー・ドラッグ', en: 'WASD / arrow keys / drag' } },
      { what: { ja: '切る・割る・戦う', en: 'Chop, mine, fight' }, phone: { ja: '近づくだけ（自動）', en: 'Just walk up (automatic)' }, pc: { ja: '近づくだけ（自動）', en: 'Just walk up (automatic)' } },
      { what: { ja: '荷物を捨てる', en: 'Drop items' }, phone: { ja: '上の荷物の数をタップ', en: 'Tap the bag count at the top' }, pc: { ja: '上の荷物の数をクリック', en: 'Click the bag count at the top' } },
      { what: { ja: '強化・住民・冒険・倉庫・図鑑', en: 'Upgrade, people, adventure, storage, book' }, phone: { ja: '右下のボタン', en: 'Buttons at the bottom right' }, pc: { ja: '右下のボタン', en: 'Buttons at the bottom right' } }
    ],
    shotsTall: true,
    shotsRatio: '280 / 498',
    shots: [
      { src: 'assets/games/campfire-to-kingdom/title', alt: { ja: 'タイトル', en: 'Title screen' } },
      { src: 'assets/games/campfire-to-kingdom/town', alt: { ja: '城下町', en: 'Castle town' } },
      { src: 'assets/games/campfire-to-kingdom/battle', alt: { ja: '狩り場で戦う', en: 'Battle in the hunting ground' } }
    ],
    updates: [
      { date: '2026-10-10', ja: '公開しました。', en: 'Released.' }
    ]
  },
  {
    id: 'matsuri-jackpot',
    status: 'out',
    title: 'MATSURI JACKPOT',
    sub: { ja: 'マツリジャックポット', en: 'Neon festival ball frenzy' },
    genre: { ja: '玉増やし', en: 'Incremental' },
    desc: {
      ja: 'ネオンの夜祭りで、パチンコ風の玉増やし！ 釘に当たるたび玉が増えて、画面が玉で埋まる。大当たりは打ち上げ花火。増えた玉で台を改造して、5つの台を巡ろう。',
      en: 'A pachinko-style ball frenzy at a neon night festival! Every peg hit adds more balls until they flood the board, and jackpots burst into fireworks. Upgrade your machine and tour 5 festival machines.'
    },
    play: 'https://matsuri-jackpot.pages.dev/',
    steam: null,
    released: '2026-10-09',
    video: 'assets/games/matsuri-jackpot.mp4',
    poster: 'assets/games/matsuri-jackpot-poster.webp',
    art: { ja: 'assets/games/matsuri-jackpot.webp', en: 'assets/games/matsuri-jackpot-en.webp' },
    ogp: { ja: 'assets/games/matsuri-jackpot.jpg', en: 'assets/games/matsuri-jackpot-en.jpg' },
    box: '#f3a6c8',
    time: { ja: 'エンディングまで約45分', en: 'About 45 min to the ending' },
    control: { ja: '長押しで発射', en: 'Press and hold' },
    devices: ['phone', 'pc'],

    about: {
      ja: [
        'ネオンに光る夜祭りの、パチンコ台。画面を長押しして玉を打ちこむと、釘に当たるたびに玉が増えていきます。真ん中の入賞口に入れば液晶の数字が回り、3つそろえば大当たり。夜空に花火が上がります。',
        '増えた玉で台を改造すれば、玉はもっと増える。目標に届いたら「新台入替」で次の台へ。金魚すくい台から大花火台まで、5つの台を巡ってエンディングをめざそう。お金・課金・広告は一切ありません。'
      ],
      en: [
        'A pachinko machine at a neon-lit night festival. Press and hold to launch balls — every peg they hit adds more. Land one in the center pocket to spin the numbers, and three of a kind is a JACKPOT, with fireworks lighting up the sky.',
        'Spend your balls on upgrades to earn even more. Hit the goal, swap to a new machine, and tour 5 festival machines, from goldfish scooping to the grand fireworks, to reach the ending. No money, no purchases, no ads.'
      ]
    },
    features: {
      ja: [
        '釘に当たるたび鈴の音が上がり、分裂釘で玉があふれて盤面を埋めつくす',
        '保留の色（白→青→緑→赤→金→キリン柄→虹）、金魚すくい・射的・盆踊りのリーチ演出',
        '大当たりは打ち上げ花火。連チャンが続く「花火大会」も',
        '台の改造は12種類。閉じている間も、自動発射で玉が増える',
        '5つの台を巡ってエンディングへ（初めてなら35〜55分くらい）。そのあとも、どこまでも増やせる'
      ],
      en: [
        'Every peg hit rings a festival bell, and split pegs flood the board with balls',
        'Colored hold balls (white → blue → green → red → gold → giraffe → rainbow) and reach scenes: goldfish scooping, a shooting gallery and a bon dance',
        'Jackpots are fireworks, and the "Fireworks Rush" keeps the streak going',
        '12 machine upgrades. Auto-fire keeps earning while you are away',
        'Tour 5 machines to the ending (about 35–55 min the first time), then keep growing forever'
      ]
    },
    howto: {
      ja: [
        '画面を長押しすると、玉が出る。押したまま指を左右にずらすと、打ち出しの強さが変わる（真ん中より少し左が入りやすい）。',
        '真ん中の「START」に入ると、液晶の数字が回る。3つそろえば大当たり。',
        '大当たりのあと「花火大会」に入ると、次も当たりやすくなって連チャンが続く。',
        '増えた玉で、画面下の「改造」から台を強くする。「発射固定」なら手を離しても打ち続ける。',
        '台ごとの目標に届いたら「新台入替」。常連メダルをもらって次の台へ。'
      ],
      en: [
        'Press and hold to launch balls. Slide left or right while holding to change the power (a little left of center works best).',
        'Land a ball in the center "START" pocket to spin the numbers. Three of a kind is a jackpot.',
        'After a jackpot, the "Fireworks Rush" makes the next one more likely and keeps your streak going.',
        'Spend your balls under "UPGRADE" at the bottom. "AUTO FIRE" keeps launching even when you let go.',
        'Reach the goal for each machine, swap to a new one and earn regular medals.'
      ]
    },
    controls: [
      { what: { ja: '玉を発射', en: 'Launch balls' }, phone: { ja: '画面を長押し', en: 'Press and hold' }, pc: { ja: 'マウスで長押し・スペースキー', en: 'Hold the mouse / Space' } },
      { what: { ja: '打ち出しの強さ', en: 'Launch power' }, phone: { ja: '押したまま左右にずらす', en: 'Slide left/right while holding' }, pc: { ja: '押したまま左右・← → キー', en: 'Drag left/right / ← → keys' } },
      { what: { ja: 'PUSH・早送り', en: 'PUSH / skip' }, phone: { ja: '画面をタップ', en: 'Tap' }, pc: { ja: 'クリック・Enter キー', en: 'Click / Enter' } },
      { what: { ja: '発射固定', en: 'Auto fire' }, phone: { ja: '画面下の「発射固定」', en: '"AUTO FIRE" button' }, pc: { ja: 'F キー', en: 'F key' } },
      { what: { ja: 'レバー', en: 'Lever' }, phone: { ja: '下から上へスワイプ', en: 'Swipe up' }, pc: { ja: '上へドラッグ・↑ キー', en: 'Drag up / ↑ key' } }
    ],
    shotsTall: true,
    shotsRatio: '280 / 498',
    shots: [
      { src: 'assets/games/matsuri-jackpot/balls', alt: { ja: '玉で埋まる盤面', en: 'A board full of balls' } },
      { src: 'assets/games/matsuri-jackpot/rainbow', alt: { ja: '虹保留', en: 'Rainbow hold' } },
      { src: 'assets/games/matsuri-jackpot/bon-dance', alt: { ja: '盆踊りリーチ', en: 'Bon-dance reach' } },
      { src: 'assets/games/matsuri-jackpot/result', alt: { ja: '大当たり終了', en: 'Jackpot results' } }
    ],
    updates: [
      { date: '2026-10-09', ja: '公開しました。', en: 'Released.' }
    ]
  },
  {
    id: 'dino-duel',
    status: 'out',
    title: 'DINO DUEL',
    sub: { ja: '恐竜カードバトル', en: 'Dino card battle' },
    genre: { ja: 'カードバトル', en: 'Card battle' },
    desc: {
      ja: '技が当たる瞬間にタップ！ 3体対3体の恐竜カードバトル。賞金でパックを引いて40種の恐竜を集め、5つの大会を勝ちぬこう。',
      en: 'Tap as each move lands! A 3-vs-3 dino card battle. Win prize money, pull packs, collect 40 dinos and conquer 5 cups.'
    },
    play: 'https://dino-duel-f51.pages.dev/',
    steam: null,
    released: '2026-10-08',
    video: 'assets/games/dino-duel.mp4',
    poster: 'assets/games/dino-duel-poster.webp',
    art: { ja: 'assets/games/dino-duel.webp', en: 'assets/games/dino-duel-en.webp' },
    ogp: { ja: 'assets/games/dino-duel.png', en: 'assets/games/dino-duel-en.png' },
    box: '#f6b26b',
    time: { ja: '1試合約2分', en: '~2 min per match' },
    control: { ja: '片手でタップ', en: 'One-tap controls' },
    devices: ['phone', 'pc'],

    about: {
      ja: [
        '恐竜を3体えらんでチームを組み、3体対3体で戦うカードバトル。技をえらんだら、あとはタイミング勝負です。',
        '攻撃が当たる瞬間にタップすると威力アップ、相手の攻撃に合わせてタップするとダメージが減ります。勝って賞金をかせぎ、カードパックで40種の恐竜を集めて、5つの大会の優勝をめざそう。'
      ],
      en: [
        'Pick three dinos, build a team and battle 3-vs-3. Once you choose your moves, it all comes down to timing.',
        "Tap right as your attack lands to power it up, or as the foe's attack lands to take less damage. Win prize money, pull card packs to collect 40 dinos, and go for the title in all 5 cups."
      ]
    },
    features: {
      ja: [
        '当たる瞬間にタップ。ぴったりなら攻撃は1.5倍、守りはダメージ0.6倍',
        '40種の恐竜（ティラノサウルスからモササウルスまで）と、オリジナルのEX恐竜',
        'アーケード風の筐体からカードを1枚ずつ。レアほど派手に光って揺れる',
        'コンボ12種。同じ時代・同じ仲間でそろえると能力アップ',
        'レベル10まで育てて、同じカードを重ねればさらに強く。負けても賞金と経験値は残る'
      ],
      en: [
        'Tap as moves land: a perfect hit deals 1.5× damage, a perfect guard takes only 0.6×',
        '40 dinos from T. rex to Mosasaurus, plus original EX dinos',
        'Pull cards one at a time from an arcade machine — rarer cards flash and shake harder',
        '12 combos: team up dinos from the same era or group for stat boosts',
        'Level up to 10, then stack duplicates to grow even stronger. Losing still keeps your money and XP'
      ]
    },
    howto: {
      ja: [
        '大会をえらぶ。ビギナー → ノービス → アドバンス → マスター → レジェンドの順に開く。',
        '下のパネルで、3体それぞれの技をえらぶ（3タップ）。素早い順に6体が動く。',
        '自分の攻撃では赤い輪、相手の攻撃では青い輪が縮む。輪が的に重なった瞬間に、画面のどこかをタップ。',
        '勝つと賞金。カードパックを引いて恐竜を集め、チームを組みかえる。',
        '3〜4戦を続けて勝つと優勝。優勝パックがもらえる。'
      ],
      en: [
        'Choose a cup. They unlock in order: Beginner → Novice → Advance → Master → Legend.',
        'Pick a move for each of your three dinos on the bottom panel (3 taps). All six dinos act in speed order.',
        "A red ring shrinks on your attacks, a blue ring on the foe's. Tap anywhere the moment it meets the target.",
        'Win prize money, pull card packs to collect dinos, and rebuild your team.',
        'Win 3–4 matches in a row to take the cup and earn a prize pack.'
      ]
    },
    controls: [
      { what: { ja: '技をえらぶ', en: 'Choose moves' }, phone: { ja: 'カードをタップ', en: 'Tap a card' }, pc: { ja: 'クリック', en: 'Click' } },
      { what: { ja: '当たる瞬間に合わせる', en: 'Time your tap' }, phone: { ja: '画面のどこかをタップ', en: 'Tap anywhere' }, pc: { ja: 'クリック・スペースキー', en: 'Click / Space' } },
      { what: { ja: 'カードパックを引く', en: 'Pull a pack' }, phone: { ja: 'パックをタップ', en: 'Tap a pack' }, pc: { ja: 'クリック', en: 'Click' } }
    ],
    shotsTall: true,
    shotsRatio: '280 / 560',
    shots: [
      { src: 'assets/games/dino-duel/ring', alt: { ja: '当たる瞬間にタップ', en: 'Tap as it lands' } },
      { src: 'assets/games/dino-duel/perfect', alt: { ja: 'ぴったり！', en: 'Perfect!' } },
      { src: 'assets/games/dino-duel/combo', alt: { ja: 'コンボ発動', en: 'Combo!' } },
      { src: 'assets/games/dino-duel/ex', alt: { ja: 'EX恐竜', en: 'EX dino' } },
      { src: 'assets/games/dino-duel/dex', alt: { ja: '図鑑', en: 'Dex' } },
      { src: 'assets/games/dino-duel/champion', alt: { ja: '大会で優勝', en: 'Cup champion' } }
    ],
    updates: [
      { date: '2026-10-08', ja: '公開しました。', en: 'Released.' }
    ]
  },
  {
    id: 'nom-nom-slime',
    status: 'out',
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
    video: 'assets/games/nom-nom-slime.mp4',
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
