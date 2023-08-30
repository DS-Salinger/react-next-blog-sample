---
title: '書評： BERT による自然言語処理入門'
date: '2023-08-27 21:00:00'
author:
  name: さりんじゃー
  picture: '/assets/author.png'
coverImage:
  url: '@@image@@/bert-nlp.jpg'
  width: 140
  height: 180
ogImage:
  url: '@@image@@/bert-nlp.jpg'
tags:
  - 'NLP'
  - 'Data Science'
  - 'Book'
  - 'PyTorch'
  - 'Deep Learning'
---

# はじめに

## 本書を選んだ背景

　近年LLM（Large Language Model）関連の技術が流行り始めていますが、あるシステムに自然言語を入力する、もしくは出力するような処理を扱う場合、古典的な Bag-of-Words を利用する技術から最近の Deep Learning 系のアルゴリズムまで技術は凄まじいスピードで発展しているものの、基本的な部分はどうにかしてテキストデータを数値のベクトルに変換した後、後続の処理に利用するという流れはここ10年以上まったく変わっていない根幹の技術です。LLM を利用する場合でもデータの前処理、もしくはLLM の出力を利用して別の処理を行う場合でも切り離すことができない技術です。扱うデータ量や語彙の範囲が小さいシンプルな処理であれば未だに語彙の出現回数をそのまま利用する Bag-of-Word 系の変換でも十分なパフォーマンスを得ることができますが、十分なデータ量が担保できる場合には文脈によって変わる概念を取り扱うことができる Deep Learning 系のアルゴリズムを利用することで以前ではできなかったリッチな処理が実現できるようになります。

　そのような状況では Deep Learning 系のモデルの中でも、商用利用可能な事前学習済みのモデルが公開されており、各所で利用されている BERT 系のモデルが実務の現場でもよく利用されますが、エンジニアがアプリケーションで BERT 系のモデルを利用するために学習を行うとすると、なかなか重たい資料が多いため、エンジニアの人にイメージをつかんでもらうために何か良い本がないかと探している中本書を見つけました。

　本書は主にエンジニアが BERT 関連のモデルを利用して、自然言語処理（日本語）でよく行う各種タスクを解くためのプログラム実装、利用できるようにするという観点でシンプルにまとまっていたので紹介します。

## 本書の内容

　タスクベースで内容を書き出すと以下のような感じでした。

- 自然言語処理の概要 
- 機械学習の概要
- ニューラルネットワークを用いた自然言語処理
    - トークン化
	- 単語・文字・サブワード分割
	- ニューラル言語モデル
	    - Word2Vec
		    - CBOW
		    - Skip-Gram
		- ELMo
		    - RNN
			- LSTM
- BERT の概要
    - モデルの構造
        - Scale Dot-Product Attention
    	- Multi-Head Attention
	    - Residual Connection
	    - Layer Normalization
	    - Feedforward Network
	- 入力形式
	    - トークン化 
		- ベクトル化
	- 学習
	    - 事前学習
		- ファインチューニング
- Huggingface Transformers の利用方法
- タスクとその実装例
    - 文書穴埋め
    - 文書分類
	- マルチラベル文書分類
	- 固有表現抽出
	- 文書校正
	- 文書ベクトルを用いたデータの可視化と類似文書検索

　主要なツールのバージョンは `transformers==4.18.0`、`fugashi==1.1.0`、`ipadic==1.0.0` の指定になっていましたが、筆者の環境（詳細は[「'データ分析・AI用計算GPUサーバ構築 (Proxmox 利用)'」](/posts/20230723-ubuntu-server-2204-docker-gpu)）だと `transformers==4.18.0` がうまく入らなかったので最新バージョンの Transformer を入れた上で一部コードの微修正を行いつつ実行しました。

# レビュー

## 良かったところ

　4章以降の各種タスクとその実行例に関して、PyTorch Lightning を利用しながら、必要最低限の記述で問題を解くための実装とモデルのファインチューニングを行う過程がシンプルにまとまっていました。業務で利用する場合、ほとんど本書に記載があるタスクの類似タスクに変換できると思うので、独自データを用意し、データの入力部分を多少書き換えるだけで自分が解きたいタスクを解くためのモデルを作れるイメージが持てる構成になっていると思います。

　実務だと特に依頼が多いのは文書分類（シングル・マルチラベル）によるタグ付与、固有表現抽出、類似文書検索といったタスク（＋必要に応じて可視化）なので本書の内容で十分カバーできるかと思います。ただしシステム化に関する諸々や効率の良い処理の書き方などは本書のスコープ外なのでそちらは別の書籍やWebサイトで補完したほうがよいでしょう。

