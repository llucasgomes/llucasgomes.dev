import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GithubService } from '@/core/services/github.service';
import { SectionHeaderComponent } from '@/shared/components/section-header/section-header.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { RevealOnScrollDirective } from '@/shared/directives/reveal-on-scroll.directive';
import { PORTFOLIO_HERO } from '@/core/data/portfolio.data';

@Component({
  selector: 'app-github-repos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeaderComponent, ZardButtonComponent, RevealOnScrollDirective],
  template: `
    <section id="repos" class="py-16 md:py-24 border-b border-border/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Topo da Seção com Header e Ações -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <app-section-header
            eyebrow="Open Source & Vitrine Oficial"
            title="Repositórios no GitHub"
            description="Projetos de código aberto selecionados com a tag #portfolio, sincronizados em tempo real com métricas de estrelas, linguagens e commits."
          ></app-section-header>

          <!-- Barra de Busca / Filtro e Ação de Sync -->
          <div class="flex items-center gap-3 self-start md:self-auto">
            <div class="relative">
              <input
                type="text"
                placeholder="Filtrar por nome ou stack..."
                [value]="searchQuery()"
                (input)="onSearchInput($event)"
                class="h-9 w-48 sm:w-64 rounded-md border border-border bg-card px-3 py-1 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              @if (searchQuery()) {
                <button
                  type="button"
                  (click)="clearSearch()"
                  class="absolute right-2 top-2 text-muted-foreground hover:text-foreground text-xs"
                >
                  ✕
                </button>
              }
            </div>

            <button
              type="button"
              (click)="githubService.fetchRepos(true)"
              [disabled]="githubService.loading()"
              z-button
              variant="outline"
              size="sm"
              class="text-xs font-mono cursor-pointer"
              title="Atualizar dados do GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                [class.animate-spin]="githubService.loading()"
                class="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
              </svg>
              <span class="hidden sm:inline">Sincronizar</span>
            </button>
          </div>
        </div>

        <!-- Indicador de Status / Erro amigável se aplicável -->
        @if (githubService.error()) {
          <div class="mb-6 p-3 rounded-md border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-600 dark:text-amber-400 flex items-center justify-between">
            <span>ℹ {{ githubService.error() }}</span>
            <span class="text-[11px] opacity-80">Proteção de Rate Limit Ativa</span>
          </div>
        }

        <!-- Estado de Carregamento (Skeleton Minimalista) -->
        @if (githubService.loading() && filteredRepos().length === 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (i of [1, 2, 3, 4, 5, 6]; track i) {
              <div class="rounded-xl border border-border/60 bg-card/50 p-5 space-y-3 animate-pulse">
                <div class="h-4 w-1/2 bg-muted rounded"></div>
                <div class="h-3 w-3/4 bg-muted/60 rounded"></div>
                <div class="h-3 w-2/3 bg-muted/40 rounded"></div>
                <div class="flex gap-2 pt-2">
                  <div class="h-4 w-12 bg-muted rounded"></div>
                  <div class="h-4 w-12 bg-muted rounded"></div>
                </div>
              </div>
            }
          </div>
        } @else {
          <!-- Grid de Repositórios -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (repo of filteredRepos(); track repo.id) {
              <a
                [href]="repo.url"
                target="_blank"
                rel="noopener noreferrer"
                appRevealOnScroll
                class="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-foreground/30 hover:shadow-md cursor-pointer"
              >
                <div>
                  <!-- Linha Superior: Nome do Repo e Ícone Externo -->
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="font-mono text-sm font-semibold text-foreground group-hover:text-emerald-500 transition-colors truncate">
                      {{ repo.name }}
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </div>

                  <!-- Descrição do Repositório -->
                  <p class="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {{ repo.description }}
                  </p>

                  <!-- Tópicos / Tags (se houver) -->
                  @if (repo.topics.length > 0) {
                    <div class="flex flex-wrap gap-1 mt-3">
                      @for (topic of repo.topics.slice(0, 4); track topic) {
                        <span
                          [class]="
                            topic.toLowerCase() === 'portfolio' || topic.toLowerCase() === 'portifolio'
                              ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 font-semibold'
                              : 'text-muted-foreground bg-secondary/80 border border-border/40'
                          "
                          class="font-mono text-[10px] rounded px-1.5 py-0.5"
                        >
                          #{{ topic }}
                        </span>
                      }
                    </div>
                  }
                </div>

                <!-- Linha Inferior: Linguagem, Stars, Forks e Data -->
                <div class="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <div class="flex items-center gap-1.5">
                    <span [class]="getLanguageColorClass(repo.language)" class="h-2 w-2 rounded-full inline-block"></span>
                    <span>{{ repo.language }}</span>
                  </div>

                  <div class="flex items-center gap-3">
                    @if (repo.stars > 0) {
                      <span class="flex items-center gap-1 hover:text-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {{ repo.stars }}
                      </span>
                    }

                    @if (repo.forks > 0) {
                      <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="6" y1="3" x2="6" y2="15"></line>
                          <circle cx="18" cy="6" r="3"></circle>
                          <circle cx="6" cy="18" r="3"></circle>
                          <path d="M18 9a9 9 0 0 1-9 9"></path>
                        </svg>
                        {{ repo.forks }}
                      </span>
                    }
                  </div>
                </div>
              </a>
            }
          </div>

          <!-- Estado Vazio se Busca não achar nada ou se não houver repositórios com a tag -->
          @if (filteredRepos().length === 0) {
            <div class="text-center py-12 border border-dashed border-border rounded-xl p-8 space-y-3">
              @if (searchQuery()) {
                <p class="text-sm font-medium text-foreground">Nenhum repositório com o termo "{{ searchQuery() }}" foi encontrado.</p>
                <button
                  type="button"
                  (click)="clearSearch()"
                  class="text-xs text-emerald-500 hover:underline font-mono cursor-pointer"
                >
                  Limpar busca
                </button>
              } @else {
                <div class="space-y-1.5 max-w-md mx-auto">
                  <p class="text-sm font-semibold text-foreground">Nenhum repositório com a tag #portfolio</p>
                  <p class="text-xs text-muted-foreground leading-relaxed">
                    Para exibir um projeto aqui, acesse seu repositório no GitHub, clique na engrenagem em <strong>About</strong> e adicione o tópico <code class="text-emerald-500 bg-secondary px-1 py-0.5 rounded font-mono">portfolio</code>.
                  </p>
                </div>
              }
            </div>
          }
        }

        <!-- Link Direto para o Perfil Completo no GitHub -->
        <div class="mt-8 text-center">
          <a
            [href]="githubProfileUrl"
            target="_blank"
            rel="noopener noreferrer"
            z-button
            variant="ghost"
            size="sm"
            class="text-xs font-mono text-muted-foreground hover:text-foreground"
          >
            Ver todos os repositórios diretamente no GitHub →
          </a>
        </div>
      </div>
    </section>
  `,
})
export class GithubReposComponent {
  protected readonly githubService = inject(GithubService);
  protected readonly githubProfileUrl = PORTFOLIO_HERO.links.github;
  protected readonly searchQuery = signal('');

  protected readonly filteredRepos = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const repos = this.githubService.publicRepos();

    if (!query) return repos;

    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.language.toLowerCase().includes(query) ||
        r.topics.some((t) => t.toLowerCase().includes(query))
    );
  });

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  getLanguageColorClass(language: string): string {
    const lang = (language || '').toLowerCase();
    switch (lang) {
      case 'typescript':
        return 'bg-blue-500';
      case 'javascript':
        return 'bg-yellow-400';
      case 'go':
      case 'golang':
        return 'bg-cyan-500';
      case 'html':
        return 'bg-orange-500';
      case 'css':
        return 'bg-indigo-500';
      case 'python':
        return 'bg-amber-500';
      case 'rust':
        return 'bg-amber-600';
      case 'c++':
      case 'c':
        return 'bg-pink-500';
      default:
        return 'bg-emerald-500';
    }
  }
}
