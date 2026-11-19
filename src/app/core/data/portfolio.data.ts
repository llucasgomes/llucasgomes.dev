import { Project } from '../models/project.model';
import { ExperienceItem, EducationItem } from '../models/experience.model';

export interface StackCategory {
  title: string;
  domain: string;
  description: string;
  skills: {
    name: string;
    level: 'Avançado' | 'Especialista' | 'Proficiente';
    highlight?: boolean;
    tags: string[];
  }[];
}

export const PORTFOLIO_HERO = {
  availability: 'Disponível para projetos & oportunidades técnicas',
  role: 'Engenheiro Front-End & Full-Stack',
  headline: 'Construindo interfaces críticas, sistemas conectados e arquiteturas resilientes.',
  bio: 'Especialista no ecossistema Angular moderno, TypeScript e sistemas distribuídos de alta performance. Focado em UX rigorosa, clean code, padrões desacoplados e previsibilidade operacional.',
  metrics: [
    { value: '+6', label: 'Anos de Experiência', detail: 'em sistemas web & mobile' },
    { value: '99.9%', label: 'SLA em Produção', detail: 'arquiteturas de baixa latência' },
    { value: '+20', label: 'Sistemas Entregues', detail: 'de IoT a plataformas SaaS' },
    { value: '<100ms', label: 'TTFB Otimizado', detail: 'Core Web Vitals & edge caching' },
  ],
  links: {
    github: 'https://github.com/llucasgomes',
    linkedin: 'https://linkedin.com/in/llucasgomes',
    email: 'contato@llucasgomes.dev',
    resume: '/resume.pdf',
    whatsapp: 'https://wa.me/5500000000000',
  },
};

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'iot-smart-telemetry',
    title: 'Plataforma Industrial de Telemetria IoT & Edge',
    category: 'iot-sistemas',
    categoryLabel: 'IoT & Sistemas',
    featured: true,
    colSpan: 'large',
    summary: 'Arquitetura de processamento em tempo real para sensores de campo com ingestão via MQTT, visualização em alta taxa de quadros e tolerância a falhas na ponta.',
    metrics: [
      { label: 'Eventos/seg', value: '15.000 req/s' },
      { label: 'Latência ponta-a-ponta', value: '< 45ms' },
      { label: 'Uptime', value: '99.98%' },
    ],
    stack: ['Angular 22', 'TypeScript', 'MQTT/WebSockets', 'Go', 'TimescaleDB', 'Docker', 'Linux Embedded'],
    architecture: {
      problem: 'Ambientes industriais com oscilação severa de conectividade e alta densidade de telemetria necessitavam de dashboard operacional com renderização contínua sem travar a thread do navegador.',
      decisions: [
        'Utilização de Web Workers no front-end para decodificação de payloads binários (Protobuf), liberando a UI thread do Angular.',
        'Implementação de Angular Signals para reatividade atômica sem over-fetching ou ciclos desnecessários de change detection.',
        'Backpressure handling com fila no cliente e fallback para armazenamento local via IndexedDB quando desconectado.',
        'Backend em Go com pool de conexões MQTT e particionamento temporal em TimescaleDB.',
      ],
      techImpact: [
        'Zero perda de métricas críticas durante quedas de link de até 72 horas.',
        'Redução de 68% no consumo de memória no navegador dos operadores de sala de controle.',
        'Renderização de gráficos com 10.000 pontos em 60 FPS contínuos.',
      ],
      systemHighlights: [
        'Decodificação em Web Worker via Protobuf',
        'State machine reativa com Signals',
        'Cache offline no IndexedDB',
        'Pipeline CI/CD com testes de mutação',
      ],
    },
    links: {
      github: 'https://github.com/llucasgomes/iot-edge-telemetry',
      demo: 'https://telemetry-demo.llucasgomes.dev',
    },
  },
  {
    id: 'enterprise-microfrontends-hub',
    title: 'Hub Corporativo & Micro-Frontends de Missão Crítica',
    category: 'fullstack-mobile',
    categoryLabel: 'Full-Stack & Mobile',
    featured: true,
    colSpan: 'medium',
    summary: 'Orquestração de micro-frontends independentes com Module Federation, design system unificado e autenticação centralizada com isolamento de contexto.',
    metrics: [
      { label: 'Deploy time', value: '-65%' },
      { label: 'Bundle size base', value: '48 kB' },
      { label: 'Escalabilidade', value: '8 squads' },
    ],
    stack: ['Angular 22', 'Native Federation', 'Tailwind CSS', 'Node.js', 'Redis', 'GitHub Actions'],
    architecture: {
      problem: 'Monólito front-end com tempo excessivo de build e frequentes conflitos de regressão entre 8 equipes interdisciplinares.',
      decisions: [
        'Migração para arquitetura federada usando Native Federation baseada em ES Modules sem acoplamento a bundlers legados.',
        'Shared State leve através de Custom Events tipados e Service Bus no Browser.',
        'Design System agnóstico empacotado como biblioteca interna com tokens semânticos.',
      ],
      techImpact: [
        'Deploys desacoplados por squad sem dependência de janela de liberação global.',
        'Redução do tempo médio de integração contínua de 22 minutos para 4 minutos.',
      ],
      systemHighlights: [
        'Native Federation com ES Modules',
        'Design System com Tailwind v4',
        'Canary deployments automatizados',
      ],
    },
    links: {
      github: 'https://github.com/llucasgomes/enterprise-mfe-core',
      demo: 'https://mfe-hub.llucasgomes.dev',
    },
  },
  {
    id: 'mobile-logistics-offline-first',
    title: 'App de Operações Logísticas Offline-First',
    category: 'fullstack-mobile',
    categoryLabel: 'Full-Stack & Mobile',
    featured: false,
    colSpan: 'medium',
    summary: 'Aplicação híbrida móvel com sincronização bidirecional e reconciliação de conflitos para conferência de cargas em centros de distribuição e rotas rurais.',
    metrics: [
      { label: 'Tempo de sincronização', value: '< 1.2s' },
      { label: 'Dispositivos ativos', value: '+1.500' },
      { label: 'Taxa de erro de sync', value: '< 0.01%' },
    ],
    stack: ['Capacitor', 'Angular', 'SQLite / WatermelonDB', 'NestJS', 'PostgreSQL', 'Docker'],
    architecture: {
      problem: 'Motoristas e operadores precisavam registrar validações em galpões com blindagem eletromagnética e rodovias sem sinal de dados celular.',
      decisions: [
        'Padrão CRDT (Conflict-free Replicated Data Types) simplificado para resolução determinística de divergências de estoque.',
        'Isolamento da camada de persistência com banco local SQLite criptografado (SQLCipher).',
        'Background sync resiliente aproveitando APIs nativas do Android/iOS através de Capacitor.',
      ],
      techImpact: [
        'Operação ininterrupta durante todo o trajeto de entrega, sem frustração para os motoristas.',
        'Eliminação de divergências manuais de faturamento causadas por sobrescrita acidental de dados.',
      ],
      systemHighlights: [
        'Persistência local com SQLite encriptado',
        'Reconciliação determinística de conflitos',
        'Background Task API nativa',
      ],
    },
    links: {
      github: 'https://github.com/llucasgomes/logistics-offline-first',
    },
  },
  {
    id: 'developer-observability-cockpit',
    title: 'Cockpit de Observabilidade & Análise de Tráfego HTTP',
    category: 'web-apps',
    categoryLabel: 'Web Apps',
    featured: false,
    colSpan: 'large',
    summary: 'Painel técnico minimalista com visualização de rastreamento distribuído (OpenTelemetry), inspeção de gargalos de API e visualização de grafos de dependência.',
    metrics: [
      { label: 'Throughput suportado', value: '50k spans/s' },
      { label: 'Tempo de resposta UI', value: '16ms (60fps)' },
      { label: 'Lighthouse Score', value: '100 / 100' },
    ],
    stack: ['Angular 22', 'RxJS', 'ZardUI', 'Web Audio/Canvas API', 'FastAPI', 'ClickHouse'],
    architecture: {
      problem: 'Dificuldade de diagnosticar cascatas de lentidão entre dezenas de microsserviços em tempo de execução sem interfaces inchadas.',
      decisions: [
        'Virtualização virtual completa de listas de spans com Angular CDK, evitando estouro de nós na DOM.',
        'Visualização personalizada em Canvas HTML5 de alta performance para a linha temporal das requisições.',
        'Zero bibliotecas CSS runtime pesadas; 100% Tailwind utilitário compilado.',
      ],
      techImpact: [
        'Tempo de diagnóstico de incidentes de produção reduzido pela metade.',
        'Consumo de CPU no cliente inferior a 5% mesmo com streaming contínuo de spans.',
      ],
      systemHighlights: [
        'Virtual Scrolling com Angular CDK',
        'Canvas custom renderer com double-buffering',
        'OpenTelemetry Protocol (OTLP) parser',
      ],
    },
    links: {
      github: 'https://github.com/llucasgomes/observability-cockpit',
      demo: 'https://cockpit.llucasgomes.dev',
    },
  },
];

