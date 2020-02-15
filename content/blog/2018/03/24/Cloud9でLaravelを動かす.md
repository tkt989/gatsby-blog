---
title: "Cloud9でLaravel5.5を動かす"
date: 2018-03-24T22:23:18+09:00
categories: ["php"]
description: "オンラインIDEのCloud9でLaravel5.5を動かしてみます。"
draft: false
---

ブラウザで動くIDE、Cloud9でLaravelを使ってみる。
普段使っているパソコンにWEBサーバーやらDBやらを入れるのはしんどいので、こういうときにCloud9は便利です。

# 環境

* PHP 7.2
* Laravel 5.5

で導入する。

# Cloud9セットアップ

まずはCloud9でマシンを生成しましょう。
当然ですが、言語はPHPを選択します。

![](/2018/03/c9-php.png)

# PHP7をインストール

Cloud9に入っているPHPはバージョンが5なので7をインストールします。
デフォルトのaptリポジトリにはPHP7は登録されていないので、ppaを追加します。

```sh
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
```

お次にPHP本体と必要なパッケージをインストール。

```sh
sudo apt-get install php7.2 php7.2-dom php7.2-mbstring
```

# Laravelプロジェクトを作る

次にLaravelのプロジェクトを作ります。

```sh
composer create-project laravel/laravel sample "5.5.*" --prefer-dist
```

終わったら`sample`フォルダにLaravelのプロジェクトが生成されます。

# 動かしてみる

正しく動くか確認するためにサーバーを起動してみましょう。
Cloud9のPreview用のアドレスとポートを指定しておきます。

```sh
cd sample
php artisan serve --host=$IP --port=$PORT
```


コマンドのあと、Cloud9の`Preview -> Preview Running Application`を選択したらLaravelの画面が表示された。

![](/2018/03/c9-laravel.png)