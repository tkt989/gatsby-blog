---
title: "Andoid P の ImageDecoder を触ってみる"
date: 2018-04-01T14:37:18+09:00
categories: ["Android"]
thumbnail: "/2018/04/preprocess_thumbnail.png"
draft: false
---

Android P Previewから`ImageDecoder`が使えるように。

* [Android Developers Blog: Previewing Android P](https://android-developers.googleblog.com/2018/03/previewing-android-p.html)
* [ImageDecoder | Android Developers](https://developer.android.com/reference/android/graphics/ImageDecoder.html)

> Android P gives you an easier way to decode images to bitmaps or drawables -- ImageDecoder, which deprecates BitmapFactory.

# 画像の表示

```kotlin
var uri = Uri.parse("android.resource://${packageName}/drawable/image")
val source = ImageDecoder.createSource(contentResolver, uri)
val bitmap = ImageDecoder.decodeBitmap(source)
imageView.setImageBitmap(bitmap)
```

![](/2018/04/normal.png)

`drawable`をURIにして読み込む。

* [android - Get URI from drawable image - Stack Overflow](https://stackoverflow.com/questions/19566840/get-uri-from-drawable-image?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

# リサイズ

```kotlin
var uri = Uri.parse("android.resource://${packageName}/drawable/image")
val source = ImageDecoder.createSource(contentResolver, uri)
val bitmap = ImageDecoder.decodeBitmap(source, { decoder, info, source ->
    decoder.setResize(300, 300)
})
imageView.setImageBitmap(bitmap)
```

`decode...`にコールバックを指定すれば、decoderからリサイズなどができる。

![](/2018/04/resize.png)

# 加工

```kotlin
var uri = Uri.parse("android.resource://${packageName}/drawable/image")
val source = ImageDecoder.createSource(contentResolver, uri)
val bitmap = ImageDecoder.decodeBitmap(source, { decoder, info, source ->
    decoder.setResize(300, 300)
    decoder.setPostProcessor { canvas ->
        val path = Path()
        path.fillType = Path.FillType.INVERSE_EVEN_ODD
        path.addCircle((canvas.width/2).toFloat(), (canvas.height/2).toFloat(), (canvas.width/2).toFloat(), Path.Direction.CW)

        val paint = Paint()
        paint.isAntiAlias = true
        paint.color = Color.TRANSPARENT
        paint.xfermode = PorterDuffXfermode(PorterDuff.Mode.SRC)

        canvas.drawPath(path, paint)

        return@setPostProcessor PixelFormat.TRANSLUCENT
    }
})
imageView.setImageBitmap(bitmap)
```

`setPreProcessor`で読み込んだ画像の加工ができる。

![](/2018/04/preprocess.png)

こんな感じに円形にクリッピングなど。

---

使用した画像

Charlesjsharp / Cassius blue (Leptotes cassius theonus), Cuba / CC BY-SA 4.0
[File:Cassius blue (Leptotes cassius theonus) underside.JPG - Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cassius_blue_(Leptotes_cassius_theonus)_underside.JPG)
