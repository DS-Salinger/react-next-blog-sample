---
title: 'React + Next.js で自作ブログの作成 (3.Googleクローラー用SEO対策)'
date: '2023-08-26 20:00:00'
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

---

# はじめに

　本記事は「[2.テンプレートの改修](/posts/20230714-create-my-blog-2)」の続きになります。作成したブログで Google Analytics 用のタグを設置し、Google Search Console から Google 検索された情報のデータを見ているとどうやらサイトトップページしかクロールされていないっぽいぞ…？ということがわかったのでその対策をまとめました。

　結論としては Google が検索のインデックス作成に利用しているクローラがたどるのは `herf` 属性が設定された `<a>` タグ（`<a href="hoge">...</a>`）のみなので、トップページからの各種リンクを辿ってくれていなかったようです。本記事「3.Googleクローラー用SEO対策」ではその対策を行い、ついでに Sitemap と robots.txt 自動作成のための設定を行いました。

# 対策

## タグの変更

　Next.js でリンクを作成する場合、`<Link>` タグを利用して動的なルーティングも含めたページ遷移を記述することが多いと思いますが、例えば以下のようにページ一覧ページに飛ぶ部分のリンクを書いていたとします。

```
<Link href={link}
      className="text-lg text-white hover:underline">
  Read more
</Link>
```

この書式ではリンク先のページをクロールしてもらえませんでした。クロールしてもらえるようにするために以下のように `passHref legacyBehavior` を追加し内部の要素を `<a>` タグで囲むように修正します。

```
<Link href={link}
      passHref legacyBehavior
      className="text-lg text-white hover:underline">
  <a>Read more</a>
</Link>
```

【参考資料】 [Next.js 公式: <Link>](https://nextjs.org/docs/pages/api-reference/components/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)

## Sitemap と robots.txt の生成

　sitemap.xml を適切に設置することで Google 検索エンジンのクローラーにサイトの構造をスムーズに伝えることができますが、今回は `next-simtmap` を利用してお手軽に自動生成してみます。

下記コマンドでインストールします。

```
$ npm install --save-dev next-sitemap
```

次にプロジェクトのルートディレクトリに下記設定ファイルを作成します。

```js:next-sitemap.config.js
module.exports = {
  siteUrl: 'https://salinger-tech-blog.web.app/',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './out',
};
```

最後に `package.json` の `scripts` に `"postbuild": "next-sitemap"` を追加します。

```json:package.json
{
  "private": true,
  "scripts": {
    "dev": "next",
    "build": "next build && next export && next-sitemap",
    "start": "next start",
    "typecheck": "tsc"
  },
  ...
```

以下のコマンドでエラーなく out ディレクトリ以下に `sitemap.xml` と `robots.txt` が自動生成されたことを確認する。

```
$ npm run build
...
✨ [next-sitemap] Loading next-sitemap config: file:///app/salinger-tech-blog/next-sitemap.config.js
✅ [next-sitemap] Generation completed
┌───────────────┬────────┐
│    (index)    │ Values │
├───────────────┼────────┤
│ indexSitemaps │   0    │
│   sitemaps    │   1    │
└───────────────┴────────┘
-----------------------------------------------------
 SITEMAPS 
-----------------------------------------------------

   ○ https://salinger-tech-blog.web.app/sitemap.xml

```

```xml:sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url><loc>https://salinger-tech-blog.web.app/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/arch/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/ds/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/new/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/nlp/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/other/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/posts/20230710-win-wsl2-dev/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/posts/20230711-markdown-test/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/posts/20230712-create-my-blog-1/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/posts/20230714-create-my-blog-2/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/posts/20230722-proxmox/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/posts/20230723-ubuntu-server-2204-docker-gpu/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/posts/20230807-book-review-pytorch-advanced/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/posts/20230808-book-review-ml-system-design/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/posts/20230826-nextjs-seo/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>https://salinger-tech-blog.web.app/posts/20230827-book-review-bert-nlp-book/</loc><lastmod>2023-08-30T06:42:08.695Z</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
</urlset>
```


```txt:robots.txt
# *
User-agent: *
Allow: /

# Host
Host: https://salinger-tech-blog.web.app/

# Sitemaps
Sitemap: https://salinger-tech-blog.web.app/sitemap.xml
```

　自動生成されたXMLを見ると個別記事のリンクも正しく生成できていそうです。作成した Sitemap を検索エンジンに明示的に伝えるには Google Search Console でサイトマップを登録する箇所があるので登録しておくと自動で見に行ってくれる…はずなのですが、直後は「サイトマップを読み込めませんでした」のままになりました。

　チェックのために[Validate XML Sitemap](https://www.xml-sitemaps.com/validate-xml-sitemap.html)というサイトがあるので確認してみたところ `No issues detected` になっていたので設置方法自体は問題なさそう。ググったところ「参考資料3」に記載したリンク先でも同じ症状になっていた人がいるのを発見。メインのページで再インデックスのリクエストを送ってしばし待ってみることにします。

【参考資料2】[next-sitemap 公式](https://github.com/iamvishnusankar/next-sitemap)  
【参考資料3】[「サイトマップを読み込めませんでした」の対処方法](https://techblg.app/articles/sitemap-couldn-t-fetch-sitemap-could-not-be-read/)

# おわりに

　微修正を行った結果、適切な形に変更することができました。

# 参考資料

1. [Next.js 公式: <Link>](https://nextjs.org/docs/pages/api-reference/components/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)
2. [next-sitemap 公式](https://github.com/iamvishnusankar/next-sitemap)
