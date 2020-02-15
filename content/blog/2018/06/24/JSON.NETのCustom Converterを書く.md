---
title: "JSON.NETのCustom Converterを書く"
date: 2018-06-24T16:27:16+09:00
categories: ["C-Sharp"]
---

JSON.NETはConverterを書かなくてもプロパティを読んでくれてjsonに変換してくれるのですが、変換された形式が望んでいるものとは違うこともあります。

```json
{
  "title": "HelloWorld!",
  "tags": [ "Diary", "Programming", "C#" ],
  "content": "...",
  "comments": [
    {
      "author": "Alice",
      "content": "hogehoge!"
    },
    {
      "author": "Bob",
      "content": "piyopiyo!"
    }
  ]
}
```

このjsonを以下のようなクラスに変換する。

```csharp
    public class Post
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public IList<Tag> Tags { get; set; } = new List<Tag>();
        public IList<Comment> Comments { get; set; } = new List<Comment>();
    }

    public class Tag
    {
        public string Name { get; set; }
    }

    public class Comment
    {
        public string Author { get; set; }
        public string Content { get; set; }
    }
```

JsonConverterを継承したクラスを作ることで特定のクラスのCustom Converterを作ることができます。
継承したクラスでオーバーライドするメソッドは以下。

```csharp
class JsonConverter
{
    public bool CanConvert(Type objectType);
    public object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer);
    public void WriteJson(JsonWriter writer, object value, JsonSerializer serializer);
}
```

そしてこんなふうに実際のConverterは以下のようになる。

```csharp
    /// <summary>
    /// Postをjsonに変換
    /// </summary>
    public class PostConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType) => objectType == typeof(Post);

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var post = new Post();

            while (reader.Read())
            {
                if (reader.TokenType == JsonToken.EndObject) break;
                if (reader.TokenType == JsonToken.PropertyName)
                {
                    var prop = reader.Value?.ToString();
                    reader.Read();

                    switch (prop)
                    {
                        case "tags":
                            post.Tags = new JsonSerializer().Deserialize<IList<Tag>>(reader);
                            break;
                        case "comments":
                            post.Comments = new JsonSerializer().Deserialize<IList<Comment>>(reader);
                            break;
                        case "title":
                            post.Title = reader.Value.ToString();
                            break;
                        case "content":
                            post.Content = reader.Value.ToString();
                            break;
                    }
                }
            }

            return post;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var post = value as Post;
            if (post == null) return;

            writer.WriteStartObject();

            writer.WritePropertyName("title");
            writer.WriteValue(post.Title);
            writer.WritePropertyName("content");
            writer.WriteValue(post.Content);
            writer.WritePropertyName("tags");
            JToken.FromObject(post.Tags).WriteTo(writer);
            writer.WritePropertyName("comments");
            JToken.FromObject(post.Comments).WriteTo(writer);

            writer.WriteEndObject();
        }
    }

    /// <summary>
    /// Tagをjsonに変換
    /// </summary>
    public class TagConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType) => objectType == typeof(Tag);

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var tag = new Tag();

            tag.Name = reader.Value.ToString();

            return tag;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var tag = value as Tag;
            if (tag == null) return;

            writer.WriteValue(tag.Name);
        }
    }

    /// <summary>
    /// Commentをjsonに変換
    /// </summary>
    public class CommentConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType) => objectType == typeof(Comment);

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var props = new string[] { "author", "content" };
            var comment = new Comment();

            while (reader.Read())
            {
                if (reader.TokenType == JsonToken.EndObject) break;
                if (reader.TokenType == JsonToken.PropertyName)
                {
                    var prop = reader.Value.ToString();
                    reader.Read();

                    switch (prop)
                    {
                        case "author":
                            comment.Author = reader.Value.ToString();
                            break;
                        case "content":
                            comment.Content = reader.Value.ToString();
                            break;
                    }
                }
            }

            return comment;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var comment = value as Comment;
            if (comment == null) return;

            writer.WriteStartObject();

            writer.WritePropertyName("author");
            writer.WriteValue(comment.Author);
            writer.WritePropertyName("content");
            writer.WriteValue(comment.Content);

            writer.WriteEndObject();
        }
    }
```

ちょっと長いけど、それぞれでやってることは
`CanConvert`で変換できるクラスを指定する。
`ReadJson`では`reader`から一つずつトークンを読み込み、インスタンスに値を次々設定していく。
`WriteJson`は引数で変換するインスタンスが渡されるので、`writer`に書き込む。

各クラスに`JsonConverter`属性を指定します。

```csharp
    [JsonConverter(typeof(PostConverter))]
    public class Post
    {
        ...
    }
    [JsonConverter(typeof(TagConverter))]
    public class Tag
    {
        ...
    }

    [JsonConverter(typeof(CommentConverter))]
    public class Comment
    {
        ...
    }
```

これだけ書いたら`DeserializeObject`で変換できる。

```csharp
var post = JsonConvert.DeserializeObject<Post>(jsonText);
```
