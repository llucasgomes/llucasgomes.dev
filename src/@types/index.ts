export type PropsProject = {
  project: {
    id: string
    name: string
    description: string
    image: string
    stack: string
    tecnologies: string[]
    github: string
    page: string
  }
}

export type CommentsProps = {
  comment: {
    id: string
    name: string
    stack: string
    image: string
    comment: string
    linkedin: {
      link: string
      title: string
    }
  }
}
