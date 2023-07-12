import Link from 'next/link'
import ScreenSize from '../interfaces/screen-size'

export default function Header(
  { screenSize = 'pc-normal' }:
  { screenSize: ScreenSize }): React.FC {

  return (
    <header className="h-12
		       bg-myblack
		       text-white">
    </header>
  );
}
