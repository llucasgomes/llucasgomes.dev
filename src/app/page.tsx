import Comment from "@/components/Comment";
import Hero from "@/components/Hero";
import Tecnologies from "@/components/Tecnologies";

export default function Home() {
  return (
    <main className=" flex w-full flex-col items-center justify-center ">
      <Hero />
      <Comment />
      <Tecnologies />

      {/* <div className="flex w-full  flex-col gap-7 pt-14 md:w-[60%]">
        <HistoryDev />
        <Courses />
      </div> */}
      {/* <Projects /> */}
    </main>
  )
}
