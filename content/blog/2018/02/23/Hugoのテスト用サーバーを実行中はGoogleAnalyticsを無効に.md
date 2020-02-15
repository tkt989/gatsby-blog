---
title: "'hugo serve' を実行中はGoogleAnalyticsを無効に"
date: 2018-02-23T23:55:18+09:00
categories: ["Hugo"]
draft: false
---

記事を公開する前に`hugo serve`で確認していると、GoogleAnalyticsのページビューがガンガン増えていってしまう。

自分で自分のブログのアクセス数を稼ぐのは虚しいので、テスト用にサーバーを実行している間はGoogleAnalyticsはオフにしておきたい。	

# 設定

下のサイトを参考に設定してみました。

[How to Exclude Google Analytics When Running Under Hugo Local Server - support - Hugo Discussion](https://discourse.gohugo.io/t/how-to-exclude-google-analytics-when-running-under-hugo-local-server/6092/7)

仕組みとしては、環境変数に`HUGO_ENV=production`が設定されているときだけ、GoogleAnalyticsのコードを埋め込むようにする。

```go
{{ if eq (getenv "HUGO_ENV") "production" }}
        {{ template "_internal/google_analytics_async.html" . }}
{{ end }}
```

Hugoのレイアウトhtmlは`theme`フォルダの中に入っているはずなので、使用しているテーマのファイルの中からGoogleAnalyticsを埋め込んでいる箇所を見つける。

このブログで使っているEvenというテーマでは`partials/scripts.html`の中にありました。

見つけたら上のコードのように、`HUGO_ENV`が設定されているときだけ、埋め込まれるように編集する。

# 実行

確認用のサーバーを起動するときは、普通にそのまま実行する。

```bash
$ hugo serve       # GAのコードは埋め込まれない
```

実際に公開するときのhtmlを生成するときは、環境変数を設定して実行する。

```sh
$ HUGO_ENV=production hugo
```

これでGoogleAnalyticsのコードを埋め込むかどうかを切り替えれます。