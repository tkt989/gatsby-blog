---
title: "iTermでguakeぽく使う"
date: 2018-01-02T21:38:07+09:00
categories: ["Mac"]
draft: false
---

Mac用ターミナルアプリiTermでLinuxのguakeのような、画面の上部分からニュッと出て来る動作を設定してみました。

# プロファイル作成

guake用のプロファイルを作成します。

iTermの Preferences -> Profiles の`+`ボタンを押して新しいプロファイルを作成。
名前は適当に`guake`などにしておきます。

次はguakeの動作に近づける設定をしていきます。

プロファイル設定のWindowsタブを選択し以下のように設定。

* Styles: Top of Screen
* Screen: MainScreen
* Space: All Spaces

また、背景を透明にしたりぼかしたい場合は、TransparencyやBlurを適宜設定します。

![](/2018/01/iterm_guake_profile.png)

# ショートカットキーの設定

次はターミナルを出すためのショートカットを設定します。

Kyesタブの`A hotkey opens a dedicated window with this profile.`にチェックを入れると、ダイアログが出てきます。

`HotKey`に使用したいショートカットキーを設定し、`Floating window`のチェックを外します。

私はF12に割り当てました。

![](/2018/01/iterm_guake_keys.png)

これで作業は終了です。

F12を押せば画面の上からターミナルが出て来るようになりました。

![](/2018/01/iterm_guake_desktop.png)
こんな感じ。

# guake風のときはtmuxを使わないようにする

tmuxを自動起動するように設定していると、このguake風ターミナルを開いたときにも既に起動しているセッションにアタッチするようになります。

個人的にはこのターミナルは他のものとは独立して動かしたいなと思ってます。

iTermでシェルを開いたときには`env`の`ITERM_PROFILE`にiTermのプロファイル名が入るので、これを使って以下のようにtmuxが起動しないようにしました。

`.zshrc`や`.bashrc`でtmuxが起動するようにしている場合は、以下のように`$TMUX`を調べてtmux内にいるかどうかを調べるようになっているはずです。

```bash
if [ -z $TMUX ]; then
  ...
fi
```

この条件にプロファイルが`guake`かどうか入れて、`guake`の場合は起動しないようにします。

```bash
if [ -z $TMUX ] && [[ $ITERM_PROFILE != "guake" ]]; then
  ...
fi
```

これで開いてもtmuxが起動しないようになりました。

いつでもどこでもターミナルにアクセスできるようになったので快適。