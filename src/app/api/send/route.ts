import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { EmailTemplate } from '../components/emailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, message } = await req.json()
  const firstName = name.split(' ')[0]

  try {
    await resend.emails.send({
      from: `${firstName} <lucasgomes.dev@resend.dev>`,
      to: ['lucas.gomes.manaus@gmail.com'],
      subject: 'Contato Portiflio',
      react: EmailTemplate({ name, message, email }),
      text: '',
    })

    return NextResponse.json('Enviado')
  } catch (error) {
    return NextResponse.json({ Error: error, teste: name })
  }
}
