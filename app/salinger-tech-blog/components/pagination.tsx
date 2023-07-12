import ReactPaginate from 'react-paginate'
import Post from 'interfaces/post'
import PostPreview from '../components/post-preview'
import { useState } from 'react'


const PaginationPosts = ({ posts }: { posts: Post[]}): React.FC => {
  const [offset, setOffset] = useState(0);
  const perPage: number = 8;

  const handlePageClick = (event) => {
    // event.selected is "page number"
    setOffset(event.selected * perPage);
  }

  // Pagination
  return (
    <>
      <div className="grid sm:grid-cols-2 md:col-span-1">
	{posts
	  .slice(offset, offset + perPage)
	  .map((p) => <PostPreview post={p} key={p.slug} />)}
      </div>

      <div className="text-white">
	<ReactPaginate
	  pageCount={Math.ceil(posts.length / perPage)}
	  merginPageDisplayed={1}
	  pageRangeDisplayed={3}
          onPageChange={handlePageClick}	  
	  previousLabel={'< Prev'}
          nextLabel={'Next >'}
	  breakLabel={'...'}
	  containerClassName={'flex justify-center w-auto text-xl text-white my-4'}
	  subContainerClassName={''}
	  activeClassName={'flex justify-center bg-myorange items-center border border-mygray/20'}
	  activeLinkCLassName={''}
	  previousClassName={'flex justify-center items-center bg-mygray/10 sm:h-8 sm:w-20 md:h-10 md:w-20 border border-mygray/20'}
	  previousLinkClassName={''}
	  nextClassName={'flex justify-center items-center bg-mygray/10 sm:h-8 sm:w-20 md:h-10 md:w-20 border border-mygray/20'}
	  nextLinkClassName={''}
	  pageClassName={'flex justify-center items-center bg-mygray/10 sm:h-8 sm:w-8 md:w-10 md:h-10 border border-mygray/20'}
	  pageLinkClassName={''}
          disabledClassName={'text-mygray/40'}
	  disabledLinkClassName={''}
	  breakClassName={'flex justify-center items-center bg-mygray/10 sm:h-8 sm:w-8 md:w-10 md:h-10 border border-mygray/20'}
	  breakLinkClassName={''}
	/>
      </div>
    </>
  );
}

export default PaginationPosts;
