import { useEffect } from "react"
import Head from 'next/head'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import PostTitle from '../../components/post-title'
import BaseFrame from '../../components/base-frame'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  
  const article: React.ReactNode = (
    <div>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="text-white pb-4">
              <Head>
                <title>{post.title}</title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>

	      <div className="grid items-center justify-center">
		<PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
		  tags={post.tags} />
	      
		<PostBody content={post.content} />
	      </div>
            </article>
          </>
        )}
      </Container>
    </div>
  );
  
  return (
    <BaseFrame children={article}/>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(
    params.slug,
    ['title', 'date', 'slug',
     'author', 'content', 'ogImage',
     'coverImage', 'tags']
  )

  const content = await markdownToHtml(
    post.content || '',
    params.slug
  );

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
