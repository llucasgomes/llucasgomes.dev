'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as z from 'zod'
import { Button } from './ui/button'
import { CardFooter } from './ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'

const formSchema = z.object({
  typeComunication: z.string().min(2, {
    message: 'Obrigatorio Selecionar um..',
  }),
  email: z
    .string()
    .email({
      message: 'dev ser do tipo Email',
    })
    .min(2, {
      message: 'Mínimo de 10 caracters.',
    })
    .max(30, {
      message: 'Máximo de 30 caracteres.',
    }),
  name: z
    .string()
    .min(5, {
      message: 'Mínimo de 5 caracters.',
    })
    .max(50, {
      message: 'Máximo de 50 caracteres.',
    }),

  message: z.string().min(5, {
    message: 'Mínimo de 5 caracters.',
  }),
})

export default function Formulario() {
  // Definir o formulário
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeComunication: '',
      email: '',
      name: '',
      message: '',
    },
  })

  // Defina seu Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const res = await fetch('http://localhost:3000/api/send', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then((res) => {
        console.log(res)
        toast.success('Email Enviado com sucesso!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error('Não foi Enviado!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      })
    // const res = await fetch('https://llucasgomes-dev.vercel.app/api/send', {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    // })
    // const data = await res.json()

    // if (data === 'Enviado') {
    // }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="messenger">Mensageiro</Label>
              <FormField
                control={form.control}
                name="typeComunication"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="whatsapp">Whatsapp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Processo</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Informe seu e-mail" {...field} />
                    </FormControl>
                    <FormDescription className="hidden">
                      This is your E-mail
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Informe seu nome" {...field} />
                    </FormControl>
                    <FormDescription className="hidden">
                      This is your Name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="message">Mensagem</Label>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Escreva sua mensagem aqui..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="hidden">
                      This is your Name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <CardFooter className="mt-6 flex w-full justify-end p-0">
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </CardFooter>
        </form>
      </Form>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
