---
title: 'React + Next.js で自作ブログの作成 (1.環境構築編)'
date: '2023-07-13 00:30:00'
author:
  name: さりんじゃー
  picture: '/assets/author.png'
coverImage:
  url: '@@image@@/blog-starter-page.png'
  width: 240
  height: 160
ogImage:
  url: '@@image@@/blog-starter-page.png'
tags:
  - 'Other'
  - 'React'
  - 'Next.js'
  - 'TypeScript'
  - 'Tailwind'
  - 'Firebase'
---

# はじめに

## なぜ自作ブログを作るのか？

　なんでも誰かがサービス化してくれているこのご時世に、何故わざわざ自分で1から作るのか？という疑問があると思いますが、技術者として「1から自分で作る」というのは対象となる製品を理解する上でとても大事なステップです。本や Web の記事として誰かが書いてくれている内容をそのままコピーして動かしてみる、という一見簡単そうな内容でも、いざ自分でやってみると環境構築でエラーが発生し希望とおりに動かない、読んだときは理解していたつもりでも一部分をほんの少し書き換えて目的のものに近づけようとすると動いてほしいように動かない、ということが頻発します。一番勉強になるのはこういう目的通りに動かないものを不格好でもよいので、どうにかこうにかとりあえずは「動くようにする」という過程です。

　筆者の専門でお仕事にしている分野は、主にデータ分析や AI にかかわる領域ですが、「多少は知っている」ものを増やしていくと周辺領域も含めより専門知識が深まるため、同じ分野の専門家で知識がある人が少ないフロントエンド側の知識もこのタイミングでちゃんと勉強し、なにか動くもの自分で作ってみようと思いました。

　そこで対象として選んだのが学習した内容や試してみた技術をまとめるための自作ブログです。日常から自分で使う前提のもので、かつ静的なコンテンツがほとんど、バックエンド側も非常にシンプルな構成にできるため、フロントエンド側の技術キャッチアップのネタとして、フロント側の初学者がとりあえず作ってみるにはちょうどよい難易度です。また作り捨てにせずに適度に改修をしつつ、かつ長期間運用していく前提にもなるのでちゃんと運用の観点も考慮しながら作ることになるので、より実サービスに近い形の対象でもあると思います。

## 本記事について

