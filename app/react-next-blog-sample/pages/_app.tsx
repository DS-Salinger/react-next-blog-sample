import { AppProps } from 'next/app'
import '../styles/index.css'
import 'highlight.js/styles/atom-one-dark.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
