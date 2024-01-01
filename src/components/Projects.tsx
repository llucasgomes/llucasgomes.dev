import { projects } from '@/lib/data'
import CardProject from './CardProject'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export default function Projects() {
  const projectBack = projects.filter((project) => project.stack === 'back')
  const projectFront = projects.filter((project) => project.stack === 'front')
  const projectFullStack = projects.filter((project) => project.stack === 'fullstack')

  return (
    <section className=" flex w-full flex-col items-center justify-start  pb-14">
      <h1 className="mb-5 text-3xl">Projetos</h1>
      <h2 className="mb-3 max-w-5xl px-5 text-base">
        Projetos realizados durante minha evolução como Desenvolvedor Jr
      </h2>

      <div className="flex  w-full max-w-5xl flex-wrap justify-center  px-5">
        <Tabs defaultValue="all" className="w-full max-w-5xl">
          <TabsList className="flex w-full items-center justify-center">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="front">Front-End</TabsTrigger>
            <TabsTrigger value="back">Back-End</TabsTrigger>
            <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
          </TabsList>
          <TabsContent
            value="all"
            className="flex  w-full max-w-5xl flex-wrap justify-center gap-6"
          >
            {projects.map((project) => {
              return <CardProject key={project.id} project={project} />
            })}
          </TabsContent>
          <TabsContent
            value="front"
            className="flex  w-full max-w-5xl flex-wrap justify-center gap-6"
          >
            {projectFront.map((project) => {
              return <CardProject key={project.id} project={project} />
            })}
          </TabsContent>
          <TabsContent
            value="fullstack"
            className="flex  w-full max-w-5xl flex-wrap justify-center gap-6"
          >
            {projectFullStack.map((project) => {
              return <CardProject key={project.id} project={project} />
            })}
          </TabsContent>
          <TabsContent
            value="back"
            className="flex  w-full max-w-5xl flex-wrap justify-center gap-6"
          >
            {projectBack.map((project) => {
              return <CardProject key={project.id} project={project} />
            })}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
