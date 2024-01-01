import Formulario from '@/components/Formulario'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function page() {
  return (
    <main
      className="flex h-[calc(100%vh-80px)] w-full flex-col items-center justify-center px-6 py-14
   "
    >
      <h1 className="mb-5 mt-2 text-3xl lg:hidden ">Contato</h1>

      <section className="flex h-full w-full  flex-col items-center justify-center gap-5  md:flex-row">
        <div className="flex h-full w-full flex-col items-center justify-center md:w-1/2 ">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Enviar mensagem</CardTitle>
              <CardDescription>
                Informe qual meio de comunicação deseja entrar em contato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formulario />
            </CardContent>
          </Card>
        </div>

        {/* <div className="flex h-full w-full flex-col items-center justify-center md:w-1/2 ">
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
        </div> */}
      </section>
    </main>
  )
}
