---
title: "CocoaPodsの使い方をメモ"
date: 2019-01-14T19:19:16+09:00
categories: ["iOS"]
draft: false
---

# cocoapods
cocoapodsの使い方をメモ。

まずは`init`で`Podfile`を生成します。
使うライブラリはこの`Podfile`の中に書きます。

```sh
$ pod init
```
次に使いたいライブラリを`Podfile`に記載する。
書く場所は

```ruby
target '<アプリ名>' do
   use_frameworks!
   ...
```

の次に書く。
ユニットテストやUIテストのみ使用するライブラリは別の場所に書くのですが、まぁたいていの場合はアプリ全体で使用すると思うのでここに書きます。

`pod`に続けてライブラリ名やバージョンを指定します。ライブラリのページを見ればわかると思います。
例えばRxSwiftを使いたい場合は

```ruby
target 'MoneyCalculator' do
    use_frameworks!
    
    pod 'RxSwift', '~> 4.0'
    pod 'RxCocoa', '~> 4.0'
      
    ...
end
```
な感じです。