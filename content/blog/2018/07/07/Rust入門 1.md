---
title: "Rust入門 1"
date: 2018-07-07T12:00:33+09:00
categories: ["Rust"]
draft: false
---

下のサイトを見ながら勉強。
http://rust-lang-ja.github.io/the-rust-programming-language-ja/1.6/book/README.html

Cloud9のマシンで実行しています。

# インストール
    $ curl https://sh.rustup.rs -sSf | sh
    info: downloading installer
    
    Welcome to Rust!
    
    This will download and install the official compiler for the Rust programming 
    language, and its package manager, Cargo.
    
    It will add the cargo, rustc, rustup and other commands to Cargo's bin 
    directory, located at:
    
      /home/ubuntu/.cargo/bin
    
    This path will then be added to your PATH environment variable by modifying the
    profile file located at:
    
      /home/ubuntu/.profile
    
    You can uninstall at any time with rustup self uninstall and these changes will
    be reverted.
    
    Current installation options:
    
       default host triple: x86_64-unknown-linux-gnu
         default toolchain: stable
      modify PATH variable: yes
    
    1) Proceed with installation (default)
    2) Customize installation
    3) Cancel installation
    
    
    info: syncing channel updates for 'stable-x86_64-unknown-linux-gnu'
    info: latest update on 2018-06-21, rust version 1.27.0 (3eda71b00 2018-06-19)
    info: downloading component 'rustc'
    info: downloading component 'rust-std'
    info: downloading component 'cargo'
    info: downloading component 'rust-docs'
    info: installing component 'rustc'
    info: installing component 'rust-std'
    info: installing component 'cargo'
    info: installing component 'rust-docs'
    info: default toolchain set to 'stable'
    
      stable installed - rustc 1.27.0 (3eda71b00 2018-06-19)
    
    
    Rust is installed now. Great!
    
    To get started you need Cargo's bin directory ($HOME/.cargo/bin) in your PATH 
    environment variable. Next time you log in this will be done automatically.
    
    To configure your current shell run source $HOME/.cargo/env
# HelloWorld

`main.rs`を作成

    fn main() {
        println!("Hello,world!");
    }

`rustc`コマンドでコンパイル

    $ rustc main.rs

そしたら実行ファイルの`main`が生成されるので実行

    $ ./main
    Hello,world!
# Cargo

CargoはRustのビルドツールです。
作ったソースをcargoに対応させるには以下のような構成にする必要がある。

    $ tree
    .
    ├── Cargo.toml
    └── src
        └── main.rs

ソースはすべて`src`ディレクトリに入れる必要がある。
`Cargo.toml`は以下のようなないようにする。

    [package]
    
    name = "プロジェクト名"
    version = "バージョン"
    authors = ["ユーザー名 <メールアドレス>"]

`cargo build`を実行すればビルドされて`target/debug`に実行ファイルが生成されます。
`cargo run`でも実行することができます。

    $ cargo run
        Finished dev [unoptimized + debuginfo] target(s) in 0.01s
         Running `target/debug/hello_world`
    Hello,world!

ちなみにこのプロジェクト構成は自分で作らなくても`cargo new`コマンドで作成することができる。

    $ cargo new hello_world --bin

`--bin`はプロジェクトがライブラリではなく実行ファイルであることを示している。


