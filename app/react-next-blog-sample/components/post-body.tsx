import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="sm:max-w-sm md:max-w-3xl mx-2"> 
      <div className={markdownStyles['markdown']}
           dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </div>
  );
}

 

export default PostBody
