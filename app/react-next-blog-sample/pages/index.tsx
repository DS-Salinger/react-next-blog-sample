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

const PostsContainer = (
  { title, posts, link }: PostContainerProps
): react.FC => {
  const postNum = posts.length;

  return (
    <div className="grid sm:grid-cols-2 md:col-span-1">
      <div className="col-span-2">
        <h2 className="col-span-2 text-white
		       text-3xl my-2 mx-2">
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

type StaticContentProps = {
  title: string,
  children: React.ReactNode
}

const StaticContent = (
  { title, children }: StaticContentProps
) : react.FC => {
  return (
    <>
      <h2 className="col-span-2 
		     text-white text-3xl
	               mx-2 mb-2">
        {title}
      </h2>
      <div className="col-span-2 
		      mx-2 mb-8 h-[21rem] text-white
		      bg-mygray bg-opacity-10">
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

const MainContents = (
  { newPosts, dsPosts, archPosts, nlpPosts, otherPosts}: IndexProps
): react.FC => {
  return (
    <>
      <div className="grid
		      sm:grid-cols-1 md:grid-cols-2
		      mx-8 gap-8">
	<div className="grid grid-cols-2 mt-2">
	  <StaticContent title={"About"}
			 children={<HomeAbout />}/>
	  <br />
	  <StaticContent title={"Author"}
			 children={<HomeAuthor />} />
	</div>
	
	<PostsContainer title={"New"}
			posts={newPosts}
			link={"/new"}/>
      </div>
      
      <div className="grid
		      sm:grid-cols-1 md:grid-cols-2
		      gap-8 mb-2 mx-8">
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
			posts={nlpPosts}/>
	<PostsContainer title={"Other"}
			posts={otherPosts}
			link={"/other"}/>
      </div>
    </>
  );
}

const Index = (
  { newPosts, dsPosts, archPosts, nlpPosts, otherPosts}: IndexProps
): react.FC => {
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
