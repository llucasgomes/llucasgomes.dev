import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../_components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../_components/ui/card'
import { Separator } from '../_components/ui/separator'
import { courses, experiences, profile, skills } from '../_lib/data'
import CarroselComments from './components/carrosel'

export default function Home() {
  return (
    <main className=" flex w-full flex-col items-center justify-center ">
      {/* SECTION HERO */}
      <section className="relative  flex h-[calc(100vh-80px)] w-full">
        <video
          autoPlay={true}
          muted={true}
          loop={true}
          className=" absolute -z-10 h-full w-full object-cover  brightness-50 "
          src={profile.bannerVideo}
        ></video>
        <div
          className=" flex h-full w-full flex-col  items-center justify-center 
      px-8 pb-20 "
        >
          <h1 className="mb-6 text-6xl text-[#F8FAFC]">Hello</h1>
          <h2
            className="text-md max-w-2xl text-center text-[#F8FAFC]
         sm:mb-10 sm:text-xl"
          >
            {profile.description}
          </h2>
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
      </section>
      <Separator />
      {/* SECTION TECNOLOGIES */}
      <section className=" flex  flex-col items-center justify-start  py-14">
        <h1 className="mb-5 text-3xl">Tecnologias</h1>

        <div className="flex  w-full max-w-3xl flex-wrap justify-center gap-5 px-5">
          {skills.map(({ id, name, image }) => (
            <Card
              key={id}
              className="flex h-[130px] w-[126px] flex-col items-center"
            >
              <CardHeader>
                <CardTitle>{name}</CardTitle>
              </CardHeader>
              <CardContent className="flex  w-full items-center justify-center">
                <Avatar className="  branco rounded-none">
                  <AvatarImage src={image} />
                  <AvatarFallback>NX</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Separator />
      {/* SECTION COMENTARIOS */}
      <section className="flex w-full  flex-col items-center justify-center  pt-14">
        <h1 className="mb-5 text-3xl">Depoimentos</h1>
        <div
          className="flex w-full max-w-6xl  items-center justify-center py-5 
      sm:max-h-[500px] sm:py-3 lg:max-w-[600px]"
        >
          <CarroselComments />
        </div>
      </section>
      <Separator />
      <div
        className="flex w-full  flex-col gap-7 pt-14
       md:flex-row"
      >
        {/* SECTION HISTORY DEV */}
        <section
          className={`w-full  items-start justify-center  px-5 pb-14 text-[#F8F9FA]`}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Experience</CardTitle>
              <CardDescription>
                Experiencias que tive ensinando e aprendendo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-5">
                {experiences.map(
                  ({ title, description, time }, index: number) => {
                    return (
                      <li key={index} className="mb-3 flex flex-col gap-1">
                        <h3 className=" text-lg font-semibold uppercase leading-none tracking-tight">
                          {title}
                        </h3>
                        <h5>
                          {time.from} {time.to ? `- ${time.to}` : '- Atual'}
                        </h5>
                        <p>{description}</p>
                      </li>
                    )
                  },
                )}
              </ul>
            </CardContent>
          </Card>
        </section>
        {/* SECTION COURSES */}
        <section
          className={`w-full items-start justify-center  px-5 pb-14  text-[#F8F9FA]`}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Cursos</CardTitle>
              <CardDescription>
                Cursos que passei durante essa jornada grandiosa, sem contar com
                os do Youtube
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-5">
                {courses.map(({ title, description, hours }, index) => {
                  return (
                    <li key={index} className="mb-3 flex flex-col gap-1">
                      <h3 className=" text-lg font-semibold uppercase leading-none tracking-tight">
                        {title}
                      </h3>
                      <h5>{hours && `${hours}h`}</h5>
                      <p>{description}</p>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
