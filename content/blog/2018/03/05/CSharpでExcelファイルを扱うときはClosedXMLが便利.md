---
title: "C#でExcelファイルを扱うときはClosedXMLが便利"
slug: "CSharpでExcelファイルを扱うときはClosedXMLが便利"
date: 2018-03-05T18:04:57+09:00
categories: ["C sharp"]
thumbnail: "/2018/03/excel.png"
draft: false
---

C#でExcelファイル(xlsx)を扱えるライブラリを探していた。

やりたいことはセルの中に特定の形式で書き込まれたデータを見つけて、その値を置き換える。
xlsxをテンプレートにして、C#側で好きなデータを埋め込むみたいな処理をやりたかったのです。

## Interopはメモリ管理しないといけない、うえに遅い

すこしググると`Microsoft.Office.Interop.Excel`というのが見つかった。

これは簡単に言えばxlsxを扱うというより、Excelを操作するようなものみたいで。

セルを操作するのに直接本物のExcelを使うわけですから、おそらく互換性からみればピカイチなのでしょうが調べてみると、動作が遅かったり、ちょっと組むのを間違えるとExcelのプロセスが残り続けるみたいです。
 以下参考。

[Excelファイルを C# と VB.NET で読み込む "正しい" 方法](https://qiita.com/midori44/items/acab9106e6dad9653e73)

使いにくそうなので、最終的には上の記事にも載っている`ClosedXML`を見つけた。

# ClosedXMLが使いやすい!

プロジェクトに追加するのはNuGetでできる。
VisualStudioのNuGet管理機能で検索すればでてくるので、それをインストールすればいい。

## 使い方

例えばxlsxを開いた１番目のシートの左上のセルに適当な文字を書き込むには以下のように。

```csharp
var book = new XLWorkbook(@".\template.xlsx");
var sheet = book.Worksheet(1);
sheet.Cell(1, 1).Value = "Hoge"; 
```

シートやセルを選択する添字が1始まりなのに注意してください。

# 便利な点

ClosedXMLにはxlsxを操作するのに便利機能がある。

## 使用している範囲のみ取得

`Sheet.RangeUsed()`でシートの中の使用しているセルだけを取得できる。
Excelのシートって縦横でほぼ無限なくらいに広がっているから、シートの中から特定のデータを探すとなると、どれくらい走破しないといけないのよって考えてしまう。

しかし、`RangeUsed()`を使えば難しいこと考えずに済むわけです。

Interopの方にもある機能なのかもしれないけど、調べてないです！
先にこっちを見つけちゃったので。

## 行の内容を検索

セルだけじゃなくて行のでデータを以下のようにとれます。

```csharp
var row = sheet.FirstRow();
```

んで、その行の中から文字列を検索して、別のデータに置き換えるみたいな処理が以下のように書ける。

```csharp
row.Search("{message}").Value = "Hello";
```

上の一行だけで、`{message}`を`Hello`に変換できます。

# やりたかったこと

当初の目的である文字列を検索して置き換える処理は以下のようにしてできる。

```csharp
foreach (var row in sheet.RangeUsed().Rows())
{
	row.Search("hoge").Value = "piyo";
}
```

直感的に書けていいですね。