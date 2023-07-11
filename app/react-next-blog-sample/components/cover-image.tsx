import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  title: string
  src: string
  width: number
  height: number
  slug?: string
}

const CoverImage = (
  { title, src, width=300, height=200, slug }: Props
) => {
  const image = <Image
    src={src}
    width={width}
    height={height}
    alt={`Cover Image for ${title}`}
    className={cn({'hover:shadow-lg': slug})}
  />;
  
  return (
    <div>
      {slug ? (
        <Link as={`/posts/${slug}`}
	      href="/posts/[slug]"
	      aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
