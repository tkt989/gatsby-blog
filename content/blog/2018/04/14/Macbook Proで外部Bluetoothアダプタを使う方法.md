---
title: "Macbook Proで外付けBluetoothアダプタを使う方法"
date: 2018-04-14T00:01:33+09:00
categories: ["Mac"]
thumbnail: "/2018/04/mac_bt.png"
draft: false
---

最近安いBluetoothマウスを購入したのですが、これが安いだけあってMacbook Proで使うと接続が定期的に切れます。
その度にマウスの電源を入れ直して復帰させていたが面倒くさい、どうにかならないかと思案しているうちに、デスクトップPCにつけていたUSBのBluetoothアダプタが目についた。

もしかしたらBluetoothのアンテナを変えたら安定したりしないだろうか。
Bluetoothって相性みたいなものがあるってよく聞くし、Macbook Proに入っているアンテナよりもUSBで接続されているアダプタのほうが外界に広く接しているぶん接続も安定しやすそう。

それでアダプタをMacのほうに付けてみたけど認識されず。
内蔵のほうが優先されてしまいます。

結果、検索したらすぐに方法を見つけられた。

[macos - Force OS X to use Bluetooth dongle instead of built in controller - Ask Different](https://apple.stackexchange.com/questions/94402/force-os-x-to-use-bluetooth-dongle-instead-of-built-in-controller?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

メニューバーにあるBluetoothのアイコンを`Option`を押しながらクリックするとアドレスが表示される。これが内蔵のBluetoothアドレスである。

![](/2018/04/mac_bt.png)

アドレスを確認したら、一旦Bluetoothをオフにして数秒待つ。
次にUSBのBluetoothアダプタを接続して、また数秒待つ。
Bluetoothをオンにしてアドレスを確認。前に表示されていたのと違っていたら、外付けのアダプタで起動できている証である。

実際に変えてみたらこれが効果ありでした。
前は10分も使っていたらマウスとの接続が切れていたのですが、今はぜんぜん問題ありません。

MacのBluetoothに不満がある人は試す価値はあると思います。

---

問題のマウス。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=blogtkt989inf-22&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01M2X96R9&linkId=2910ed1362d3f02531310481b4e7f0fa"></iframe>
