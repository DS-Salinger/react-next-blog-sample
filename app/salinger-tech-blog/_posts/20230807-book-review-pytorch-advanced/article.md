---
title: '書評： 作りながら学ぶ! PyTorch による発展ディープラーニング'
date: '2023-08-07 21:00:00'
author:
  name: さりんじゃー
  picture: '/assets/author.png'
coverImage:
  url: '@@image@@/pytorch-advanced.jpg'
  width: 140
  height: 180
ogImage:
  url: '@@image@@/pytorch-advanced.jpg'
tags:
  - 'Data Science'
  - 'Book'
  - 'PyTorch'
  - 'Deep Learning'
---

# はじめに

## 本書を選んだ背景

　ここ10年程度データ分析・AI業界で過ごして来た人は Deep Learning 関連で新しい技術が出るたびに順次キャッチアップしていくことで時代とともに技術者として成長できた時代でした。そんな中で実ビジネスの中である程度 Deep Learning が向くタスク、不向きなタスクが明確になりつつあります。また学習済みモデルも多く公開されるようになりました。Deep Learning 系のモデルを扱う場合、1から自分でモデリングを行うことは少なくなり、タスクに合わせたモデルを探しそのまま利用、もしくはファインチューニングなどで微修正し利用することでビジネス上の課題を解決する、という形で利用されることがほとんどです。そんな中、自社のメンバーに進展目覚ましい分野の概要をつかんでもらうための書籍を探していた中で「[PyTorch による発展ディープラーニング（著：小川 雄太郎）](https://amzn.to/3Qu7nAB)」を見つけました。

　本書は実ビジネスでも課題となるマルチメディアコンテンツ（画像、テキスト、動画）にかかわるさまざまなタスクに対して、PyTorch を利用し Deep Learning 系モデルによる予測・分類モデルを構築し、その結果を取得するための一連の流れを解説していたため、どういった処理が Deep Learning で実現できるか、ということを伝えるために良さそうだなと思い自分でも読んでみました。

## 本書の内容

　タスクベースで内容を書き出すと以下のような感じでした。

- 画像処理
    - 画像2値分類タスク： 1章
	    - 学習済みの VGG-16 モデルを利用した転移学習と予測
	    - 学習済みの VGG-16 モデルを利用したファインチューニングと予測
    - 物体検出（BBOX + ラベル）タスク： 2章
	    - SSD モデルを実装
	    - 学習済みの SSD モデルによる予測
	- セマンティックセグメンテーションタスク： 3章
	    - PSPNet モデルを実装
		- 学習済みの PSPNet モデルによる予測
	- 姿勢推定タスク： 4章
	    - OpenPose モデルを実装
		- 学習済みの OpenPose モデルを利用したファインチューニングと予測
		- TensorBoardX を利用したネットワークの可視化
	- 画像生成タスク： 5章
	    - DCGAN の実装
		- DCGAN による画像の学習と生成
		- Self Attention GAN の実装
		- Self Attention GAN による画像の学習と生成
	- 画像異常検知タスク： 6章
	    - AnoGAN の実装
		- AnoGan による学習と異常検知の実施
		- Efficinet GAN の実装
		- Efficinet GAN による学習と異常検知の実施
- 自然言語処理
    - 感情のポジネガ2値分類タスク： 7章、8章
	    - 形態素解析ライブラリの利用
		- 学習済み word2vec モデルの利用
		- 学習済み fastText モデルの利用
		- Transformer による学習と予測
		- 学習済み BERT モデルのファインチューニングと予測
		- Attention の可視化
- 動画処理
    - 人間の動作の多値クラス分類タスク： 9章
		- ECO 2D Net（Inception-v2）モデル の実装
	    - ECO 3D Net (3D Resnet) モデル の実装
		- ECO Lite モデルの実装
		- 学習済み ECO Lite モデルによる予測
- インフラ周り
    - AWS での GPU インスタンスの利用方法： 1章

　主要なツールのバージョンは2023年夏時点では少し古いものになっており、Python 3.6 + PyTorch 1.0.1 + Torchvision 0.2.1 の組み合わせでした。

# レビュー

## 良かったところ

　さまざまな分野におけるタスクの PyTorch 実装例としてはよく聞くタスクを一巡りできる内容になっており、期待通りの内容でした。実際に会社でも案件相談が来るようなトピックも多く、これを読んでいればエンジニア畑出身の人であれば動作検証のための実装イメージはある程度つくようになるかと思います。特にテキスト、画像、動画それぞれ専門知識は必要な話ではありますが横断的に触れることで、結局元のコンテンツが複雑そうに見えるコンテンツでも、どうにかして都合の良い形でベクトル、行列、テンソルに落とし込めさえすれば、あとは Deep Learning フレームワークを利用して予測・分類タスクとして解ける、という感覚が身につけれる構成になっているかと思います。

　初版が2019年のちょっと前の本なので2023年現在では State-of-the-Art のモデルは別にあったりしますが、本書を一通り読んだ後であれば新しいモデルのキャッチアップもだいぶ楽にはなると思います。

## 微妙だったところ

　実装するモデルが天下り的に与えられるので、歴史的経緯の部分がもう少しあるとなぜそういう実装になるのか、の理解が深まりやすいかなと思いました（自然言語処理まわりに関しては程度充実していたと思います）。

　また画像や動画に関しては本書をベースにあまり違和感なくデータを差し替えて実タスクに応用してみることはできる内容になっていると思うのですが、自然言語処理については実装サンプルデータとして英語のレビューデータを利用しているため、全く知識がない人がいざ実問題を解くために日本語関連の処理を実装しようとすると日本語周りでハマりやすそうな気がします。

　実行環境のバージョンが古いため最近の環境で実行すると例えば2章では推論処理実行時に 

>RuntimeError: Legacy autograd function with non-static forward method is deprecated. Please use new-style autograd function with static forward method. (Example: https://pytorch.org/docs/stable/autograd.html#torch.autograd.Function)

といったようなエラーが出て実行できなかったりするので、最初から本書のバージョンに合わせて実行環境を作成する、もしくはエラー内容や [GitHub: サポートページ Issue](https://github.com/YutaroOgawa/pytorch_advanced/issues) を読みつつ動かすための対応を行うひつようがありますが、ここは進展の早いトピックのためある程度しょうがない部分かと思います。

## その他

　実業務で本書のようなモデルを作成したのち、運用してくためには解決しないといけない問題は多々あると思いますが、本書のスコープ外のトピックのため、そちらに関してはまた別の本を探す予定です。

　本書の難易度ですが、Python 自体のお話、画像処理の基礎、自然言語処理処理の基礎、動画処理の基礎に関する情報に関しては記載が少なく、大学の学部で使うようなそれぞれの分野の入門書1冊程度は事前に読んでおいた方がよい、という難易度で記載されています。あくまで PyTorch を利用して新しめのモデルをどう動かするかのデモが書かれている本、として読んで活用するのがよい使い方かなと思います。

　また「発展」の言葉がタイトルにあるように Deep Learning や PyTorch に関する入門者レベルの基礎知識は押さえてある前提の難易度でした。具体的には [PyTorchチュートリアル（日本語翻訳版）](https://yutaroogawa.github.io/pytorch_tutorials_jp/) の「0. PyTorch入門(Learn the Basics)」、「1. PyTorch基礎(Learning PyTorch)」ぐらいまでの内容は事前知識としてあったほうが良い構成でした。

　多少話が変わりますが、本書ではAWS のインスタンスで p2.xlarge を進めていましたが、現在だと g4dn.xlarge とかを選ぶほうがコスパは良いはずです。

# おわりに

　Deep Learning の入門書を読んで多少自分でも試してみた人がステップアップのために次に読む本としてよい本でした。データ分析・AI系の実業務に多少触れており、Deep Learning 系のモデルに関する知識を深めてより業務の幅を広げてみたい方はぜひ1度読んでみてください。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=FFFFFF&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4839970254&linkId=ca37100cca961b545952a37c508f62ec"></iframe>

# 参考資料

1. [マイナビBOOKS: つくりながら学ぶ！PyTorchによる発展ディープラーニング
](https://book.mynavi.jp/ec/products/detail/id=104855) 
2. [GitHub: つくりながら学ぶ! PyTorchによる発展ディープラーニング サポートリポジトリ](https://github.com/YutaroOgawa/pytorch_advanced)
