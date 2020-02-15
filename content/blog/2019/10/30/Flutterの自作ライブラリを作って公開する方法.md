---
title: "Flutterの自作ライブラリを作って公開する方法"
date: 2019-10-30T23:39:10+09:00
draft: false
categories: ["Dart"]
---

[loading_text](https://pub.dev/packages/loading_text)なるライブラリを公開したので、そのときに得た知識を残しておきます。

# Flutterライブラリの作成
    $ flutter create --template=package <name>

でFlutterライブラリのプロジェクトを作ることができます。
このコマンドで作られるプロジェクトは`lib`のみで、`android`、`ios`などプラットフォーム非依存のdartコードだけ書けます。


    $ flutter create --template=plugin <name>

でプラットフォームのコードも書けるようですが、今回は試していません。

# 公開の手順

まずは以下のコマンドでプロジェクトに不備がないかチェックします。

    $ pub publish --dry-run

私の環境では、`pubspec.yml`にhomepageとauthorの項目が足りないことで、
怒られました。

修正したら、以下のコマンドで公開です。

    $ pub publish

途中、Googleアカウントでログインが求められるので、URLにアクセスしてログインしましょう。
しばらくすると、公開が完了します。

# 注意点

公開したパッケージは削除することはできないみたいです。


> Publishing is forever
> Keep in mind that publishing is forever. As soon as you publish your package, users can depend on it. Once they start doing that, removing the package would break theirs. To avoid that, pub strongly discourages deleting packages. You can always upload new versions of your package, but old ones will continue to be available for users that aren’t ready to upgrade yet.

適当翻訳では、「削除できてしまうとそのパッケージを使っているユーザーが困っちゃうから、させないようにしているよ。」です。
バージョンを上げて、上記コマンドを打ち直せば、新しいバージョンをアップロードできますが、古いものも残り続けるようです。

非公開にすべき情報を上げないように注意しましょう。

