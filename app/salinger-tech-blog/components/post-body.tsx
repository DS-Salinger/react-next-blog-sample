import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="sm:max-w-md md:max-w-4xl sm:mx-0 md:mx-6 -mt-6 sm:p-4 p-2 mb-20"> 
      <div className={markdownStyles['markdown']}
           dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </div>
  );
}

 

export default PostBody
