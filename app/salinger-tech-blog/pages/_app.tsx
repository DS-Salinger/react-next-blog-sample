import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '../styles/index.css'
import 'highlight.js/styles/sunburst.css'
import Script from 'next/script'
import * as gtag from '../lib/gtag'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return(() => {
      router.events.off('routeChangeComplete', handleRouteChange)
    })
  }, [router.events])
 
  return (
    <>
      <Script
	strategy='afterInteractive'
	src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TAG_ID}`}
      />

      <Script
	id='gtag-init'
	strategy='afterInteractive'
	dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TAG_ID}');
          `,
          }}
      />
      
      <Component {...pageProps} />
    </>
  )
}

