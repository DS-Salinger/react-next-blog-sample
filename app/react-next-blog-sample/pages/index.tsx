import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'


type IndexProps = {
  newPosts: Post[],
  dsPosts: Post[],
  archPosts: Post[],
  nlpPosts: Post[],
  otherPosts: Post[]
}


function PostContainer({ title, thumbnail}:
                       { title: string, thumbnail: string }): react.FC {
  return (
    <div className="sm:col-span-2 md:col-span-1">
      <div className="h-36 mx-2 mt-1
                      bg-mygray bg-opacity-10">
        {thumbnail}
      </div>
      <div className="h-16 mt-1 mb-4 mx-2
                      bg-mygray bg-opacity-10">
        {title}
      </div>
    </div>
  );
}

function PostsContainer({ title, posts}:
			{ title:string, posts:Post[] }): react.FC {
  return (
    <div className="grid sm:grid-cols-2 md:col-span-1">
        <h2 className="col-span-2 text-white text-3xl my-2 mx-2">
          {title}
	</h2>
	<PostContainer title={"a"}
                       thumbnail={"b"}/>
	<PostContainer title={"c"}
                       thumbnail={"d"}/>
	<PostContainer title={"e"}
                       thumbnail={"f"}/>
	<PostContainer title={"g"}
                       thumbnail={"h"}/>
    </div>
  )
}

function StaticContent({ title, contents}:
		 { title:string, contents:any }): react.FC {
  return (
    <>
        <h2 className="col-span-2 text-white text-3xl
	               mx-2 mb-2">
          {title}
	</h2>
  	<div className="col-span-2 mx-2 mb-3 h-44
			bg-mygray bg-opacity-10">
	  a
	</div>
    </>
  )
}

function MainMenu(): react.FC {
  return (
    <div className="bg-mygray bg-opacity-30 text-white">
      <div className="mx-8 mt-8 text-3xl">
	Menu
      </div>
      <div className="mx-12 mt-4 text-2xl">
	Author
      </div>
      <div className="mx-12 mt-4 text-2xl">
	New
      </div>
      <div className="mx-12 mt-4 text-2xl">
	DS
      </div>
      <div className="mx-12 mt-4 text-2xl">
	Arch
      </div>
      <div className="mx-12 mt-4 text-2xl">
	NLP
      </div>
      <div className="mx-12 mt-4 text-2xl">
	Other
      </div>
    </div>
  );
}


function MainContents(){
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 mx-8 gap-8">
	<div className="grid grid-cols-2 mt-2">
	  <StaticContent title={"Author"} />
	  <br />
	  <StaticContent title={"About"} />
	</div>
	
	<PostsContainer title={"New"} />
      </div>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-2 mx-8">
	<PostsContainer title={"DS"}/>
	<PostsContainer title={"Arch"} />
      </div>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-2 mx-8">
	<PostsContainer title={"NLP"} />
	<PostsContainer title={"Other"} />
      </div>
    </>
  );
}

export default function Index({ newPosts,
				dsPosts,
				archPosts,
				nlpPosts,
				otherPosts }: IndexProps) {
  const heroPost = newPosts[0]
  const morePosts = newPosts.slice(1)
  
  return (
    <>
      <Layout>
        <Head>
          <title>さりんじゃー's Tech Blog</title>
        </Head>

        <Container>
	  <div className="grid grid-cols-4">
	    <div className="hidden lg:grid lg:col-span-1">
	      <MainMenu className=""/>
	    </div>
	    
	    <div className="col-span-4 lg:col-span-3">
	      <h1 className="text-white
			     sm:text-5xl md:text-7xl my-4 mx-6">
		さりんじゃー's Tech Blog
	      </h1>
	      
	      <MainContents className="" />
	    </div>
	  </div>
	  {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const newPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  const dsPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  const archPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  const nlpPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  const otherPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])


  return {
    props: {
      newPosts: newPosts,
      dsPosts: dsPosts,
      archPosts: archPosts,
      nlpPosts: nlpPosts,
      otherPosts: otherPosts,
    },
  }
}