export const PORTFOLIO_STACK: StackCategory[] = [
  {
    title: 'Front-End & Mobile',
    domain: 'Experiência & Clientes',
    description: 'Aplicações web reativas de alto desempenho e clientes mobile com arquitetura previsível e acessível.',
    skills: [
      { name: 'Angular (22+)', level: 'Especialista', highlight: true, tags: ['Signals', 'Standalone', 'OnPush', 'ZardUI'] },
      { name: 'TypeScript', level: 'Especialista', highlight: true, tags: ['Strict Types', 'Generics', 'AST'] },
      { name: 'Tailwind CSS v4', level: 'Especialista', highlight: true, tags: ['Tokens', 'CSS Variables', 'Micro-interações'] },
      { name: 'RxJS & State Machines', level: 'Avançado', tags: ['Complex Streams', 'Reactivity', 'Schedulers'] },
      { name: 'Capacitor & Mobile', level: 'Avançado', tags: ['Cross-platform', 'Plugins Nativos', 'Offline-First'] },
      { name: 'Web Performance & CWV', level: 'Especialista', tags: ['Lighthouse 100', 'Bundle Budget', 'Hydration'] },
    ],
  },
  {
    title: 'Back-End & APIs',
    domain: 'Lógica de Negócios & Serviços',
    description: 'APIs escaláveis, contratos fortemente tipados e serviços robustos para alta concorrência.',
    skills: [
      { name: 'Node.js & NestJS', level: 'Avançado', highlight: true, tags: ['Clean Arch', 'Dependency Injection', 'REST'] },
      { name: 'Go (Golang)', level: 'Proficiente', tags: ['Goroutines', 'Microservices', 'Low Latency'] },
      { name: 'GraphQL & gRPC', level: 'Avançado', tags: ['Protobuf', 'Schema Stitching', 'Type-Safe Contracts'] },
      { name: 'Autenticação & Segurança', level: 'Avançado', tags: ['OAuth2', 'OIDC', 'JWT', 'RBAC'] },
    ],
  },
  {
    title: 'Dados & Mensageria',
    domain: 'Persistência & Fluxos',
    description: 'Armazenamento eficiente, modelagem relacional/não-relacional e mensageria distribuída.',
    skills: [
      { name: 'PostgreSQL & TimescaleDB', level: 'Avançado', highlight: true, tags: ['Indexing', 'Query Optimization', 'Time-series'] },
      { name: 'Redis', level: 'Avançado', tags: ['In-memory Cache', 'Pub/Sub', 'Rate Limiting'] },
      { name: 'MQTT & WebSockets', level: 'Avançado', highlight: true, tags: ['IoT', 'Duplex Streaming', 'Broker Clustering'] },
      { name: 'ClickHouse / OLAP', level: 'Proficiente', tags: ['Analytics', 'High-throughput', 'Aggregation'] },
    ],
  },
  {
    title: 'Infraestrutura, Linux & IoT',
    domain: 'DevOps, Edge & Operação',
    description: 'Automação de ambientes, containeres, sistemas embarcados e esteiras de entrega contínua.',
    skills: [
      { name: 'Docker & Containerização', level: 'Avançado', highlight: true, tags: ['Multi-stage Builds', 'Compose', 'Hardening'] },
      { name: 'Linux & Shell Scripting', level: 'Avançado', tags: ['Systemd', 'Networking', 'Kernel Tuning'] },
      { name: 'CI/CD & DevOps', level: 'Avançado', tags: ['GitHub Actions', 'Semantic Release', 'Automated Testing'] },
      { name: 'Sistemas Embarcados / IoT', level: 'Proficiente', tags: ['ESP32', 'Raspberry Pi', 'Serial/I2C Protocols'] },
    ],
  },
];

