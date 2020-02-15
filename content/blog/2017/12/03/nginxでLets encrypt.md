---
title: "NginxでLet's Encrypt"
date: 2017-12-03T20:24:39+09:00
draft: false
categories: ["Linux"]
---

無料でSSL証明書を取得できるLet's Encryptでnginxをhttps対応にしました。

---
SSL証明書には以下の三種類があり、下に向かう順に取得するための審査が厳しくなります。

* DV(ドメイン認証)証明書
* OV(企業認証)証明書
* EV証明書

**DV証明書**はドメインを所持していれば発行してもらえる証明書です。

**OV証明書**ではドメインの所持だけでなく、第三者機関や電話での確認によって実在性が確認できて発行されてもらえます。

**EV証明書**では実在性の確認をもっと厳格に行うので最も信頼性が高い証明書です。

Let's encryptではこの内のDV証明書を**無料**で発行しています。

---

# 環境

* ConohaVPS
* Ubuntu 16.04 64bit

# letsencryptのインストール

```bash
sudo apt-get intstall letsencrypt
```

apt経由でインストールします。

# コマンドの実行

let's encryptは指定されたドメインでサーバーにアクセスできることを確認する必要があります。
通常は80ポートを使うのですが、nginxが動いているので代わり443ポートで認証を行うようにしました。

```bash
# --standalone-supported-challenges tls-sni-01をつけると443ポートで認証を行う。
sudo letsencrypt certonly --standalone --standalone-supported-challenges tls-sni-01 
```

コマンドを実行すると証明書関連の通知を行う先のメールアドレスの入力があります。
その後ドメインの入力があるので、https通信したいドメインを入力します。

サブドメインでも使いたい場合は、カンマ区切りで入力します。

正しく認証ができたら`Congratulations`のメッセージが出て、`/etc/letsencrypt/live/[domain]`に証明書が生成されます。

うまく行かなかったときは、認証を行うポートが開いているか確認しましょう。

# nginxの設定

nginxの設定ファイルに以下を書く。

```bash
ssl_certificate /etc/letsencrypt/live/[domain]/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/[domain]/privkey.pem;
```

同じく設定ファイルの`server`内をポートを443に、SSL通信をオンにするように設定する。

```bash
server {
    listen: 443;
    ssl on;
    
    ...
}
```

その後再起動、ブラウザを開いてhttpsで通信できているか確認する。
