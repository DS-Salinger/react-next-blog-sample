---
title: 'Win 11 + WSL2 + Docker + Emacs で開発環境構築 (ThinkPad T14s Gen3 AMD)'
date: '2023-07-10 21:00:00'
author:
  name: さりんじゃー
  picture: '/assets/author.png'
coverImage:
  url: '@@image@@/dev-icon.svg'
  width: 150
  height: 150
ogImage:
  url: '@@image@@/dev-icon.svg'
tags:
  - 'Other'
  - 'WSL2'
  - 'Docker'
  - 'Emacs'
  - 'ThinkPad'
---

# はじめに

## Mac から Win 環境への開発用端末の移行

　筆者は10年前ぐらいから Office や Adobe 製品が動き、仮想環境で Windows 環境を動かしやすい *nix 端末として Intel Mac を乗り継ぎながら個人開発用端末として使っていましたが、2019年に購入した MacBook Pro 16 が最近くたびれてきたため、新端末への移行を検討しました。M1 以降の Mac に関しては CPU が独自仕様が強く、X86 系の *nix 端末として利用できていたメリットがなくなり、BootCamp や VMWare Fusion などの仮想環境による Windows 環境での動作チェックなどもやりづらく結局別端末が必要になるため、Mac を利用していたメリットが少なくなりました。

　一方 Windows 環境については WSL2 環境がこなれてきており、シームレスに Windowss 環境と Linux 環境を行き来できるようになったため、大昔に Cygwin 環境などで苦労していた部分や各種プログラミングツールのインストールなどが非常に楽かつ良いパフォーマンスで動くようになりました。業務用のメイン端末も Win 系の OS ＋ WLS2 で構築しており全く不便なところもなかったため開発用端末を Win 系端末に戻すことにしました。

　乗り換え以前は普段 USキーボードを利用しているのと、キータッチが良いほうがテンションが上がるため ThinkPad を愛用していたので、今回も乗り換え先は ThinkPad から探しました。IBM 時代の端末とくらべて持ち運び前提の軽量端末はだいぶキーストロークが浅くなっておりキータッチが劣化してしまったのが残念ですが、開発業務でホームポジションから手を動かさずにマウスが操作できるトラックポイントが便利なのと、トラブル時に分解して自分で部品交換しやすいメリットはまだまだ捨てがたいので、X1系、X系、T14(s)系から検討しました。

　最終的に32GB以上のメモリが搭載可能、重量が軽い、WWAN が選択可能、割引が30%以上、納期が1か月程度などの条件がそろっていた ThinkPad T14s Gen 3 AMD を2023年5月に購入し、その際に行った環境構築の備忘録です。下記のような流れで進めました。

- Windows 環境設定
   - SSDの換装
   - Windows 再インストール
   - Windwos 設定
   - povo 回線セットアップ
- WSL2
- Docker
- その他開発ツール
- 公開鍵作成
- Emacs 環境構築

## マシンスペック

　2023年4月中頃に注文して、5月末に到着という感じで約5週間かかりました。

| 項目     | 内容                                                                                  |
|----------|---------------------------------------------------------------------------------------|
| 機種名   | ThinkPad T14s Gen 3 AMD                                                               |
| CPU      | AMD Ryzen 7 PRO 6850U                                                                 |
| Memory   | 32GB                                                                                  |
| Storage  | KIOXIA EXCERIA G2 2TB (自分で換装)                                                    |
| Display  | 14" (1920 x 1200) IPS, 光沢なし, <br />マルチタッチ非対応, 72%NTSC, 400 nit, 省電力   |
| GPU      | CPU 内蔵                                                                              |
| Camera   | R&1080p FHDカメラ (マイクロホン付)                                                    |
| Wi-Fi    | Wi-Fi 6E対応 (IEEE 802.11ax/ac/a/b/g/n準拠) 2x2 <br />& Bluetooth® (Qualcomm NFA725A) |
| WWAN     | Fibocom L860-GL-16 4G CAT16                                                           |
| Battery  | 4 セル Li-ion ポリマーバッテリー 57Wh                                                 |
| Keyboard | US Keyboard バックライト付き                                                          |


# Windows 環境設定

## SSD換装

