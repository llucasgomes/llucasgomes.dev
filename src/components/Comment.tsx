'use client'

import { comments } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
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
  }
}

export default function Comment() {
  return (
    <section className="flex  flex-col items-center justify-start  py-14">
      <h1 className="mb-5 text-3xl">Depoimentos</h1>
      <div className="flex max-w-6xl flex-wrap items-center justify-center">
        <Carousel orientation="horizontal" className="w-5/12">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

const Comentario = ({ comment }: CommentsProps) => {
  return (
    <Card className="w-[350px]">
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
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
