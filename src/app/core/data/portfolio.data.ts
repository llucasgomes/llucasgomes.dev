import { Project } from '../models/project.model';
import { ExperienceItem, EducationItem } from '../models/experience.model';
import { TestimonialItem } from '../models/testimonial.model';

export interface StackSkill {
  name: string;
  highlight?: boolean;
  tags: string[];
}

export interface StackCategory {
  title: string;
  domain: string;
  description: string;
  skills: StackSkill[];
}

export const PORTFOLIO_HERO = {
  availability: 'Disponível para projetos & oportunidades de Front-End',
  role: 'Desenvolvedor Front-End',
  headline: 'Criando interfaces modernas, responsivas e experiências web de alto impacto.',
  bio: 'Desenvolvedor Front-End com sólida vivência no ecossistema TypeScript, Angular, Next.js, React e Tailwind CSS. Experiência prática no desenvolvimento de produtos digitais, suporte operacional em informática e mais de 3 anos de monitoria técnica formando novos desenvolvedores.',
  metrics: [
    { value: '+3', label: 'Anos em Tecnologia', detail: 'desenvolvimento web & monitoria' },
    { value: '+100', label: 'Devs Mentorados', detail: 'auxílio técnico na StackX' },
    { value: 'Modern', label: 'Stack Frontend', detail: 'Angular, React, Next & Tailwind' },
    { value: '100%', label: 'Foco em UX & Performance', detail: 'interfaces acessíveis e limpas' },
  ],
  links: {
    github: 'https://github.com/llucasgomes',
    linkedin: 'https://www.linkedin.com/in/llucasgomess/',
    email: 'lucas.gomes.manaus@gmail.com',
    resume: '/resume.pdf',
    whatsapp: 'https://wa.me/5592000000000',
  },
};

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'domus-petra',
    title: 'Domus Petra — Plataforma de Inovação & Hackathon',
    category: 'web-apps',
    categoryLabel: 'Web Apps & Front-End',
    featured: true,
    colSpan: 'large',
    summary: 'Landing page e plataforma interativa de alto impacto desenvolvida para o Hackathon StackX, com design imersivo, alta performance e 24 estrelas no GitHub.',
    metrics: [
      { label: 'Reconhecimento', value: '24 Stars' },
      { label: 'Lighthouse Performance', value: '98 / 100' },
      { label: 'Engajamento', value: '+500 acessos' },
    ],
    stack: ['TypeScript', 'React.js', 'Tailwind CSS', 'Vite', 'Figma', 'GitHub Actions'],
    architecture: {
      problem: 'Necessidade de criar uma experiência visual impactante e responsiva para engajar competidores, mentores e jurados no maior Hackathon da comunidade StackX.',
      decisions: [
        'Construção de componentes desacoplados e tipados em TypeScript com Tailwind CSS para micro-interações fluidas.',
        'Otimização rigorosa de imagens e assets estáticos para carregamento instantâneo em conexões móveis.',
        'Arquitetura modular focada em reusabilidade de seções e navegação fluida.',
      ],
      techImpact: [
        'Projeto com maior engajamento e estrelas no repositório público.',
        'Feedback unânime da comunidade de alunos e mentores pelo design refinado e responsividade.',
      ],
      systemHighlights: [
        'Design moderno com micro-interações',
        'Componentização limpa em React + TypeScript',
        'Deploy automatizado com continuous delivery',
      ],
    },
    links: {
      github: 'https://github.com/llucasgomes/domus-petra',
    },
  },
  {
    id: 'jornada-pim',
    title: 'Jornada PIM — Gestão de Ideias de Inovação',
    category: 'web-apps',
    categoryLabel: 'Web Apps & Gestão',
    featured: true,
    colSpan: 'medium',
    summary: 'Plataforma web colaborativa voltada para a gestão de ideias de inovação e projetos para indústrias do Polo Industrial de Manaus.',
    metrics: [
      { label: 'Foco Regional', value: 'Polo Industrial' },
      { label: 'Arquitetura', value: 'Next.js & React' },
      { label: 'Tipagem', value: '100% TypeScript' },
    ],
    stack: ['TypeScript', 'Next.js', 'React.js', 'Tailwind CSS', 'PostgreSQL', 'APIs REST'],
    architecture: {
      problem: 'Empresas do Polo Industrial de Manaus precisavam de um fluxo centralizado e intuitivo para submissão, triagem e acompanhamento de projetos inovadores.',
      decisions: [
        'Utilização de Next.js com TypeScript para páginas rápidas e formulários estruturados com validação de regras de negócios.',
        'Interface limpa com Tailwind CSS focada na experiência do usuário corporativo e facilidade de navegação.',
        'Estruturação de fluxo de status de ideias com persistência relacional.',
      ],
      techImpact: [
        'Interface centrada na agilidade da tomada de decisão de gestores de inovação.',
        'Estrutura pronta para expansão e integração com sistemas legados das fábricas.',
      ],
      systemHighlights: [
        'Formulários reativos e tipados',
        'Gestão de estados de projetos',
        'Interface adaptada ao contexto industrial',
      ],
    },
    links: {
      github: 'https://github.com/llucasgomes/jornada-pim',
    },
  },
  {
    id: 'fsdbchat',
    title: 'FSDB Chat — Aplicativo Desktop com Tauri & Rust',
    category: 'fullstack-mobile',
    categoryLabel: 'Desktop & Sistemas',
    featured: false,
    colSpan: 'medium',
    summary: 'Aplicativo de chat desktop de alta performance construído com Tauri, Rust e React/TypeScript, utilizando o sistema de arquivos (FSDB) como motor de persistência.',
    metrics: [
      { label: 'Consumo de RAM', value: '< 30 MB' },
      { label: 'Persistência', value: 'Zero SQL / FSDB' },
      { label: 'Engine Nativa', value: 'Rust + Tauri' },
    ],
    stack: ['Tauri', 'Rust', 'React.js', 'TypeScript', 'Tailwind CSS', 'FSDB Storage'],
    architecture: {
      problem: 'Aplicativos desktop tradicionais em Electron consomem centenas de megabytes de RAM e exigem bancos de dados complexos mesmo para operações locais simples.',
      decisions: [
        'Adoção do Tauri com core em Rust para criar um binário ultraleve, seguro e com footprint mínimo de memória.',
        'Desenvolvimento de motor de persistência baseado em arquivos (FSDB) para leitura e escrita atômica e veloz.',
        'Interface rica e responsiva em React com TypeScript comunicando-se via IPC com o backend nativo em Rust.',
      ],
      techImpact: [
        'Redução de mais de 85% no consumo de memória em relação a apps desktop baseados em Electron.',
        'Inicialização quase instantânea e armazenamento portátil de dados.',
      ],
      systemHighlights: [
        'Core nativo compilado em Rust',
        'Bridge IPC bidirecional com React',
        'Persistência atômica no file system',
      ],
    },
    links: {
      github: 'https://github.com/llucasgomes/fsdbchat',
    },
  },
  {
    id: 'intelbras-simnext-linux',
    title: 'Intelbras SIM Next para Linux (Wine & Shell)',
    category: 'iot-sistemas',
    categoryLabel: 'Linux & Sistemas',
    featured: false,
    colSpan: 'large',
    summary: 'Solução técnica de engenharia com scripts automatizados em Shell e patches de compatibilidade Wine para execução estável do software Intelbras SIM Next no Linux.',
    metrics: [
      { label: 'Compatibilidade', value: 'Linux Mint / Ubuntu' },
      { label: 'Automação', value: '100% Shell Script' },
      { label: 'Estabilidade', value: 'Monitoramento CFTV' },
    ],
    stack: ['Shell Script (Bash)', 'Linux', 'Wine', 'Intelbras SIM Next', 'CFTV', 'Automação'],
    architecture: {
      problem: 'O software oficial de monitoramento de câmeras e CFTV Intelbras SIM Next é exclusivamente projetado para Windows, criando entraves em ambientes operacionais rodando Linux.',
      decisions: [
        'Desenvolvimento de script de instalação automatizada que configura o prefixo Wine com todas as DLLs e dependências nativas necessárias.',
        'Correção de falhas de renderização de vídeo e travamentos de interface através de parâmetros específicos de kernel e drivers gráficos.',
        'Criação de lançador desktop com verificação automática de integridade na inicialização.',
      ],
      techImpact: [
        'Permitiu a estações operacionais com Linux monitorar sistemas de CFTV sem necessidade de licenças adicionais de Windows.',
        'Documentação passo a passo utilizada pela comunidade de administradores de sistemas e operadores de TI.',
      ],
      systemHighlights: [
        'Script de configuração one-click',
        'Tratamento de dependências de vídeo Wine',
        'Automação de rotinas no sistema operacional',
      ],
    },
    links: {
      github: 'https://github.com/llucasgomes/intelbras-simnext-linux',
    },
  },
];

