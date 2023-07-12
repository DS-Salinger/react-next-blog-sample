---
title: '自作ブログでの Markdown 記法テスト'
date: '2023-07-04 05:35:07'
author:
  name: さりんじゃー
  picture: '/assets/author.png'
coverImage:
  url: '@@image@@/markdown-icon.png'
  width: 150
  height: 150
ogImage:
  url: '@@image@@/markdown-icon.png'
tags:
  - 'Other'
---

# はじめに

## 本記事について

　自作ブログの Markdown 動作確認のための記事です。本ブログの環境構築と作成の流れに関しては [hoge](hoge) に記載しています。コードに関しては[https://github.com/DS-Salinger/salinger-tech-blog](https://github.com/DS-Salinger/salinger-tech-blog) に掲載しているので必要に応じて参照してください。Markdown から HTML への変換には Remark と Rehype を利用しています。変換処理部分は主に [markdownToHtml.ts](markdownToHtml.ts) に記載してます。CSS は [markdown-style.module.css](markdown-style.module.css)、[index.css](index.css)、[tailwind.config.js](tailwind.config.css)に記載しています。

## Markdown 変換のために用意した機能

- 見出し
- リスト
- テキストリンク
- 画像
- テーブル
- コードブロック
- 数式
- 引用
- 区切り線
- インラインスタイル
- GFM (GitHub Flavored Markdown)
- 絵文字


# 見出し

```
# 見出し1
## 見出し2
### 見出し3
#### 見出し4
```

# リスト

## 順序なし

```
- Hello!
- Hola!
  - Bonjour!
  * Hi!
```

- Hello!
- こんにちわ!
  - こんばんわ
  * おはよう

`*`もしくは`-` でリストにできる。スペースで字下げ可能。

## 順序あり

```
1. First
2. Second
   1. Second - First
      * hogehoge
```

1. First
2. Second
   1. Second - First
      * hogehoge
	  
数字ありなし自由に混ぜられる。

# テキストリンク

```
[アンカーテキスト](リンクのURL)
```

[アンカーテキスト](https://zenn.dev)

# 画像

## 記事への埋め込み

```
![altテキスト](https://画像のURL)
```

![altテキスト](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43)

このような形で埋め込まれる。

![同ディレクトリの画像](@@image@@/markdown-icon.png)

同ディレクトリの画像は 
`[アットマーク2つ]image[アットマーク2つ]/hogehoge.png` で記事中に埋め込める。
`@@image@@/hogehoge.png` に画像がビルド時に自動コピーされURLが適切な形に置換される。

## 画像のリンク化

以下のようにすることで画像に対してリンクを貼ることもできます。

```
[![altテキスト](画像のURL)](リンクのURL)
```

[![altテキスト](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43)](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43)

# テーブル

```
| Head | Head | Head     |
| ---- | ---- | -------- |
| Text | Text | TextText |
| Text | Text | TextText |
```

| Head | Head | Head |
| ---- | ---- | ---- |
| Text | Text | Text |
| Text | Text | Text |


# コードブロック

コードは「```」で挟むことでブロックとして挿入できます。以下のように言語を指定するとコードへ装飾（シンタックスハイライト）が適用されます。

> \```javascript
>
> \```

```javascript
const great = () => {
  console.log("Awesome");
};
```

シンタックスハイライトには highlight.js + rehype-highlight を使用しています。

[📄 対応言語の一覧 →](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md)

## ファイル名を表示する

`言語:ファイル名`と`:`区切りで記載することで、ファイル名がコードブロックの上部に表示されるようになります。

> \```js:ファイル名
>
> \```

```js:fooBar.js
const great = () => {
  console.log("Awesome")
}
```


# 数式

Zenn では**KaTeX**による数式表示に対応しています。
KaTeXのバージョンは常に最新バージョンを使用します。

[📄 KaTeXがサポートする記法の一覧 →](https://katex.org/docs/support_table.html)

## 数式のブロックを挿入する

`$$`で記述を挟むことで、数式のブロックが挿入されます。

```
$$
e^{i\theta} = \cos\theta + i\sin\theta
$$
```

は以下のように表示される。

$$
e^{i\theta} = \cos\theta + i\sin\theta
$$

`$$`の前後は空の行でないと正しく埋め込まれないことがある。


## インラインで数式を挿入する

`$a\\ne0$`というように`$`ひとつで挟むことで、$a\ne0$のようにインライン表示できる。

# 引用

```
> 引用文
> 引用文
```

> 引用文
> 引用文



# 区切り線

```
---
```

---

# インラインスタイル

```
*イタリック*
**太字**
~~打ち消し線~~
インラインで`code`を挿入する
```

_イタリック_  
**太字**  
~~打ち消し線~~  
インラインで`code`を挿入する  

## インラインのコメント

自分用のメモをしたいときは HTML のコメント記法を使用できます。

```html
<!-- TODO: ◯◯について追記する -->
```

<!-- TODO: ◯◯について追記する -->

この形式で書いたコメントは公開されたページ上では表示されない。

# remarkGfm による GitHub Flavored Markdown 対応

## 自動URLリンク化

www.example.com, https://example.com, and contact@example.com.

## 脚注

A note[^1]

[^1]: Big note.

## 取り消し線

~one~ or ~~two~~ tildes.

## Tasklist

* [ ] to do
* [x] done

# remark-emoji による絵文字対応

[絵文字一覧](https://gist.github.com/spiegel-im-spiegel/66aac732f27ad69cc8b6bd33478ecfa4)

```
:dog:
:+1:
:arrow_right:
```

:dog:  
:+1:  
:ab:  
