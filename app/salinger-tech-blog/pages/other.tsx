import PostsPage from '../components/posts-page'
import Post from '../interfaces/post'
import PostsPageType from '../interfaces/post-page'
import { getTargetTagPosts } from '../lib/api'

const OtherPostsPage: React.FC<PostsPageType> = (props) => {
  return(
      <PostsPage
	title={"Other"}
	posts={props.posts} />
  );
}
  
export const getStaticProps = async () => {
  const otherPosts = getTargetTagPosts(
    "Other",
    ['title',
     'date',
     'slug',
     'author',
     'coverImage',
     'tags']
  )

  return {
    props: {
      posts: otherPosts
    },
  }
}

export default OtherPostsPage;
