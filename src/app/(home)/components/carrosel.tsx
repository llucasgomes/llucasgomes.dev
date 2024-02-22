'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/_components/ui/carousel'
import { comments } from '@/app/_lib/data'
import Comment from './comment'

export default function CarroselComments() {
  return (
    <Carousel orientation="horizontal" className="h-auto w-full">
      <CarouselContent>
        {comments.map((comment, index) => {
          return (
            <CarouselItem
              key={index}
              className="flex aspect-square  items-center justify-center"
            >
              <Comment comment={comment} />
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:block" />
      <CarouselNext className="hidden sm:block" />
    </Carousel>
  )
}
