import BaseFrame from '../components/base-frame'
import PostPage from '../components/post-page'
import { getAllPosts } from '../lib/api'

const DSPostsPage = ({ dsPosts }): React.FC => {
  const contents = <PostPage title={"DS"} posts={dsPosts} />;
  return (
    <>
      <BaseFrame children={contents} />
    </>
  );
}

export const getStaticProps = async () => {
  const dsPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: {
      dsPosts: dsPosts
    },
  }
}

export default DSPostsPage;
