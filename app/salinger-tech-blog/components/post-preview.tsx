import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import Post from '../interfaces/post'

interface PostPreviewType {
  post: Post;
}

const PostPreview: React.FC<PostPreviewType> = ({ post }: { post: Post }) => {
  return (
    <>      
      <div className="sm:col-span-2 md:col-span-1">
	<div className="h-64
			sm:p-10 sm:mx-2 
			md:mx-2 md:mt-1 md:p-1
			flex justify-center items-center
			bg-mygray bg-opacity-10">
          <CoverImage slug={post.slug}
		      title={post.title}
		      src={post.coverImage.url}
		      width={post.coverImage.width}
		      height={post.coverImage.height}/>
	</div>

	<div className="h-32 mt-1 mb-4 mx-2
			bg-mygray bg-opacity-10">
	  <h3 className="text-2xl mb-3">
	    <div className="text-lg text-white mb-4 p-1">
              <DateFormatter dateString={post.date} />
	    </div>

	    <Link
              as={`/posts/${post.slug}`}
              href="/posts/[slug]"
              className="hover:underline flex text-white p-1">
              {post.title}
            </Link>
	  </h3>
	</div>
      </div>
    </>
  );
}

export default PostPreview
