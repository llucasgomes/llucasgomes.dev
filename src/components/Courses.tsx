import { courses } from '@/lib/data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export default async function Courses() {
  return (
    <section
      className={`w-full items-start justify-center  px-5 pb-14  text-[#F8F9FA]`}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Cursos</CardTitle>
          <CardDescription>
            Cursos que passei durante essa jornada grandiosa, sem contar com os
            do Youtube
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
  )
}
