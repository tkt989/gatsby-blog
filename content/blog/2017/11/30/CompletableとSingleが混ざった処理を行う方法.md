---
title: "CompletableとSingleが混ざった処理を行う方法"
date: 2017-11-30T22:02:30+09:00
draft: false
categories: ["Java"]
---

```java
public Completable connect() { /* ... */ }

public Single<Integer> getValue() { /* ... */ }

public Completable disconnect() { /* .. */ }
```

例えばこんなメソッドがあるとする。

何かと接続し、値を取得して切断するという処理で。呼び出す順番は必ず`connect()` > `getValue()` > `disconnect()` でなければならない。

ところで、`Completable`をメソッドチェーンを使って直列に処理したい場合以下のようにすればいい。
```java
connect()
  .andThen(task1())
  .andThen(task2())
  /* ... */
  .andThen(disconnect())
  .subscribe(/* ... */);
```

しかし、直列処理の途中で`Single`が混ざったときはどのように書くのか?

`toCompletable()`や`flatMapCompletable()`を使えば一応繋げられるけど、`getValue()`の結果を無視してしまっている。。。
```java
connect()
  .andThen(getValue())
  .toCompletable()
  .andThen(disconnect())
  .subscribe(/* ... */);

/* ... */

connect()
  .andThen(getValue())
  .flatMapCompletable(value -> disconnect()) // valueのスコープはこのラムダ式内なのでsubscribeの中で参照できない。。。
  .subscribe(/* ... */);
```

どうやればいいか悩んでいたのですが、調べた結果以下のようにすればいいです。
```java
connect()
  .andThen(getValue())
  .flatMap(value -> disconnect().andThen(Single.just(value)))
  .subscribe(value -> {
    /* ... */
  });
```

これで`subscribe()`で値を参照することができます。

`Single`のあとに複数の処理があっても、値を次々と受け渡していけばOKです。
```java
connect()
  .andThen(getValu())
  .flatMap(value -> task1().andThen(Single.just(value)))
  .flatMap(value -> task2().andThen(Single.just(value)))
  /* ... */
  .flatMap(value -> disconnect().andThen(Single.just(value)))
  .subscribe(value -> {
    /* ... */
  });
```
