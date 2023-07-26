import PostsPage from '../components/posts-page'
import Post from '../interfaces/post'
import PostsPageType from '../interfaces/post-page'
import { getTargetTagPosts } from '../lib/api'

const NLPPostsPage: React.FC<PostsPageType> = (props) => {
  return(
      <PostsPage
	title={"NLP"}
	posts={props.posts} />
  );
}
  
export const getStaticProps = async () => {
  const nlpPosts = getTargetTagPosts(
    "NLP",
    ['title',
     'date',
     'slug',
     'author',
     'coverImage',
     'tags']
  )

  return {
    props: {
      posts: nlpPosts
    },
  }
}

export default NLPPostsPage;