export const PORTFOLIO_STACK: StackCategory[] = [
  {
    title: 'Front-End, Mobile & Desktop',
    domain: 'Interfaces & Aplicações',
    description: 'Desenvolvimento de interfaces modernas, sistemas interativos e aplicações multiplataforma com foco em UX e código limpo.',
    skills: [
      { name: 'React.js & Next.js', highlight: true, tags: ['App Router', 'Server Components', 'Hooks', 'Tailwind'] },
      { name: 'TypeScript & JavaScript', highlight: true, tags: ['Tipagem Estrita', 'ES6+', 'Generics', 'Clean Code'] },
      { name: 'Tailwind CSS & Estilização', highlight: true, tags: ['Design Tokens', 'Micro-animações', 'Responsividade'] },
      { name: 'Angular (20+ / 22+)', highlight: true, tags: ['Signals', 'Standalone', 'ZardUI', 'Tailwind v4'] },
      { name: 'Mobile (Capacitor / Ionic)', tags: ['Cross-Platform', 'APIs Nativas', 'Android'] },
      { name: 'Desktop (Tauri & Rust)', tags: ['Tauri Apps', 'React Desktop', 'FSDB'] },
    ],
  },
  {
    title: 'Back-End & APIs',
    domain: 'Lógica de Negócios & Serviços',
    description: 'Construção de APIs REST, automação de dados e serviços estruturados com boas práticas de arquitetura.',
    skills: [
      { name: 'Node.js & TypeScript', highlight: true, tags: ['Express', 'REST APIs', 'Clean Architecture', 'INDT'] },
      { name: 'C# & .NET', highlight: true, tags: ['ASP.NET Core', 'Web API', 'Entity Framework', 'LINQ'] },
      { name: 'Bun & ElysiaJS', tags: ['High Throughput', 'TypeScript Runtime', 'OpenAI API'] },
      { name: 'Web Scraping & Automação', tags: ['Puppeteer', 'Extração de Dados', 'Bots'] },
    ],
  },
  {
    title: 'Dados, Integrações & Serviços',
    domain: 'Persistência & Ecossistema',
    description: 'Modelagem de dados, persistência relacional, gateways de pagamento e integrações com serviços modernos.',
    skills: [
      { name: 'PostgreSQL & MySQL', highlight: true, tags: ['Modelagem Relacional', 'CRUD', 'SQL Queries'] },
      { name: 'Entity Framework & ORMs', tags: ['Migrations', 'Code-First', 'Prisma'] },
      { name: 'Gateways de Pagamento (Stripe)', highlight: true, tags: ['Stripe Checkout', 'Webhooks', 'Assinaturas'] },
      { name: 'Integração de IA (OpenAI)', tags: ['APIs LLM', 'Embeddings', 'Streaming'] },
    ],
  },
  {
    title: 'Linux, Suporte & Ambiente',
    domain: 'Infra, Ferramentas & Operação',
    description: 'Ambientes Linux, automação de rotinas, versionamento profissional e experiência sólida em suporte computacional.',
    skills: [
      { name: 'Suporte de TI & Infraestrutura', highlight: true, tags: ['Hardware', 'Redes Locais', 'Operação de TI'] },
      { name: 'Git & GitHub Workflows', highlight: true, tags: ['Versionamento', 'Branches', 'Code Review', 'CI/CD'] },
      { name: 'Linux & Shell Scripting', highlight: true, tags: ['Bash Scripting', 'Wine', 'Linux Mint/Ubuntu', 'Automação'] },
      { name: 'Docker & Containerização', tags: ['Dockerfiles', 'Ambientes Isolados', 'Containers'] },
    ],
  },
];

