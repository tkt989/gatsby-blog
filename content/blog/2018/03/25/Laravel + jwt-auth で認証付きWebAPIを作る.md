---
title: "Laravel + Jwt Auth で認証付きWebAPIを作る"
date: 2018-03-27T23:20:29+09:00
categories: ["php"]
draft: false
---

# 環境

* PHP7.2
* Laravel5.5

# 目標

* /api/login ユーザーとパスワードを送るとトークンが発行される。
* /api/me ユーザーの情報を返す。トークンが無いとアクセスできない。

# 認証機能を導入

まずはLaravelに備わっている認証機能を有効にしておきます。

```sh
php artisan make:auth
php artisan migrate
```

これだけでログイン機能ができる。
WebAPIのときに使うのでユーザーを登録しておきましょう。

# composerでjwt-authをインストール

jwt-authをLaravelプロジェクトにインストールします。

```sh
composer require tymon/jwt-auth 1.0.0-rc2
```

Laravel5.5>= には1.0以上のjwt-authが必要なのでバージョンを指定します。

次にjwt-authの初期設定を行います。

```sh
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

`config/jwt.php`が生成されます。


最後に秘密鍵を生成。

```sh
php artisan jwt:secret
```

# Userモデルを修正

Userモデルをjwt-authに対応させるため、編集します。

```diff
 <?php

 namespace App;

+use Tymon\JWTAuth\Contracts\JWTSubject;
 use Illuminate\Notifications\Notifiable;
 use Illuminate\Foundation\Auth\User as Authenticatable;
 
-class User extends Authenticatable
+class User extends Authenticatable implements JWTSubject
 {
    ...
    
+    public function getJWTIdentifier()
+    {
+        return $this->getKey();
+    }
+    public function getJWTCustomClaims()
+    {
+        return [];
+    }
}

```

# guardを修正

guardは認証を管理する仕組みで、デフォルトでは`web`と`api`があります。
`web`は普通にhtmlからのログインを管理しています。
一方`api`は名前の通り、WebAPIのログインです。

`jwt-auth`を使うので`api`を`jwt`に変えます。

`config/auth.php`を編集

```diff
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
-            'driver' => 'api',
+            'driver' => 'jwt',
            'provider' => 'users',
        ],
    ],
```

# ApiControllerを生成

次にAPIのコントローラーを作成します。

```sh
php artisan make:controller ApiController
```

`app/Http/Controllers/ApiController.php`が生成されます。

以下のように変更しましょう。

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    function login() {
        $credentials = request(['email', 'password']);

        if (! $token = auth("api")->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
    
    public function me()
    {
        return response()->json(auth()->user());
    }
    
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth("api")->factory()->getTTL() * 60
        ]);
    }
}
```

ログインとユーザー情報を取得するメソッドを作成しました。

# routes/api.phpを編集

routesファイルを編集。

```php
<?php

use Illuminate\Http\Request;

Route::group(["middleware" => "guest:api"], function () {
    Route::post("/login", "ApiController@login");
});

Route::group(["middleware" => "auth:api"], function () {
    Route::get("/me", "ApiController@me");
});
```

`/login`は`guest`を指定して認証がなくてもアクセスできるように、`/me`はログインしてトークンを送らないとアクセスできないようにしました。

# 試す

`curl`で試してみます。
`email`と`password`は上のユーザーを登録したときのを指定します。

```sh
curl http://<laravel-host>/api/login -d email=hoge@example.com -d password=hoge12345
```

すると以下のようにトークンを含んだjsonが返ってきます。

```sh
{"access_token":"eyJ0eXAiOiJKV2QiLC2hbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sYXJhdmVsLXRha2FzYW45ODkuYzl1c2Vygy5pb1wvYXBpXC9sb2dpbiIsImlhdCI6MTUyMjE1NTY1OSwiZXhwIjoxNTIyMTU5MjU5xCJuYmYiOjE1MxIxNTU2NTksImp0aSI6Inh6MHRsQ1hHNmgwQ1g3V0UiLCJzdWIiOjEsInBydiI6Ijg3bTBhZjFlZjlmZDE1ODEyZmorYzk3MTUzYTE0ZTBJfDQ3NTQ2YWEifQ.BdoHaKFy8XLOSaTKBOhA1D3i5NPUGzG9E1lsBQefEhs","token_type":"bearer","expires_in":3600}
```

そしてトークンを使って認証が必要なurlにアクセスしてみます。
`Authorization`ヘッダーに`Bearer: <token>`を付けて送信します。

```sh
curl -H "Authorization: Bearer eyJ0eXAi...." http://<laravel-host>/api/me
```

実行すると

```sh
{"id":1,"name":"hoge","email":"hoge@example.com","created_at":"2018-03-26 14:33:21","updated_at":"2018-03-26 14:33:21"}
```

ログインしているユーザーの情報が返ってきました。

これを応用すればユーザー認証ができるWebAPIが作れます。
