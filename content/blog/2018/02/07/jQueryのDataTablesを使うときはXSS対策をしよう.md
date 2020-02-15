---
title: "jQuery DataTablesを使うときのXSS対策"
date: 2018-02-07T17:32:53+09:00
categories: ["JavaScript"]
draft: false
---

```js
var result = /* サーバーから取得したデータとか */

$("#dataTable").DataTable({
	data: result,
	columns: [
		{ data: "name" },
		{ data: "age" },
		{ data: "tel" },
		...
	]
});
```

なにも考えずにそのままデータを追加すると、サニタイズされないのでXSSが成立してしまう。

なので、ユーザーから入力されたものを含んだデータは`render`に`$.fn.dataTable.render.text()`を設定しておきましょう。

```js
$("#dataTable").DataTable({
	data: result,
	columns: [
		{ data: "name", render: $.fn.dataTable.render.text() },
		{ data: "age",  render: $.fn.dataTable.render.text() },
		{ data: "tel",  render: $.fn.dataTable.render.text() },
		...
	]
});
```

# 参考

[DataTables - Security](https://datatables.net/manual/security)