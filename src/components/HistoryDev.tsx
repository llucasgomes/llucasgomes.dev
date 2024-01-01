import { experiences } from '@/lib/data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export default async function HistoryDev() {
  return (
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
            {experiences.map(({ title, description, time }, index: number) => {
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
            })}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