　React + Next.js 学習のために自作ブログを作ったときの諸々の備忘録です。Next.js 公式テンプレートの [blog-starter](https://vercel.com/templates/next.js/blog-starter-kit) をベースに構築しています。作成したコードに関しては[https://github.com/DS-Salinger/salinger-tech-blog](https://github.com/DS-Salinger/salinger-tech-blog) に掲載しているので必要に応じて参照してください。今回の「1. 環境構築編」では関連する技術に関する情報のまとめと環境構築部分について記載しています。

## 作成する自作ブログで必要になる技術スタック

　今回は下記の言語、フレームワーク、インフラを利用しました。

- 開発言語： [TypeScript](https://www.typescriptlang.org/ja/)
- フロントエンドフレームワーク: [React](https://ja.react.dev/)
- バックエンドフレーム: [Next.js](https://nextjs.org/)
- インフラ: [Firebaes](https://firebase.google.com/?hl=ja)

  
## 参考にした情報

　言語とフレームワークに関して、筆者はフロントエンド関連の知識が大昔の HTML メインで頑張る20年前で止まっていたため、まず最近の HTML、CSS 関連の基礎知識、JavaScriptの基礎知識に関して [MDN](https://firebase.google.com/?hl=ja) の各ドキュメントを一通り読んで頭の中にインデックスを作りました。その後 [React 公式チュートリアル](https://ja.react.dev/learn) で React 関連の基礎知識を学習しましたが、英語の公式チュートリアルドキュメントが大幅刷新されたタイミングだったので、一部ドキュメントがまだ英語のままでしたが、翻訳ツールとかも使いつつ読んでました。TypeScript の学習に関しては [TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/)で今回のブログ構築に関しては十分足りました。Next.js の学習は[公式のチュートリアル(英語)](https://nextjs.org/learn/foundations/about-nextjs) を一通りこなしました。こちらは英語のドキュメントのみですが、そこまで内容が難しくなかったので翻訳ツールを使いながら進めればなんとかなると思います。

　環境構築部分に関しては miketako3 さんが記載した [エンジニアなら自分でブログを作れ！①導入編](https://zenn.dev/miketako3/articles/9b2b1a9ec13901) にほぼ準拠する形で実施しました。こちらの記事は M1 Mac かつパッケージ管理に yarn を利用していましたが、筆者は Win 11 ＋ Ubuntu 22.04 on WSL2 でパッケージ管理は npm を利用しています。上記記事では未検証のようでしたが、ほぼ同様の手順で問題なく実行できました。

# 環境構築

## GitHub によるソースコード管理

　GitHub 上で新規リポジトリを作成します。今回はリポジトリ名を本ブログの名称 `salinger-tech-blog` として、これをそのまま Firebase のプロジェクト名にもしています。

## Firebase によるインフラの構築

　[Firebase 公式](https://console.firebase.google.com/u/0/?hl=ja) にアクセスすると下記の画面が表示されます。

![firebase1](@@image@@/firebase1.png)

右上の「コンソールへ移動」をクリックします。

![firebase2](@@image@@/firebase2.png)

真ん中の「プロジェクトを作成」をクリックします。

![firebase3](@@image@@/firebase3.png)

プロジェクト名を入力、初回のみ規約の確認のチェックボックスが表示されるのでチェックをいれて「続行」をクリックします。

![firebase4](@@image@@/firebase4.png)

Google Analytics がデフォルトで有効になるのでそのまま続行します。

![firebase5](@@image@@/firebase5.png)

地域を「日本」に変更、チェックボックスで規約に同意を選択し「プロジェクトを作成」をクリックします。

![firebase6](@@image@@/firebase6.png)

しばらく待つと、「新しいプロジェクトの準備ができました」が表示されるので「続行」をクリックします。

![firebase7](@@image@@/firebase7.png)

プロジェクトのトップ画面が表示されればOKです。

![firebase8](@@image@@/firebase8.png)

歯車マークをクリックして「プロジェクトの設定」をクリックします。

![firebase9](@@image@@/firebase9.png)

[全般] -> [デフォルトのGCPリソースロケーション] を日本のリージョンである「asia-northeast1」に設定。これで Firebase の下準備は完了です。


## Docker を利用した開発環境の構築とテンプレートの準備

　Docker を利用して TypeScript、React、Next.js を利用して開発するための環境を構築します。任意の場所に作業用ディレクトリを作成し、下記2つのファイルを作成します。

```:Dockerfile
FROM node:18.10.0-alpine

WORKDIR /app
EXPOSE 3000

RUN apk --update --no-cache add git openssh
RUN npm install -g firebase-tools
```

```yaml:docker-compose.yaml
version: '3'

services:
  salinger-tech-blog:
    container_name: ts-react-next
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./app:/app
    environment:
      - NODE_DEV=development
      - CHOKIDAR_USEPOLLING=true
    ports:
       - 3000:3000
       - 9005:9005
    tty: true
    stdin_open: true
```

作業用ディレクトリで下記コマンドを実行し、作業用コンテナの作成＆起動を行います。

```bash
$ mkdir salinger-tech-blog
$ cd salinger-tech-blog
$ docker build
$ docker compose create
$ docker compose start
```

コンテナの中に入りブログのひな型を作成していきます。以下のコマンドで作業用コンテナに入ります。

```bash
$ docker container exec -it [コンテナ名] sh
```

Visual Studio Code や Emacs などの開発用エディタから直接コンテナ内のシェルを操作したりもできるので各自の作業環境に合わせて読み替えてください。筆者は昔からの流れで Emacs を利用しています。

コンテナ内部で下記コマンドを実行してテンプレートを作成します。

```bash
$ npx create-next-app --example blog-starter salinger-tech-blog
...
Ok to proceed? (y)
```

と聞かれるので y を入力すると必要なパッケージがダウンロードされ、インストールされます。引き続きコンテナの中で下記コマンドを実行します。

```bash
$ cd salinger-tech-blog
$ npm run dev
```

作業用PCのブラウザから http://localhost:3000 にアクセスした際に下記ページが表示できていればOKです。

![blog-starter](@@image@@/blog-starter.png)


## Firebase への初回デプロイ

```json:package.json
- "build": "next build",
+ "build": "next build && next export"
```

`app/salinger-tech-blog/components/cover-image.tsx` の12行目の `<Image ... /`> を` <img ... />` に修正します。SSG に対応していない要素がデフォルトのコードにあるのでそのままだとビルドでこけます。

参考： [NextJS開発で困ったことメモ](https://zenn.dev/yuji/scraps/13c9845bcc13f9#comment-e704f6754fba6c)

再度コンテナ内部に入り、下記コマンドを実行してアプリをビルドします。

```bash
$ cd /app/salinger-tech-blog
$ npm run build
...
Export successful. Files written to /app/salinger-tech-blog/out
```

次にコンテナ内部で Firebase にログインするためのコマンドを実行します。

```bash
$ firebase login
```

エラー情報などの収集に協力するかどうか聞かれるので Yes / No どちらかこたえると認証用 URL が表示されるのでブラウザからアクセスします。Firebase アカウントを作成したメールアドレスでログインすると下記画面が表示されます。

![firebase 10](@@image@@/firebase10.png)

ターミナル側で `✔ Success! Logged in as xxx@example.com` と表示されればログイン成功です。

　次は Firebase の初期設定を進めていきます。 `/app/salinger-tech-blog/` 以下で下記コマンドを実行します。最初の選択肢は `Hosting:...:` をスペースで選択し Enter を入力します。URL が途中で出てくるのでログイン情報を入力して Firebase と GitHub を連携します。プロジェクトのルートディレクトリ、GitHub のアカウントやリポジトリなどについては各自の環境に合わせて読みかえてください。

```
$ firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /app/salinger-tech-blog

Before we get started, keep in mind:

  * You are currently outside your home directory

? Which Firebase features do you want to set up for this directory? Press
Space to select features, then Enter to confirm your choices. Hosting:
Configure files for Firebase Hosting and (optionally) set up GitHub Action
 deploys

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory:
salinger-tech-blog (salinger-tech-blog)
i  Using project salinger-tech-blog (salinger-tech-blog)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? out
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? Yes
? File out/404.html already exists. Overwrite? No
i  Skipping write of out/404.html
? File out/index.html already exists. Overwrite? No
i  Skipping write of out/index.html

i  Didn't detect a .git folder. Assuming /app/salinger-tech-blog is the project root.
i  Authorizing with GitHub to upload your service account to a GitHub repository's secrets store.

Visit this URL on this device to log in:
https://github.com/login/oauth/authorize?client_id=89cf50f02ac6aaed3484&state=131313504&redirect_uri=http%3A%2F%2Flocalhost%3A9005&scope=read%3Auser%20repo%20public_repo

Waiting for authentication...

✔  Success! Logged into GitHub as DS-Salinger

? For which GitHub repository would you like to set up a GitHub workflow?
(format: user/repository) DS-Salinger/salinger-tech-blog

✔  Created service account github-action-654045325 with Firebase Hosting admin permissions.
✔  Uploaded service account JSON to GitHub as secret FIREBASE_SERVICE_ACCOUNT_SALINGER_TECH_BLOG.
i  You can manage your secrets at https://github.com/DS-Salinger/salinger-tech-blog/settings/secrets.

? Set up the workflow to run a build script before every deploy? Yes
? What script should be run before every deploy? npm ci && npm run build

✔  Created workflow file /app/salinger-tech-blog/.github/workflows/firebase-hosting-pull-request.yml
? Set up automatic deployment to your site's live channel when a PR is
merged? Yes
? What is the name of the GitHub branch associated with your site's live
channel? main

✔  Created workflow file /app/salinger-tech-blog/.github/workflows/firebase-hosting-merge.yml

i  Action required: Visit this URL to revoke authorization for the Firebase CLI GitHub OAuth App:
https://github.com/settings/connections/applications/89cf50f02ac6aaed3484
i  Action required: Push any new workflow file(s) to your repo

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
/app/salinger-tech-blog # firebase deploy

=== Deploying to 'salinger-tech-blog'...

i  deploying hosting
i  hosting[salinger-tech-blog]: beginning deploy...
i  hosting[salinger-tech-blog]: found 38 files in out
✔  hosting[salinger-tech-blog]: file upload complete
i  hosting[salinger-tech-blog]: finalizing version...
✔  hosting[salinger-tech-blog]: version finalized
i  hosting[salinger-tech-blog]: releasing new version...
✔  hosting[salinger-tech-blog]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/salinger-tech-blog/overview
Hosting URL: https://salinger-tech-blog.web.app
```

2回目以降デプロイを実行するにはプロジェクトのルートで下記コマンドを実行することで実施可能です。

```
$ firebase deploy
```

## GitHub Actions による自動ビルド設定

　GitHub の main ブランチに変更がマージされたとき、自動で Firebase 上に変更が反映される仕組みをつくります。作成したテンプレートの各種ファイルに修正を加えていきます。まずこれまでの内容を `git add -> git commit` しておきます。 `.gitignore` に `.firebase` を追加します。`app/salinger-tech-blog/firebase-hosting-merge.yml` と `.github/workflows/firebase-hosting-pull-request.yml` の `run:` の部分を修正し、`with:` の部分の末尾に `entryPoint` を下記のように追加します。

```yml
- run: cd ./app/react-next-blog-sample && npm ci && npm run build
...
- uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_REACT_NEXT_BLOG_SAMPLE }}'
          channelId: live
          projectId: salinger-tech-blog
          entryPoint: ./app/salinger-tech-blog
```

ホスト側の `salinger-tech-blog` に移動して下記コマンドを実行し自動生成された `.github` をプロジェクトの直下に移動しておきます。

```bash
$ sudo mv app/salinger-tech-blog/.github .
```

次は GitHub Actions の自動デプロイ機能を確認します。`components/intro.tsx` の `h1` タグ内を適当に編集して `git add -> git commit` します。`main` ブランチに Push したタイミングで自動で CI が動いて Hosting URL: https://salinger-tech-blog.web.app を見に行けば更新されているはずです。もし更新されていない場合は `https://github.com/[アカウント名]/[リポジトリ名]/actions` を見れば自動実行の結果が見れるのでエラーを確認して対応しましょう。

筆者はこの部分で下記のようなトラブルがおきました。

1. 自動生成された `.github/workflow` 以下の部分がルートディレクトリになかったので GitHub Actions がそもそも動かなかった
2. ビルドの実行時にワーキングディレクトリが `app/salinger-tech-blog` 以下になっていなかったので `npm ci && npm build` でこけた
3. `entryPoint` の設定を記述しないまま動かし、Firebase 関連のエラーが出た

# おわりに

　これでブログの雛形の作成、インフラの整備、自動デプロイの仕組みができました。次回の記事では自分好みになるようにブログを編集していきます。
