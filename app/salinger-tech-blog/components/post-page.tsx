import Link from 'next/link'
import Post from '../interfaces/post'
import PaginationPosts from '../components/pagination'

interface PostPageType {
  title: string;
  posts: Post[];
}

const PostPage: React.FC<PostPageType> = (
  { title, posts }: { title: string, posts: Post[] }
) => {
  return (
    <div className="min-h-screen">
      <div className="grid sm:grid-cols-1 md:grid-cols-1
		      mx-8 gap-8 h-auto min-h-fit">
	<PostsContainer title={ title }
			posts={ posts }/>
      </div>
    </div>
  );
}

interface PostsContainerType {
  title: string;
  posts: Post[]; 
}

const PostsContainer: React.FC<PostsContainerType> = (
  { title, posts }:
  { title: string, posts: Post[] }
) => {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:col-span-1">
	<div className="col-span-2">
          <h2 className="col-span-2 text-white
			 text-3xl my-2 mx-2 h-fit">
            <Link href="/"
		  className="hover:underline">Home
	    </Link> / { title }
	  </h2>
	</div>
      </div>

      <div>
	<PaginationPosts posts={posts} />
      </div>
    </>
  );
}

export default PostPage;
