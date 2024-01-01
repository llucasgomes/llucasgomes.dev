import MenuMobile from './MenuMobile'

export default function HeaderTeste() {
  return (
    <header className="flex h-20 w-full items-center justify-around bg-[#D9D9D9]">
      {/* <Image
        src={'/image/logoWebLarge-1.webp'}
        width={176}
        height={51}
        alt="Logo Domus Petra"
      /> */}

      <MenuMobile />
    </header>
  )
}
