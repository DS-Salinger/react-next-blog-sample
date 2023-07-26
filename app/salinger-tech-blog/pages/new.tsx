import PostsPage from '../components/posts-page'
import Post from '../interfaces/post'
import PostsPageType from '../interfaces/post-page'
import { getAllPosts } from '../lib/api'

const NewPostsPage: React.FC<PostsPageType> = (props) => {
  return(
      <PostsPage
	title={"New"}
	posts={props.posts} />
  );
}
  
export const getStaticProps = async () => {
  const newPosts = getAllPosts(
    ['title',
     'date',
     'slug',
     'author',
     'coverImage',
     'tags']
  )

  return {
    props: {
      posts: newPosts
    },
  }
}

export default NewPostsPage;