export const PORTFOLIO_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'lead-frontend-eng',
    role: 'Engenheiro de Software Sênior / Front-End Tech Lead',
    company: 'Empresa de Tecnologia & Soluções Digitais',
    period: '2023 — Presente',
    location: 'Remoto',
    type: 'Tempo Integral',
    description: 'Liderança técnica da arquitetura de front-end para plataformas corporativas de missão crítica, guiando padrões de engenharia, governança de design system e qualidade de software.',
    achievements: [
      'Liderou a transição da arquitetura legada para Angular moderno com Signals, reduzindo retrabalho de estado em mais de 40%.',
      'Estruturou biblioteca interna de componentes UI de alto contraste com conformidade WCAG 2.1 AA.',
      'Mentoria ativa de engenheiros plenos e júniors através de pareamento e revisões técnicas aprofundadas.',
    ],
    stack: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'CI/CD', 'Jest/Vitest'],
    isCurrent: true,
  },
  {
    id: 'fullstack-iot-eng',
    role: 'Engenheiro Full-Stack & IoT Systems',
    company: 'Indústria & Automação Inteligente',
    period: '2021 — 2023',
    location: 'Híbrido',
    type: 'Tempo Integral',
    description: 'Desenvolvimento de sistemas de telemetria industrial de ponta a ponta, desde a coleta em campo com brokers MQTT até dashboards de acompanhamento em tempo real.',
    achievements: [
      'Projetou interface reativa em tempo real com streaming de dados para dezenas de fábricas monitoradas simultaneamente.',
      'Otimizou ingestão de dados em Go e PostgreSQL, reduzindo o tempo de consulta de relatórios analíticos de 12s para menos de 400ms.',
      'Implementou suporte para operação desconectada com tolerância a falhas na camada móvel.',
    ],
    stack: ['Angular', 'Node.js', 'Go', 'MQTT', 'TimescaleDB', 'Docker', 'Linux'],
  },
  {
    id: 'software-dev-mobile',
    role: 'Desenvolvedor Front-End & Mobile',
    company: 'Consultoria de Software & Produtos Digitais',
    period: '2019 — 2021',
    location: 'São Paulo, Brasil',
    type: 'Tempo Integral',
    description: 'Construção de aplicações web responsivas e aplicativos híbridos para clientes dos setores de logística, varejo e finanças.',
    achievements: [
      'Entregou 7 aplicações do zero à produção mantendo índices de crash-free acima de 99.8%.',
      'Implementou pipelines de entrega contínua com geração automatizada de releases para App Store e Google Play.',
    ],
    stack: ['Angular', 'Ionic / Capacitor', 'TypeScript', 'SCSS/Tailwind', 'REST APIs'],
  },
];

export const PORTFOLIO_EDUCATION: EducationItem[] = [
  {
    degree: 'Bacharelado em Engenharia de Computação / Ciência da Computação',
    institution: 'Universidade',
    period: 'Concluído',
    highlights: ['Foco em Sistemas Distribuídos, Algoritmos e Arquitetura de Computadores'],
  },
  {
    degree: 'Certificações & Especializações Técnicas Contínuas',
    institution: 'Google Cloud, Linux Foundation & Arquitetura Web',
    period: 'Recorrente',
    highlights: ['Cloud Architecture', 'Web Performance & Accessibility', 'Secure Coding Practices'],
  },
];
