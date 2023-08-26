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
	  <div className="grid grid-cols-1 lg:grid-cols-4
			  mx-auto
			  w-[28rem] md:w-[60rem] lg:w-[86rem]">
	    <div className="hidden lg:grid lg:col-span-1 py-4
			    sm:w-0 lg:w-[20rem]">
	      <MainMenu />
	    </div>

	    
	    <div className="col-span-1 lg:col-span-3
			    w-[28rem] md:w-[60rem] lg:w-[60rem]
			    ">
	      <h1 className="text-white sm:px-0
			     sm:text-3xl md:text-6xl
			     my-6 mx-3 md:mx-6">

		<span className="bg-gradient-to-r
				 flex pb-5
				 from-myred via-myorange to-myyellow
				 sm:bg-[length:22.2rem_5px]
				 md:bg-[length:32.5rem_5px]
				 bg-left-bottom
				 bg-no-repeat">
		  <Link href="/"
			passHref legacyBehavior>
		    <a>さりんじゃー's Tech Blog</a>
		  </Link>
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
