import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="sm:text-3xl md:text-4xl font-bold 
		   tracking-tighter leading-normal text-left
		   mb-10 mt-4">
      {children}
    </h1>
  )
}

export default PostTitle
