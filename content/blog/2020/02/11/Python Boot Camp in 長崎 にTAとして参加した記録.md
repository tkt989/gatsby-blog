---
title: "Python Boot Camp in 長崎 に TA として参加した記録"
date: 2020-02-11T16:54:20+09:00
thumbnail: "2020/python_boot_camp.jpg"
categories: ["Python"]
---

2月8日に開催された [Python Boot Camp in 長崎](https://pyconjp.connpass.com/event/158803/) に参加してきました。
Python Boot Camp はPythonを広めるために、PyConJPというコミュニティが日本各地で開催している入門者向けの勉強会です。

開催される一月前くらいにconnpassで知り、最初は一般参加者として参加してみようかなっと思っていました。しかしTA枠もあって、TAというのはティーチングアシスタントで講義中に困っている人を助ける係の人ですね。
講義では、コードを書いて実行したりもするのですがしエラーが出たり環境設定がうまくいってなかったりで詰まってしまう人もいるので、そういう人に声をかけてサポートするのです。

Pythonは趣味でツールとかWebサービスとか作ったりしたことがあるし、講義で使うテキストを読んでみたら自分でも教えられそうな内容だったので、思い切ってTAとして参加してみました。

応募するとSlackに招待されてもらい、当日は開始時間前にランチミーティングを行いました。
自己紹介やTA経験者の方から、参加者の方がどういうところで詰まりやすいかなどを教えてもらえた。
いやーやっぱり初めてだったので、経験者がいたのは心強かったです。

会場はできたばっかりの[ミライon図書館](https://miraionlibrary.jp/)。初めて行ったけど、広くてオシャレだった。また行ってみたい。でも利用券作るの忘れちゃった。また来たときに作ろうと思う。

<img src="https://paper-attachments.dropbox.com/s_1B91B0CFFFBAD933A6664A04B7143EA46F12E2D923A8684FBDFB51B432A69547_1581401835475_MVIMG_20200208_122159+1.jpg" style="width: 300px;"/>


会場の準備が終わると、参加者の方も集まってきた。人数は20人くらいほぼ満員です。私がconnpassで参加申請したときは、まだ数人くらいだった。
こんなに集まるとは思わなくて少し意外。
長崎でもPythonをやってみたい人が多いんですね。

イベントルームも広くて過ごしやすく、途中でおやつ休憩に入ったときは、隣同士になった人と自己紹介して雑談しあったりいい雰囲気でした
また、イベントスタッフに [Pyladies](https://pyladiestokyo.github.io/) のスタッフの方もいて活動内容を紹介していました。
勉強会には女性の方も参加していました。

基本的には、テキストを読みながら講師の方が進めていきます。講師が話している最中は邪魔なので後ろにいて、コードを書くステップに入ったら教室をウロウロしながら困っている人に声をかけたりしながら過ごします。

参加者の方は、最初の環境構築などで詰まってしまうことが多いみたいで、最初の1時間が大変とのこと。TA経験者の方がいたので心強かったです。

[テキスト](http://pycamp.pycon.jp/textbook/index.html)の内容は、環境構築からFizzBuzzを解いたり、リストや辞書などのデータ型の解説、最後にはスクレイピングを行うのですが、`venv`を使って仮想環境を作りパッケージをインストールします。
そう、`venv`まで使うのです。事前にテキストを読んだときは、初心者には仮想環境と説明しても理解してもらえるのかなぁと感じたり、プログラミング経験者でも`ruby`や`nodejs`をやったことないと、`venv`を使う意味がわからないんじゃないと思ったりしましたが。
でも講師の方が覚えておくと絶対便利だと言っていたので、ただ単にPythonの入門ではなく、実践的な内容になっているなぁと感じた。

TAで参加した感想としては、こういうサポート役で勉強会に入ったのは初めてだったので、いい経験になったなと思う。
画面をみながら回っていると、「あっ、ここ間違えてるな」って思うわけですが、自分が書いたコードが間違っている認識を持つ前に、こっちから「ここ間違ってますよ！」って言うのもどうなのかな、鬱陶しがられそうかなと考えたりしてた。
基本的には、エラーを解決できなさそうだったな声をかけにいくって感じでやりました。

質問にもいくつか答えて、


- `venv` で仮想環境にちゃんと入っているかよくわからない
    - ターミナルのプロンプトに`(env)`みたいな仮想環境の名前が入ってるならOKだよみたい答えた
- （詳しい人から）`venv`でPythonのバージョンを切り替えたい場合はどうすればいいの
    - [rbenv](https://github.com/rbenv/rbenv) や [nvm](https://github.com/nvm-sh/nvm) みたいにインタプリタのバージョンも仮想化したい場合  
        `venv` ではインストールされてるPythonバージョンしか使えないはずなので別バージョンのPythonをインストールして、仮想環境を作らないとダメ  
        これはあんまり自分も自信がなかったので、ちゃんと答えられたか不安  
        [pyenv](https://qiita.com/KRiver1/items/c1788e616b77a9bad4dd) というのを使えばできるみたいです


TAはPython経験者なら誰でもウェルカムで、PyConJPの関係者や現地スタッフじゃなくても自由に参加できます。むしろPythonコミュニティを盛り上げるためにも、現地の人に積極的に参加してほしいみたいです。

勉強会が終わったあとに、懇親会にも参加しました。
話すのが本気で苦手なので、周りの人の話を聞きながら過ごしてました。

<figure>
<img src="https://paper-attachments.dropbox.com/s_1B91B0CFFFBAD933A6664A04B7143EA46F12E2D923A8684FBDFB51B432A69547_1581405558471_MVIMG_20200211_161110.jpg"/>
<figcaption>Python Boot Camp と Connpass のステッカーをもらった</figcaption>
</figure>


参加して改めて、Pythonのコミュニティってすごいなって思った。そもそも全国的なコミュニティが長崎まで来て勉強会を開催するっていうのが、コミュニティの強さを表してますね。

改めて、TAとして参加できたのはいい経験になったなぁと思う！
おつかれさまでした！