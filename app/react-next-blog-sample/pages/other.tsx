import BaseFrame from '../components/base-frame'
import PostPage from '../components/post-page'
import { getAllPosts } from '../lib/api'

const OtherPostsPage = ({ otherPosts }): React.FC => {
  const contents = <PostPage title={"Other"} posts={otherPosts} />;
  return (
    <>
      <BaseFrame children={contents} />
    </>
  );
}

export const getStaticProps = async () => {
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
      otherPosts: otherPosts
    },
  }
}

export default OtherPostsPage;
