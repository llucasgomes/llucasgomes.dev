import { skills } from '@/lib/data'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function Tecnologies() {
  return (
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
  )
}
