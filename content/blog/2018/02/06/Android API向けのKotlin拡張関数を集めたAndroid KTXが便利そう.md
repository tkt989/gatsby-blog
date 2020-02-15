---
title: "Android用のKotlin拡張関数を集めたAndroid KTXが便利そう"
date: 2018-02-06T21:38:01+09:00
categories: ["Android"]
description: "Android用のKotlin拡張関数を集めたAndroid KTXを紹介します"
draft: false
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/kmvS3sZF_y0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

GoogleDevelopersのビデオで知りました。

# Android KTXとは

[android/android-ktx: A set of Kotlin extensions for Android app development.](https://github.com/android/android-ktx)

Kotlinの拡張関数を使ってAndroid APIでの開発をやりやすくしよう、というものです。

新しい機能が使えるようになるというわけではないのですが、もともとJava向けに書かれたAndroid APIですから、Kotlinで書こうとすると少し冗長になっていたところが、
簡潔にわかりやすく書くことができます。

# どういうのがあるの

Githubに載っているのや、ドキュメントのを書いてみます。

## Uri

```kotlin
// kotlin
val uri = Uri.parse(myUriString)

// android-ktx
val uri = myUriString.toUri()
```

`String`にメソッドが追加されるので、文字列からそのまま変換できます。

## View

```kotlin
// kotlin
view.postDelayed({
    ...
}, 200);

// android-ktx
view.postDelayed(200) {
    ...
}
```

Kotlinは最後の引数がラムダ式の場合は括弧を閉じた後にラムダ式を書けるのですが、デフォルトのメソッドではミリ秒が最後になっているので、全体を括弧で閉じざるをえない。

## SharedPreferences

```kotlin
// kotlin
sharedPreferences.edit()
    .putBoolean("key", value)
    .apply()
    
// android-ktx
sharedPreferences.edit {
    putBoolean("key", value)
}
```

## Bundle

```kotlin
// kotlin
val bundle = Bundle()
bundle.putString(ID, "1234")
bundle.putString(NAME, "hoge")

// android-ktx
val bundle = bundleOf(ID to "1234", NAME to "hoge")
```

## etc...

[core-ktx](https://android.github.io/android-ktx/core-ktx/index.html)で探すことができます。

# 使うには

`build.gradle`に追加。

```groovy
dependencies {
    implementation 'androidx.core:core-ktx:0.1'
}
```

# まとめ

ちょっとした違いなのですが、このちょっとしたことだけでプログラムを組むのが楽しくなりそうですね。