---
title: "CoreMLで画像認識にチャレンジ"
date: 2018-02-04T21:20:59+09:00
categories: ["Swift", "iOS"]
thumbnail: "/2018/02/coreml2.png"
draft: false
---

iOS11から使えるCoreMLという機械学習フレームワークがあります。

気になって[紹介ビデオ](https://developer.apple.com/videos/play/wwdc2017/703/)を見たら、数行のコードを書くだけで画像認識を行い、なにが写っているかを推測できるようです。

画像認識がこんなに簡単にできるなんてすごい、おもしろそうなので実際に使ってみました。

# モデルを取得

まずは画像を学習したモデルをダウンロードします。

https://developer.apple.com/jp/machine-learning/

上のサイトに用途に合わせていくつかのモデルがダウンロードできます。今回はMobileNetというものを使って見ようと思います。

モデルを取得したらXCodeのプロジェクトにドラッグアンドドロップでモデルファイルを追加します。

![](/2018/02/coreml1.png)

`.mlmodel`がモデルファイルですね。

選択するとモデルに渡す形式や出力の情報を確認することができます。

この情報を読むと、MobileNetは224x224の画像を入力すると、`Dictionary`で写っているものを表すカテゴリとその確率、そしてもっとも確率が高いものカテゴリを出力するようです。

# 画像を選ぶ

```swift
let imagePickerController = UIImagePickerController()
imagePickerController.sourceType = .photoLibrary
imagePickerController.delegate = self
        
present(imagePickerController, animated: true, completion: nil)
```

モデルに入力する画像を選ぶために`UIImagePickerController`を使います。

次に、選んだ画像をモデルに入力するわけですが、`CVPixelBuffer`という型に変換する必要があります。

自分でやってみようと思ったのですが、ちょっと複雑そうだったので、StackOverflowに載っていたコードをそのままコピペ。

https://stackoverflow.com/questions/44400741/convert-image-to-cvpixelbuffer-for-machine-learning-swift

```swift
extension UIImage {
    
    func resize(to newSize: CGSize) -> UIImage {
        UIGraphicsBeginImageContextWithOptions(CGSize(width: newSize.width, height: newSize.height), true, 1.0)
        self.draw(in: CGRect(x: 0, y: 0, width: newSize.width, height: newSize.height))
        let resizedImage = UIGraphicsGetImageFromCurrentImageContext()!
        UIGraphicsEndImageContext()
        
        return resizedImage
    }
    
    func pixelBuffer() -> CVPixelBuffer? {
        let width = self.size.width
        let height = self.size.height
        let attrs = [kCVPixelBufferCGImageCompatibilityKey: kCFBooleanTrue,
                     kCVPixelBufferCGBitmapContextCompatibilityKey: kCFBooleanTrue] as CFDictionary
        var pixelBuffer: CVPixelBuffer?
        let status = CVPixelBufferCreate(kCFAllocatorDefault,
                                         Int(width),
                                         Int(height),
                                         kCVPixelFormatType_32ARGB,
                                         attrs,
                                         &pixelBuffer)
        
        guard let resultPixelBuffer = pixelBuffer, status == kCVReturnSuccess else {
            return nil
        }
        
        CVPixelBufferLockBaseAddress(resultPixelBuffer, CVPixelBufferLockFlags(rawValue: 0))
        let pixelData = CVPixelBufferGetBaseAddress(resultPixelBuffer)
        
        let rgbColorSpace = CGColorSpaceCreateDeviceRGB()
        guard let context = CGContext(data: pixelData,
                                      width: Int(width),
                                      height: Int(height),
                                      bitsPerComponent: 8,
                                      bytesPerRow: CVPixelBufferGetBytesPerRow(resultPixelBuffer),
                                      space: rgbColorSpace,
                                      bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue) else {
                                        return nil
        }
        
        context.translateBy(x: 0, y: height)
        context.scaleBy(x: 1.0, y: -1.0)
        
        UIGraphicsPushContext(context)
        self.draw(in: CGRect(x: 0, y: 0, width: width, height: height))
        UIGraphicsPopContext()
        CVPixelBufferUnlockBaseAddress(resultPixelBuffer, CVPixelBufferLockFlags(rawValue: 0))
        
        return resultPixelBuffer
    }
}
```

# 画像をモデルに入力

デリゲートのメソッドで選択した画像を取得。
入力用にリサイズして、形式を変換します。

その後、モデルクラスを生成して、`prediction`を呼び出すと、結果を取得することができます。

```swift
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        let image = (info[UIImagePickerControllerOriginalImage] as! UIImage).resize(to: CGSize(width: 224, height: 224))
        
        let pixelBuffer = image.pixelBuffer()
        
        let model = MobileNet()
        let prediction = try! model.prediction(image: pixelBuffer!)
        
        self.label.text = prediction.classLabel
        self.image.image = image
        
        dismiss(animated: true, completion: nil)
    }
```

# 実行してみた結果

![](/2018/02/coreml2.png)

どうやら上手い具合に推測できているようです。

ほかに試してみましょう。

![](/2018/02/coreml3.png)

baboonはヒヒのことです。

ちなみに上手くいかなかったことも、、、

![](/2018/02/coreml4.png)

うーん、惜しい。
