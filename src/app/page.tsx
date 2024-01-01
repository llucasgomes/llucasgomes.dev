import Comment from "@/components/Comment";
import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import HistoryDev from "@/components/HistoryDev";
import Tecnologies from "@/components/Tecnologies";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className=" flex w-full flex-col items-center justify-center ">
      <Hero />
      <Separator/>
      <Tecnologies />
      <Separator/>
      <Comment />
      <Separator/>
      <div className="flex w-full  flex-col gap-7 pt-14 
       md:flex-row">
        <HistoryDev />
        <Courses />
      </div> 
      
    </main>
  )
}
