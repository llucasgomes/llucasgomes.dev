import { PropsProject } from '@/@types'
import { Badge } from '@/app/_components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card'

import Image from 'next/image'
import Link from 'next/link'

export default function CardProject({ project }: PropsProject) {
  return (
    <Card className="relative flex h-auto  w-full  max-w-[390px] flex-col items-center">
      {/* <Badge className="absolute right-2 top-2 bg-yellow-300 text-black">
        ola mundo
      </Badge> */}
      <CardHeader>
        <CardTitle className="mb-3 text-center">{project.name}</CardTitle>
        {project.image && (
          <Image
            src={project.image}
            alt={`Imagem ddo projeto ${project.name}`}
            width={300}
            height={200}
          />
        )}
      </CardHeader>
      <CardContent className="flex w-full  flex-col items-center justify-center gap-4">
        <CardDescription>{project.description}</CardDescription>
        <div className="flex flex-wrap justify-evenly gap-2">
          {project.tecnologies.map((tec) => (
            <Badge
              className="bg-[#221c30] text-primary hover:bg-[#221c30]"
              key={`${project.id}-${tec}`}
              variant="outline"
            >
              {tec}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2 px-2">
        <Link
          href={project.github ? project.github : '/'}
          target={project.github ? '_blank' : ''}
          className={`${
            !project.github && 'pointer-events-none hover:cursor-not-allowed'
          } w-[140px] border-[1px] border-solid border-primary 
     py-2  text-center text-primary hover:bg-[#221c30] hover:text-primary`}
        >
          Git Gub
        </Link>
        <Link
          href={project.page}
          target={project.page ? '_blank' : ''}
          className={`${
            !project.page && 'pointer-events-none hover:cursor-not-allowed'
          } w-[140px] border-[1px] border-solid border-primary 
     py-2  text-center text-primary hover:bg-[#221c30] hover:text-primary`}
        >
          Visitar Site
        </Link>
        {/* <Button title="GitHub" link={project.github} /> */}
      </CardFooter>
    </Card>
  )
}
