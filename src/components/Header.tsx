import Link from 'next/link'
import ButtonMenu from './ButtonMenu'

export default function Header() {
  return (
    <header className="fixed z-50 flex h-14 w-full  items-center justify-around bg-black px-3">
      <h1 className='text-2xl font-bold'>Lucas Gomes</h1>
      <nav className="hidden md:block">
        <ul className="flex w-full list-none gap-5">
          <Link href={'/'} className="cursor-pointer text-white">
            Home
          </Link>
          <Link href={'/projects'} className="cursor-pointer text-white">
            Projects
          </Link>
          <Link href={'/about'} className="cursor-pointer text-white">
            About
          </Link>
          <Link href={'/contact'} className="cursor-pointer text-white">
            Contato
          </Link>
        </ul>
      </nav>
      <div className="absolute right-0 z-50  block md:hidden">
        <ButtonMenu />
      </div>
    </header>
  )
}
