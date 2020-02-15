---
title: "ConohaVPSの初期設定"
date: 2017-12-02T15:56:42+09:00
draft: false
categories: ["Linux"]
---

ConohaVPSを使い始めたので、初期設定を記録しておく。

使用しているOSはUbunto16.04。

# パッケージを更新

```bash
# apt-get update
# apt-get upgrade
```

# ファイアウォールを設定

ssh以外のポートを閉じる

```bash
# ufw default deny
# ufw allow ssh
# ufw enable
```

# 一般ユーザーを作成

```bash
# useradd -m -g sudo -s /bin/bash [user]
# passwd [user]
```

sudoを使うために`sudo`グループにユーザーを追加します。

# rootでのsshログインを禁止

`/etc/ssh/sshd_config`の`PermitRootLogin yes`を`no`に変更

# ssh公開鍵を設定、パスワードログインを禁止

パスワードでログイン出来ないようにするために公開鍵を設定しておきます。

Linuxの場合は`ssh-keygen`、Windowsの場合はrloginなどのクライアントで作成した公開鍵ファイルを
`~/.ssh/authorized_keys`に追記。

その後パスワードでのログインを禁止するために
`/etc/ssh/sshd_config`の`PasswordAuthentication yes`を`no`に変更します。

# sshのポート番号を変更

デフォルトのままだと不正ログインを試みようとする人たちが大量に来るので、変更しておきます。

`/etc/ssh/sshd_config`の`Port 22`を49152~65535の適当な数に変更。

ufwで指定したポート番号を許可。
```bash
$ sudo ufw allow [port]
```

ポート番号を変えてログインできるのを確認できたら、デフォルトのポートを閉じます。
```bash
$ sudo ufw delete allow ssh
```

その後、sshdを再起動。
```bash
$ sudo service sshd restart
```
