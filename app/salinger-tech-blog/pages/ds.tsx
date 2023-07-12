import BaseFrame from '../components/base-frame'
import PostPage from '../components/post-page'
import { getTargetTagPosts } from '../lib/api'

const DSPostsPage = ({ dsPosts }): React.FC => {
  const contents = <PostPage title={"Data Science"}
			     posts={dsPosts} />;
  return (
    <>
      <BaseFrame children={contents} />
    </>
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
      dsPosts: dsPosts
    },
  }
}

export default DSPostsPage;
