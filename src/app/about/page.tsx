import { profile } from '@/lib/data'
import Image from 'next/image'

export default function page() {
  return (
    <main className="flex h-[calc(100%+56px)] w-full flex-col items-center justify-center  py-14">
      <h1 className="mb-5 mt-2 text-3xl">Sobre</h1>
      <section
        className="flex h-3/5 w-10/12 flex-col items-center bg-[#373A3C]  
      p-5 "
      >
        <div className="w-full md:hidden">
          <Image
            src={'/assets/images/profile/foto-perfil.jpg'}
            width={350}
            height={250}
            alt="Um homem de pelo menos 30 anos de idade, vestindo um de trabalho de fazendo sinal de positivo, parecendo estar  com uma alegria que contagia."
            className="mb-4 object-cover 
          md:mb-0 md:h-[350px] md:w-full"
          />
        </div>
        <div className="hidden w-full md:block">
          <Image
            src={'/assets/images/profile/perfil.webp'}
            width={350}
            height={250}
            alt="Um homem de pelo menos 30 anos de idade, vestindo um de trabalho de fazendo sinal de positivo, parecendo estar  com uma alegria que contagia."
            className="mb-4 object-cover 
          md:mb-0 md:h-[350px] md:w-full"
          />
        </div>
        <div
          className="flex flex-col justify-center 
             md:items-center md:justify-center md:px-5"
        >
          <h1 className="mb-2 text-3xl md:hidden">{profile.name}</h1>
          <h3 className="mb-2 text-2xl md:mt-5">Web Developer</h3>
          <p
            className="mb-5 text-left text-base 
          md:text-xl"
          >
            Me chamo Lucas da Silva, atualmente trabalho como porteiro.
            <br /> <br />
            Estou no momento em transição de carreira.Tenho conhecimento em
            desenvolvimento web e uma paixão pela inovação tecnológica, estou
            constantemente buscando novas tendências e ferramentas para
            aprimorar minhas habilidades e oferecer resultados excepcionais..
            <br />
            <br /> + 1 ano de experiência, tenho uma compreensão em práticas de
            design e desenvolvimento front-end, além de uma habilidade
            comprovada em transformar conceitos criativos em produtos digitais
            funcionais e visualmente impressionantes.
          </p>
        </div>
      </section>
    </main>
  )
}
