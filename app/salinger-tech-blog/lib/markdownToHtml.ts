import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import remarkMath from 'remark-math'
import remarkEmoji from 'remark-emoji'
import remarkCodeTitles from 'remark-flexible-code-titles'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeMathjax from 'rehype-mathjax'
import langLisp from 'highlight.js/lib/languages/lisp'


export default async function markdownToHtml(
  markdown: string,
  slug: string
) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkEmoji)
    .use(remarkCodeTitles)
    .use(remarkGfm)
    .use(remarkRehype,
	 { allowDangerousHtml: true })
    .use(rehypeStringify,
	 { allowDangerousHtml: true })
    .use(rehypeHighlight,
	 { ignoreMissing: true,
	   languages: {lisp: langLisp }})
    .use(rehypeMathjax)

    .process(markdown);

  return result.toString();
}
