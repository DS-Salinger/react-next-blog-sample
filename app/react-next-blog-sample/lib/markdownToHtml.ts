import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
import remarkEmoji from 'remark-emoji'
import remarkCodeTitles from 'remark-code-titles'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeMathjax from 'rehype-mathjax'

export default async function markdownToHtml(
  markdown: string,
  slug: string
) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFootnotes)
    .use(remarkCodeTitles)
    .use(remarkRehype)
    .use(remarkMath)
    .use(remarkEmoji)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .use(rehypeMathjax)
    .process(markdown);

  return result.toString();
}