export const PORTFOLIO_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'aslan-ti',
    role: 'Operador de Informática',
    company: 'ASLAN Curso de Idiomas',
    period: 'ago. de 2025 — o momento',
    location: 'Manaus, Amazonas (Presencial)',
    type: 'Tempo Integral',
    description: 'Atuação na operação de sistemas computacionais, suporte operacional a usuários e manutenção preventiva e corretiva de equipamentos e infraestrutura tecnológica da instituição.',
    achievements: [
      'Promoção e transição interna para a equipe de tecnologia após histórico de destaque na instituição.',
      'Suporte direto a colaboradores e docentes garantindo continuidade das operações diárias de informática.',
      'Resolução ágil de chamados técnicos de software, rede local e sistemas internos.',
    ],
    stack: ['Operações Computacionais', 'Suporte de TI', 'Redes', 'Hardware', 'Windows/Linux'],
    isCurrent: true,
  },
  {
    id: 'aslan-porteiro',
    role: 'Porteiro',
    company: 'ASLAN Curso de Idiomas',
    period: 'set. de 2022 — ago. de 2025 · 3 anos',
    location: 'Manaus, Amazonas (Presencial)',
    type: 'Tempo Integral',
    description: 'Atuação na portaria e recepção com foco em atendimento ao público, comunicação clara, segurança patrimonial e ambiente colaborativo que impulsionou a promoção para a área de TI.',
    achievements: [
      'Construção de relacionamentos de confiança com alunos, pais e equipe pedagógica.',
      'Proatividade e dedicação que abriram portas para a transição profissional rumo à área de informática da empresa.',
    ],
    stack: ['Comunicação Interpessoal', 'Organização', 'Ambiente Colaborativo', 'Resolução de Problemas'],
  },
  {
    id: 'sd-tecnologia',
    role: 'Dev Front-End Junior',
    company: 'SD Tecnologia',
    period: 'mai. de 2024 — fev. de 2025 · 10 meses',
    location: 'Remoto',
    type: 'Estágio',
    description: 'Desenvolvimento e evolução de interfaces de usuário funcionais e interativas para produtos digitais em ambiente colaborativo e ágil.',
    achievements: [
      'Colaborou ativamente com designers e desenvolvedores para transformar conceitos e protótipos em código de alta fidelidade.',
      'Implementou componentes reutilizáveis utilizando Next.js, React.js, Tailwind CSS e TypeScript.',
      'Desenvolveu layouts totalmente responsivos, micro-animações e realizou otimizações contínuas de performance front-end.',
    ],
    stack: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3', 'Git'],
  },
  {
    id: 'stackx-monitor',
    role: 'Monitor de Front-End',
    company: 'StackX - Formação de Desenvolvedores',
    period: 'mar. de 2022 — fev. de 2025 · 3 anos',
    location: 'Remoto',
    type: 'Aprendiz / Monitoria Técnica',
    description: 'Monitoria e mentoria técnica de alunos em formação no ecossistema de desenvolvimento de software, prestando auxílio diário na resolução de desafios práticos de código.',
    achievements: [
      'Orientou dezenas de novos desenvolvedores em conceitos fundamentais e avançados de Front-End (HTML, CSS, JavaScript e frameworks modernos).',
      'Conduziu sessões de code review e depuração de erros, acelerando o aprendizado prático da comunidade.',
      'Desenvolveu forte habilidade de comunicação interpessoal e capacidade de explicar arquiteturas e algoritmos complexos de forma clara.',
    ],
    stack: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'React', 'Git/GitHub', 'Mentoria Técnica'],
  },
];

