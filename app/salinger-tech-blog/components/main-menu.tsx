import Link from 'next/link'

const MainMenu: React.FC = () => {
  return (
    <div className="bg-mygray bg-opacity-30 text-white
		    h-[calc(100vh-62px)]
		    overflow-auto rounded-2xl
		    shadow-lg sticky top-10">
      <div className="mx-8 mt-8 text-3xl">
	<Link href="/"
	      passHref legacyBehavior>
	  <a className="hover:underline">Home</a>
	</Link>
      </div>
      <div className="mx-12 mt-4 text-2xl">
	{/* <Link href="/author"
	    className="hover:underline">
	    Author
	    </Link> */}
      </div>
      <div className="mx-12 mt-4 text-2xl">
	<Link href="/new"
	      passHref legacyBehavior>
	  <a className="hover:underline">New</a>
	</Link>
      </div>
      <div className="mx-12 mt-4 text-2xl">
	<Link href="/ds"
	      passHref legacyBehavior>
	  <a className="hover:underline">Data Science</a>
	</Link>
      </div>
      <div className="mx-12 mt-4 text-2xl">
	<Link href="/nlp"
	      passHref legacyBehavior>
	  <a className="hover:underline">NLP</a>
	</Link>
      </div>
      <div className="mx-12 mt-4 text-2xl">
	<Link href="/arch"
	      passHref legacyBehavior>
	  <a className="hover:underline">Architecture</a>
	</Link>
      </div>
      <div className="mx-12 mt-4 text-2xl">
	<Link href="/other"
	      passHref legacyBehavior>
	  <a className="hover:underline">Other</a>
	</Link>
      </div>
    </div>
  );
}

export default MainMenu;
