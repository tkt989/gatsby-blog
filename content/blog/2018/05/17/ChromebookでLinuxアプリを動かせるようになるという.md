---
title: "ChromebookでLinuxアプリを動かせるようになるという"
date: 2018-05-17T23:13:10+09:00 categories: ["ひとりごと"]
thumbnail: "/2018/05/chromebook.png"
draft: false
---

[「Chrome OS」がLinuxをサポート　「Android Studio」でのアプリ開発が可能に - ITmedia NEWS](http://www.itmedia.co.jp/news/articles/1805/09/news086.html)

Chromebookは当初はブラウザしか動かせなかった。
オフィスなどの機能はWebアプリでなんとかするコンセプトで、時代を先取りしまくっていたOSです。
今ではブラウザだけでなくAndroidアプリも使えるようになり、なかなか実用的になっています。

そして、Google IO 2018でLinuxアプリも起動できるようなることが発表されました。

そもそもChrome OSはLinuxがベースに作られていて、GUIも[Wayland](https://ja.wikipedia.org/wiki/Wayland)というLinuxディストリビューションで使われているもので動いている。
なので、Linuxアプリが動くのは意外ではないし、その証拠に既存のChromebookデバイスでも開発者モードにして[Crouton](https://github.com/dnschneid/crouton)というソフトを使えばLinuxアプリを起動できていた。

今回の発表はその機能を公式に対応することになる。
どのくらい安定しているかとか気になることはたくさんあるけど、やっぱりLinuxのソフトが動かせるっていうのは大きいです。
動画ではAndroid Studioが使えてましたが、それだけでなくLinuxにはデベロッパー向けのソフトが揃っていますから、Chromebookはプログラマにとっても魅力的なデバイスになりそう。

Pixelbookが発表されたときにChromebookにi5とかi7のCPUなんてオーバースペックなんじゃないのと思ったのですが、Googleはこういう構想も見据えていたのでしょうね。

Chromebookは日本ではいまいちですが、アメリカでは特に教育現場でかなり普及しているようです。

[Chrome OS、米K-12教育市場でシェア58％に（iOSは14％） - ITmedia NEWS](http://www.itmedia.co.jp/news/articles/1703/04/news022.html)

ついにLinux系OSを開発者だけでなく一般ユーザーにも広めるという野望?が達成されることになるのかな。

Chromebookといえば低価格で最低限度のスペックみたいな印象だったけど、これからハイスペックの機種が登場してほしいな。