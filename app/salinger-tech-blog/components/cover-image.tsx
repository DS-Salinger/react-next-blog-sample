import cn from 'classnames'
import Link from 'next/link'

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
  const image = <img
		  src={src}
		  width={width}
		  height={height}
		  style={{ width: width, height: height }}
		  alt={`Cover Image for ${title}`}
                  className={cn({'hover:shadow-lg': slug})} />;
  
  return (
    <div>
      {slug ? (
        <Link as={`/posts/${slug}`}
	      passHref legacyBehavior
	      href="/posts/[slug]"
	      aria-label={title}>
          <a>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
