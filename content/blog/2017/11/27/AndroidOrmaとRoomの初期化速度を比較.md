---
title: "AndroidOrmaとRoomの初期化速度を比較"
date: 2017-11-27T23:10:25+09:00
draft: false
categories: ["Android"]
---

作成しているアプリで[Android Orma](https://github.com/maskarade/Android-Orma)をORMとして使っていたのですが、`OrmaDatabase`の生成時に少し時間が掛かるのが気になっていました。
もう一つのORMライブラリである[Room](https://developer.android.com/topic/libraries/architecture/room.html)ではどうなんだろうと思って生成速度を比較してみました。

# 設定

動作端末は家で余っていたタブレット[Z370C](https://www.asus.com/jp/Tablets/ASUS_ZenPad_70_Z370C/)。

それぞれSQLにアクセスするオブジェクトを生成したあと、データをひとつだけ追加する処理の時間を計測。


# 結果

ライブラリ    | 時間
--------------|------------
 Android Orma | 1902.4584ms
 Room         | 143.45172ms

Roomの方がかなり速かったです。

Android Ormaはなぜこんなことになっているんだろう？
私の設定が間違っているのかな？


# ソース

以下が計測用のソースです。
  
{{< gist tkt989 7759c1fc5b7e6ada0f29be2c246666a6 >}}
