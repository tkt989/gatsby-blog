---
title: "Bluetoothデバイスの名前を取得する方法"
date: 2017-11-19T22:51:12+09:00
draft: false
categories: ["Android"]
thumbnail: "/2017/11/19/bluetoothデバイスの名前を取得する方法/bt.png"
---
<img src="/2017/11/19/bluetoothデバイスの名前を取得する方法/bt.png">

ペアリング済みのデバイスは設定画面から名前を変更することができます。

この名前を取得したいと思ったのですが、[BluetoothDevice](https://developer.android.com/reference/android/bluetooth/BluetoothDevice.html)ではそれらしいのは見つかりませんでした。(getName()は変更する前の初期値が返ってきた)

いろいろ調べて見ると非公開のメソッドを使えば取得できることが判明。

BluetoothDeviceの[getAlias()](https://android.googlesource.com/platform/frameworks/base/+/refs/heads/master/core/java/android/bluetooth/BluetoothDevice.java#883)をリフレクションなりを使ってアクセスすれば名前を取得できます。

しかし、@hideなAPIなので突然使えなくなるかもしれない。
使うときは要注意。
