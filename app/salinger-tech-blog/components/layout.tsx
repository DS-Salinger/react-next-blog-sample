import Header from './header'
import Footer from './footer'
import Meta from './meta'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <div className="min-h-screen bg-black">
        <main className="bg-mygray bg-opacity-20">{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
