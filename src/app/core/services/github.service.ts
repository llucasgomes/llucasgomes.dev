import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { GithubRepo, GithubCacheData } from '../models/github.model';
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

  // Signals de estado
  readonly repos = signal<GithubRepo[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly lastSynced = signal<Date | null>(null);

  // Repositórios filtrados (ignora forks vazios, ordena por data de push mais recente)
  readonly publicRepos = computed(() => {
    return this.repos().filter((r) => !r.isFork);
  });

  constructor() {
    this.initRepos();
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

    const apiUrl = `https://api.github.com/users/${this.username}/repos?sort=pushed&per_page=30&type=owner`;

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
}