　Lenovo の公式サイトの価格だとSSDの容量を増やすとバラ売りの M.2 SSD と比較してかなり割高になってしまうため、今回は KIOXIA EXCERIA G2 2TB を購入し、自分で取り付けました。より高速な PCIe Gen 4.0 対応の EXCERIA PRO シリーズとギリギリまでどちらにするか迷いましたが PRO シリーズは高発熱のためモバイルでも利用する本機には Gen 3 ですが低発熱の G2 シリーズを選択しました。下記の流れで交換作業を行いました。

1. BIOS でバッテリーの無効化
2. 下部カバーの取り外し
3. SSDの換装
4. 逆の手順でカバーを閉じバッテリーの再有効化

　1 に関してはBIOSは起動直後に F1 キー連打で入ることができ、[config] -> [Power] の [ビルドインバッテリー] を無効にすればOK。交換の一連の流れは [公式動画](https://support.lenovo.com/jp/ja/solutions/ht513651-removal-and-replacement-videos-thinkpad-t14-gen3-t14-gen3-healthcare-p14s-gen3-21ah21aj-21ak-21al) の「内蔵バッテリーの無効化」、「下部カバー・アセンブリ-」、「M.2 ソリッド・ステート・ドライブ」の動画がわかりやすい。

## Windows 再インストール

### インストールメディア作成

　今回完全なクリーンインストールを行うため、事前に別の Win PC と USB メモリを利用してインストーラを作成しました。[Win11 インストールメディアダウンロード: Microsoft公式](https://www.microsoft.com/ja-JP/software-download/windows11) こちらのリンクから「Windows 11 のインストール メディアを作成する」の項目中に記載のある「メディア作成ツール」をダウンロードし、8GB 以上空き容量のあるUSBメモリにインストーラを書き込んでおきます。

### Wi-Fi ドライバのダウンロード

　Win 11はインストール中にインターネット接続が必須になりますが、今回の PC はインストールメディア中に Wi-Fi のドライバがないため、事前にダウンロードしておかないとインストール作業で詰むため、[Lenovo
 ドライバダウンロードページ](https://pcsupport.lenovo.com/jp/ja/products/laptops-and-netbooks/thinkpad-t-series-laptops/thinkpad-t14s-gen-3-type-21cq-21cr/downloads/driver-list/component?name=%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AD%E3%83%B3%E3%82%B0%20%3A%20%E3%83%AF%E3%82%A4%E3%83%A4%E3%83%AC%E3%82%B9LAN&id=E3519D23-890E-4DE1-9064-DE6E7DA2515B) から本機用の Qualcomm ワイヤレス ドライバーをダウンロードしました。別の型番のマシンでもシリアル No. を入力すれば適切なものが落とせるはずです。ダウンロードしたドライバは先程作成したUSBメモリの適当な場所にディレクトリを作成し保存しておくとインストール作業時にそのまま使えるので楽でした。

### BIOS の設定

　ここからはThinkPad側で作業していきます。BIOS の設定を下記のように変更しておきます。

- [Config]
   - Fn キーと Ctrl キーの入れ替え
   - [Fn Sticky Key] を On
   - F1-12をプライマリーに設定
   - セキュアブートを無効化
- [Boot]
   - SSD の優先順位を一番上に

### Windows 11 のインストール（+ Wi-fi ドライバのインストール）

　Lenovo のロゴが出る起動画面でF12を連打し、初回のみ上記で作成したUSBメモリから Windows 11 のインストーラを起動します。本機はUSキーボードなため、インストーラが起動した画面で、キーボードは[US101/102]を選択し、ディスクに関しては OS デフォルトの切り方に任せてフォーマットしました。あとは指示に従ってインストール作業を進めていけばOK。インストールが進むと再起動する場面がありますが、ここでブートデバイスの順序の指定がまずいとUSBメモリから再度インストーラが起動してしまい、無限ループすることになるので初回以外はSSDから起動するようにしておきます。

　ネットワーク接続の画面まできたら、ドライバを格納したUSBメモリを接続した後、キーボードで `Shift + F10` を入力するとコマンドプロンプトが立ち上がるので `notepad` と入力し `Enter` を入力するとメモ帳が立ち上がります。メモ帳のメニューから「ファイル」>「開く」を選択し、USBメモリのドライバを格納したフォルダまで移動します。その後ウィンドウ下部の表示するファイルの形式を指定する部分で「すべてのファイル」を選択するとドライバインストールようのEXEファイルが見えます。このEXEを右クリックし「管理者として実行」をクリックするとドライバのインストーラが起動できます。インストーラ指示に従ってドライバをインストールすると、Wi-Fi デバイスが利用できるようになるのでインターネットに接続して認証を進めればOKです。インストール時の各種設定は画面指示に従って入力しました。ここでは下記サイトを参考にしました。

参考1：[Windows 11のセットアップ時にネットへの接続ができなくて作業が進めなくなった場合の解決方法](https://blog.kabocy.com/windows/3389/)
参考2：[Microsoft 公式のサポートページ](https://support.microsoft.com/ja-jp/windows/windows-11-pc-%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E6%99%82%E3%81%AB%E6%8E%A5%E7%B6%9A%E3%81%99%E3%82%8B-50dca26f-40d5-4c3b-853c-e972dafb7e08)

## Windows インストール後の設定

### ドライバのインストール

　Wi-Fiはインストール時にドライバをインストールしましたが、他のドライバが入っていないため [Lenovo 公式ページ](https://pcsupport.lenovo.com/jp/ja/products/laptops-and-netbooks/thinkpad-t-series-laptops/thinkpad-t14s-gen-3-type-21cq-21cr/downloads)からダウンロードしインストールを行います。Lenovo Service Bridge をインストールすると全自動で更新可能ですが、必要なもののみ個別で入れても良いです。

### Windows 設定

　[スタート] ボタン -> [設定] で下記項目を変更しました。

- システム
   - ディスプレイ
      - 拡大/縮小 -> 125%に設定
- Bluetooth とデバイス
   - プリンタとスキャナ
      - 自宅のプリンタを追加
- ネットワークとインターネット
   - VPN
      - 自宅で利用している QHora-301W で構築したネットワークへ VPN (L2TP/IPsec) 接続できるように設定
- 個人用設定
   - 色を「ダーク」に設定
   - 壁紙も変更。
- アプリ
   - インストールされているアプリ
      - 必要ないものを削除

### IME・キーボード

　日本語入力関連の設定変更のためタスクバーの IME 部分で右クリックし、[設定] → [全般] から文字の種類と文字セットから全角カタカナを削除、「以前のバージョンのMicrosoft IME を使う」をオンに、[詳細設定]を開きキー設定でIME切り替えを "Ctrl+\" に変更しました(Emacs の日本語入力起動とそろえています)。

　また Capslock キーを Ctrl キーに割当変更するために Microsoft 公式の [Ctrl2Cap v2.0](https://learn.microsoft.com/ja-jp/sysinternals/downloads/ctrl2cap) を実行しました。

### デスクトップ

　アイコンを非表示に設定しました。デスクトップで右クリック -> [表示] -> [デスクトップ アイコンの表示] をクリックしてチェックマークをオフに設定すればOK。

### エクスプローラー

　拡張子と隠しファイルを表示するように設定しました。[表示] -> [表示] の [隠しファイル名表示] と [拡張子表示] をオンに設定すればOK。


### 各種アプリケーションのインストール(開発関連以外)

　下記アプリケーションについて Web からインストーラーをダウンロードし実行、もしくはストア経由でインストールしました。Adobe 製のアプリケーションに関しては学生ライセンスからの継続ライセンスが低価格で契約できているので全部入りを利用していますが、どこまで契約し続けるかはちょっと悩み中です。

| 項目               | アプリ名                | 補足                               |
|--------------------|-------------------------|------------------------------------|
| Web ブラウザ       | Google Chrome           |                                    |
| オフィススイート   | Word, PowerPoint, Excel | Office 365 経由                    |
| クラウドストレージ | OneDrive                |                                    |
| クラウドストレージ | DropBox                 |                                    |
| ファイル圧縮・回答 | 7zip                    |                                    |
| PC リモート操作    | Remote Desktop          |                                    |
| デザイン関連       | Adobe Acrobat           | Adobe CC 経由                      |
| デザイン関連       | Adobe Photoshop         | Adobe CC 経由                      |
| デザイン関連       | Adobe Illustrator       | Adobe CC 経由                      |
| デザイン関連       | Adobe InDesign          | Adobe CC 経由                      |
| デザイン関連       | Adobe Lightroom         | Adobe CC 経由                      |
| デザイン関連       | Adobe Premier Pro       | Adobe CC 経由                      |
| デザイン関連       | Adobe Fresco            | Adobe CC 経由                      |
| CAD                | VectorWorks 2021        | アカデミック版から製品版に乗り換え |
| SNS                | Twitter                 | Microsoft Store 経由               |
| SNS                | LINE                    | Microsoft Store 経由               |
| 動画配信           | Amazon Prime Video      | Microsoft Store 経由               |
| 動画配信           | Netflix                 | Microsoft Store 経由               |
| 書籍               | Kindle for Android      | Microsoft Store 経由               |
| MTG                | Zoom                    |                                    |
| 動画再生           | SMPlayer                |                                    |
| キーバインド変更   | AutoHotKey              | ショートカットを Emacs バインドに  |

## povo 回線セットアップ

　今回の端末は WWAN もついているので nano SIM カードを本機に直接挿せば携帯回線でそのまま通信可能です。SIMカードを刺しておけば Wi-Fiがない喫茶店などでもインターネットを利用した作業が可能です。今回選んだ povo 回線は普段は完全に0円で運用でき、必要なタイミングのみトッピングを購入すれば非常に低額で運用可能なため、外でもWi-fi側をメインで使い、一部のWLANがない場所で作業するようなパターンでは一番運用しやすい回線だと思います。

　注意点として初回のSIMカードの有効化やチャージに iPhone や Android のアプリを利用する必要があります。運用として楽なのは別回線でメインの iPhone などの携帯を運用し、初回の設定あと povo アプリをそのままメイン携帯に残しておき、都度必要なタイミングでメイン携帯のアプリでトッピングを購入する形だと思います (povo SIMカードが刺さってなくてもトッピング購入可能)。筆者は普段 Wi-Fi 回線がある場所で作業することのほうが多いので、都度必要なタイミングで「データ使い放題(24時間) 330円」を購入する形で運用しています (月1-3回程度)。

　povo アプリにしたがって SIM の開通手続きを終えた後、PC に SIM カードを刺し、「設定」→「ネットワークとインターネット」から「携帯電話」を選択。「その他の携帯ネットワーク設定」→「携帯電話会社の設定」を選択して下記のように入力します。

![povo config](@@image@@/povo.png)

その後回線のOFF->ONを実行すれば接続できます。Wi-Fi を OFF にして速度の確認を行った結果 Download で 50 Mbps 程度、アップロードで 20-25 Mbps 程度は安定して出ていたので結構快適です。Web MTG とかも問題なく可能な速度でした。

![povp speed](@@image@@/povo_speed.png)
 

# WSL2

## WSL2 (Windows Subsystem for Linux 2) とは

　WSL はWindows 10, version 1709 以降 および Windows Server, version 1709 以降で正式利用可能になった Windows 上で Linux のプログラムを利用する仕組みです。旧バージョンの WSL1 は2017年10月、現行バージョンの WSL2 は2019年2月に公開されました(WSL 1 と 2 は実装の仕組みが大きく異なるので現状並列に存在しています)。

　以前は VirtualBox や VMWare などを利用して仮想環境を構築していましたが、それなりにオーバヘッドがありノートPCだとスペック的に少々厳しいところがありました。しかし近年ベアメタルハイパーバイザ型の仮想環境 Hyper-V を利用した WSL2 を利用することで物理マシンにインストールした Linux 環境と近い感覚で開発環境を構築できるようになりました。今回は WSL2 上に Ubuntu 22.04LTS を導入して開発環境を構築しました。

　WSL2 と Ubuntu は Microsoft Store から入手できるようになっているので、簡単にインストール可能です。まずスタートメニューから Store アプリを起動し、「Windows Subsystem for Linux」 という名称のアプリを検索委、ストア経由でインストールします。

![wsl2](@@image@@/wsl2.png)

その後、「Ubuntu 22.04.2 LTS」 となっているこちらのアプリもストア経由でインストールします。

![wsl2 ubuntu](@@image@@/wsl2-ubuntu.png)

操作は基本的にCLIで行うことになりますが、Windows デフォルトのターミナルアプリはしょぼいので、[Windows Terminal] もストアからインストールしておきます。

![windowsterminal](@@image@@/windowsterminal.png)

Windows ターミナルの [設定] から、[スタートアップ] の [既定のプロファイル] を「Ubuntu 22.04 LTS」 に変更、[既定のターミナル アプリケーション] を「Windowsターミナル」に変更、[コンピューターのスタートアップ時に起動] を「ON」、起動サイズを「80列 / 42行」に変更。あとは [外観] を好みになるように変更しておきます。

補足： 筆者はメインエディタとして CLI版の Emacs を使っている関係で、Windows Terminal のコピー・ペーストが Emacs キーバインドとぶつかるので `Ctrl+C` と `Ctrl+V` のショートカットを削除しました。`Ctrl+Shift+C` or `Ctrl+Shift+V` でも同様の機能が割り当たってるのでこちらで代替可能です。


# Docker

　[Docker](https://www.docker.com/) はオープンソースのコンテナ化技術に関するツールです。アプリケーションの実行環境の切り分けや、開発・本番環境の素早い構築ができるといったメリットがあります。これらは一般的なマシン丸ごとの仮想環境を用意できるツール(VMWare、VirtualBox、Hyper-Vなど)とほぼ同様のメリットですが、そのようなツールよりもオーバーヘッドが小さいため高速に起動できる、負荷もすくなく、より高いレベルでの可搬性があります。近年はサーバを仮想化技術で集約した上で、サーバ上で実行する個々のアプリケーションの環境を Docker などのコンテナ系ツールで用意するパターンも多いです。特に開発環境でメリットの大きい構成です。

　今回は上記で用意した WSL2 + Ubuntu 環境から利用できる形でインストールします。WSL2 上にインストールした Ubuntu 環境に直接インストールすることもできますが、WSL2 環境の場合 WSL2 をバックエンドとする形で Windows 側に Docker Desktop をインストールするほうがパフォーマンスが良いのと、Linux、Windows 両方のコンテナを実行できるようになるメリットがあるため今回は Windows 側にインストールします。Docker Desktop の Windows 版インストーラーを [こちらの公式ページ](https://www.docker.com/products/docker-desktop/) からダウンロードして実行します。[設定]->[全般] で、[Use the WSL 2 based engine]\(WSL 2 ベースのエンジンを使用する\) がオンになっていることを確認します。また[設定]->[リソース]->[WSL Integration]\(WSL 統合\) に移動して、Docker 統合を有効にするインストール済みの Ubuntu 環境を有効にします。Windows Terminal から Ubuntu 環境のシェルを起動し、下記の3つのコマンドを実行して以下のような出力が得られれば、インストールと設定は完了です。

```bash
$ docker --version
Docker version 24.0.2, build cb74dfc

$ docker pull hello-world
...

$ docker run hello-world

Hello from Docker!

...
```

参考：[WSL2 での Docker リモートコンテナの概要](https://learn.microsoft.com/ja-jp/windows/wsl/tutorials/wsl-containers)


# その他開発ツール

　Ubuntu 環境内で下記コマンドを実行して既存パッケージを更新しておきます。次に日本語関連の設定、フォントのインストールを行っています。フォントはデフォルトでインストール済みのものより個人的に読みやすいと思っている「UDEVゴシック」を利用しています（Win 側にも別途導入しました）。

```bash
# パッケージ更新
$ sudo apt-get update
$ sudo apt-get upgrade

# 日本語表示関連対応
$ sudo apt install language-pack-ja
$ sudo update-locale LANG=ja_JP.UTF8
$ sudo apt install fontconfig
$ sudo apt install fonts-ipafont
$ fc-cache -fv

# フォント関連
$ sudo apt install unzip
$ mkdir ~/tmp
$ wget https://github.com/yuru7/udev-gothic/releases/download/v1.3.0/UDEVGothic_v1.3.0.zip
$ unzip UDEVGothic_v1.3.0.zip
$ sudo mv UDEVGothic_v1.3.0 /usr/local/share/fonts/
$ fc-cache -fv
```

また systemd を利用したいので `/etc/wsl.conf`  に下記を設定する必要があるのですが、筆者がインストールしたバージョンではデフォルトで true になっていました。。

```:/etc/wsl.conf
[boot]
systemd = true
```

その後ターミナルを再起動する。

# 公開鍵作成

　コード管理で GitHub を利用するために必要な鍵ファイルを作成します。

```bash
$ ssh-keygen -t rsa -b 4096 -C
```

```:~/.ssh/config
Host github github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa
```

その後、作成した公開鍵を GitHub に登録しておきます。

参考： [GitHub アカウントへの新しい SSH キーの追加](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=linux)


# Emacs 環境構築

　筆者は大学時代から開発用のメインのエディタとして Emacs を利用しているので、今回の環境にもインストールします。最近、世間では VS Code ほぼ一択のようなふんいきですが、個人的にはターミナルの CLI のみで完結させられるほうが何かと好みです（さすがにデータ分析系のコード書く場合コンソールのみだと画像関連がつらいため Jupyter Lab とか RStudio で書いてますが…）。

　下記コマンドで Emacs 本体と、Emacs で日本語入力する際に利用する Mozc、Mozc の GUI 設定ツールをインストールします。

```bash
$ sudo apt-get install emacs
$ sudo apt-get install emacs-mozc emacs-mozc-bin
$ sudo apt-get install mozc-utils-gui
```

筆者は日本語入力時でもスペースキーで半角スペースが入力される方が好みなため、Mozc の GUI 設定ツールで [スペースの入力] を「半角」にしておきます。

```bash
$ /usr/lib/mozc/mozc_tool --mode=config_dialog
```

![mozc](@@image@@/mozc.png)

Docker 関連や JavaScript、TypeScript の単語補完などで必要なパッケージを Emacs 内でインストールする。 Docker 環境で作業するときに地味に便利なのが docker-tramp で、ローカルのファイルを開く感覚で Docker 環境内のファイルを編集したり、ファイル編集中にローカルと同じ形で `M-x shell` でシェルを起動すれば、 Docker 環境内のシェルが起動するので非常に便利です。

```
M-x package-install docker
M-x package-install docker-tramp
M-x package-install js2-mode
M-x package-install flycheck
M-x package-install web-mode
M-x package-install use-package
```

参考： [docker-tramp.el でdockerコンテナのファイルを読み書きする](https://qiita.com/kai2nenobu/items/7af012e327b8dd078ba4)

Emacs の設定は `~/.emacs.d/init.el` で設定でき、現在は次のような内容になっています。

```lisp
;; For Japanese
(require 'mozc)
(set-language-environment "Japanese")
(prefer-coding-system 'utf-8)
(setq default-input-method "japanese-mozc")
(setq mozc-candidate-style 'echo-area)

;; Not showing startup message
(setq inhibit-startup-message t)

;;; Backup and Autosave
;; save to ~/tmp
(add-to-list 'backup-directory-alist
             (cons "." "~/tmp/"))
(setq auto-save-file-name-transforms
        `((".*" ,(expand-file-name "~/tmp/") t)))

;; line num
(line-number-mode t)
(column-number-mode t)

;; col, row
(line-number-mode t)
(column-number-mode t)

;; display now time in bar
(display-time)

;; default window size
(if window-system
    (setq default-frame-alist
          (append (list '(width . 85)
                        '(height . 42)
                        default-frame-alist))
          )
  )

;; delete by Ctrl+h
(global-set-key"\C-h" 'delete-backward-char)

;; Always show line num
(global-linum-mode)
(setq linum-format "%4d ")

;; parenthes pair
(show-paren-mode t)

;; theme
(load-theme 'manoj-dark t)

;; font
(add-to-list 'default-frame-alist
             '(font . "UDEV Gothic-14"))

;; MELPA
(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
;; Comment/uncomment this line to enable MELPA Stable if desired.  See `package-archive-priorities`
;; and `package-pinned-packages`. Most users will not need or want to do this.
;;(add-to-list 'package-archives '("melpa-stable" . "https://stable.melpa.org/packages/") t)
(package-initialize)

(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages '(web-mode js2-mode flycheck docker-tramp docker ##)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

;; Docker
(require 'docker-tramp-compat)
(set-variable 'docker-tramp-use-names t)

;; LSP
(setq  lsp-clients-javascript-typescript-server
       "/usr/local/bin/typescript-language-server")
(setq  lsp-clients-typescript-javascript-server-args
       "/usr/local/bin/tsserver")

;; JavaScript
(add-hook 'after-init-hook #'global-flycheck-mode)
(add-to-list 'auto-mode-alist '("\\.js\\'" . js2-mode))
(add-to-list 'auto-mode-alist '("\\.jsx\\'" . web-mode))

;; TypeScript
(require 'web-mode)
(add-to-list 'auto-mode-alist '("\\.ts\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.tsx\\'" . web-mode))
(with-eval-after-load 'flycheck
    (flycheck-add-mode 'javascript-eslint 'web-mode))


(setq web-mode-markup-indent-offset 2)
(setq web-mode-css-indent-offset 2)
(setq web-mode-code-indent-offset 2)
```


# おわりに

　ここまでの作業で新しく導入した新マシンで開発作業を行える環境が整いました。各言語で必要な開発環境は今後それぞれ必要なタイミングで整えることとします。
