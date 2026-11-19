import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO_STACK } from '@/core/data/portfolio.data';
import { SectionHeaderComponent } from '@/shared/components/section-header/section-header.component';
import { RevealOnScrollDirective } from '@/shared/directives/reveal-on-scroll.directive';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';

@Component({
  selector: 'app-stack-matrix',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeaderComponent, RevealOnScrollDirective, ZardBadgeComponent],
  template: `
    <section id="stack" class="py-16 md:py-24 border-b border-border/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-header
          eyebrow="Competências Técnicas"
          title="Matriz de Domínio & Engenharia"
          description="Especialização técnica dividida por domínios arquiteturais sem métricas subjetivas de porcentagem — foco em ferramentas reais de produção e proficiência comprovada."
        ></app-section-header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (pillar of stackPillars; track pillar.title) {
            <div
              appRevealOnScroll
              class="rounded-xl border border-border bg-card p-6 md:p-8 flex flex-col justify-between hover:border-foreground/20 transition-colors"
            >
              <div>
                <!-- Cabeçalho do Pilar -->
                <div class="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span class="text-xs font-mono font-medium text-emerald-500 uppercase tracking-wider">
                      {{ pillar.domain }}
                    </span>
                    <h3 class="text-xl font-bold tracking-tight text-foreground mt-1">
                      {{ pillar.title }}
                    </h3>
                  </div>
                </div>

                <p class="text-sm text-muted-foreground leading-relaxed mb-6">
                  {{ pillar.description }}
                </p>

                <!-- Lista de Tecnologias & Níveis -->
                <div class="space-y-4">
                  @for (skill of pillar.skills; track skill.name) {
                    <div class="p-3 rounded-lg border border-border/60 bg-secondary/30 transition-colors hover:bg-secondary/60">
                      <div class="flex items-center justify-between gap-2">
                        <span class="text-sm font-semibold text-foreground flex items-center gap-2">
                          @if (skill.highlight) {
                            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          }
                          {{ skill.name }}
                        </span>
                        <z-badge
                          [variant]="skill.level === 'Especialista' ? 'emerald' : 'outline'"
                          class="text-[10px] uppercase font-mono tracking-wider py-0"
                        >
                          {{ skill.level }}
                        </z-badge>
                      </div>

                      <div class="flex flex-wrap gap-1.5 mt-2">
                        @for (tag of skill.tags; track tag) {
                          <span class="font-mono text-[11px] text-muted-foreground bg-background/80 border border-border/60 rounded px-1.5 py-0.5">
                            {{ tag }}
                          </span>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class StackMatrixComponent {
  protected readonly stackPillars = PORTFOLIO_STACK;
}
