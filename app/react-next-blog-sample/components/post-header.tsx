import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Link from 'next/link'
import type Author from '../interfaces/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
  tags: string[]
}

const convertTagToPath = (tag: string): string => {
  switch (tag) {
    case "Data Science":
      return "ds";
    case "NLP":
      return "nlp";
    case "Architecture":
      return "arch";
    case "Other":
      return "other";
    default:
      return "other";
  }
}

const PostHeader = ({ title, coverImage,
		      date, author, tags }: Props) => {

  const tagButtons = tags.map((tag) =>
    <button className="bg-mygray/20 text-white
		       text-lg rounded px-4 py-2
		       shadow-md"
	    disabled
	    key={title}>
      {tag}
    </button>
  )
  return (
    <div className="grid grid-cols-2
		    sm:w-full md:w-[50rem]
		    p-2">
      <div className="col-span-2 
		      justify-self-center place-item-center
		      pt-4 pb-2 mb-8
		      sm:w-[32rem] md:w-[40rem]">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="col-span-2 text-xl">
	<Link href="/"
	      className="hover:underline">Home</Link>
	&nbsp; / &nbsp; 
	<Link href={"/" + convertTagToPath(tags[0])}
	      className="hover:underline">{tags[0]}</Link>
      </div>
      
      <div className="grid col-span-2 -mb-4">
	<PostTitle>{title}</PostTitle>
      </div>
      
      <div className="flex col-span-2 pb-6 gap-x-2">
	{tagButtons}
      </div>

      <div className="mb-6 text-lg col-span-1 p-2">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="flex pb-6 m-2
		      text-xl col-span-1
		      items-center justify-end">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostHeader
