---
title: "別プロセスで動いているServiceとHermesEventBusで通信"
date: 2018-01-12T22:50:22+09:00
categories: ["Android"]
draft: false
---

EventBusって便利ですよね。
特に便利さを実感できるのがActivityとServiceで通信したいときだとおもいます。
ほんとうだったら、BroadcastReceiverクラスを作成して、Actionを定義して、、、としないといけないのですが、EventBusだったら`register`して`@Subscribe`するだけで済みます。

しかし、EventBusで賄えないこともあります。

`android:process`を使ってServiceが別プロセスで動いているときです。
EventBusは同じプロセス内のクラスにしか届きません。

# HermesEventBus

[elemers/HermesEventBus](https://github.com/elemers/HermesEventBus)

HermesEventBusというライブラリを使えば、プロセス間で通信することができます。

使い方は、以下のような感じ。

```java
HermesEventBus.getDefault().register(this);

HermesEventBus.getDefault().post(new HogeEvent());
```

このように頭にHermesを付けるだけで、EventBusとほぼ同じように使うことができます。

実際に、別プロセスで動いているServiceに通知できるサンプルコードを作ってみました。

## サンプル

通知するイベントは以下のような感じ。

```java
public class GreetEvent {
    private String message;

    public GreetEvent(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
```


## だめな例

まずはふつうにEventBusを使ってみた場合。


最初はServiceです。
EventBusに登録して、`@Subscribe`を使ったメソッドを定義しておきます。

```java
public class MyService extends Service {
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        EventBus.getDefault().register(this);
        return super.onStartCommand(intent, flags, startId);
    }

    @Subscribe
    public void onGreet(GreetEvent event) {
        Toast.makeText(this, event.getMessage(), Toast.LENGTH_LONG).show();
    }
}
```

別プロセスで動かすのでマニフェストは以下のようになっています。

```xml
 <service
     android:name=".MyService"
     android:process=".myservice"
     ... />
```

`android:process`を指定しています。


そして、Activityでpostしてみます。
もちろんpostするのはServiceを起動したあとです。

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        ...
        
        EventBus.getDefault().post(new GreetEvent("Hello"));
    }
}
```

### 結果

とうぜん、このコードではServiceはイベントを受け取ることはできません。
EventBusはプロセス間通信には対応していないからです。

では、このコードをHermesEventBusを使うように変更してみましょう。

## よい例

### 初期設定

はじめに、`build.gradle`に追加しておきましょう。

```groovy
dependencies {
    ...
    
    compile 'xiaofei.library:hermes-eventbus:0.3.0'
}
```

HermesEventBusを使うにはまず、Applicationクラスで初期化する必要があります。

```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        HermesEventBus.getDefault().init(this);
    }
}
```

---

**ここで少々手続きが必要です。**
というのも、HermesEventBusは古いサポートライブラリに依存しているようで、このままだと`ActionBarActivity`が見つからないと言うエラーが発生してしまいます。

対処法は以下の参照先のように、`android.support.v7.app`パッケージの中に、`ActionBarActivity`を自分で作っておきます。

```java
package android.support.v7.app;

public class ActionBarActivity extends AppCompatActivity { }
```

[适配新版本support库 · Issue #42 · elemers/HermesEventBus](https://github.com/elemers/HermesEventBus/issues/42)

### HermesEventBusに対応させる

あとは、Activity、Serviceの中の`EventBus`を`HermesEventBus`に置き換えます。

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        ...
        
        HermesEventBus.getDefault().post(new GreetEvent("Hello"));
    }
}
```

```java
public class MyService extends Service {
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        HermesEventBus.getDefault().register(this);
        return super.onStartCommand(intent, flags, startId);
    }
    
    ...
}
```

こんなふうに単純に書き換えるだけです。

### 結果

![](/2018/01/toast.png)

今度は、Toastが表示されます。
別プロセスでも、Serviceに通知が届いていることが確認できたかと思います。

# まとめ

アプリの制作途中にServiceを別プロセスで動かすことになっても、BroadcastReceiverなどを使うよりかは変更する手間は省けます。

もし、どうしても別プロセスで動かさなければならなくなったときは、便利なライブラリですね。