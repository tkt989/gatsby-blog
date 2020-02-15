---
title: "Goで比較明合成してみた"
date: 2018-01-23T07:42:13+09:00
categories: ["Go"]
draft: false
thumbnail: "/2018/01/out1.jpg"
---


## 画像読み込み

ファイルパスから`image.Image`を作る。

```go
func decode(file string) (image.Image, error) {
	reader, err := os.Open(file)
	if err != nil {
		log.Fatal(err)
	}
	defer reader.Close()

	img, _, err := image.Decode(reader)
	if err != nil {
		log.Fatal(err)
	}

	return img, nil
}
```

## 輝度計算

輝度はピクセルの明るさのことです。
以下のサイトを参照して計算していますが、比較明合成では実際の輝度の値ではなく、大小関係が知りたいだけなので、小数にせずに整数にして計算しています。

[osakana.factory - HSB 値と輝度の求め方](https://ofo.jp/osakana/cgtips/hsb.phtml)

```go
func luminance(color color.Color) uint32 {
	r, g, b, _ := color.RGBA()

	return 298 * r + 586 * g + 114 * b
}
```

## 合成

画像のピクセルを一つずつ見ていき、色情報を取り出す。
輝度を計算し、大きい方の色を出力画像のピクセルとして書き出しています。

```go

func blend(img1, img2 image.Image) image.Image {
	width := img1.Bounds().Max.X
	height := img1.Bounds().Max.Y

	out := image.NewRGBA(image.Rect(0, 0, width, height))
	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			color1 := img1.At(x, y)
			color2 := img2.At(x, y)

			if luminance(color1) >= luminance(color2) {
				out.Set(x, y, color1)
			} else {
				out.Set(x, y, color2)
			}
		}
	}

	return out
}
```

## main関数

最後にmain関数。
コマンドライン引数で合成用の画像ファイルと出力先を指定。

```go
func main() {
	img1, err := decode(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}

	img2, err := decode(os.Args[2])
	if err != nil {
		log.Fatal(err)
	}

	if img1.Bounds() != img2.Bounds() {
		log.Fatal()
	}

	out := blend(img1, img2)

	writer, err := os.Create(os.Args[3])
	if err != nil {
		log.Fatal(err)
	}
	defer writer.Close()

	jpeg.Encode(writer, out, &jpeg.Options{100})
}
```

# コード全文

[tkt989/golang-blend](https://github.com/tkt989/golang-blend)

# 実行例

撮った写真でいくつか実行してみました。

---

<img src="/2018/01/pic1.JPG" width="300">
<p>+</p>
<img src="/2018/01/pic2.JPG" width="300">
<p>=</p>
<img src="/2018/01/out1.jpg" width="300">

---
<img src="/2018/01/pic3.JPG" width="300">
<p>+</p>
<img src="/2018/01/pic4.JPG" width="300">
<p>=</p>
<img src="/2018/01/out2.jpg" width="300">
