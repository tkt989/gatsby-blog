---
title: "Android build on GitHub Actions でdebug keystoreを設定"
date: 2020-05-27T00:43:00+09:00
categories: ["Android"]
---

Android Studioで開発しているときには、デバッグ用の証明書ファイルで署名されています。
このファイルは`~/.android/debug.keystore`にあります。
証明書が違うとインストールするときに、エラーが起きていったん入ってるアプリのアンインストールが必要になります。
SQLiteなどのApp内で使うデータが消えてしまうので、同じ証明書で署名したいところです。

GitHubのsecretsにkeystoreをbase64に変換して保存します。

```shell
$ base64 ~/.android/debug.keystore
```

上の内容をsecretsに貼り付けましょう。

そしてworkflowで

```yaml
- run: echo ${{ secrets.KEYSTORE }} | base64 --decode > ~/.android/debug.keystore
```

を実行して、keystoreを`~/.android/debug.keystore`に保存する。

# 参考にしたサイト
- https://blog.spacemarket.com/code/circleci-android/


