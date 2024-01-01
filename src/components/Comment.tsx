'use client'

import { comments } from '@/lib/data'
import { LinkedinIcon } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

type CommentsProps = {
  comment: {
    id: string
    name: string
    stack: string
    image: string
    comment: string
    linkedin: {
      link: string
      title: string
    }
  }
}

export default function Comment() {
  return (
    <section className="flex w-full  flex-col items-center justify-center  pt-14">
      <h1 className="mb-5 text-3xl">Depoimentos</h1>
      <div
        className="flex w-full max-w-6xl  items-center justify-center py-5 
      md:max-h-[500px] md:py-3 "
      >
        <Carousel orientation="horizontal" className="h-auto w-full">
          <CarouselContent>
            {comments.map((comment, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="flex aspect-square  items-center justify-center"
                >
                  <Comentario comment={comment} />
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:block" />
          <CarouselNext className="hidden sm:block" />
        </Carousel>
      </div>
    </section>
  )
}

const Comentario = ({ comment }: CommentsProps) => {
  return (
    <Card className="max-w-[350px]">
      <CardHeader className="flex  h-full w-full flex-row items-start justify-start gap-3 ">
        <Avatar>
          <AvatarImage
            src={`/assets/images/comments/${comment.image}`}
            alt={`Foto de perfil de(a) ghalba-vieira, que se enontra no linkedin`}
          />
          <AvatarFallback>GA</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{comment.name}</CardTitle>
          <CardDescription>{comment.stack}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>{comment.comment}</CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Cancel</Button> */}
        <Link href={comment.linkedin.link} target="_blank">
          <CardDescription className="flex items-center justify-center gap-3">
            <LinkedinIcon size={20} />
            {`/${comment.linkedin.title}`}
          </CardDescription>
        </Link>
      </CardFooter>
    </Card>
  )
}
