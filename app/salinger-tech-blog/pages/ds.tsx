import PostsPage from '../components/posts-page'
import Post from '../interfaces/post'
import PostsPageType from '../interfaces/post-page'
import { getTargetTagPosts } from '../lib/api'

const DsPostsPage: React.FC<PostsPageType> = (props) => {
  return(
      <PostsPage
	title={"Data Science"}
	posts={props.posts} />
  );
}
  
export const getStaticProps = async () => {
  const dsPosts = getTargetTagPosts(
    "Data Science",
    ['title',
     'date',
     'slug',
     'author',
     'coverImage',
     'tags']
  )

  return {
    props: {
      posts: dsPosts
    },
  }
}

export default DsPostsPage;

