import { profile } from '@/lib/data'
import Image from 'next/image'

export default function page() {
  return (
    <main className="flex h-[calc(100%+56px)] w-full flex-col items-center justify-center  py-14">
      <h1 className="mb-5 mt-2 text-3xl">Sobre</h1>
      <section
        className="flex h-3/5 w-10/12 flex-col items-center bg-[#373A3C]  
      p-5 md:flex-row md:justify-around"
      >
        <Image
          src={'/assets/images/profile/foto-perfil.jpg'}
          width={350}
          height={250}
          alt="Um homem de pelo menos 30 anos de idade, vestindo um de trabalho de fazendo sinal de positivo, parecendo estar  com uma alegria que contagia."
          className="mb-4 object-cover md:mb-0 "
        />
        <div
          className="flex flex-col justify-center 
            md:w-1/2 md:items-center md:justify-center "
        >
          <h1 className="mb-2 text-3xl">{profile.name}</h1>
          <h3 className="mb-2 text-2xl">Web Developer</h3>
          <p className="mb-5 text-left text-base">
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
