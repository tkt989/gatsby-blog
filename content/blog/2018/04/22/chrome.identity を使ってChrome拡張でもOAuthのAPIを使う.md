---
title: "Chrome.identity を使ってChrome拡張でもOAuthのAPIを使う"
date: 2018-04-22T23:11:58+09:00
categories: ["Chrome", "Javascript"]
thumbnail: "/2018/04/extension_qiita.png"
draft: false
---

例としてQiitaのAPIを使う。

まずはOAuthのリダイレクト先のURLの項目を`https://{拡張機能のID}.chromiumapp.org`で登録しておく。
IDは拡張機能の画面で確認することができる。

![](/2018/04/extension.png)
![](/2018/04/extension_qiita.png)

画像はWebStoreからダウンロードしたアプリだが、まだ配布していない開発中のアプリにもIDは割り振られるのでそれを指定する。

次にOAuthの認可画面を表示するコードを書く。

```js
chrome.launchWebAuthFlow({
  url: `https://qiita.com/api/v2/oauth/authorize?client_id=${clientId}&scopes=read_qiita&state=${適当な文字列}`,
  interactive: true
}, responseUrl => {
  // 後述
})
```

`chrome.launchWebAuthFlow`でユーザーを認可用のページにアクセスさせることができる。

`interactive`を`true`にするとユーザーから認可を取得していない場合は認可用のページを表示、取得済みの場合はなにもせずコールバックを呼ぶという処理になる。

次にコールバック内の処理。

```js
chrome.identity.launchWebAuthFlow({
  // 省略
}, responseUrl => {
  let url = new URL(responseUrl)
  let code = url.searchParams.get("code")

  fetch("https://qiita.com/api/v2/access_tokens", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code
    })
  }).then(res => res.json())
    .then(json => {
      let token = json["token"] // アクセストークン取得
    })
})
```

`responseURL`のGETパラメーターに`code`が入っている。

それをアクセストークン取得のAPIにClientIdとClientSecretと一緒に送るとアクセストークンが取得できる。