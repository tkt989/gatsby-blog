---
title: "Xamarin.FormsでListViewの行をタップしたときのハイライトを消す"
date: 2018-02-25T01:27:47+09:00
categories: ["Xamarin"]
draft: false
---

Xamarin.FormsでListViewを試してみると以下のように。

![](/2018/02/xamarin_listview1.gif)

タップした行にハイライトが付いてる。

うーん、今作りたいアプリにはこの機能はあんまり嬉しくない…。
できればAndroidのListViewみたいになってほしいです。

ということで消す方法を試してみた。

```cs
listView.ItemTapped += (sender, e) => {
    ((ListView)sender).SelectedItem = null;
};
```

イベントハンドラの中で、タップされたらすぐ未選択にすればいいみたいです。

これでAndroidのネイティブな動きのようになりました。

![](/2018/02/xamarin_listview2.gif)

# 参考

[How to disable highlight on ListView in Xamarin.Forms - Stack Overflow](https://stackoverflow.com/questions/26657932/how-to-disable-highlight-on-listview-in-xamarin-forms)