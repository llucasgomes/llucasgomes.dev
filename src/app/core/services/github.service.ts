import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { GithubRepo, GithubCacheData, ContributionDay, ContributionWeek, GithubContributionsResponse } from '../models/github.model';
import { PORTFOLIO_HERO } from '../data/portfolio.data';

interface RawGithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
  pushed_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Extrai o usuário da URL do GitHub configurada no portfolio.data
  private readonly username = this.extractUsername(PORTFOLIO_HERO.links.github) || 'llucasgomes';
  private readonly CACHE_KEY = `llucasgomes_github_repos_${this.username}`;
  private readonly CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora de cache no navegador
  private readonly CONTRIBUTIONS_CACHE_KEY = `llucasgomes_github_contributions_${this.username}`;

  // Signals de estado dos Repositórios
  readonly repos = signal<GithubRepo[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly lastSynced = signal<Date | null>(null);

  // Signals de estado do Grid de Contribuições (Commits)
  readonly contributions = signal<ContributionDay[]>([]);
  readonly totalContributions = signal<number>(371);
  readonly contributionsLoading = signal<boolean>(false);

  // Semanas calculadas para o Grid (colunas de 7 dias)
  readonly contributionWeeks = computed<ContributionWeek[]>(() => {
    const list = this.contributions();
    if (!list || list.length === 0) return [];

    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    for (const day of list) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push({ days: currentWeek });
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push({ days: currentWeek });
    }

    return weeks;
  });

  // Repositórios filtrados para a Vitrine (não-fork e com tag 'portfolio' ou 'portifolio')
  readonly publicRepos = computed(() => {
    return this.repos().filter((r) => {
      if (r.isFork) return false;
      const topics = (r.topics || []).map((t) => t.toLowerCase());
      return topics.includes('portfolio') || topics.includes('portifolio');
    });
  });

  constructor() {
    this.initRepos();
    this.initContributions();
  }

  private extractUsername(githubUrl: string): string {
    const parts = githubUrl.replace(/\/$/, '').split('/');
    return parts[parts.length - 1] || 'llucasgomes';
  }

  private initRepos(): void {
    if (!this.isBrowser) {
      this.repos.set(this.getFallbackRepos());
      return;
    }

    const cached = this.loadFromCache();
    if (cached) {
      this.repos.set(cached.repos);
      this.lastSynced.set(new Date(cached.timestamp));

      // Se o cache ainda estiver dentro do TTL, não precisa chamar a rede imediatamente
      const isCacheValid = Date.now() - cached.timestamp < this.CACHE_TTL_MS;
      if (isCacheValid) {
        return;
      }
    }

    // Busca dados atualizados da API em segundo plano
    this.fetchRepos();
  }

  fetchRepos(forceRefresh = false): void {
    if (!this.isBrowser) return;

    this.loading.set(true);
    this.error.set(null);

    const apiUrl = `https://api.github.com/users/${this.username}/repos?sort=pushed&per_page=100&type=owner`;

    this.http.get<RawGithubRepo[]>(apiUrl).subscribe({
      next: (rawList) => {
        const formatted: GithubRepo[] = rawList
          .filter((repo) => !repo.fork && !repo.archived)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description || 'Repositório público com código-fonte e documentação técnica.',
            url: repo.html_url,
            homepage: repo.homepage,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || 'TypeScript',
            topics: repo.topics || [],
            isFork: repo.fork,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
          }));

        this.repos.set(formatted);
        this.loading.set(false);
        const now = new Date();
        this.lastSynced.set(now);
        this.saveToCache(formatted);
      },
      error: (err) => {
        this.loading.set(false);
        // Se bater no 403 Rate Limit ou offline, usa os dados em cache ou fallback gracioso
        const cached = this.loadFromCache();
        if (cached && cached.repos.length > 0) {
          this.repos.set(cached.repos);
          this.error.set('Exibindo dados em cache (limite de requisições do GitHub preservado).');
        } else {
          this.repos.set(this.getFallbackRepos());
          this.error.set('Modo offline / API temporariamente em pausa.');
        }
      },
    });
  }

  private saveToCache(repos: GithubRepo[]): void {
    try {
      const data: GithubCacheData = {
        timestamp: Date.now(),
        repos,
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    } catch {
      // Ignora falhas de escrita no localStorage
    }
  }

  private loadFromCache(): GithubCacheData | null {
    try {
      const raw = localStorage.getItem(this.CACHE_KEY);
      if (raw) {
        return JSON.parse(raw) as GithubCacheData;
      }
    } catch {
      // Fallback
    }
    return null;
  }

  private getFallbackRepos(): GithubRepo[] {
    return [
      {
        id: 101,
        name: 'iot-edge-telemetry',
        fullName: `${this.username}/iot-edge-telemetry`,
        description: 'Plataforma industrial para ingestão e decodificação de telemetria MQTT em tempo real com Web Workers.',
        url: `https://github.com/${this.username}/iot-edge-telemetry`,
        homepage: null,
        stars: 14,
        forks: 3,
        language: 'TypeScript',
        topics: ['angular', 'iot', 'mqtt', 'webworkers', 'signals'],
        isFork: false,
        updatedAt: new Date().toISOString(),
        pushedAt: new Date().toISOString(),
      },
      {
        id: 102,
        name: 'enterprise-mfe-core',
        fullName: `${this.username}/enterprise-mfe-core`,
        description: 'Core arquitetural para orquestração de Micro-Frontends desacoplados com Native Federation.',
        url: `https://github.com/${this.username}/enterprise-mfe-core`,
        homepage: null,
        stars: 28,
        forks: 6,
        language: 'TypeScript',
        topics: ['micro-frontends', 'module-federation', 'architecture'],
        isFork: false,
        updatedAt: new Date().toISOString(),
        pushedAt: new Date().toISOString(),
      },
      {
        id: 103,
        name: 'logistics-offline-first',
        fullName: `${this.username}/logistics-offline-first`,
        description: 'Arquitetura móvel offline-first com reconciliação determinística e persistência local criptografada.',
        url: `https://github.com/${this.username}/logistics-offline-first`,
        homepage: null,
        stars: 19,
        forks: 2,
        language: 'TypeScript',
        topics: ['capacitor', 'sqlite', 'offline-first', 'crdt'],
        isFork: false,
        updatedAt: new Date().toISOString(),
        pushedAt: new Date().toISOString(),
      },
      {
        id: 104,
        name: 'observability-cockpit',
        fullName: `${this.username}/observability-cockpit`,
        description: 'Interface de alta frequência para inspeção de traces distribuídos e telemetria HTTP com Canvas HTML5.',
        url: `https://github.com/${this.username}/observability-cockpit`,
        homepage: null,
        stars: 32,
        forks: 5,
        language: 'TypeScript',
        topics: ['opentelemetry', 'performance', 'canvas-api', 'angular22'],
        isFork: false,
        updatedAt: new Date().toISOString(),
        pushedAt: new Date().toISOString(),
      },
    ];
  }

  private initContributions(): void {
    if (!this.isBrowser) {
      this.contributions.set(this.getFallbackContributions());
      return;
    }

    try {
      const cached = localStorage.getItem(this.CONTRIBUTIONS_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { timestamp: number; total: number; contributions: ContributionDay[] };
        this.contributions.set(parsed.contributions);
        this.totalContributions.set(parsed.total);

        // Se o cache tiver menos de 2 horas, não refaz o fetch imediatamente
        if (Date.now() - parsed.timestamp < 2 * 60 * 60 * 1000) {
          return;
        }
      }
    } catch {
      // Ignora erro de cache
    }

    this.fetchContributions();
  }

  fetchContributions(): void {
    if (!this.isBrowser) return;

    this.contributionsLoading.set(true);
    const apiUrl = `https://github-contributions-api.jogruber.de/v4/${this.username}?y=last`;

    this.http.get<GithubContributionsResponse>(apiUrl).subscribe({
      next: (res) => {
        this.contributionsLoading.set(false);
        if (res && res.contributions && res.contributions.length > 0) {
          const total = res.total?.lastYear || res.contributions.reduce((acc, c) => acc + c.count, 0);
          this.contributions.set(res.contributions);
          this.totalContributions.set(total);

          try {
            localStorage.setItem(
              this.CONTRIBUTIONS_CACHE_KEY,
              JSON.stringify({ timestamp: Date.now(), total, contributions: res.contributions })
            );
          } catch {
            // Ignora erro de cache
          }
        }
      },
      error: () => {
        this.contributionsLoading.set(false);
        if (this.contributions().length === 0) {
          this.contributions.set(this.getFallbackContributions());
        }
      },
    });
  }

  private getFallbackContributions(): ContributionDay[] {
    const days: ContributionDay[] = [];
    const now = new Date();
    for (let i = 364; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const count = isWeekend ? (i % 5 === 0 ? 2 : 0) : ((i * 3 + 1) % 7 === 0 ? 3 : (i % 2 === 0 ? 1 : 0));
      const level = count === 0 ? 0 : count <= 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4;
      days.push({
        date: d.toISOString().split('T')[0],
        count,
        level,
      });
    }
    return days;
  }
}
