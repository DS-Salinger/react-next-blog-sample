import Link from 'next/link'
import Post from '../interface/post'
import PostPreview from '../components/post-preview'

const PostPage = ({ title, posts }:
	       { title: string, posts: Post[] }): React.FC => {
  return (
    <div className="min-h-screen">
      <div className="grid sm:grid-cols-1 md:grid-cols-1
		      mx-8 gap-8 h-auto min-h-fit">
	<PostsContainer title={title}
			posts={posts}/>
      </div>
    </div>
  );
}

const PostsContainer = ({ title, posts }:
			{ title: string, posts: Post[] }): React.FC => {
  const postPreviews = posts.map(p => <PostPreview post={p} key={p.title}/>);

  return (
      <div className="grid sm:grid-cols-2 md:col-span-1">
	<div className="col-span-2">
          <h2 className="col-span-2 text-white text-3xl my-2 mx-2 h-fit">
            <Link href="/"
		  className="hover:underline">Home
	    </Link> / {title}
	  </h2>
	</div>

	{postPreviews}
      </div>
  );
}

export default PostPage;
