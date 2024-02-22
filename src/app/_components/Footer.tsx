import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex h-14 w-full items-center justify-center gap-5 bg-black">
      <Link href={'https://github.com/llucasgomes'} target="_blank">
        <Github size={32} />
      </Link>
      <Link href={'https://www.linkedin.com/in/llucasgomess/'} target="_blank">
        <Linkedin size={32} />
      </Link>
    </footer>
  )
}
