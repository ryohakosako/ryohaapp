# MY APPS — GitHub Pages アプリ一覧

HTML / CSS / JavaScriptのみで動くダーク・ミニマルなアプリ一覧ページです。

## GitHub Pagesで公開

1. GitHubで `YOURNAME.github.io` という**公開**リポジトリを作成（ユーザーサイトとして使う場合）。
2. このフォルダ内の `index.html`, `style.css`, `apps.js`, `script.js` をリポジトリのルートにアップロードしてコミット。
3. Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)` → Save。
4. 公開が完了したら `https://YOURNAME.github.io/` を開く。

既存のユーザーサイトがある場合は上書きせず、別のリポジトリで公開することもできます（URLは `/リポジトリ名/` になります）。

## アプリの追加

`apps.js` の `window.APP_LIST` 配列にオブジェクトを追加します。

- `id`: 固有ID
- `name`: アプリ名
- `category`: カテゴリ表示
- `description`: 説明
- `icon`: `calendar` / `timer` / `palette` / `app`
- `url`: アプリの公開URL
- `versionUrl`: アプリが公開する `version.json` のURL
- `changelogUrl`: 更新履歴URL（任意）
- `status`: `published`（公開中）/ `development`（開発中）

初期登録の「積みログ」はURL未設定・開発中です。公開済みならURLを入力し、`status: 'published'` に変更してください。

## バージョン自動取得

各アプリが以下のJSONを `versionUrl` に公開していれば、一覧ページを開くたびに最新情報を取得して表示します。

```json
{
  "version": "v26.11.12.1",
  "updated": "2026/11/12"
}
```

このサイトはバージョンを**読み取る**側です。各アプリで `version.json` を自動生成するGitHub Actions等の設定は別途必要です。

`versionUrl` を空にすると「VERSION —」と表示します。取得失敗時は「取得できません」と表示します。

別ドメインにあるJSONは、そのサーバーでCORSを許可する必要があります。同じ `github.io` のホストでも、異なるユーザー名のサブドメインは別オリジンです。

## ローカルで確認

ファイルを直接開いても一覧は描画されますが、バージョン取得を試す際はローカルサーバー（例: `python -m http.server 8000`）の利用を推奨します。
