---
title: "RoomのTypeConverterを使う"
date: 2018-05-04T14:22:04+09:00
categories: ["Android"]
draft: false
---

こんな感じのEntityを作成したとする。

```kotlin
@Entity
class Post(@PrimaryKey var id: Long,
           var title: String,
           var content: String,
           var date: org.joda.time.DateTime)
```

このままだとJoda-Timeの`DateTime`クラスがRoomに対応していないのでエラーが発生します。
Roomが対応しているのは、StringやIntなどの型のみなので保存することができないのです。

```
Cannot figure out how to save this field into database. You can consider adding a type converter for it.
```

こういうときは、`TypeConverter`を使いましょう。

対応していない型をStringやIntなどの型に変換して保存し、読み出すときは逆にString、Intから元の型に変換することで、Roomで扱えるようにします。

以下のように変換用のメソッドを書いておいて、

```kotlin
class DateTimeConverter {
    @TypeConverter
    fun fromTimestamp(value: Long?): DateTime? {
        return if (value == null) null else DateTime(value)
    }

    @TypeConverter
    fun toTimestamp(date: DateTime?): Long? {
        return date?.toInstant()?.millis
    }
}
```

`Database`の宣言に`TypeConverter`を指定するアノテーションを追加する。

```kotlin
@Database(version = 1, entities = ...)
@TypeConverters(DateTimeConverter::class)
abstract class AppDatabase : RoomDatabase() {
	...
}
```

これで、自作クラスなどもRoomで扱えるようになる。







