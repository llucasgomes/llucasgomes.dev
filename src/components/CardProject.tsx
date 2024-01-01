import { PropsProject } from '@/@types'
import Link from 'next/link'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

export default function CardProject({ project }: PropsProject) {
  return (
    <Card className="flex h-auto w-full  max-w-[390px]  flex-col items-center">
      <CardHeader>
        <CardTitle className="mb-3 text-center">{project.name}</CardTitle>
        {/* {project.image && (
          <Image
            src={project.image}
            alt={`Imagem ddo projeto ${project.name}`}
            width={300}
            height={200}
          />
        )} */}
      </CardHeader>
      <CardContent className="flex w-full  flex-col items-center justify-center gap-4">
        <CardDescription>{project.description}</CardDescription>
        <div className="flex flex-wrap justify-evenly gap-2">
          {project.tecnologies.map((tec) => (
            <Badge key={`${project.id}-${tec}`} variant="outline">
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
          } w-[140px] border-[1px] border-solid border-[#F8F9FA] 
       py-2  text-center text-[#F8FAFC] hover:bg-[#F8F9FA] hover:text-[#373A3C]`}
        >
          Git Gub
        </Link>
        <Link
          href={project.page}
          target={project.page ? '_blank' : ''}
          className={`${
            !project.page && 'pointer-events-none hover:cursor-not-allowed'
          } w-[140px] border-[1px] border-solid border-[#F8F9FA] 
       py-2  text-center text-[#F8FAFC] hover:bg-[#F8F9FA] hover:text-[#373A3C]`}
        >
          Visitar Site
        </Link>
        {/* <Button title="GitHub" link={project.github} /> */}
      </CardFooter>
    </Card>
  )
}

// const Button = (title: string, link: string) => {
//   return (
//     <Link
//       href={link}
//       target={link ? '_blank' : ''}
//       className={`${
//         !link && 'pointer-events-none hover:cursor-not-allowed'
//       } w-[140px] border-[1px] border-solid border-[#F8F9FA]
//  py-2  text-center text-[#F8FAFC] hover:bg-[#F8F9FA] hover:text-[#373A3C]`}
//     >
//       {title}
//     </Link>
//   )
// }
