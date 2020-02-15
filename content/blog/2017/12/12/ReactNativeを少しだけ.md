---
title: "ReactNativeを少しだけ"
date: 2017-12-12T22:51:06+09:00
categories: ["Android"]
draft: false
---

# インストール

```bash
npm install -g create-react-native-app
```

# プロジェクトを作成

```bash
create-react-native-app reactnative-tutorial
```

`reactnative-tutorial`に以下のファイルが生成されます。

```bash
.
├── App.js
├── App.test.js
├── README.md
├── app.json
└── package.json
```

# 動かす

ReactNativeはIOSやAndroid向けにネイティブコードへビルドできますが、Expoというアプリを使えばXcodeやAndroidSDKをインストールせずお手軽にアプリの動作を確認することができます。

アプリストアからExpoをインストールしておきます。

その後`npm start`を実行。
QRコードが出てくるので、Expoから読み込む。
JSファイルのビルドが終了したらアプリの画面がでてきます。

# いじる

App.jsは以下になっています。

```jsx
import React from 'react'; 
import { StyleSheet, Text, View } from 'react-native'; 
 
export default class App extends React.Component { 
  render() { 
    return ( 
      <View style={styles.container}> 
        <Text>Open up App.js to start working on your app!</Text> 
        <Text>Changes you make will automatically reload.</Text> 
        <Text>Shake your phone to open the developer menu.</Text> 
      </View> 
    ); 
  } 
} 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'center', 
  }, 
});
```

Reactとほぼおんなじです。違いは`div`や`span`の代わりに`View`や`Text`というReatNativeのコンポーネントを使っていることです。

CSSもそのまま動くので、backgroundColorなどを変えればアプリに反映されます。

テキストボックスの`TextInput`を使って少しいじってみました。

```jsx
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={(text) => this.setState({text})} />
        <Text>{ this.state.text }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '60%',
  }
});
```

入力した内容を表示するだけの簡単なもの。
