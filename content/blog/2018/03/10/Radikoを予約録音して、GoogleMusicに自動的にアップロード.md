---
title: "Radikoを予約録音してGoogleMusicに自動的にアップロード"
date: 2018-03-10T23:55:36+09:00
categories: ["Linux"]
draft: false
---

Radikoを録音するサーバーを作って、楽しく聞いていたのだけど、いちいちサーバーからスマホにデータを移すのがめんどうくさい。

録音したら勝手にスマホからアクセスできるところに移すようにしたいなーと思い、その先としてGoogleMusicを使うことを企てた。

# gmusicapi-scriptsをインストール

python3.4以上が必要です。

```sh
$ pip3 install gmusicapi-scripts
```

初回起動時には認証が行われる。

```sh
$ gmupload

...

Visit the following url:
 https://accounts.google.com/.../
 
Follow the prompts, then paste the auth code here and hit enter:
```

こんな風にURLが表示されるのでアクセスしてログインする。
するとアクセストークンが表示されるので画面に入力。

認証が終了したので、試しに音楽をアップロードしてみました。

```sh
$ gmupload abc.mp3
MusicManagerWrapper authentication succeeded.

Loading local songs...
Excluded 0 local songs
Filtered 0 local songs
Loaded 1 local songs

Uploading 1 song(s) to Google Music


(1/1) Successfully uploaded -- xxx.mp3 (...)

All done!
```

確認するとちゃんとアップロードされてましたー。設定は上手くいったみたいです。

# Radiko録音スクリプトを修正

録音は先人の方たちがスクリプトを共有してくださっています。

[簡易Radiko録音スクリプト](https://gist.github.com/matchy2/3956266/71c4d50435bb74147676d043f1ade5e76cb38c99)

これを自動アップロードに対応させるためにちょっと修正。以下のようになりました。

<script src="https://gist.github.com/tkt989/521eca79b646394a97834e13c6f0718e.js"></script>

`ffmpeg`で変換するときにタグを付けるようにしています。付けとかないとGoogleMusicでは「不明なアルバム」とか表示されて分かりにくくなってしまいます。

# cronに登録

これで下準備はできたので、指定した時間にスクリプトが実行されるようcronに登録します。

`crontab -e`で例えばこんな感じに。

```sh
59 0 * * 3 ~/rec_radiko.sh TBS 120 "爆笑問題カーボーイ"
59 0 * * 0 ~/rec_radiko.sh LFR 120 "オードリーのオールナイトニッポン"
```

録音は1分前に開始するようにしてます。

もちろん番組は皆さんが好きなように変えましょう。
