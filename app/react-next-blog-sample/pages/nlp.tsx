import BaseFrame from '../components/base-frame'
import PostPage from '../components/post-page'
import { getAllPosts } from '../lib/api'

const NLPPostsPage = ({ nlpPosts }): React.FC => {
  const contents = <PostPage title={"NLP"} posts={nlpPosts} />;
  return (
    <>
      <BaseFrame children={contents} />
    </>
  );
}

export const getStaticProps = async () => {
  const nlpPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: {
      nlpPosts: nlpPosts
    },
  }
}

export default NLPPostsPage;
