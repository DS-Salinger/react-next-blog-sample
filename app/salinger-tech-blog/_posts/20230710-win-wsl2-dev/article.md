---
title: 'Win 11 + WSL2 + Docker + Emacs で開発環境構築'
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
  - 'ThinkPad'
  - 'WSL2'
  - 'Docker'
  - 'Emacs'
---

# はじめに

## 本記事について

　筆者が2023年5月末に ThinkPad T14s Gen 3 AMD を購入した際に行った環境構築の備忘録です。下記のような流れで進めました。

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

　2023年4月中頃に注文して、5月末に到着。約6週間かかりました。

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

　Lenovo の公式サイトの価格だとSSDの容量を増やすとかなり割高になってしまうため、今回は KIOXIA EXCERIA G2 2TB を購入し、自分で取り付けた。より高速なPCIe Gen 4.0 対応の EXCERIA PRO シリーズとギリギリまでどちらにするか迷ったが PRO シリーズは高発熱のためモバイルでも利用する本機には低発熱の G2 シリーズを選択した。交換の流れとしては下記のようになる。

1. BIOS でバッテリーの無効化
2. 下部カバーの取り外し
3. SSDの換装
4. 逆の手順でカバーを閉じバッテリーの再有効化

　1 に関してはBIOSは起動直後に F1 キー連打で入ることができ、[config] -> [Power] の [ビルドインバッテリー] を無効にすればよい。交換の一連の流れは [公式動画](https://support.lenovo.com/jp/ja/solutions/ht513651-removal-and-replacement-videos-thinkpad-t14-gen3-t14-gen3-healthcare-p14s-gen3-21ah21aj-21ak-21al) の「内蔵バッテリーの無効化」、「下部カバー・アセンブリ-」、「M.2 ソリッド・ステート・ドライブ」の動画がわかりやすい。

## Windows 再インストール

### インストールメディア作成

　今回完全なクリーンインストールを行うため、別の Windows PC と USB メモリを利用してインストーラを作成した。[Win11 インストールメディアダウンロード: Microsoft公式](https://www.microsoft.com/ja-JP/software-download/windows11) こちらのリンクから「Windows 11 のインストール メディアを作成する」の項目中に記載のある「メディア作成ツール」をダウンロードし、8GB 以上空き容量のあるUSBメモリにインストーラを書き込んでおく。

### Wi-Fi ドライバのダウンロード

　Win 11はインストール中にインターネット接続が必須になりますが、今回の PC はインストールメディア中に Wi-Fi のドライバがないため、事前にダウンロードしておかないとインストール作業で詰みます。[Lenovo
 ドライバダウンロードページ](https://pcsupport.lenovo.com/jp/ja/products/laptops-and-netbooks/thinkpad-t-series-laptops/thinkpad-t14s-gen-3-type-21cq-21cr/downloads/driver-list/component?name=%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AD%E3%83%B3%E3%82%B0%20%3A%20%E3%83%AF%E3%82%A4%E3%83%A4%E3%83%AC%E3%82%B9LAN&id=E3519D23-890E-4DE1-9064-DE6E7DA2515B) から本機用の Qualcomm ワイヤレス ドライバーをダウンロードできました。別の型番のマシンでもシリアルを入力すれば適切なものが落とせるはずです。ダウンロードしたドライバは先程作成したUSBメモリの適当な場所にディレクトリを作成し保存しておくとインストール作業時にそのまま使えるので楽でした。

### BIOS の設定

　ここからはThinkPad側で作業していきます。BIOS の設定を下記のように変更しておきます。

- [Config]
   - Fn キーと Ctrl キーの入れ替え
   - [Fn Sticky Key] を On
   - F1-12をプライマリーに設定
   - セキュアブートを無効化
- [Boot]
   - SSD の優先順位を一番上に

### Windows 11 のインストール

　Lenovo のロゴが出る起動画面でF12を連打し、初回のみ上記で作成したUSBメモリから Windows 11 のインストーラを起動する。本機はUSキーボードなため、インストーラが起動した画面で、キーボードは[US101/102]を選択、ディスクに関しては OS デフォルトの切り方に任せてフォーマットした。あとは指示に従ってインストール作業を進めていけばOK。インストールが進むと再起動する場面があるが、ここでブートデバイスの順序の指定がまずいとUSBメモリから再度インストーラが起動してしまい無限ループすることになるので、初回以外はSSDから起動する。

　ネットワーク接続の画面まできたら、ドライバを格納したUSBメモリを接続した後、キーボードで `Shift + F10` を入力するとコマンドプロンプトが立ち上がるので `notepad` と入力し `Enter` を入力するとメモ帳が立ち上がる。メモ帳のメニューから「ファイル」>「開く」を選択し、USBメモリのドライバを格納したフォルダまで移動する。ウィンドウ下部の表示するファイルの形式を指定する部分で「すべてのファイル」を選択するとドライバインストールようのEXEファイルが見える。このEXEを右クリックし「管理者として実行」をクリックするとドライバのインストーラが起動できる。インストーラ指示に従ってドライバをインストールすると、Wi-Fi デバイスが利用できるようになるのでインターネットに接続して認証を進めればOK。インストール時の各種設定は画面指示に従って入力した。

参考1：[Windows 11のセットアップ時にネットへの接続ができなくて作業が進めなくなった場合の解決方法](https://blog.kabocy.com/windows/3389/)
参考2：[Microsoft 公式のサポートページ](https://support.microsoft.com/ja-jp/windows/windows-11-pc-%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E6%99%82%E3%81%AB%E6%8E%A5%E7%B6%9A%E3%81%99%E3%82%8B-50dca26f-40d5-4c3b-853c-e972dafb7e08)

## Windows インストール後の設定

### ドライバのインストール

　Wi-Fiはインストール時にドライバをインストールしたが、他のドライバが入っていないため [Lenovo 公式ページ](https://pcsupport.lenovo.com/jp/ja/products/laptops-and-netbooks/thinkpad-t-series-laptops/thinkpad-t14s-gen-3-type-21cq-21cr/downloads)からダウンロードしインストールを行う。Lenovo Service Bridge をインストールすると全自動で更新可能。必要なもののみ個別で入れても良い。

### Windows 設定

　[スタート] ボタン → [設定] で下記項目を変更。

- システム
   - ディスプレイ
      - 拡大/縮小 → 125%に設定
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

　日本語入力関連の設定変更のためタスクバーの IME 部分で右クリックし、[設定] → [全般] から文字の種類と文字セットから全角カタカナを削除、「以前のバージョンのMicrosoft IME を使う」をオンに、[詳細設定]を開きキー設定でIME切り替えを "Ctrl+\" に変更した。

　また Capslock キーを Ctrl キーに割当変更するために Microsoft 公式の [Ctrl2Cap v2.0](https://learn.microsoft.com/ja-jp/sysinternals/downloads/ctrl2cap) を実行した。

### デスクトップ

　アイコンを非表示にする。デスクトップで右クリ → [表示] → [デスクトップ アイコンの表示] をクリックしてチェックマークをオフにする。

### エクスプローラー

　拡張子と隠しファイルを表示する。[表示] → [表示] の [隠しファイル名表示] と [拡張子表示] をオンにする。


### 各種アプリケーションのインストール(開発関連以外)

| 項目               | アプリ名                | 補足                              |
|--------------------|-------------------------|-----------------------------------|
| Web ブラウザ       | Google Chrome           |                                   |
| オフィススイート   | Word, PowerPoint, Excel | Office 365 経由                   |
| クラウドストレージ | OneDrive                |                                   |
| クラウドストレージ | DropBox                 |                                   |
| PC リモート操作    | Remote Desktop          |                                   |
| デザイン関連       | Adobe Acrobat           | Adobe CC 経由                     |
| デザイン関連       | Adobe Photoshop         | Adobe CC 経由                     |
| デザイン関連       | Adobe Illustrator       | Adobe CC 経由                     |
| デザイン関連       | Adobe InDesign          | Adobe CC 経由                     |
| デザイン関連       | Adobe Lightroom         | Adobe CC 経由                     |
| デザイン関連       | Adobe Premier Pro       | Adobe CC 経由                     |
| デザイン関連       | Adobe Fresco            | Adobe CC 経由                     |
| SNS                | Twitter                 | Microsoft Store 経由              |
| SNS                | LINE                    | Microsoft Store 経由              |
| 動画配信           | Amazon Prime Video      | Microsoft Store 経由              |
| 動画配信           | Netflix                 | Microsoft Store 経由              |
| 書籍               | Kindle for Android      | Microsoft Store 経由              |
| MTG                | Zoom                    |                                   |
| 動画再生           | SMPlayer                |                                   |
| キーバインド変更   | AutoHotKey              | ショートカットを Emacs バインドに |


## povo 回線セットアップ

　今回は WWAN もついているので nano SIM カードを本機に直接挿せば携帯回線でそのまま通信できるため、Wi-Fiがない喫茶店などでも作業が可能。注意点として初回のSIMカードの有効化やチャージにiPhoneやAndroidのアプリを利用する必要があるので注意。運用として楽なのは別回線でメインのiPhoneなどの携帯を運用し、初回の設定あとpovo アプリをそのままメイン携帯に残しておき、都度必要なタイミングでメイン携帯のアプリでトッピングを購入する形だと思います(povo SIMカードが刺さってなくてもトッピング購入可)。筆者は普段 Wi-Fi 回線がある場所で作業することのほうが多いので、都度必要なタイミングで「データ使い放題(24時間) 330円」を購入する形で運用しています (月1-3回程度)。

　povo アプリにしたがってSIMの開通手続きを終えた後、PC にSIMカードを刺し、「設定」→「ネットワークとインターネット」から「携帯電話」を選択。「その他の携帯ネットワーク設定」→「携帯電話会社の設定」を選択して下記のように入力する。

![povo config](@@image@@/povo.png)

その後回線のOFF->ONを実行すれば接続できる。Wi-FiをOFFにして速度の確認を行った結果 Download で 50Mbps 程度、アップロードで 20-25Mbps 程度は安定して出ていたので結構快適。Web MTG とかも問題なく可能でした。

![povp speed](@@image@@/povo_speed.png)
 

# WSL2

## WSL2 (Windows Subsystem for Linux 2) とは

　WSL はWindows 10, version 1709 以降 および Windows Server, version 1709 以降で正式利用可能になった Windows 上で Linux のプログラムを利用する仕組みである。旧バージョンの WSL1 は2017年10月、現行バージョンの WSL2 は2019年2月に公開された(WSL 1 と 2 は実装の仕組みが大きく異なるので現状並列に存在しています)。

　以前は VirtualBox や VMWare などを利用して仮想環境を構築していたが、それなりにオーバヘッドがありノートPCだとスペック的に少々厳しいところがあった。しかし近年ベアメタルハイパーバイザ型の仮想環境である Hyper-V を利用した WSL2 を利用することで物理マシンにインストールした Linux 環境と近い感覚で開発環境を構築できるようになった。今回は WSL2 上に Ubuntu 22.04LTS を導入し開発環境を構築しました。

　WSL2 と Ubuntu は Microsoft Store から入手できるようになっているので、スタートメニューから Store アプリを起動し、[Windows Subsystem for Linux] という名称のアプリをストア経由でインストールする。

![wsl2](@@image@@/wsl2.png)

その後、[Ubuntu 22.04.2 LTS] となっているこちらのアプリもストア経由でインストールする。

![wsl2 ubuntu](@@image@@/wsl2-ubuntu.png)

操作は基本コマンドラインで行うことになりますが、Windows デフォルトのターミナルアプリはしょぼいので、[Windows Terminal] もストアからインストールしておく。

![windowsterminal](@@image@@/windowsterminal.png)

Windows ターミナルの [設定] から、[スタートアップ] の [既定のプロファイル] を「Ubuntu 22.04 LTS」 に変更、[既定のターミナル アプリケーション] を「Windowsターミナル」に変更、[コンピューターのスタートアップ時に起動] を「ON」、起動サイズを「80列 / 42行」に変更。あとは [外観] を好みになるように変更。

※ 筆者はメインエディタとして Emacs を使っている関係で、Windows Terminal のコピー・ペーストが Emacs キーバインドとぶつかるので `Ctrl+C` と `Ctrl+V` のショートカットを削除している。`Ctrl+Shift+C` or `Ctrl+Shift+V` でも同様の機能が割り当たってるのでこちらで代替可能。


# Docker

　[Docker](https://www.docker.com/) はオープンソースのコンテナ化技術に関するツールです。アプリケーションの実行環境の切り分けや、開発・本番環境の素早い構築ができるといったメリットがあります。これらは一般的なマシン丸ごとの仮想環境を用意できるツール(VMWare、VirtualBox、Hyper-Vなど)とほぼ同様のメリットですが、そのようなツールよりもオーバーヘッドが小さいため高速に起動できる、負荷もすくなく、より高いレベルでの可搬性があります。近年はサーバを仮想化技術で集約した上で、サーバ上で実行する個々のアプリケーションの環境を Docker などのコンテナ系ツールで用意するパターンも多いです。特に開発環境でメリットの大きい構成です。

　今回は上記で用意した WSL2 + Ubuntu 環境から利用できる形でインストールします。Ubuntu 環境に直接インストールすることもできますが、WSL2 環境の場合 WSL2 をバックエンドとする形で Windows 側に Docker Desktop をインストールするほうがパフォーマンスが良いのと、Linux、Windows 両方のコンテナを実行できるようになるメリットがあるため今回は Windows 側にインストールします。Docker Desktop の Windows 版インストーラーを [こちらの公式ページ](https://www.docker.com/products/docker-desktop/) からダウンロードして実行します。[設定]->[全般] で、[Use the WSL 2 based engine]\(WSL 2 ベースのエンジンを使用する\) がオンになっていることを確認します。また[設定]->[リソース]->[WSL Integration]\(WSL 統合\) に移動して、Docker 統合を有効にするインストール済みの Ubuntu 環境を有効にします。Windows Terminal から Ubuntu 環境のシェルを起動し、下記の3つのコマンドを実行して以下のような出力が得られれば、インストールと設定は完了です。

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

　Ubuntu 環境内で下記コマンドを実行して必要なものをインストールする。

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

systemd を利用するために `/etc/wsl.conf`  に下記を設定

```:/etc/wsl.conf
[boot]
systemd = true
```

その後ターミナルを再起動する。

# 公開鍵作成

　コード管理で GitHub を利用するために必要な鍵ファイルを作成しておく。

```bash
$ ssh-keygen -t rsa -b 4096 -C
```

```:~/.ssh/config
Host github github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa
```

作成した公開鍵を GitHub に登録しておく。

参考： [GitHub アカウントへの新しい SSH キーの追加](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=linux)


# Emacs 環境構築

　筆者は大学時代から開発用のメインのエディタとして Emacs を利用しているので、今回の環境にもインストールする。最近世の中的には VS Code ほぼ一択のようですが、個人的にはターミナルの CLI のみで完結させられるほうが何かと好み（さすがにデータ分析系のコード書く場合は Jupyter Lab とかで書いてますが…）。

　下記コマンドで Emacs 本体と、Emacs で日本語入力する際に利用する Mozc、Mozc の GUI 設定ツールをインストールする。

```bash
$ sudo apt-get install emacs
$ sudo apt-get install emacs-mozc emacs-mozc-bin
$ sudo apt-get install mozc-utils-gui
```

筆者は日本語入力時でもスペースキーで半角スペースが入力される方が好みなため、Mozc の GUI 設定ツールで [スペースの入力] を「半角」にしておく。

```bash
$ /usr/lib/mozc/mozc_tool --mode=config_dialog
```

![mozc](@@image@@/mozc.png)

Docker 関連や JavaScript、TypeScript の単語補完などで必要なパッケージをEmacs 内でインストールする。 Docker 環境で作業するときに地味に便利なのが docker-tramp で、ローカルのファイルを開く感覚で Docker 環境内のファイルを編集したり、ファイル編集中にローカルと同じ形で `M-x shell` でシェルを起動すれば、 Docker 環境内のシェルを開ける。

```
M-x package-install 
  docker
  docker-tramp
  js2-mode
  flycheck
  web-mode
  use-package
```

参考： [docker-tramp.el でdockerコンテナのファイルを読み書きする](https://qiita.com/kai2nenobu/items/7af012e327b8dd078ba4)

Emacs の設定は `~/.emacs.d/init.el` で設定でき、現在は次のような内容になっている。

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

　ここまでの作業で新しく導入した新マシンで開発作業を行える環境が整った。あとは各言語で必要な環境は今後それぞれ必要なタイミングで整えていくことにする。
