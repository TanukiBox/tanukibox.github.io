# Tanuki Box

たぬきのゲーム箱屋さん。ブラウザですぐ遊べる無料ゲームのサイト。 https://tanukibox.github.io/

## ファイル
| 場所 | 中身 |
| --- | --- |
| `index.html` | トップページの骨組み（お店の正面・いちおし・箱の棚・このお店について） |
| `games.js` | **ゲームの一覧**。ここを書きかえると、棚の箱が変わる |
| `site.js` | 一覧を箱にしてならべる・絞りこみのタブ・映像の再生・日本語/英語の切りかえ |
| `style.css` | 見た目 |
| `assets/tanuki.png` / `assets/tanuki-96.png` | Tanuki Box のたぬき（背景なし。X のプロフィール画像から作ったもの） |
| `assets/ogp.png` | X などにリンクを貼ったときの画像（1200×630） |
| `assets/favicon.png` / `assets/icon-180.png` / `assets/icon-512.png` | ブラウザのタブ・スマホのホーム画面のアイコン |
| `assets/games/` | ゲームごとの絵（1200×630）・プレイ映像（mp4）・映像の最初の絵（jpg） |

## ゲームを増やすとき
1. ゲームは TanukiBox の中に別のリポジトリとして作り、GitHub Pages をオンにする（例：`TanukiBox/DUST-DASH` → https://tanukibox.github.io/DUST-DASH/ ）。
2. `games.js` の `{ ... }` を1つコピーして、中身を書きかえる（書き方は `games.js` の先頭にある）。
   - 棚には書いた順にならぶ。
   - `featured: true` にした1本が、いちばん上の「いちおし」に大きく出る。
   - 準備中なら `status: 'soon'`（テープでとじた「？」の箱になる）。
3. 絵・映像を `assets/games/` に入れる。映像は 6 秒くらい・640×360・音なしの mp4 が軽くてよい。

## Steam 版ができたら
`games.js` のそのゲームの `steam: null` を、次のように書きかえるだけ。
```js
steam: { url: 'https://store.steampowered.com/app/番号/', wishlist: true },
```
- `wishlist: true` のあいだは「Steam でウィッシュリスト」ボタン、発売したら `false` にすると「Steam で見る」ボタンになる。
- 棚に「Steam」の絞りこみタブが自動で出る。`devices` に `'steam'` を足すと、札にも Steam と出る。
- ブラウザ版がないゲームは `play: null` にすると、箱を押したとき Steam のページが開く。

## 公開
Settings → Pages → Source を **Deploy from a branch**、Branch を **main** / **(root)** にする。main に push すると自動で更新される。

## 更新がスマホに出ないとき
ブラウザが前のファイルを覚えていることがある。`style.css` / `site.js` / `games.js` / 画像を書きかえたら、`index.html` の `?v=3` の数字を1つ上げる（`?v=4` など）。
