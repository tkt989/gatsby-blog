---
title: "ClosedXMLの簡単な使い方"
date: 2018-10-08T01:23:40+09:00
categories: ["C-Sharp"]
draft: false
---

## ワークブック読み込み
```csharp
    IXLWorkbook workbook = new XLWorkbook(@"<ファイルパス>");
```

これでワークブックが読み込めます。
セルもワークシートもワークブックを使って取得します。

## シート読み込み
```csharp
    using (IXLWorkbook workbook = new XLWorkbook(@"<ファイルパス>"))
    {
        IXLWorksheet sheetIndex = workbook.Worksheet(1); // インデックスで取得
        IXLWorksheet sheetName  = workbook.Worksheet("シート1"); // シート名で取得
    }
```

## セルを取得
```charp
    sheet.Sheet(1, 1); // 座標から取得。1始まりに注意
    sheet.Sheet("A1"); // 文字列から取得

ワークシートのオブジェクトからセルを取得できます。
```

## 行を取得
```csharp
    IXLRow row = sheet.Row(3); // 行番号から取得
    row.Cell(3); // Rowからセルを取得することもできる
    
    // Rows()で行一覧を取得できる
    foreach (IXLRow row in sheet.Rows())
    {
        /* ... */
    }
```

## 列を取得
```csharp
    IXLColumn column = sheet.Column(3); // 列番号から取得
    column.Cell(3); // Columnからセルを取得することもできる
    
    // Column()で行一覧を取得できる
    foreach (IXLColumn column in sheet.Columns())
    {
        /* ... */
    }
```
    
## 使用しているセル一覧を取得
```csharp
    foreach (IXLCell cell in sheet.CellsUsed())
    {
        /* ... */
    }
```

`CellsUsed()`で使用しているセル（値が入っているなど）を取得することができます。

## 文字列を含んだセルを探す
```csharp
    // "abc"を含んだセルを探す
    foreach (IXLCell cell in sheet.Search("abc"))
    {
        /* ... */
    }
```

## セルの背景色を変える
```chsarp
    cell.Style.Fill.BackgroundColor = XLColor.FromArgb(255, 0, 0);
```

## 保存
```csharp
    workbook.Save();
```

## 別名で保存
```csharp
    workbook.SaveAs(@"<保存先>");
```