<div align="center">

# ⚡ Lucas Gomes — Front-End Developer
### Portfólio Pessoal & Showcase de Engenharia Web

<p align="center">
  <strong>Interface moderna, reativa e de alta performance construída com Angular 22, Tailwind CSS v4 e Signals.</strong>
</p>

[![Angular 22](https://img.shields.io/badge/Angular-22.x-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ZardUI Inspired](https://img.shields.io/badge/Design_System-ZardUI_Custom-10B981?style=for-the-badge&logo=shadcnui&logoColor=white)](#design-system)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-98%2B-success?style=for-the-badge&logo=lighthouse&logoColor=white)](#performance)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<br/>

[🌐 Demonstração Online](https://llucasgomes.github.io) • [💼 LinkedIn](https://www.linkedin.com/in/llucasgomess/) • [📫 Contato](mailto:lucas.gomes.manaus@gmail.com) • [📄 Currículo](https://github.com/llucasgomes)

</div>

---

## 🎯 Sobre o Projeto

Este repositório contém o código-fonte da aplicação web do meu portfólio profissional. Desenvolvido para apresentar minha trajetória como **Desenvolvedor Front-End**, os projetos mais relevantes do meu histórico profissional e acadêmico, e demonstrar na prática domínio de arquitetura limpa, componentes desacoplados e boas práticas no ecossistema moderno do Angular.

> *"Criando interfaces modernas, responsivas e experiências web de alto impacto com foco em usabilidade, performance e código sustentável."*

---

## ✨ Destaques Técnicos & Decisões Arquiteturais

### 1. Reatividade com Angular Signals
- **Zero Boilerplate:** Estado gerenciado com `signal()`, `computed()` e `effect()` do Angular 22.
- **Detecção de Mudanças Otimizada:** Troca granular de dados sem sobrecarga de re-renderizações desnecessárias.

### 2. Integração Resiliente com GitHub API & Calendário de Commits
- **Filtro Inteligente de Repositórios:** Sincronização em tempo real que exibe exclusivamente repositórios marcados com o tópico `#portfolio`.
- **Proteção contra Rate-Limit:** Camada de serviço com cache local em `localStorage` e TTL (Time-To-Live) de 1 hora, garantindo que o recrutador nunca se depare com erros de limite de requisição (HTTP 403).
- **GitHub Commit Heatmap:** Grid responsivo de 53 semanas reproduzindo a visualização de atividade anual de contribuições do GitHub com tooltips informativos.

### 3. Design System & Acessibilidade (Inspirado no ZardUI)
- **Glassmorphism & Micro-interações:** Header fixo no topo com `backdrop-blur` e indicador de seção ativa via `IntersectionObserver`.
- **Tema Dark / Light Dinâmico:** Alternador de tema persistente integrado ao `prefers-color-scheme` do sistema e `localStorage`.
- **Componentes Acessíveis:** Modal de estudos de caso com suporte nativo a navegação por teclado (`ESC`), fechamento por clique externo e travamento de scroll (`body-lock`).

### 4. Performance & Otimização de Assets
- **Tamanho de Transferência Reduzido:** Build inicial otimizado (~76 kB transfer size).
- **Carregamento Otimizado:** Rotas desacopladas e lazy loading de seções secundárias para pontuação máxima no Google Lighthouse.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias Utilizadas |
| :--- | :--- |
| **Core Framework** | Angular 22 (Standalone Components, Signals, Control Flow nativo `@if` / `@for`) |
| **Linguagem** | TypeScript 5 (Strict Mode ativado, tipagem estrita de modelos) |
| **Estilização** | Tailwind CSS v4, PostCSS, Variáveis CSS para Dark Mode |
| **Ícones & UI** | Lucide Icons, Componentes ZardUI inspirados no ecossistema shadcn |
| **APIs Externas** | GitHub REST API v3 (Repositórios & Métricas de Contribuição) |
| **Testes & Qualidade** | Vitest, ESLint, Angular CLI Analytics |
| **Hospedagem & CI/CD** | GitHub Actions / GitHub Pages |

---

## 📁 Estrutura do Projeto

O projeto segue os princípios de **Clean Architecture** e convenções modernas do ecossistema Angular:

```text
src/
├── app/
│   ├── core/                      # Camada central da aplicação (Singleton)
│   │   ├── data/                  # Dados estáticos, bio, métricas e projetos
│   │   │   └── portfolio.data.ts
│   │   ├── models/                # Interfaces e tipagens TypeScript estritas
│   │   │   ├── experience.model.ts
│   │   │   ├── github.model.ts
│   │   │   ├── project.model.ts
│   │   │   └── testimonial.model.ts
│   │   └── services/              # Serviços globais com Signals
│   │       ├── github.service.ts  # Consumo da API GitHub com cache e TTL
│   │       └── theme.service.ts   # Controle de tema Dark/Light
│   │
│   ├── features/                  # Módulos funcionais e páginas
│   │   └── home/
│   │       ├── sections/          # Seções isoladas e independentes
│   │       │   ├── hero/          # Apresentação, métricas e bio
│   │       │   ├── projects-bento/# Vitrine Bento Grid com estudos de caso
│   │       │   ├── github-repos/  # Repositórios com tag #portfolio
│   │       │   ├── stack-matrix/  # Matriz de habilidades por domínio
│   │       │   ├── experience/    # Linha do tempo profissional e educação
│   │       │   ├── testimonials/  # Recomendações e depoimentos
│   │       │   └── contact/       # Rodapé e formulário de contato
│   │       └── home.page.ts       # Container principal da Home
│   │
│   ├── shared/                    # Componentes reutilizáveis (Design System)
│   │   └── components/
│   │       ├── badge/             # ZardBadgeComponent
│   │       ├── button/            # ZardButtonComponent (variantes e tamanhos)
│   │       ├── github-calendar/   # Heatmap de commits em tempo real
│   │       ├── navbar/            # Header fixo com glassmorphism
│   │       ├── project-modal/     # Modal de detalhes de arquitetura
│   │       ├── section-header/    # Títulos padronizados de seções
│   │       └── separator/         # Divisores com suporte a gradiente
│   │
│   ├── styles/                    # Configurações globais do Tailwind CSS v4
│   │   └── styles.css
│   ├── app.config.ts              # Provedores da aplicação (HttpClient, etc.)
│   └── app.routes.ts              # Roteamento central com lazy loading
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js**: versão 20.x ou superior recomendada
- **npm** (ou **pnpm** / **yarn**)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/llucasgomes/llucasgomes.dev.git
   cd llucasgomes.dev
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   # ou
   npx ng serve
   ```

4. **Abra no seu navegador:**
   Acesse [http://localhost:4200/](http://localhost:4200/) para visualizar a aplicação.

5. **Para gerar a build de produção:**
   ```bash
   npm run build
   ```
   Os arquivos compilados e minificados estarão disponíveis no diretório `dist/lsgomes.dev`.

---

## 💼 Experiência & Projetos em Destaque

- **Monitor & Automação de Caixa d'Água IoT**: App mobile Android em Angular + Capacitor integrado a ESP32, módulo relé e sensor ultrassônico blindado JSN-SR04T para telemetria de nível de água e acionamento automatizado de bomba d'água.
- **Domus Petra**: Plataforma interativa de alta performance desenvolvida para o Hackathon StackX (24 Stars no GitHub, 98/100 Lighthouse).
- **Jornada PIM**: Sistema web corporativo focado em triagem e gestão de ideias de inovação para fábricas do Polo Industrial de Manaus.
- **FSDB Chat**: Aplicativo desktop ultraleve (<30MB RAM) construído com Tauri, Rust e React/TypeScript.
- **Intelbras SIM Next para Linux**: Automação e compatibilização de sistemas de monitoramento CFTV corporativo em ambiente Linux.

---

## 📬 Contato & Conexões

Estou disponível para novas oportunidades profissionais, projetos freelance e colaborações técnicas.

- **LinkedIn**: [linkedin.com/in/llucasgomess](https://www.linkedin.com/in/llucasgomess/)
- **Email**: [lucas.gomes.manaus@gmail.com](mailto:lucas.gomes.manaus@gmail.com)
- **GitHub**: [github.com/llucasgomes](https://github.com/llucasgomes)

---

<div align="center">
  <sub>Desenvolvido com dedicação por <strong>Lucas Gomes</strong> • Manaus, AM - Brasil 🇧🇷</sub>
</div>
