import { Album, Contact, HelpCircle, Hotel, Menu } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function ButtonMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" border-none focus:outline-none data-[state=open]:bg-transparent">
        <Menu size={36} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={'/'} className="focus:text-[#849dba]">
          <DropdownMenuItem>
            <Hotel strokeWidth="1.5" />
            <DropdownMenuLabel>Home</DropdownMenuLabel>
          </DropdownMenuItem>
        </Link>

        <Link href={'/projects'} className="focus:text-[#849dba]">
          <DropdownMenuItem>
            <Album strokeWidth="1.5" />
            <DropdownMenuLabel>Projects</DropdownMenuLabel>
          </DropdownMenuItem>
        </Link>

        <Link href={'/about'} className="focus:text-[#849dba]">
          <DropdownMenuItem>
            <HelpCircle strokeWidth="1.5" />
            <DropdownMenuLabel>About</DropdownMenuLabel>
          </DropdownMenuItem>
        </Link>

        <Link href={'/contact'} className="focus:text-[#849dba]">
          <DropdownMenuItem>
            <Contact strokeWidth="1.5" />
            <DropdownMenuLabel>Contato</DropdownMenuLabel>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
