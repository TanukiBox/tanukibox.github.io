# Tanuki Box

ブラウザですぐ遊べる無料ミニゲームのサイト。 https://tanukibox.github.io/

## ファイル
| 場所 | 中身 |
| --- | --- |
| `index.html` | トップページ（日本語・英語。右上のボタンで切りかえ） |
| `assets/tanuki.svg` | Tanuki Box のロゴ（箱から顔を出すたぬき） |
| `assets/ogp.png` | X などにリンクを貼ったときの画像（1200×630） |
| `assets/favicon.png` / `assets/icon-180.png` | ブラウザのタブ・スマホのホーム画面のアイコン |
| `assets/games/` | ゲームのカードの画像 |

## ゲームを増やすとき
1. ゲームは TanukiBox の中に別のリポジトリとして作り、GitHub Pages をオンにする（例：`TanukiBox/DUST-DASH` → https://tanukibox.github.io/DUST-DASH/ ）。
2. `index.html` の `<article class="card">` をまるごとコピーして、リンク先・タイトル・説明・タグを書きかえる。日本語は `lang="ja"`、英語は `lang="en"` の方に書く。
3. カードの画像（1200×630）を `assets/games/` に入れる。
4. 「つぎのゲームを準備中…」のカードは、並べたい位置に残すか消す。

## 公開
Settings → Pages → Source を **Deploy from a branch**、Branch を **main** / **(root)** にする。main に push すると自動で更新される。
