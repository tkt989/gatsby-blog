---
title: "Google Play ServiceのFusedLocationで位置情報を取得"
date: 2017-12-09T22:50:31+09:00
draft: false
categories: ["Android"]
---

Androidで位置情報を取得する方法は、一昔前は`LocationManager`が使われていたようですが現在は`Google Play Service`の`FusedLocation`を使うのが推奨されています。

`LocationManager`では位置情報の取得にGPSを使うか、WIFIやモバイルネットワークを使うかを指定しなければなりませんでしたが、`FusedLocation`ではライブラリ側が適切な取得方法を自動的に判断してくれます。使う側は「高精度で取得したい」とか「大雑把でいいからバッテリー持ちを重視したい」な感じで設定するだけでいいんです。

# ライブラリの追加

プロジェクトルートの`build.gradle`の`repository`に`google()`を追加します。
その後使用するモジュール内の`build.gradle`の`dependencies`に`implementation "com.google.android.gms:play-services-location:11.6.0"`を追加します。
`11.6.0`の部分はバージョンなので、変わる可能性があります。この記事を書いているときはこれが一番新しいバージョンでした。

バージョンに何を指定するかは、以下のサイトで取得できます。

https://developers.google.com/android/guides/setup

追加したらGradleの同期を行います。


# パーミッションの追加

位置情報の取得にはパーミッションの追加が必要なので`AndroidManifest.xml`に以下を追加します。

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

また、デバイスで動かすときには`RuntimePermission`を使ってユーザーから許可を得る必要があります。
今回は動作確認したいだけなので、設定画面から手動で許可を通します。

# 現在の位置を取得

以下から実際のコードで書く部分です。

`FusedLocationProviderClient`というクラスを生成します。

```java
FusedLocationProviderClient client = new FusedLocationProviderClient(this);
```

このクラスを通して位置情報を取得することができます。


現在の位置を取得するには`getLastLocation()`を呼び出します。このメソッドは非同期で実行されて代わりに`Task`というオブジェクトを返します。この`Task`の`addOnSuccessListener`にリスナーを指定して位置情報を取得します。

```java
client.getLastLocation().addOnSuccessListener(new OnSuccessListener<Location>() {
    @Override
    public void onSuccess(Location location) {
        /* ... */
    }
});
```

`Location`から緯度経度を得ることができます。

# リアルタイムで位置を取得

`requestLocationUpdates(ReuqestLocation, LocationCallback, Looper)`でリアルタイム位置情報を取得することができます。

RequestLocationは取得する際のパラメーターを設定します。
LocationCallbackは更新された内容を受け取るリスナーです。
Looperはスレッド関係の設定なのですが、あんまり詳しくないので今回はnullを指定します。

## ReuqestLocation

`RequestLocation`でパラメータを設定できます。

```java
LocationRequest locationRequest = LocationRequest.create().setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
```

`setPriority()`でどのくらいの精度で取得したいのかを設定できます。

`HIGH_ACCURACY`が最も高い精度で主にGPSが使用されるます。
`BALANCED_POWER_ACCURACY`はちょっと精度が低くなり、誤差は100メートルほどになりますが、消費電力を低く抑えることができます。
細かい位置情報は必要ない。ユーザーがどの都市にいるのかという大雑把な情報が欲しい場合は`LOW_POWER`を使います。
`NO_POWER`は消費電力をほとんど使いません、他のクライアントが位置情報をリクエストしたときに同じデータを取得できます。

他にも更新間隔などを設定できます。詳細は以下に載っています。

https://developers.google.com/android/reference/com/google/android/gms/location/LocationRequest

## LocationCallback

`LocationCallback`が位置情報が更新されたときに受け取るリスナーです。

`onLocationResult()`で受け取ることができます。

```java
client.requestLocationUpdates(locationRequest, new LocationCallback() {
    @Override
    public void onLocationResult(LocationResult locationResult) {
        super.onLocationResult(locationResult);
		Location location = locationResult.getLastLocation();
    }
}, null);
```

# 注意点

* `requestLocationUpdates()`を実行したら、使わなくなったら`removeLocationUpdates()`を呼び出してリスナーを解除すること。
* `getLastLocation()`はnullを返すときがあります。以前タブレットでWIFIを切り、GPSのみで使用していたときに毎回nullが返ってきたため何か設定で失敗しているのかなと思っていました。がWIFIをオンにしたら結果を返すようになりました。おそらく屋内だったのでGPSだけでは位置情報を取得できなかったのだと思います。

普段で使うようなアプリでは、モバイルネットワークやWIFIなど複数の情報源から位置を取得しているため、GPSって屋内だとほとんど届かないことに気づきにくかったです。
