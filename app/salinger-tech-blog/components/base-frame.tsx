import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import MainMenu from '../components/main-menu'
import Container from '../components/container'

type Props = {
  children?: React.ReactNode
}

const BaseFrame = ({ children }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>さりんじゃー's Tech Blog</title>
        </Head>

        <Container>
	  <div className="grid grid-cols-4">
	    <div className="hidden lg:grid lg:col-span-1 py-4">
	      <MainMenu />
	    </div>
	    
	    <div className="col-span-4 lg:col-span-3">
	      <h1 className="text-white sm:px-4
			     text-6xl my-4 sm:mx-3 md:mx-6">
		<span className="bg-gradient-to-r
				 flex
				 from-myred via-myorange to-myyellow
				 sm:bg-[length:71%_5px]
				 md:bg-[length:45%_5px]
				 bg-left-bottom
				 bg-no-repeat">
		  <Link href="/">さりんじゃー's Tech Blog</Link>
		</span>
	      </h1>
	      {children}
	    </div>
	  </div>
        </Container>
      </Layout>
    </>

  );
}

export default BaseFrame
