---
title: "Kotlin Coroutineをすこしかじってみた"
date: 2018-10-21T20:37:09+09:00
categories: ["Kotlin"]
thumbnail: "/2018/10/kotlin-coroutine.png"
draft: false
---

## 簡単な使い方
    fun task() {
      GlobalScope.launch {
        print("World")
      }
      print("Hello")
    }
    
    task() // => "HelloWorld"

`GlobalScope.launch`のブロックがコルーチンとして実行されます。
コルーチンの中で使える関数はdelayなどがあります。

## suspend function

コルーチンの中でのみ実行できるメソッドをsuspend functionといいます。

    fun task() {
      GlobalScope.launch {
        delay(1000L)
      }
      delay(1000L) // コルーチン外なのでコンパイルエラー
    }

`delay`のような標準ライブラリのsuspend functionもありますが、`suspend`を付けることで定義することもできます。

    suspend fun doReturnStatus(): Int {
      delay(1000L)
      return 200
    }

suspend functionはコルーチンの中でしか呼べない、言い換えればsuspend functionの処理は常にコルーチン上で行われるのでsuspend functionの中で別のsuspend function(ここでは`delay`)を呼ぶことができます。

## async

`GlobalScope.launch`と似ているが`async`は`Deferred`を返す。
`Deferred.await()`で結果を待つ。

    GlobalScope.launch {
        val task3 = async {
            delay(1000L)
            return@async "3"
        }
        val task2 = async {
            delay(2000L)
            return@async "2"
        }
    
        println("${task2.await()}")
        println("${task3.await()}")
    }
    println("1")
    
    // Output:
    // 1
    // 2
    // 3

最初は`launch`によってコルーチンが始まります。
しかし、メインスレッドは止まらないので直後の`println(``"``1``"``)`が実行されます。
その後、コルーチンのブロックが実行されます。
`delay`秒数により、task3のほうが早く終わりますが、task2の`await()`を呼んでいるので、task2の終了を待ちます。
その結果、出力は1,2,3になります。

