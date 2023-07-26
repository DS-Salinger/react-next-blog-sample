import BaseFrame from '../components/base-frame'
import PostPage from '../components/post-page'
import Post from '../interfaces/post'
import { getTargetTagPosts } from '../lib/api'

interface PostsPageType {
  title: string;
  posts: Post[];
}

const PostsPage: React.FC<PostsPageType> = (
  { title, posts }: { title: string, posts: Post[] }
) => {
  const contents = <PostPage title={title}
			     posts={posts} />;
  return (
    <>
      <BaseFrame children={contents} />
    </>
  );
}

export default PostsPage;
