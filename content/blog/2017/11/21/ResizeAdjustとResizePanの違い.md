---
title: "ResizeAdjustとResizePanの違い"
date: 2017-11-21T22:16:25+09:00
draft: false
categories: ["Android"]
thumbnail: "/2017/11/21/resizeadjustとresizepanの違い/anime.gif"
---

<img src="/2017/11/21/resizeadjustとresizepanの違い/anime.gif">

windowSoftInputModeにResizeAdjustもしくはResizePanを指定することで、ソフトウェアキーボードを開いたときの動作を変えることができます。

下部のボタンやToolbarを見れば分かりやすいですが、`ResizeAdjust`はキーボード分Activityのサイズを縮めていて、`ResizePan`はActivity全体を上にずらすようになっています。
