import { profile } from '@/lib/data'
import Link from 'next/link'

export default async function Hero() {
  return (
    <section className=" relative  flex h-[calc(100vh+56px)] w-full ">
      <video
        autoPlay={true}
        muted={true}
        loop={true}
        className=" absolute -z-10 h-full w-full object-cover  brightness-50 "
        src={profile.bannerVideo}
      ></video>
      <div
        className=" flex h-full flex-col  items-center justify-center 
      px-8 pb-20 md:w-1/2 "
      >
        <h1 className="mb-6 text-6xl text-[#F8FAFC]">Hello</h1>
        <h2 className="text-md text-[#F8FAFC] text-center">{profile.description}</h2>
        <Link
          href={profile.pdf}
          target="_blank"
          download
          className="text-md mt-6 w-36 border-[1px] border-solid border-[#F8F9FA] 
                py-2  text-center text-[#F8FAFC] hover:bg-[#F8F9FA] hover:text-[#373A3C]"
        >
          Hire Me
        </Link>
      </div>
      {/* <div
        className=" flex h-full flex-col items-center  justify-center px-8 
      pb-20 md:w-1/2 "
      >
        <Image
          // src={`data:image/webp;base64,${image}`}
          src={'/assets/perfil.webp'}
          width={500}
          height={700}
          alt="Imagem de perfil"
          className=" mb-4 md:mb-0 md:w-2/3"
        />
      </div> */}
    </section>
  )
}
