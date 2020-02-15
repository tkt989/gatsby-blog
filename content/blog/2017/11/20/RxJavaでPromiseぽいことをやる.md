---
title: "RxJavaでPromiseぽいことをやる"
date: 2017-11-20T23:49:15+09:00
draft: false
categories: ["Java"]
---
Javaで非同期処理を行うと、コールバック地獄になって書きづらくなってしまいます。


JavascriptではPromiseを使えば見やすく、エラー処理もしやすくなって便利ですよね。

```javascript
connectAsync()
  .then(() => {
    // いろいろ...
  })
  .then(() => {
    // いろいろ...
  })
  .catch((e) => {
    // エラー処理
  })
```

Javaでこういう感じの非同期処理したい。

そんなときはRxJavaの`Completable`を使おう。

```java
private void process() {
    connectAsync()
            .andThen(task1())
            .andThen(task2())
            .subscribe(() -> {
              // 成功したときの処理
            }, (e) -> {
              // 例外が発生したときの処理
            });
}

private Completable connectAsync() {
    return Completable.create((emitter) -> {
        // てきとうな処理
        // ...
        System.out.println("connect");
        emitter.onComplete();
    }).observeOn(Schedulers.computation());
}

private Completable task1() {
    return Completable.create((emitter) -> {
        // てきとうな処理
        // ...
        System.out.println("task1");
        emitter.onComplete();
    }).observeOn(Schedulers.computation());
}

private Completable task2() {
    return Completable.create((emitter) -> {
        // てきとうな処理
        // ...
        System.out.println("task2");
        emitter.onComplete();
    }).observeOn(Schedulers.computation());
}
```

出力結果は
```sh
connect
task1
task2
```
となり、observeOnで別スレッドで動かしているにも関わらず常に順番に実行されます。

結果を返す処理は`Single`を使う。

```java
private void process() {
    readValue()
            .flatMap((v) -> toDouble(v))
            .flatMap((v) -> increment(v))
            .subscribe((v) -> {
                System.out.println(v);
            });
}

private Single<Integer> readValue() {
    Single single = Single.create((emitter) -> {
        emitter.onSuccess(100);
    });
    return single.observeOn(Schedulers.computation());
}

private Single<Integer> toDouble(Integer value) {
    Single single = Single.create((emitter) -> {
        emitter.onSuccess(value * 2);
    });
    return single.observeOn(Schedulers.computation());
}

private Single<Integer> increment(Integer value) {
    Single single = Single.create((emitter) -> {
        emitter.onSuccess(value + 1);
    });
    return single.observeOn(Schedulers.computation());
}
```

`Single`では`andThen`ではなく`flatMap`になります。

名前が違うのはPromiseとRxJavaでは意識している部分が違うせいではないかと思っています。

それぞれが注目しているのは、Promiseでは **処理** の流れ、いっぽうRxJavaでは **データ** の流れになっているのだと思います。
