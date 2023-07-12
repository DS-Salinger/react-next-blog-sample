import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="sm:max-w-xl md:max-w-3xl mx-2 -mt-6"> 
      <div className={markdownStyles['markdown']}
           dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </div>
  );
}

 

export default PostBody
