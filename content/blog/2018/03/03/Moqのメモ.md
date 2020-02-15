---
title: "Moqのメモ"
date: 2018-03-03T14:46:34+09:00
categories: ["C Sharp"]
draft: false
---

ユニットテストを書くときにはモックライブラリがあると便利。
JavaではMockitoを使っていましたが、最近C#を使うことが多くなったので、よく使われているMoqの使い方をメモ。

# Moqの使い方

```csharp
public abstract class IFoo
{
    public abstract string Greet();
    public abstract int DoSomething(string text);
}
```

このクラスをモック化してみます。

## メソッドを上書き

```csharp
var mock = new Mock<IFoo>();
mock.Setup(foo => foo.Greet()).Returns("hello");
var f = mock.Object;

Assert.AreEqual("hello", f.Greet());
```

`Setup`にラムダ式でメソッドを登録して、`Returns`で戻り値を設定できます。

## 引数で戻り値を分ける

```csharp
var mock = new Mock<IFoo>();
mock.Setup(foo => foo.DoSomething("hoge")).Returns(0);
mock.Setup(foo => foo.DoSomething("piyo")).Returns(1);
mock.Setup(foo => foo.DoSomething(It.Is<string>(s => s.Contains("a")))).Returns(-1);
var f = mock.Object;

Assert.AreEqual(0, f.DoSomething("hoge"));
Assert.AreEqual(1, f.DoSomething("piyo"));
Assert.AreEqual(-1, f.DoSomething("bar"));
```

`Setup`の中で指定すれば特定の引数のときだけの戻り値を設定できます。

ある条件に引数が一致するかを判断したいときは`It`が使える。
上では"a"を含んでいるstringのときのみ-1を返すようにしています。

そのほかにも`It`のメソッドを見ればいろいろ条件の指定方法を見つけることができます。

## 例外を投げる

```csharp
var mock = new Mock<IFoo>();
mock.Setup(foo => foo.DoThrowableTask()).Throws(new InvalidOperationException());
var f = mock.Object;

try
{
    f.DoThrowableTask();
}
catch (InvalidOperationException e)
{
    return;
}
Assert.Fail();
```

## 特定メソッドの呼び出しを確認

```csharp
var mock = new Mock<IFoo>();
var f = mock.Object;

f.Greet();

mock.Verify(foo => foo.Greet());
mock.Verify(foo => foo.DoSomething("hoge"), Times.Never);
```

`Verify`でメソッドが呼ばれたか、もしくは呼ばれていないかをチェックすることができる。

# Mockitoとの比較

JavaのMockitoと違いモック化できるのは、interfaceやabstractやvirtualなどの動作を上書きできるメソッドに限られる。

この制限があるのが残念です。。。
Mockitoだったらほぼ全てのメソッドをモックにすることができるんですけど。
