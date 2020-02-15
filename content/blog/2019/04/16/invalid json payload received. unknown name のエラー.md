---
title: "invalid json payload received. unknown name のエラー解決"
date: 2019-04-16T22:54:46+09:00
categories: [iOS]
draft: false
---

SwiftでGoogle Vision APIにリクエストを送ったら、タイトルのようなエラーが返ってきた。
エラーメッセージにはjsonの形式がおかしいみたいだけど、送っているjsonには特に変なところは見受けられなくて、試行錯誤してみたが長い時間詰まってしまった。

改めてリクエスト処理を見直してみると、もしかして、、、な部分があってそこを直してみるとあっさり解決。

ヘッダーに`Content-Type: application/json`を付けていなかったことが原因でした。

普段はAndroidではRetrofit、iOSではAlamofireを使っていて、jsonを送るときはライブラリ側がヘッダーを追加してくれていたのですが、今回は`URLSession`を使っていて自分で追加しないといけないのでした。

ライブラリを頼りすぎを実感。