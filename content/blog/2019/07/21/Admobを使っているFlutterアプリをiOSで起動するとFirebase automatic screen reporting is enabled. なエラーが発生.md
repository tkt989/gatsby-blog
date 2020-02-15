---
title: "Admobを使っているFlutterアプリをiOSで起動するとFirebase Automatic Screen Reporting Is Enabled"
date: 2019-07-21T16:07:45+09:00
categories: [iOS]
draft: false
---

```
Firebase automatic screen reporting is enabled.
Call +[FIRAnalytics setScreenName:setScreenClass:] to set the screen name or override the default screen class name. To disable automatic screen reporting, set the flag 
```
みたいなエラーが発生して、アプリを起動するとすぐに終了してしまう。

`info.plist`に`FirebaseAutomaticScreenReportingEnabled`を追加して、`false`を設定すると解決。