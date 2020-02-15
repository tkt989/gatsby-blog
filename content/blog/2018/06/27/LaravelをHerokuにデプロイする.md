---
title: "LaravelをHerokuにデプロイする"
date: 2018-06-27T21:52:20+09:00
categories: ["PHP"]
draft: false
---

# 前提

以下のサイトで`heroku`コマンドをインストールして`heroku login`でログインを行い、使えるようにしておきましょう。
https://devcenter.heroku.com/articles/heroku-cli#download-and-install

DBはPostgreSQLを使います。

# Procfileを作る

Procfileはheroku上にデプロイされたときに実行するコマンドを指定するものです。
これを使っておかないとデプロイしてもエラーになってアプリを起動できません。

    # Procfile
    web: vendor/bin/heroku-php-apache2 public/
# アプリを登録
## herokuコマンドから

まずは`heroku`コマンドでアプリを登録する必要があるので、Laravelのプロジェクトディレクトリに移動して

    $ heroku create <アプリの名前>

を実行して作りましょう。
`git init`からremoteの登録までやってくれます。

## Webから

Webのダッシュボードから登録することもできますが、gitの設定を自分でやらないといけません。
Laravelのプロジェクトディレクトリから

    $ git init
    $ heroku git:remote -a <アプリの名前>

を実行します。
もしすでにgitを使っているなら最後のコマンドだけで十分です。

# PostgreSQLを設定

herokuでPostgreSQLやMySQLなどを使うにはaddonとして追加する必要があります。ほかにもいろいろ便利なアドオンがあるそうなのですが、今回はPostgreSQLのみを追加します。

    $ heroku addons:create heroku-postgresql:hobby-dev

Web上のアプリ管理画面にいくとAddonが追加されています。

次はLaravelでPostgreSQLを使うように設定します。
開発時には`.env`を書き換えてDBを変えていたかもしれませんが、このファイルは`.gitignore`に載っていてpushされませんので、herokuのサーバーに環境変数を設定します。

上記の画面のHeroku Postgresをクリックして以下の画面を開き、`Settings`  → `View Credentials` を開いてDBの設定情報を表示しましょう。


![](https://d2mxuefqeaa7sj.cloudfront.net/s_76B38BB7F01D58DEEAFB302A5EFEB5ACD0F38F6113786E76A8D460B05B8F35C7_1530102887087_heroku-ss1.png)


また、Laravelプロジェクトでは`APP_KEY`を環境変数として登録する必要があるのでそれも追加。

それぞれの情報を`heroku`コマンドから登録します。

    $ heroku config:set DB_CONNECTION=pgsql \
                        DB_HOST=<Host> \
                        DB_PORT=<Port> \
                        DB_DATABASE=<Database> \
                        DB_USERNAME=<User> \
                        DB_PASSWORD=<Password> \
                        APP_KEY=$(php artisan key:generate --show)
# デプロイする

herokuへのデプロイの方法はgitでpushするだけです。

    $ git add .
    $ git commit -m "update"
    $ git push heroku master

するといつものgitのログとは違いずらずらと出てくるので終わるまで見つめましょう。
見つめ終わったらデプロイ完了です。

herokuアプリの管理画面から`Open App`を開けばLaravelアプリが迎えてくれるでしょう、簡単。

# マイグレート、その他初期設定

herokuアプリは生成されてばかり、まっしろの状態です。
もちろんDBも空っぽなので`migrate`を実行しましょう。
初期設定が必要なライブラリを使っている場合もコマンドを実行しておいてください。
シェルに入って走らせておきましょう。リージョンがアメリカなので少しレスポンスが悪いけどイライラしないように。


    $ heroku run "php artisan migrate"
# 確認

`heroku`の管理画面から`Open app`をクリックしてみましょう。
以下の画面が出たら成功です。


![](https://d2mxuefqeaa7sj.cloudfront.net/s_76B38BB7F01D58DEEAFB302A5EFEB5ACD0F38F6113786E76A8D460B05B8F35C7_1530103132796_heroku-ss2.png)