---
title: 'React + Next.js で自作ブログの作成 (2.テンプレートの改修)'
date: '2023-07-14 21:30:00'
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

## 本記事について

　React + Next.js 学習のために自作ブログを作ったときの諸々の備忘録です。Next.js 公式テンプレートの [blog-starter](https://vercel.com/templates/next.js/blog-starter-kit) をベースに構築しています。作成したコードに関しては[https://github.com/DS-Salinger/salinger-tech-blog](https://github.com/DS-Salinger/salinger-tech-blog) に掲載しているので必要に応じて参照してください。

　今回の「2.テンプレートの改修」では前回 「[1.環境構築](/posts/20230712-create-my-blog-1)」 で作成したテンプレートを本ブログの実現に必要な箇所を書き換えていく際に変更したポイントをまとめました。React、Next.js、TypeScript、Tailwind CSS の基礎知識に関するリンクは前回の記事にまとめています。

## 追加・改修した項目

　ざっくりとした記載ですが、次の機能を追加・改修しました。詳細は本記事で後述しています。

- レスポンシブデザインの実装
   - 画面サイズ3段階で切り替わるように設定
- 各記事のページ改修
   - タグ要素追加
   - 記事の格納先をディレクトリ単位に変更
      - 格納した画像を public 以下に自動コピーし URL を自動変換
- 一覧ページの追加
   - 最新一覧
   - 特定タグを含む記事一覧
- TOPページの構成（デザイン・表示するデータ）
   - ほぼすべて書き直し
- Markdown 変換機能の拡張
   - 変換後のページデザイン変更
   - GFM 対応
   - シンタックスハイライト(+ ファイル名表示)
   - 数式対応
   - 絵文字対応


## ディレクトリ構造

### 【参考】テンプレートから作成した直後のディレクトリ構造

　もともとのテンプレートは下記のような構成になっていました。 

```
(root)
├── Dockerfile
├── README.md
├── app
│   └── react-next-blog-sample
│       ├── 404.html: 404 Not Found ページ
│       ├── @types : TypeScript 型定義ファイル
│       │   └── remark-html.d.ts: remark-html の型定義
│       ├── README.md: 本アプリの README
│       ├── _posts: ブログ記事の格納先(1ファイル=1記事)
│       │   ├── dynamic-routing.md: 記事1
│       │   ├── hello-world.md: 記事2
│       │   └── preview.md: 記事3
│       ├── components: アプリ全体で利用するコンポーネント群(pagesから呼び出す)
│       │   ├── alert.tsx: 画面上部の通知に関するコンポーネント
│       │   ├── avatar.tsx: 筆者のアバターと名前に関するコンポーネント
│       │   ├── container.tsx: メインのコンテンツを表示する部分のコンポーネント
│       │   ├── cover-image.tsx: 記事の画像表示領域部分のコンポーネント(TOP/個別記事)
│       │   ├── date-formatter.tsx: 日付のフォーマット変換用コンポーネント
│       │   ├── footer.tsx: すべてのページで表示されるフッター領域のコンポーネント
│       │   ├── header.tsx: 各記事で表示されるヘッダー領域のコンポーネント
│       │   ├── hero-post.tsx: TOPページにある最新記事領域のコンポーネント
│       │   ├── intro.tsx: TOPのタイトルとディスクリプション領域のコンポーネント
│       │   ├── layout.tsx: アラート、メインコンテンツ、フッタ－の配置を行うコンポーネント
│       │   ├── markdown-styles.module.css: MarkdownをHTMLに変換する際に適用されるCSS
│       │   ├── meta.tsx: headタグ(Favicon、metaタグなど)に関する内容を記載するコンポーネント
│       │   ├── more-stories.tsx: 2番目以降の記事を記載するコンポーネント
│       │   ├── post-body.tsx: 記事ページの本文表示部分のコンポーネント
│       │   ├── post-header.tsx: 記事ページのタイトル＋著者＋画像＋日付表示部分のコンポーネント
│       │   ├── post-preview.tsx: TOPページの記事プレビュー表示部分のコンポーネント
│       │   ├── post-title.tsx: 記事ページのタイトル表示部分のコンポーネント
│       │   └── section-separator.tsx: セクションを区切る水平線のコンポーネント
│       ├── firebase.json: Firebase関連の設定ファイル
│       ├── index.html: Firebaseの初期設定で生成される(今回は削除)
│       ├── interfaces: 型定義を配置
│       │   ├── author.ts: Authorの型定義
│       │   └── post.ts: Postの型定義
│       ├── lib: ライブラリ（Reactの表示に関連するtsxでない）を配置
│       │   ├── api.ts: 記事データを引っ張ってくるAPIを記載
│       │   ├── constants.ts: 各種定数を定義
│       │   └── markdownToHtml.ts: MarkdownをHTMLに変換するライブラリ
│       ├── next-env.d.ts: TypeScriptのための設定ファイル(今回は弄らない)
│       ├── node_modules: インストールされたJavaScript/TypeScriptライブラリの保存先
│       ├── out: ビルドされた本番用ファイルの格納先(今回は弄らない)
│       ├── package-lock.json: パッケージのバージョン管理のためのファイル
│       ├── package.json: 必要なJavaScript/TypeScriptのパッケージを記載
│       ├── pages
│       │   ├── _app.tsx: すべてのページコンポーネントの初期化で使われるコンポーネント
│       │   ├── _document.tsx: 全ページ共通の要素（headタグなど）を定義する
│       │   ├── index.tsx: アプリ全体のトップ画面
│       │   └── posts
│       │       └──[slug].tsx: 各記事の表示方法を記載
│       ├── postcss.config.js: CSS関連のプラグイン
│       ├── public: ファイルをそのまま公開するものを配置
│       │   ├── assets: ここ以下に著者、各ページの画像を配置
│       │   └── favicon: Favicon 画像を配置
│       ├── styles: CSS関連のファイルを配置
│       │   └── index.css: Tailwind CSSの読込が記載されている
│       ├── tailwind.config.js: Tailwind CSS の設定ファイル
│       └── tsconfig.json: TypeScriptに関する設定ファイル
└── docker-compose.yml
```

### 現在のディレクトリ構造

  上記の構造を変更した結果、この記事を作成した時点で下記のようになりました。テンプレートから大幅に変わった部分についてコメントを記載しています。

```
(root)
├── Dockerfile
├── README.md
├── app
│   └── salinger-tech-blog: 名称変更
│       ├── 404.html
│       ├── @types
│       │   └── remark-html.d.ts
│       ├── README.md
│       ├── _post: 記事の格納方法をディレクトリ単位に変更
│       │   ├── YYYYMMDD-[slug]/article.md: 記事本文
│       │   └── YYYYMMDD-[slug]/hoge.png: 画像などの保存先
│       ├── components
│       │   ├── avatar.tsx
│       │   ├── base-frame.tsx: レスポンシブデザインのコントロール
│       │   ├── container.tsx: ページ全体へのコンテナの適用
│       │   ├── cover-image.tsx
│       │   ├── date-formatter.tsx
│       │   ├── dummy-post.tsx: トップページで記事の件数が少ない場合の位置合わせ用
│       │   ├── footer.tsx
│       │   ├── header.tsx
│       │   ├── home-about.tsx: トップページ About
│       │   ├── home-author.tsx: トップページ Author
│       │   ├── layout.tsx
│       │   ├── main-menu.tsx: 画面サイズ最大時に表示する左側メニュー
│       │   ├── markdown-styles.module.css
│       │   ├── meta.tsx
│       │   ├── pagination.tsx: ページネーション処理の実装
│       │   ├── post-body.tsx: 記事本文要素
│       │   ├── post-header.tsx: 記事ヘッダー要素
│       │   ├── post-page.tsx: タグごとの記事一覧ページ
│       │   ├── post-preview.tsx: 記事プレビュー要素
│       │   ├── post-title.tsx: 記事タイトル要素
│       │   └── posts-page.tsx: タグごとの記事一覧へのメニュー埋め込み
│       ├── firebase.json
│       ├── interfaces
│       │   ├── author.ts
│       │   ├── post-page.ts: タグごとの記事一覧ページで利用する型
│       │   └── post.ts
│       ├── lib
│       │   ├── api.ts
│       │   ├── constants.ts
│       │   └── markdownToHtml.ts
│       ├── next-env.d.ts
│       ├── node_modules
│       ├── out
│       ├── package-lock.json
│       ├── package.json
│       ├── pages
│       │   ├── _app.tsx
│       │   ├── _document.tsx
│       │   ├── arch.tsx: 特定タグを含む記事一覧ページ
│       │   ├── ds.tsx: 特定タグを含む記事一覧ページ
│       │   ├── index.tsx: トップページ
│       │   ├── new.tsx: 最新記事一覧ページ
│       │   ├── nlp.tsx: 特定タグを含む記事一覧ページ
│       │   ├── other.tsx: 特定タグを含む記事一覧ページ
│       │   └── posts/[slug].tsx
│       ├── postcss.config.js
│       ├── public
│       │   ├── assets
│       │   └── favicon
│       ├── styles
│       │   └── index.css
│       ├── tailwind.config.js
│       └── tsconfig.json
└── docker-compose.yml
```


# 追加・改修した項目の詳細

## レスポンシブデザインの実装

　`tailwind.config.js` の `screens` オプションで画面幅に対する接頭語を指定可能です。Tailwind 側でそれぞれの接頭語を `className` で指定する各クラスに指定することで幅に応じたデザインになるようにコントロールできます。今回は3段階で携帯端末用のコンパクトなデザイン、メインメニューなし、メインメニューあり、の3段階にしたかったため、sm、md、lg の3段階で設定しました。


```js:app/salinger-tech-blog/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        myblack: '#0D0D0D',
        mygray: '#BABABA',
        myred: '#FF0000',
        myorange: '#F15A24',
        myyellow: '#FFC800',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
```

　次に画面サイズに応じて一定サイズ以上の時にメニューを表示するように `base-frame.tsx` にメニューの ON / OFF を制御する部分を記述しました。画面が大きなときは `grid` で4列分を確保し、左側 1/4 をメニュー、 残り右側 3/4 をコンテンツエリアとして、一定サイズ以下のときは 3列分のみ確保するような形にして、メインコンテンツ部分のサイズは変えないような挙動にしています。メインコンテンツの部分については `children` として渡しており、トップページと記事ページそれぞれで共通としています。メインメニューの中身は components の内部に切り出しています。

```tsx:app/salinger-tech-blog/components/base-frame.tsx
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import MainMenu from '../components/main-menu'
import Container from '../components/container'

type Props = {
  children?: React.ReactNode
}

const BaseFrame = ({ children }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>さりんじゃー's Tech Blog</title>
        </Head>

        <Container>
          <div className="grid grid-cols-4">
	        <div className="hidden lg:grid lg:col-span-1 py-4">
	          <MainMenu />
	        </div>
	    
	        <div className="col-span-4 lg:col-span-3">
	          <h1 className="text-white sm:px-4
			                 text-6xl my-4 sm:mx-3 md:mx-6">
                <span className="bg-gradient-to-r
			                     flex
                                 from-myred via-myorange to-myyellow
                                 sm:bg-[length:71%_5px]
                                 md:bg-[length:45%_5px]
                                 bg-left-bottom
                                 bg-no-repeat">
                  <Link href="/">さりんじゃー's Tech Blog</Link>
		        </span>
	          </h1>
	          {children}
	        </div>
	      </div>
        </Container>
      </Layout>
    </>
  );
}

export default BaseFrame
```

本筋からはずれるが、ブログタイトルの下線のグラデーションもここで定義しており、

```tsx
<span className="bg-gradient-to-r
				 flex
				 from-myred via-myorange to-myyellow
				 sm:bg-[length:71%_5px]
				 md:bg-[length:45%_5px]
				 bg-left-bottom
				 bg-no-repeat">
  <Link href="/">さりんじゃー's Tech Blog</Link>
</span>
```

の span タグのクラス部分で指定しています。

## 各記事のページ改修

### タグ要素追加

　記事にタグをつけられるようにし、トップページや一覧ページでタグを利用した絞り込みができるようにしています。現在は最初の要素が記事の代表タグとして絞り込みに利用されるようにしています。将来的には順不同にし、タグ検索機能なども実装する予定です。

　タグ定義をどのように行っているかというと記事の Markdown 冒頭部分で `tags:` を追加しリスト構造として持たせています。

```yaml
---
title: 'React + Next.js で自作ブログの作成 (1.環境構築編)'
date: '2023-07-13 00:30:00'
author:
  name: さりんじゃー
  picture: '/assets/author.png'
coverImage:
  url: '@@image@@/blog-starter-page.png'
  width: 250
  height: 200
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

...
```

　次に `interfaces/posts.ts` にある Post 型の定義に `tags: string[]` を追加しています。Post 型を利用している部分に tags を追記すればOKです。

```ts:app/salinger-tech-blog/interfaces/posts.ts
import type Author from './author'

type PostType = {
  slug: string,
  title: string,
  date: string,
  coverImage: {
    url: string,
    width: number,
    height: number
  },
  author: Author,
  ogImage: {
    url: string
  }
  tags: string[],
  content: string
}

export default PostType
```

`app/salinger-tech-blog/lib/api.ts` に `getAllPosts()` を参考にタグで対象のドキュメントを絞り込み取得する関数 `getTargetPosts()` を実装。あとはドキュメント取得の際にこの関数を各所から呼び出して利用しています。

```ts:app/salinger-tech-blog/lib/api.ts
...
export function getTargetTagPosts(
  tag: string,
  fields: string[]
) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post) => post.tags[0] === tag)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
```

### 記事の格納先をディレクトリ単位に変更

　地味に実装がややこしかった部分です。_post 以下ににそのままディレクトリを作成し、`article.md` から同一ディレクトリにある画像を相対パスで参照しようとしても参照できませんでした。これは Next.js の仕様で `public` 以下に格納する前提があるため、格納した画像を `public` 以下に自動コピーしURLを自動変換してアクセスできるようにする方向で実装しました。実現するにはプラグインの `copy-webpack-plugin` と `write-file-webpack-plugin` を利用すればOKです。ビルド時に自動でコピーしてくれます。下記コマンドでインストール可能です。

```bash
$ npm install -S copy-webpack-plugin write-file-webpack-plugin
```

`next.config.js` を `app/salinger-tech-blog/` 以下に次の内容で作成しました。

```js:app/salinger-tech-blog/next.config.js
const { resolve } = require('path');
const CopyFilePlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  webpack(config) {
    config.plugins.push(
      new CopyFilePlugin({
        patterns: [
          {
            context: '_posts',
            from: '**/*.{jpg,png,svg}',
            to: resolve(__dirname, 'public/assets/images/posts'),
          },
        ],
      }),
      new WriteFilePlugin()
    );

    return (config);
  },
}
```

　ここでは `_posts` 以下のjpg、png、svg 形式画像ファイルを `public/assets/images/posts/[slug]/` にコピーするように設定しています。上記形式のファイル以外もコピーしたい場合は対象の拡張子や別ディレクトリを `patterns` に追記すればOKです。

　次に `app/salinger-tech-blog/lib/api.ts` の `getPostBySlug()` 内でファイルから文字列を読み込んで変数 `fileContents` に格納している部分に、`replace` メソッドで`@@特定の文字列@@`を `/assets/images/posts/${slug}` に置き換える処理を追加しました。今回は実際のコードでは文字列に `image` を指定しています [こちらを参照](https://github.com/DS-Salinger/salinger-tech-blog/blob/main/app/salinger-tech-blog/lib/api.ts)。これで同じディレクトリに格納した画像にアクセスできるようになりました。

　ちなみに上記の置換部分の文字列に関して出現頻度が低いためエスケープ処理を追加していないために解説文中の文字も置き換えられてしまうため回りくどい説明になってしまっていますが、普段使用するのには特段困らないはずなのでそのままにしておく予定です。

```ts:app/salinger-tech-blog/lib/api.ts
export function getPostBySlug(slug: string, fields: string[] = []) {
  const fullPath = join(postsDirectory, `${slug}/article.md`)
  const fileContents = fs
    .readFileSync(fullPath, 'utf8')
    .replace(
      /@@特定の文字列@@/g,
      `/assets/images/posts/${slug}`
    )
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}
```

## TOPページの構成（デザイン・表示するデータ）

　こちらは見た目部分に関してはほぼすべて書き直しの形になっています。

```tsx:app/salinger-tech-blog/pages/index.tsx
import Head from 'next/head'
import Link from 'next/link'
import Post from '../interfaces/post'
import { getAllPosts, getTargetTagPosts } from '../lib/api'
import BaseFrame from '../components/base-frame'
import PostPreview from '../components/post-preview'
import HomeAuthor from '../components/home-author'
import HomeAbout from '../components/home-about'
import DummyPost from '../components/dummy-post'
import Container from '../components/container'
import DateFormatter from '../components/date-formatter'
import Layout from '../components/layout'
import CoverImage from '../components/cover-image'


type PostContainerProps = {
  title: string,
  posts: Post[],
  link: string
}

const PostsContainer: React.FC<PostContainerProps> = (
  { title, posts, link }: PostContainerProps
) => {
  const postNum = posts.length;

  return (
    <div className="grid sm:grid-cols-2 md:col-span-1">
      <div className="col-span-2">
        <h2 className="col-span-2 text-white mb-6
                       text-3xl mx-2">
          {title}
	    </h2>
        {postNum === 0 &&
          <>
	        <DummyPost /> 
	        <br />
	        <DummyPost />
	      </>
	    }
        {postNum === 1 &&
          <>
	        <PostPreview post={posts[0]}/>
	        <br />
	        <DummyPost />
	      </>
	    }
        {postNum >= 2 &&
          <>
	        <PostPreview post={posts[0]}/>
	          <br />
	        <PostPreview post={posts[1]}/>
	      </>
	    }
        {postNum >= 3 &&
          <div className="grid place-items-end mx-3">
	        <Link href={link}
	          className="text-lg text-myorange
		                 hover:underline">
	           Read more
	        </Link>
	      </div>
	    }
      </div>
    </div>
  )
}

type AuthorContentProps = {
  title: string,
  children: React.ReactNode
}

const AuthorContent: React.FC<AuthorContentProps> = (
  { title, children }: AuthorContentProps
) => {
  return (
    <>
      <h2 className="col-span-2 sm:mb-4 md:-mb-8
		             text-white text-3xl mx-2">
        {title}
      </h2>
      
      <div className="col-span-2 mx-2 
		              sm:mb-4 md:mb-0 md:mt-4 h-[23rem]
                      text-white bg-mygray bg-opacity-10">
        {children}
      </div>
    </>
  )
}

type AboutContentProps = {
  title: string,
  children: React.ReactNode
}

const AboutContent: React.FC<AboutContentProps> = (
  { title, children }: AboutContentProps
) => {
  return (
    <>
      <h2 className="col-span-2 sm:mb-4 md:-mb-5
		             text-white text-3xl mx-2">
        {title}
      </h2>
      
      <div className="col-span-2 mx-2 md:mb-0
		              sm:mb-8 md:mb-0 h-[22rem]
                      text-white bg-mygray bg-opacity-10">
	    {children}
      </div>
    </>
  )
}

type IndexProps = {
  newPosts: Post[],
  dsPosts: Post[],
  archPosts: Post[],
  nlpPosts: Post[],
  otherPosts: Post[]
}

const MainContents: React.FC<IndexProps> = (
  { newPosts, dsPosts, archPosts, nlpPosts, otherPosts}: IndexProps
) => {
  return (
    <>
      <div className="grid mt-10 mb-4
		              sm:grid-cols-1 md:grid-cols-2
		              mx-8 gap-8">
	    <div className="grid grid-cols-2">
	      <AboutContent title={"About"}
		                children={<HomeAbout />}/>
	      <AuthorContent title={"Author"}
		                 children={<HomeAuthor />}/>
	    </div>
	    <PostsContainer title={"New"}
		                posts={newPosts}
                        link={"/new"}/>
      </div>
      <div className="grid
		              sm:grid-cols-1 md:grid-cols-2
		              gap-8 mb-4 mx-8">
	    <PostsContainer title={"DS"}
		                posts={dsPosts}
			            link={"/ds"}/>
        <PostsContainer title={"Arch"}
		                posts={archPosts}
	                    link={"/arch"}/>
      </div>
      <div className="grid
		              sm:grid-cols-1 md:grid-cols-2
		              gap-8 mb-2 mx-8">
	    <PostsContainer title={"NLP"}
		                posts={nlpPosts}
	                    link={"/nlp"}/>
        <PostsContainer title={"Other"}
		                posts={otherPosts}
	                    link={"/other"}/>
      </div>
    </>
  );
}

const Index: React.FC<IndexProps> = (
  { newPosts, dsPosts, archPosts, nlpPosts, otherPosts}: IndexProps
) => {
  const contents = <MainContents 
                     newPosts={newPosts}
                     dsPosts={dsPosts}
	                 archPosts={archPosts}
                     nlpPosts={nlpPosts}
	                 otherPosts={otherPosts} />;
  return (
    <BaseFrame children={contents} />	
  );
}


export const getStaticProps = async () => {
  const fields = [
    'title', 'date', 'slug',
    'author', 'coverImage', 'tags'
  ]

  return {
    props: {
      newPosts: getAllPosts(fields),
      dsPosts: getTargetTagPosts('Data Science', fields),
      archPosts: getTargetTagPosts('Architecture', fields),
      nlpPosts: getTargetTagPosts('NLP', fields),
      otherPosts: getTargetTagPosts('Other', fields)
    },
  }
}

export default Index;
```

　長いコードになってしまっていますが、元からあった `getAllPosts()` はそのまま利用しており、全件から日付順にソートして取ってきています。`getTargetPosts()` は `getAllPosts()` を改造する形で作成しており、引数に特定のタグを渡すと、そのタグを含むもののみ絞り込む処理を追加しています。今後記事の分類を追加・変更する場合はこの部分を編集します。現在は記事の件数が少ないため何も考えずに全件とって来るような処理効率が悪い挙動になっていますが、将来的には記事の格納ディレクトリの名前に利用している日付を利用して、中身を処理する前に日付でソートしてから最低限の処理を行う形に変更するように改修する予定です。実装の詳細は `lib/api.ts` を参照してください。

　見た目について、前述の画面サイズによるメニューのだし分けをここで行っており、About、著者の紹介、最新記事、各タグを含む記事要素については `components` 以下でそれぞれ定義してここで呼び出す形で実装しています。こちらでも各要素は `grid` を用いて整列させており、画面サイズが一番小さいときは1列レイアウト、ある程度以上であれば2列のレイアウトになるように制御しています。各タグの記事に関して、初期のころは記事がないコンテンツもあるため、最低2件分のコンテンツがない場合はダミーの空白`DummyPost`を用意して空間のサイズ合わせを行うことで見た目の調節を行っていますが、これが良い実装なのか今のスキル感ではちょっとわからないです。

　一か所に押し込めすぎなので、今後どこかのタイミングで見た目にかかわる部分のみここで記述し、パーツは `components` 以下に分割する方向でリファクタリングする予定です。

## 一覧ページの追加

　`app/salinger-tech-blog/pages/` 以下の `new.tsx`、`arch.tsx`、`ds.tsx`、`nlp.tsx`、`other.tsx` でそれぞれ最新記事と各タグを含む記事を全件ページングしながら見れるようなページを作成しました。ここでは `app/salinger-tech-blog/pages/arch.tsx` を例に解説します。まず表示する内容は「全記事」or「各タグに絞りこんだ記事」のプレビューを一定件数ずつページを切り替えながら見れればよい、という状況なので共通化でき、`app/salinger-tech-blog/components/post-page.tsx` に共通の処理として作成しました。こちらを `arch.tsx` などから呼び出して利用しています。データの取得に関しては `index.tsx` でも利用している `getTargetTagPosts()` を共通処理として利用し記事本体のデータを取得しています。

　ページングの実装については `salinger-tech-blog/components/pagination.tsx` に切り出して実装しており、ここで `react-pagenate` という外部のライブラリを利用して実現しています。下記コマンドでインストール可能です。

```bash
$ npm install react-paginate
$ npm install @types/react-paginate
```

　インストール方法や渡している Props の詳細については npm の [このページ](https://www.npmjs.com/package/react-paginate) に詳細の記載があるので気になる場合は参照してください。Tailwind で見た目を合わせるためにページングに関連するコンポーネントのクラスに、見た目にかかわるクラスをブラウザで結果を確認しつつ細かく記述しており、もう少し共通化してシンプルにできる気がしますが、とりあえずリリースを優先して現在の実装にしています。

　当初、この部分の key 指定で失敗し、ページング処理がうまくいかず結構な時間を溶かしました。具体的にはページング処理の確認のため、記事をファイル名だけ変更し大量にコピーしていたのですが、`key={p.title}` と指定していたため同一のタイトルが複数存在してしまっており key が React 側で正しく解釈されず若いページ番号に戻った際に記事が分裂し増えてしまうような挙動になっていました。ユニークになっている記事名を使うように現在の `key={p.slug}` と指定することで問題なく動くのが確認できました。バグの解決のためあれこれ調べたので[React 公式: リストのレンダー](https://ja.react.dev/learn/conditional-rendering) 関連については理解が深まりました。

```tsx:app/salinger-tech-blog/pages/arch.tsx
import PostsPage from '../components/posts-page'
import Post from '../interfaces/post'
import PostsPageType from '../interfaces/post-page'
import { getTargetTagPosts } from '../lib/api'

const ArchPostsPage: React.FC<PostsPageType> = (props) => {
  return(
      <PostsPage
	    title={"Architecture"}
	    posts={props.posts} />
  );
}
  
export const getStaticProps = async () => {
  const archPosts = getTargetTagPosts(
    "Architecture",
    ['title',
     'date',
     'slug',
     'author',
     'coverImage',
     'tags']
  )

  return {
    props: {
      posts: archPosts
    },
  }
}

export default ArchPostsPage;
```

```tsx:app/salinger-tech-blog/components/posts-page.tsx
import BaseFrame from '../components/base-frame'
import PostPage from '../components/post-page'
import Post from '../interfaces/post'
import { getTargetTagPosts } from '../lib/api'

interface PostsPageType {
  title: string;
  posts: Post[];
}

const PostsPage: React.FC<PostsPageType> = (
  { title, posts }: { title: string, posts: Post[] }
) => {
  const contents = <PostPage title={title}
                             posts={posts} />;
  return (
    <>
      <BaseFrame children={contents} />
    </>
  );
}

export default PostsPage;

```

```tsx:app/salinger-tech-blog/components/pagination.tsx
import ReactPaginate from 'react-paginate'
import Post from '../interfaces/post'
import PostPreview from '../components/post-preview'
import { useState } from 'react'

interface PaginationPostsType {
  posts: Post[];
}

const PaginationPosts: React.FC<PaginationPostsType> = (
  { posts }: { posts: Post[] }
) => {
  const [offset, setOffset] = useState(0);
  const perPage: number = 8;

  const handlePageClick = (event) => {
    // event.selected is "page number"
    setOffset(event.selected * perPage);
  }

  // Pagination
  return (
    <>
      <div className="grid sm:grid-cols-2 md:col-span-1">
        {posts
	      .slice(offset, offset + perPage)
	      .map((p) => <PostPreview post={p} key={p.slug} />)}
      </div>

      <div className="text-white">
        <ReactPaginate
	      pageCount={Math.ceil(posts.length / perPage)}
	      marginPagesDisplayed={1}
	      pageRangeDisplayed={3}
          onPageChange={handlePageClick}
	      previousLabel={'< Prev'}
          nextLabel={'Next >'}
	      breakLabel={'...'}
	      containerClassName={'flex justify-center w-auto text-xl text-white my-4'}
	      activeClassName={'flex justify-center bg-myorange items-center border border-mygray/20'}
	      previousClassName={'flex justify-center items-center bg-mygray/10 sm:h-8 sm:w-20 md:h-10 md:w-20 border border-mygray/20'}
	      nextClassName={'flex justify-center items-center bg-mygray/10 sm:h-8 sm:w-20 md:h-10 md:w-20 border border-mygray/20'}
	      pageClassName={'flex justify-center items-center bg-mygray/10 sm:h-8 sm:w-8 md:w-10 md:h-10 border border-mygray/20'}
          disabledClassName={'text-mygray/40'}
	      breakClassName={'flex justify-center items-center bg-mygray/10 sm:h-8 sm:w-8 md:w-10 md:h-10 border border-mygray/20'}
	    />
      </div>
    </>
  );
}

export default PaginationPosts;

```


##  Markdown 変換機能の拡張

　Markdown の変換処理は主に、 [app/salinger-tech-blog/lib/markdownToHtml.ts](https://github.com/DS-Salinger/salinger-tech-blog/blob/main/app/salinger-tech-blog/lib/markdownToHtml.ts) に記載しており、ファイルの読込時に行う文字列置換処理は前述の `api.ts` に記載しています。またデザインにかかわる部分は主に `app/salinger-tech-blog/componetns/markdown-styles.module.css`、一部 `app/salinger-tech-blog/styles/index.css` に記載しています。

```ts:app/salinger-tech-blog/lib/markdownToHtml.ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import remarkMath from 'remark-math'
import remarkEmoji from 'remark-emoji'
import remarkCodeTitles from 'remark-flexible-code-titles'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeMathjax from 'rehype-mathjax'
import langLisp from 'highlight.js/lib/languages/lisp'


export default async function markdownToHtml(
  markdown: string,
  slug: string
) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkEmoji)
    .use(remarkCodeTitles)
    .use(remarkGfm)
    .use(remarkRehype,
	  { allowDangerousHtml: true })
    .use(rehypeStringify,
      { allowDangerousHtml: true })
    .use(rehypeHighlight,
      { ignoreMissing: true,
	    languages: {lisp: langLisp }})
    .use(rehypeMathjax)
    .process(markdown);

  return result.toString();
}

```

　まずは `markdownToHtml.ts` を見てみましょう。今回利用するライブラリを `await unified()` の後に `.use(hoge)` の形でつなげて全適用することでちょっとリッチな機能も含め、 Markdown の HTML 変換を行うことが可能です。ここで利用している unified、remark-parse、remark-rehype、rehype-stringify を通すことで最低限必要な変換が行えます。各ライブラリの細かい話は詳しく解説してくれている記事があったので参考情報として掲載しておきます。

参考： [Remark で広げる Markdown の世界](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/spring-raining/index.html)

ここでは下記コマンドで必要なライブラリをインストールしました。

```bash
$ npm install unified
$ npm install remark-parse
$ npm install remark-rehype
$ npm install rehype-stringify
```

### 変換後のページデザイン変更

　主に以下の2つのファイルに CSS を記載しています。後述の `remark-flexible-code-title` と `remark-gfm` で変換されたHTMLタグが `markdown-styles.module.css` 側ではうまく指定ができなかったため、`index.css` 側で記載していますが `markdown-styles.module.css` 側のみで記載する方法があるかもしれないので、今後要調査です。細かいデザインに関してはあまり CSS に慣れていない中でとりあえず見た目を合わせるためにえいやで実装した部分が多いため、将来どこかのタイミングでリファクタリングしたほうがよいはずです。

```css:app/salinger-tech-blog/componetns/markdown-styles.module.css
/* 色は　tailwind.config.js側で別途設定 */
/*   myred, myorange, mygray など       */

/* 全体の文字サイズ */
.markdown {
    @apply text-lg leading-relaxed;
}

/* 各要素の上下の幅調整 */
.markdown p,
.markdown blockquote {
    @apply my-6;
}

/* 見出しのサイズ、位置、色設定 */
.markdown h1 {
    @apply text-3xl mt-16 mb-8 leading-snug
    border-l-4 pl-4 pb-1 border-myred;
}

.markdown h2 {
    @apply text-2xl mt-14 mb-8 leading-snug
    border-l-4 pl-4 pb-1 border-myorange;
}

.markdown h3 {
    @apply text-xl mt-12 mb-8 leading-snug
    border-l-2 pl-4 pb-1 border-myyellow;
}

.markdown h4 {
    @apply text-lg mt-10 mb-8 leading-snug
    border-l-2 pl-4 pb-1 border-mygray;
}

/* コードブロック関連 */
.markdown code {
    @apply bg-black /*flex overflow-x-auto */;
}

.markdown p > code {
    @apply bg-black mx-2 px-1 shadow-md;
}

.markdown pre {
    @apply bg-black p-4 shadow-md;
}

/* 画像 */
.markdown img {
    @apply mx-auto shadow-md;
}

/* リスト (3階層まで設定) */
.markdown ol {
    @apply list-decimal ml-8 my-4;
}
.markdown ul {
    @apply list-disc ml-8 my-4;
}

.markdown ul ul,
.markdown ol ul,
.markdown ul ul ul,
.markdown ul ol ul,
.markdown ol ul ul,
.markdown ol ol ul {
    @apply list-disc ml-8 my-0;
}

.markdown ul ol,
.markdown ol ol,
.markdown ul ul ol,
.markdown ul ol ol,
.markdown ol ul ol,
.markdown ol ol ol {
    @apply list-decimal ml-8 my-0;
}

/* リンク */
.markdown a {
    @apply text-myorange hover:underline mx-1;
}

/* テーブル */
.markdown table {
    @apply block mt-6 mb-6 text-base overflow-x-auto;
}

.markdown th {
    @apply px-6 py-2 bg-mygray/10 font-bold border border-mygray/10;
}

.markdown td {
    @apply px-6 py-2 bg-mygray/20 border border-mygray/10;
}

/* インラインの数式 */
.markdown mjx-container > svg {
    @apply inline px-1;
}

/* 引用 */
.markdown blockquote {
    @apply px-3 bg-mygray/10 text-lg drop-shadow-md;
}

.markdown blockquote > p {
    @apply break-words whitespace-pre-wrap;
}

/* 水平線 */
.markdown hr {
    @apply border-mygray/20 my-8;
}
```

### GFM対応

　GFMは Github Flavored Markdown の略で、下記のような書式で自動リンク作成、脚注、打消し線、テーブル、タスクリストなどを簡単に作成できるような書式が通常の Markdown に追加されたものです。

```markdown
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done
```

必要なライブラリは下記コマンドでインストール可能です。

```bash
$ npm install remark-gfm
```

適用方法は上記 `app/salinger-tech-blog/lib/markdownToHtml.ts` を参照のこと。

参考：[GitHub: remark-gfm](https://github.com/remarkjs/remark-gfm)

### シンタックスハイライト（＋ファイル名表示）

　Markdown 中でトリプルクォートで囲んだ部分にシンタックスハイライトを適用し、ファイル名を記述した場合はファイル名を適切な形で表示できるようにする機能を追加しました。必要なライブラリは下記コマンドでインストール可能です。

```bash
$ npm install highlight.js
$ npm install rehype-highlight
$ npm install remark-flexible-code-titles
```

　シンタックスハイライトの色に関しては [こちらのデモ](https://highlightjs.org/static/demo/) にある Theme を設定したときに各言語・設定ファイルにおける色の付き方が確認できるので要参照。ここからTheme を選び、 `app/salinger-tech-blog/pages/_app.tsx` で import します。なおデフォルトでインストールされない Theme や特定言語用のシンタックスも一部あります。利用する場合は必要に応じて npm などで別途インストールします。

```tsx:app/salinger-tech-blog/pages/_app.tsx
import 'highlight.js/styles/sunburst.css'
```

`markdownToHtml.ts` のシンタックスハイライトに関連する部分を抜き出したものが次のコードになります。

```ts:app/salinger-tech-blog/lib/markdownToHtml.ts
...
import remarkCodeTitles from 'remark-flexible-code-titles'
...
import rehypeHighlight from 'rehype-highlight'
...
import langLisp from 'highlight.js/lib/languages/lisp'

export default async function markdownToHtml(
  markdown: string,
  slug: string
) {
  const result = await unified()
    ...
    .use(remarkCodeTitles)
	...
    .use(rehypeHighlight,
      { ignoreMissing: true,
	    languages: {lisp: langLisp }})
    ...

```

　ライブラリの読込に関して、Emacs の設定ファイルなどでも使われる Lisp 言語のシンタックスはデフォルトで読み込まれないので `import langLisp from 'highlight.js/lib/languages/lisp'` と記述して別途 import しています。また `.use(rehypeHighlight)` の引数にで import したものを `language` に追記しています。`ignoreMissing` に関しては指定したものなかった場合、エラーにせずデフォルトの書式で出力するオプションです。注意点として remark-rehype と rehype-stringify に `{ allowDangerousHtml: true }` を指定しないと変換時に HTML タグを削除してしまい正しく動作しないので注意です。

```js
    .use(remarkRehype,
	  { allowDangerousHtml: true })
    .use(rehypeStringify,
      { allowDangerousHtml: true })
```

　ここまでで HTML タグへの変換とコード部分の色付けは完了です。ファイル名の表示に関しては `app/salinger-tech-blog/styles/index.css` で指定している下記の部分で調整可能です。`remark-code-container` クラスをもつ div タグがファイル名とコードの部分を包む外側の div タグで、ファイル名はその内側の remark-code-title クラスを持つ div タグが対応しています。 

```css:app/salinger-tech-blog/styles/index.css
/* remark-flexible-code-title */
div.remark-code-title {
    @apply flex bg-mygray/20 w-max px-3 py-1 mt-4 text-base;
}

div.remark-code-container > pre {
    @apply flex bg-black  flex overflow-x-auto;
}
```

参考：[Github: rehype-highlight](https://github.com/rehypejs/rehype-highlight)  
参考：[highlight.js デモ](https://highlightjs.org/static/demo/)

### 数式対応

　Markdown 中で数式が利用できるようになるライブラリ。必要なライブラリは下記コマンドでインストール可能です。

```bash
$ npm install remark-math
$ npm install rehype-mathjax
```

適用方法は上記 `app/salinger-tech-blog/lib/markdownToHtml.ts` を参照。

参考：[GitHub: remark-math](https://github.com/remarkjs/remark-math)

今回は MathJax 形式で記述できるようにしましたが、 KaTeX 形式なども変換可能でその場合は別のライブラリを利用します（参考リンク先を参照のこと）。

### 絵文字対応

　Markdown 中で絵文字が利用できるようになるライブラリ。必要なライブラリは下記コマンドでインストール可能です。

```bash
$ npm install remark-emoji
```

適用方法は上記 `app/salinger-tech-blog/lib/markdownToHtml.ts` を参照のこと。

参考：[GitHub: remark-emoji](https://github.com/rhysd/remark-emoji)


# おわりに

　ここまでで技術ブログとして自分に必要な最低限の実装が完了したので、まだ不十分なところはありますがいったん外部公開しました。積み残している内容としては下記のような要素があるので今後対応していきたいと考えています。

- タグ検索
- 効率の良いページング処理
- CSS 周りの効率化・リファクタリング
- 携帯・小画面の状態でのメニューボタン＆メニュー追加
- 複数の端末でのデザインの確認

