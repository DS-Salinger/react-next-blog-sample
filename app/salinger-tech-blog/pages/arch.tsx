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
