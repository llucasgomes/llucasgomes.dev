import ButtonMenu from './ButtonMenu'
import MenuMobile from './MenuMobile'

export default function Header() {
  return (
    <header className=" flex h-20 w-full  items-center justify-around bg-black">
      <h1 className='text-2xl font-bold'>Lucas Gomes</h1>
      {/* <nav className="hidden md:block">
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
      </nav> */}
        <ButtonMenu />
        <h2>ola mundo</h2>
        <MenuMobile />
      {/* <div className="block md:hidden">
      </div> */}
    </header>
  )
}
