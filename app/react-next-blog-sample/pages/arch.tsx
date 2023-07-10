import BaseFrame from '../components/base-frame'
import PostPage from '../components/post-page'
import { getTargetTagPosts } from '../lib/api'

const ArchPostsPage = ({ archPosts }): React.FC => {
  const contents = <PostPage title={"Architecture"}
			     posts={archPosts} />;
  return (
    <>
      <BaseFrame children={contents} />
    </>
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
      archPosts: archPosts
    },
  }
}

export default ArchPostsPage;
