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
        <h2 className="col-span-2 text-white mb-2
		       h-10
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
      <div className="mt-8">
	<h2 className="grid col-span-2
		       h-10 mb-2 md:mb-0 
		       text-white text-3xl mx-2">
          {title}
	</h2>
      </div>
      
      <div className="grid col-span-2 mx-2 mt-0 md:-mt-2 mb-1
		      h-[25rem]
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
      <div className="mb-2">
	<h2 className="col-span-2 mb-2 md:-mb-5
		       h-10
		       text-white text-3xl mx-2">
          {title}
	</h2>
      </div>
      <div className="grid col-span-2 mx-2
		      h-80
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
		      mx-0 sm:mx-0 md:mx-8 gap-8">
	<div className="grid grid-cols-2">
	    <AboutContent title={"About"}
			  children={<HomeAbout />}/>
	    <AuthorContent title={"Author"}
			   children={<HomeAuthor />}/>
	    <div className="flex">
	      <p></p>
	    </div>
	</div>
	
	<PostsContainer title={"New"}
			posts={newPosts}
			link={"/new"}/>
      </div>
      <div className="grid
		      sm:grid-cols-1 md:grid-cols-2
		      gap-8 mb-4 sm:mx-0 md:mx-8">
	<PostsContainer title={"DS"}
			posts={dsPosts}
			link={"/ds"}/>
	<PostsContainer title={"Arch"}
			posts={archPosts}
			link={"/arch"}/>
      </div>
      
      <div className="grid
		      sm:grid-cols-1 md:grid-cols-2
		      gap-8 mb-10 sm:mx-0 md:mx-8">
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
