import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { PORTFOLIO_PROJECTS } from '@/core/data/portfolio.data';
import { Project, ProjectCategory } from '@/core/models/project.model';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { SectionHeaderComponent } from '@/shared/components/section-header/section-header.component';
import { RevealOnScrollDirective } from '@/shared/directives/reveal-on-scroll.directive';

interface FilterOption {
  key: ProjectCategory;
  label: string;
}

@Component({
  selector: 'app-projects-bento',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ZardButtonComponent, ZardBadgeComponent, SectionHeaderComponent, RevealOnScrollDirective],
  template: `
    <section id="projetos" class="py-16 md:py-24 border-b border-border/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header da Seção -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <app-section-header
            eyebrow="Arquitetura & Desenvolvimento"
            title="Casos de Estudo Técnicos"
            description="Soluções estruturadas para desafios reais de concorrência, telemetria em alta frequência, resiliência offline e modularização front-end."
          ></app-section-header>

          <!-- Filtro Interativo por Categoria -->
          <div class="inline-flex p-1 rounded-lg border border-border bg-card/60 backdrop-blur-xs self-start md:self-auto overflow-x-auto max-w-full">
            @for (option of filterOptions; track option.key) {
              <button
                type="button"
                (click)="setFilter(option.key)"
                [class]="
                  activeFilter() === option.key
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                "
                class="px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer"
              >
                {{ option.label }}
              </button>
            }
          </div>
        </div>

        <!-- Bento Grid Assimétrico (grid-cols-1 md:grid-cols-12) -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          @for (project of filteredProjects(); track project.id) {
            <div
              appRevealOnScroll
              [class]="
                project.colSpan === 'full'
                  ? 'md:col-span-12'
                  : project.colSpan === 'large'
                    ? 'md:col-span-7'
                    : project.colSpan === 'small'
                      ? 'md:col-span-4'
                      : 'md:col-span-5'
              "
              class="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-foreground/30 hover:shadow-xl"
            >
              <!-- Topo do Card -->
              <div>
                <div class="flex items-center justify-between gap-2 mb-4">
                  <z-badge variant="outline" class="text-[11px] font-mono">
                    {{ project.categoryLabel }}
                  </z-badge>
                  @if (project.featured) {
                    <z-badge variant="emerald" class="text-[10px]">
                      Destaque Arquitetura
                    </z-badge>
                  }
                </div>

                <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-emerald-500 transition-colors">
                  {{ project.title }}
                </h3>

                <p class="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {{ project.summary }}
                </p>

                <!-- Destaques de Métricas de Impacto -->
                <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 p-3 rounded-lg bg-secondary/40 border border-border/50">
                  @for (metric of project.metrics; track metric.label) {
                    <div class="min-w-0">
                      <div class="font-mono text-sm sm:text-base font-bold text-amber-500 dark:text-amber-400 truncate">
                        {{ metric.value }}
                      </div>
                      <div class="text-[10px] sm:text-[11px] text-muted-foreground truncate">
                        {{ metric.label }}
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Base do Card: Badges de Stack e Botão de Explorar -->
              <div class="mt-6 pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex flex-wrap gap-1.5">
                  @for (tech of project.stack.slice(0, 4); track tech) {
                    <span class="inline-block rounded bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground">
                      {{ tech }}
                    </span>
                  }
                  @if (project.stack.length > 4) {
                    <span class="inline-block rounded bg-secondary/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                      +{{ project.stack.length - 4 }}
                    </span>
                  }
                </div>

                <button
                  type="button"
                  (click)="openCaseStudy(project)"
                  z-button
                  variant="outline"
                  size="sm"
                  class="shrink-0 font-medium text-xs group-hover:border-foreground/40 group-hover:bg-accent cursor-pointer"
                >
                  Explorar Arquitetura →
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProjectsBentoComponent {
  readonly selectProject = output<Project>();

  protected readonly activeFilter = signal<ProjectCategory>('todos');
  protected readonly filterOptions: FilterOption[] = [
    { key: 'todos', label: 'Todos os Projetos' },
    { key: 'fullstack-mobile', label: 'Full-Stack & Mobile' },
    { key: 'iot-sistemas', label: 'IoT & Sistemas' },
    { key: 'web-apps', label: 'Web Apps' },
  ];

  protected readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'todos') {
      return PORTFOLIO_PROJECTS;
    }
    return PORTFOLIO_PROJECTS.filter((p) => p.category === filter);
  });

  setFilter(category: ProjectCategory): void {
    this.activeFilter.set(category);
  }

  openCaseStudy(project: Project): void {
    this.selectProject.emit(project);
  }
}
