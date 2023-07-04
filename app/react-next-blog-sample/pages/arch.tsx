import BaseFrame from '../components/base-frame'
import PostPage from '../components/post-page'
import { getAllPosts } from '../lib/api'

const ArchPostsPage = ({ archPosts }): React.FC => {
  const contents = <PostPage title={"Arch"} posts={archPosts} />;
  return (
    <>
      <BaseFrame children={contents} />
    </>
  );
}

export const getStaticProps = async () => {
  const archPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: {
      archPosts: archPosts
    },
  }
}

export default ArchPostsPage;