export const PORTFOLIO_EDUCATION: EducationItem[] = [
  {
    degree: 'Desenvolvimento Web Full Stack (372 horas)',
    institution: 'INDT Educacional — Instituto de Desenvolvimento Tecnológico',
    period: 'Set. de 2025 — Mai. de 2026',
    highlights: [
      'Formação intensiva e aprofundada de 372h em desenvolvimento de software moderno (Front-End & Back-End).',
      'Construção de aplicações completas, APIs REST, integração com bancos de dados e boas práticas de arquitetura.',
      'Certificado emitido pelo prestigiado polo tecnológico INDT em Manaus/AM.',
    ],
  },
  {
    degree: 'Programação Front-End Especializada (+80 horas)',
    institution: 'DevQuest — Formação Front-End',
    period: 'Concluído em Set. de 2023',
    highlights: [
      'Imersão teórica e prática intensiva de mais de 80h focada no ecossistema moderno de desenvolvimento Front-End.',
      'Domínio avançado de HTML5 semântico, CSS3 moderno, flexbox/grid, JavaScript assíncrono, React e responsividade.',
      'Ministrado pelos professores Ricardo Dias e Roberto Dias.',
    ],
  },
  {
    degree: 'Formação em Desenvolvimento de Software & Front-End',
    institution: 'StackX — Formação de Desenvolvedores de Software',
    period: '2022 — 2025',
    highlights: [
      'Especialização prática em desenvolvimento web moderno (HTML5, CSS3, JavaScript, TypeScript, React e ecossistema de APIs).',
      'Atuação destacada como Monitor Técnico por 3 anos prestando mentoria e code reviews para a comunidade de alunos.',
    ],
  },
];

export const PORTFOLIO_TESTIMONIALS: TestimonialItem[] = [
  // Esta lista será preenchida com os depoimentos reais fornecidos pelo usuário
];

