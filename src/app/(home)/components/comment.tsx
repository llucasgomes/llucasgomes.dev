import { CommentsProps } from '@/@types'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card'
import { LinkedinIcon } from 'lucide-react'
import Link from 'next/link'

export default function Comment({ comment }: CommentsProps) {
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
