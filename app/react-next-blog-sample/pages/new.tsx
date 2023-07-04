import BaseFrame from '../components/base-frame'
import PostPage from '../components/post-page'
import { getAllPosts } from '../lib/api'

const NewPostsPage = ({ newPosts }): React.FC => {
  const contents = <PostPage title={"New"} posts={newPosts} />;
  return (
    <>
      <BaseFrame children={contents} />
    </>
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

  return {
    props: {
      newPosts: newPosts
    },
  }
}

export default NewPostsPage;
