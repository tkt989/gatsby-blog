---
title: "WindowsフォームのMDIでモーダルなフォームを表示する方法"
date: 2018-04-11T23:26:01+09:00
categories: ["C Sharp"]
draft: false
---

まず結論から言うと通常のやり方では出来ません。
MDIで`ShowDialog`を呼び出すと例外が発生します。

![](/2018/04/mdi_exception.png)

なので以下のやり方でやってみました。

```csharp
var form = new Form2();
form.MdiParent = MdiParent;

Enabled = false;
form.FormClosed += (_s, _e) => Enabled = true;

form.Show();
```

![](/2018/04/mdi.gif)

フォームを開くときに現在のフォームを無効状態にしておきます。
そして開いたフォームが閉じるときに再び有効にする。

これで擬似的にモーダルにすることができました。