## 微妙だったところ

　筆者は Kindle 版を購入しましたが、「※このKindle本はプリント・レプリカ形式で、Kindle Paperwhiteなどの電子書籍 リーダーおよびKindle Cloud Readerではご利用いただけません。Fireなどの大 きいディスプレイを備えたタブレット端末や、Kindle無料アプリ (Kindle for iOS、Kindle for Android、Kindle for PC、Kindle for Mac) でのみご利用可能 です。」という表記が Amazon のページにあるにも関わらず、なぜか Kindle for PC から利用できなかった（Kindleアプリ側のバグ?）ため、1画面内で書籍と Jupyter 環境を同時に開いてみることができず、iPad で開きながら実行しつつ進めました。正直このような形だと自宅のメイン作業デスク以外ではコードを実行しながら読み進めることが困難なので事前にわかっていれば紙媒体で購入したほうが楽でした。

　中身に関しては本書だけでこれまでの自然言語処理の概要を押さえるには厳しく、あくまで自然言語処理の概要は別の書籍などで学び基礎を作った上で、本書を読むほうがよい難易度でした。逆に言うと、古典的な自然言語処理の概要がわかっている人が BERT 関連の技術を吸収するには短期間で必要な知識を詰め込める難易度なのでそういう前提で利用するのがよいと思います。

　また人によって合う合わないはあると思いますが、実装メインのエンジニアの人だと前半（～3章まで）のアルゴリズムの解説部分は別の書籍のほうがイメージし易いかもしれません。個人的には別記事で書評を書いていますが[「書評： 作りながら学ぶ! PyTorch による発展ディープラーニング」](/posts/20230807-book-review-pytorch-advanced)の全体をサクッと読んで自然言語処理関連のところを集中して読んでから本書を読んだ方がイメージ図が多い分理解がスムーズにできるかなと思いました。

## その他

　最新バージョンで動かす場合、下記のように `pl.Trainer()` の引数で `gpus=1` となっていたところを下記のように変更することで、他はほぼすべてのコードが動作しました。

```python
trainer = pl.Trainer(
    devices=1, # gpus=1 だったが指定方法が変わった模様
    accelerator='gpu', # gpus=1 だったが指定方法が変わった模様
    max_epochs=10,
    callbacks=[checkpoint]
)
```

　また元のコードのままだと `DataLoader()` 呼び出し時に警告がでるので、`num_worker=4` のように worker 数を引数で指定したほうが良いでしょう。

```python
dataloader_train = DataLoader(
    dataset_train,
    batch_size=32,
    shuffle=True,
    num_workers=4 # 追記しておく
)
```

　7章のマルチラベル文書分類は本書では1からモデルの実装を行っているためここだけモデルの実装部分がほかのタスクに比べて非常に重たい内容になっていました。しかし本書公式 GitHub の Issue に書き込みがあるように、筆者がこの記事を書いている2023年8月現在では `BertForSequenceClassification` の引数に `problem_type="multi_label_classification"` を指定するとマルチラベル文書分類ができるようになっているので、自分で1から実装しなくてもよくなっています。

参考： [第7章のマルチラベル分類のBERTモデルについて #56](https://github.com/stockmarkteam/bert-book/issues/56)  
参考： [Fine-tuning BERT (and friends) for multi-label text classification](https://github.com/NielsRogge/Transformers-Tutorials/blob/master/BERT/Fine_tuning_BERT_(and_friends)_for_multi_label_text_classification.ipynb)

# おわりに

　本書のみだと不足している部分はあるものの、基礎知識を補う他の本と組み合わせることで、エンジニアの方にとっては BERT 関連の技術を利用したアプリケーション実装のために必要な知識を高速に学べるよい本だと思います。

<center>
  <iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=salinger00110-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=427422726X&linkId=df4721e723732f2842b41f0645528d60"></iframe>
</center>

# 参考資料

1. [BERTによる自然言語処理入門: Transformersを使った実践プログラミング](https://amzn.to/3Edzblv)
2. [GitHub: BERTによる自然言語処理入門: Transformersを使った実践プログラミング](https://github.com/stockmarkteam/bert-book)
3. [GitHub: huggingface/transformers](https://github.com/huggingface/transformers)
4. [第7章のマルチラベル分類のBERTモデルについて #56](https://github.com/stockmarkteam/bert-book/issues/56)
5. [Fine-tuning BERT (and friends) for multi-label text classification](https://github.com/NielsRogge/Transformers-Tutorials/blob/master/BERT/Fine_tuning_BERT_(and_friends)_for_multi_label_text_classification.ipynb)
