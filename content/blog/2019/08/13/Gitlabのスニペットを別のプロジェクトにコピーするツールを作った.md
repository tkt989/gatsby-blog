---
title: "Gitlabのスニペットを別のプロジェクトにコピーするツールを作った"
date: 2019-08-13T00:05:50+09:00
thumbnail: "/2019/08/gitlab-snippet-cloner.png"
draft: false
---

[gitlab-snippet-cloner - npm](https://www.npmjs.com/package/gitlab-snippet-cloner)

Gitlabのスニペットってチームで情報を共有するのに、すごく便利です。
ある日、Gitlabのプロジェクトに溜まったスニペットを、別のプロジェクトに移したくなりました。

プロジェクトのエクスポートを使って、スニペットはコピーできるみたいです。
が、これってたとえばクラウド版のGitlabからオンプレミスに移すときに使うものなのかなって思って、なんか違うなーと感じました。
なのでツールを作ってみました。

インストールはnpmからどうぞ。


```bash
$ npm install -g gitlab-snippet-cloner
```

`gitlab-snippet-cloner`を実行して、
GitlabのURL、アクセストークン、コピー元プロジェクト名、コピー先プロジェクト名を
入力する。
するとまるっとスニペットがコピーされます。

コピー先スニペットのAuthorがアクセストークンを生成したユーザーになってしまうので、そこは注意してください。
APIを操作して作っているので、仕方ない。。。