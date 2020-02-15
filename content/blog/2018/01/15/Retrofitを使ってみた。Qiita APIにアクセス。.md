---
title: "Retrofitを使ってみる(Qiita APIs)"
date: 2018-01-15T23:34:36+09:00
categories: ["Kotlin"]
draft: false
---

# 準備

以下のリンクからQiitaのアクセストークンを取得しておく。

[アプリケーション - Qiita](https://qiita.com/settings/applications)

# コード

`build.gradle`にretrofit本体と、Stringに変換するconverterを追加。

```groovy
     compile 'com.squareup.retrofit2:retrofit:2.3.0'
    compile 'com.squareup.retrofit2:converter-scalars:2.3.0'
```

APIにアクセスするインターフェイスを作成。

`user/:user_id`を使って、ユーザー情報を取得するようにパスを設定。

[Qiita API v2ドキュメント - Qiita:Developer](https://qiita.com/api/v2/docs#get-apiv2usersuser_id)

```kotlin
interface QiitaService {
    @GET("users/{userId}")
    fun user(@Path("userId") userId: String): Call<String>
}
```


アクセストークンを`Authorization`に書かないといけないので、`OkHttpClient`を生成して、
ヘッダーを追加。

```kotlin
val okHttpClient = OkHttpClient.Builder()
        .addInterceptor { chain ->
            val original = chain.request()

            val request = original.newBuilder()
                    .addHeader("Authorization", "Bearer {ACCESS_TOKNE}")
                    .build()

            return@addInterceptor chain.proceed(request)
       }.build()

val retrofit = Retrofit.Builder()
        .addConverterFactory(ScalarsConverterFactory.create())
        .client(okHttpClient)
        .build()
```

QiitaServiceを取得して、APIにリクエストを送る。


```kotlin
val qiitaService = retrofit.create(QiitaService::class.java)

qiitaService.user("tkt989").enqueue(object: Callback<String> {
    override fun onResponse(call: Call<String>?, response: Response<String>?) {
        if (response?.isSuccessful ?: false) {
            Log.d(javaClass.name, response?.body())
        }
    }

    override fun onFailure(call: Call<String>?, t: Throwable?) {
    }
})

```