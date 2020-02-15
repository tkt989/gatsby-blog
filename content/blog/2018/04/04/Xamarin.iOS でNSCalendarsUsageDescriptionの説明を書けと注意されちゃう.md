---
title: "Xamarin.iOS でNSCalendarsUsageDescriptionの説明を書けと注意されちゃう"
date: 2018-04-04T21:47:49+09:00
categories: ["iOS", "C Sharp", "Xamarin"]
draft: false
---
Xamarinで書いたiOSアプリをAppleに提出してみたら以下の理由で審査に落ち
てた。

> Missing Info.plist key - This app attempts to access privacy-sensitive data without a usage description. The app's Info.plist must contain an NSCalendarsUsageDescription key with a string value explaining to the user how the app uses this data.

`NSCalendarsUsageDescription`を書けといっている。

でもこのアプリはカレンダーの情報なんてアクセスしないんだけど？

なんでだろうといろいろググってみたら、`Xamarin`の[PermissionsPlugin](https://github.com/jamesmontemagno/PermissionsPlugin)の設定を正しく行っていなかったことが判明。

> Due to API usage it is required to add the Calendar permission :(

> `<key>NSCalendarsUsageDescription</key>`
> `<string>Needs Calendar Permission</string>`

> Even though your app may not use calendar at all. I am looking into a workaround for this in the future.

たとえカレンダーにアクセスしなくても`NSCalendarsUsageDescription`が必要とのこと。