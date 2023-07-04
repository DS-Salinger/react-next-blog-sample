import Container from '../components/container'
import DateFormatter from '../components/date-formatter'
//import MoreStories from '../components/more-stories'
//import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import CoverImage from '../components/cover-image'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import Link from 'next/link'
import BaseFrame from '../components/base-frame'
import PostPreview from '../components/post-preview'
import HomeAuthor from '../components/home-author'
import HomeAbout from '../components/home-about'


type IndexProps = {
  newPosts: Post[],
  dsPosts: Post[],
  archPosts: Post[],
  nlpPosts: Post[],
  otherPosts: Post[]
}

const DummyPost = (): react.FC => {
  return (
    <>
      <div className="sm:h-1 md:h-64 mx-2 mt-1
                      bg-mygray bg-opacity-0
		      text-white">
      
      </div>
      <div className="sm:h-1 md:h-32 mt-1 mb-4 mx-2
                      bg-mygray bg-opacity-0">
      </div>
    </>
  );
}

const PostsContainer = ({ title, posts }:
			{ title:string, posts:Post[] }): react.FC => {
  const postNum = posts.length;

  return (
    <div className="grid sm:grid-cols-2 md:col-span-1">
      <div className="col-span-2">
        <h2 className="col-span-2 text-white text-3xl my-2 mx-2">
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
	    <a href="#"
	       className="text-lg text-myorange
		     hover:underline">
	      Read more
	    </a>
	  </div>
	}
    
      </div>     
    </div>
  )
}

const StaticContent = ({ title, children }:
		       { title: string, children: React.ReactNode })
		    : react.FC => {
  return (
    <>
        <h2 className="col-span-2 text-white text-3xl
	               mx-2 mb-2">
          {title}
	</h2>
  	<div className="col-span-2 mx-2 mb-8 h-[21rem] text-white
			bg-mygray bg-opacity-10">
	  {children}
	</div>
    </>
  )
}



const MainContents = ({ newPosts,
			dsPosts,
			archPosts,
			nlpPosts,
			otherPosts}: IndexProps): react.FC => {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 mx-8 gap-8">
	<div className="grid grid-cols-2 mt-2">
	  <StaticContent title={"About"} children={<HomeAbout />}/>
	  <br />
	  <StaticContent title={"Author"} children={<HomeAuthor />} />
	</div>
	
	<PostsContainer title={"New"}
			posts={newPosts}/>
      </div>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-2 mx-8">
	<PostsContainer title={"DS"}
			posts={dsPosts}/>
	<PostsContainer title={"Arch"}
			posts={archPosts}/>
      </div>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-2 mx-8">
	<PostsContainer title={"NLP"}
			posts={nlpPosts}/>
	<PostsContainer title={"Other"}
			posts={otherPosts}/>
      </div>
    </>
  );
}

const Index = (
  { newPosts, dsPosts, archPosts, nlpPosts, otherPosts}: IndexProps
): react.FC => {
  const contents = <MainContents className=""
                                 newPosts={newPosts}
                                 dsPosts={dsPosts}
	                         archPosts={archPosts}
                         	 nlpPosts={nlpPosts}
	                         otherPosts={otherPosts}/>;
  return (
    <BaseFrame children={contents} />	
  );
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
      archPosts: archPosts.slice(2),
      nlpPosts: [],//nlpPosts,
      otherPosts: otherPosts.slice(1),
    },
  }
}

export default Index;
