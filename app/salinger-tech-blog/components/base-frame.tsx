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
	  <div className="grid grid-cols-3 lg:grid-cols-4 
			  w-[30rem] md:w-[65rem] lg:w-[87rem]">
	    <div className="hidden lg:grid lg:col-span-1 py-4
			    w-0 lg:w-[21rem]">
	      <MainMenu />
	    </div>
	    
	    <div className="col-span-3">
	      <h1 className="text-white sm:px-0
			     sm:text-4xl md:text-6xl
			     my-6 mx-3 md:mx-6">

		<span className="bg-gradient-to-r
				 flex pb-5
				 from-myred via-myorange to-myyellow
				 sm:bg-[length:84.5%_5px]
				 md:bg-[length:42.5%_5px]
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
