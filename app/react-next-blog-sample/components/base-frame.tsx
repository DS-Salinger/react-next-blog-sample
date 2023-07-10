import Layout from '../components/layout'
import MainMenu from '../components/main-menu'
import Head from 'next/head'
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
	    <div className="hidden lg:grid lg:col-span-1">
	      <MainMenu />
	    </div>
	    
	    <div className="col-span-4 lg:col-span-3">
	      <h1 className="text-white
			     text-6xl my-4 sm:mx-3 md:mx-6">
		<span className="bg-gradient-to-r
				 flex
				 from-myred via-myorange to-myyellow
				 sm:bg-[length:68%_3px]
				 md:bg-[length:43%_3px]
				 bg-no-repeat bg-left-bottom">
		  さりんじゃー's Tech Blog
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
