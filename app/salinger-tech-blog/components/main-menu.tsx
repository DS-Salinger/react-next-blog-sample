import Link from 'next/link'

const MainMenu: React.FC = () => {
  return (
    <div className="bg-mygray bg-opacity-30 text-white
		    h-[calc(100vh-62px)]
		    overflow-auto rounded-2xl
		    shadow-lg sticky top-10">
      <div className="mx-8 mt-8 text-3xl">
	<Link href="/"
	      className="hover:underline">
	  Home
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
	      className="hover:underline">
	  New
	</Link>
      </div>
      <div className="mx-12 mt-4 text-2xl">
	<Link href="/ds"
	      className="hover:underline">
	  Data Science
	</Link>
      </div>
      <div className="mx-12 mt-4 text-2xl">
	<Link href="/nlp"
	      className="hover:underline">
	  NLP
	</Link>
      </div>
      <div className="mx-12 mt-4 text-2xl">
	<Link href="/arch"
	      className="hover:underline">
	  Architecture
	</Link>
      </div>
      <div className="mx-12 mt-4 text-2xl">
	<Link href="/other"
	      className="hover:underline">
	  Other
	</Link>
      </div>
    </div>
  );
}

export default MainMenu;
