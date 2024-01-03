import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ThemeProvider } from '@/providers/ThemeProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lucas Gomes | Web Developer',
  description:
    'Bem-vindo ao meu espaço digital! Este é o meu portfólio, onde compartilho projetos apaixonantes enquanto embarco na jornada de crescimento como Desenvolvedor Júnior. Explore meu código, descubra minhas habilidades e acompanhe minha evolução nesse mundo fascinante da programação.',

  openGraph: {
    title: 'Lucas Gomes | Web Developer',
    description:
      'Bem-vindo ao meu espaço digital! Este é o meu portfólio, onde compartilho projetos apaixonantes enquanto embarco na jornada de crescimento como Desenvolvedor Júnior. Explore meu código, descubra minhas habilidades e acompanhe minha evolução nesse mundo fascinante da programação.',
    siteName: 'Lucas Gomes',
    images: [
      {
        url: '/assets/images/projects/portflio-oficial.png',
        width: 1800,
        height: 1800,
        alt: 'Apresentacao do Site',
      },
    ],
    type: 'website',
    locale: 'pt-BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
