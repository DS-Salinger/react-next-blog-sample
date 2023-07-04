import Link from 'next/link'

const MainMenu = (): react.FC => {
  return (
    <div className="bg-mygray bg-opacity-30 text-white">
      <div className="mx-8 mt-8 text-3xl">
	<Link href="/"
	      className="hover:underline">
	  Home
	</Link>
      </div>
      <div className="mx-12 mt-4 text-2xl">
	<Link href="/author"
	      className="hover:underline">
	  Author
	</Link>
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
	  DS
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
	  Arch
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
