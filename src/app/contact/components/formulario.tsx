'use client'
import { Button } from '@/app/_components/ui/button'
import { CardFooter } from '@/app/_components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import { Textarea } from '@/app/_components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as z from 'zod'

const formSchema = z.object({
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
      email: '',
      name: '',
      message: '',
    },
  })

  // Defina seu Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    await fetch('https://llucasgomes-dev.vercel.app/api/send', {
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
        form.reset()
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
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
