import CardMap from '@/components/CardMap'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function page() {
  return (
    <main
      className="flex h-[calc(100%vh-80px)] w-full flex-col items-center justify-center px-6 py-14
   "
    >
      <h1 className="mb-5 mt-2 text-3xl lg:hidden ">Contato</h1>

      <section className="flex h-full w-full  flex-col items-center justify-center gap-5  md:flex-row">
        <div className="flex h-full w-full flex-col items-center justify-center md:w-1/2 ">
          {/* <section
        className="flex h-3/5 w-10/12 flex-col items-center bg-[#373A3C]  
      p-5 lg:flex-row"
      ></section> */}
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Enviar mensagem</CardTitle>
              <CardDescription>
                Informe qual meio de comunicação deseja entrar em contato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="messenger">Mensageiro</Label>
                    <Select>
                      <SelectTrigger id="messenger">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="whatsapp">Whatsapp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Informe seu e-mail" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Informe seu nome" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="message">Mensagem</Label>
                    {/* <Input id="name" placeholder="mensagem........" /> */}
                    <Textarea
                      id="message"
                      placeholder="Escreva sua mensagem aqui..."
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="w-full">Enviar</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center md:w-1/2 ">
          <Card className="w-full ">
            <CardHeader>
              <CardTitle>Localização</CardTitle>
              <CardDescription>
                Brinque um pouco, e veja onde moro RSRSR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardMap />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
