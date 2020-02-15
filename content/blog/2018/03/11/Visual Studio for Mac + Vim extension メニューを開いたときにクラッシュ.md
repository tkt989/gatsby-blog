---
title: "Visual Studio for Mac + Vim Extension メニューを開いたときにクラッシュ"
date: 2018-03-11T21:59:39+09:00
categories: ["Mac", "Visual Studio"]
thumbnail: "/2018/03/vsmac.png"
draft: false
---

Vimのキーバインドが好きです。

新しいIDEとかエディタは導入したらまずはVimの拡張機能があるかどうかを調べるほどVimに依存しています。

`Visual Studio for Mac`にもVimのキーバインドにしてくれるエクステンションを入れていました。
けれど使用していると、ときどきVisual Studioがクラッシュしてしまうようになってしまった。

クラッシュする契機はメニューを開いたときだとわかったのですが、解決方法が見つからなかったため、渋々Vimエクステンションをアンインストールすることに。

しかし、使い続けるうちにふつふつと、操作にストレスを感じる。
単にコピペしたいだけなのに、Ctrlキー押したりトラックパッドで選択したりするのがめんどう。

やっぱり入れ直そう、最近Visual Studioの更新がきたので、もしかしたら修正されているかもと思っていたのですが、依然としてメニューを開くとクラッシュしてしまいました。

がっかりしながらも、また元に戻るのも嫌なので、何か解決方法はないかと検索していると、やっと見つけることができました。

[Visual Studio for Mac crashes when opening Edit menu · Issue #156 · nosami/XSVim](https://github.com/nosami/XSVim/issues/156)

`Format Document`のキーバインドを外したら直るようです。

デフォルトのキーバインドは`Ctrl+I`になっているので、Visual Studioの設定から外します。

<img src="/2018/03/vsmac.png" width=70%>

今のところ、これを行ってからクラッシュしないようになりました。