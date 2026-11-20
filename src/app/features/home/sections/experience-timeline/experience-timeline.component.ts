import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO_EXPERIENCES, PORTFOLIO_EDUCATION } from '@/core/data/portfolio.data';
import { SectionHeaderComponent } from '@/shared/components/section-header/section-header.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { RevealOnScrollDirective } from '@/shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-experience-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeaderComponent, ZardBadgeComponent, RevealOnScrollDirective],
  template: `
    <section id="trajetoria" class="py-16 md:py-24 border-b border-border/60">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-section-header
          eyebrow="Histórico de Entrega"
          title="Trajetória & Experiência Profissional"
          description="Evolução de carreira com foco em impacto tangível, liderança de padrões técnicos e resolução de problemas complexos de software."
        ></app-section-header>

        <!-- Linha do Tempo Vertical -->
        <div class="relative pl-6 sm:pl-8 border-l border-border/80 space-y-12">
          @for (item of experiences; track item.id; let i = $index) {
            <div appRevealOnScroll [delay]="i * 100" class="relative group">
              <!-- Marcador do Nó da Linha -->
              <div
                [class]="
                  item.isCurrent
                    ? 'border-emerald-500 bg-background ring-4 ring-emerald-500/20'
                    : 'border-border bg-background group-hover:border-foreground'
                "
                class="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 transition-colors"
              ></div>

              <!-- Conteúdo da Experiência -->
              <div class="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4 shadow-xs">
                <!-- Cabeçalho do Cargo -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 class="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                      {{ item.role }}
                    </h3>
                    <div class="text-sm font-medium text-emerald-500 flex items-center gap-2 mt-0.5">
                      <span>{{ item.company }}</span>
                      <span class="text-muted-foreground/60">•</span>
                      <span class="text-muted-foreground text-xs">{{ item.location }}</span>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 self-start sm:self-auto">
                    @if (item.isCurrent) {
                      <z-badge variant="emerald" class="text-[10px]">Atual</z-badge>
                    }
                    <span class="font-mono text-xs text-muted-foreground border border-border rounded-md px-2 py-1 bg-secondary/30">
                      {{ item.period }}
                    </span>
                  </div>
                </div>

                <!-- Descrição Geral -->
                <p class="text-sm text-muted-foreground leading-relaxed">
                  {{ item.description }}
                </p>

                <!-- Conquistas e Resultados Mensuráveis -->
                <div class="space-y-2 pt-2">
                  <h4 class="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                    Principais Conquistas & Impacto:
                  </h4>
                  <ul class="space-y-1.5">
                    @for (ach of item.achievements; track ach) {
                      <li class="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                        <span class="text-emerald-500 font-bold select-none mt-0.5">✓</span>
                        <span>{{ ach }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Tags de Stack da Atuação -->
                <div class="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                  @for (tech of item.stack; track tech) {
                    <span class="rounded bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Seção de Formação Acadêmica & Especializações -->
        <div class="mt-20 pt-16 border-t border-border/80 space-y-8">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span class="font-mono text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                Formação & Especializações
              </span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Educação & Certificados Técnicos
            </h3>
            <p class="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Formações intensivas e certificações práticas com foco em tecnologias modernas de mercado.
            </p>
          </div>

          <div class="space-y-6">
            @for (edu of education; track edu.degree; let i = $index) {
              <div
                appRevealOnScroll
                [delay]="i * 100"
                class="rounded-xl border border-border bg-card p-6 md:p-8 space-y-5 shadow-xs hover:border-foreground/30 transition-all duration-200"
              >
                <div class="space-y-4">
                  <!-- Topo do Card de Educação -->
                  <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div class="space-y-1">
                      <h4 class="text-lg sm:text-xl font-bold tracking-tight text-foreground leading-snug">
                        {{ edu.degree }}
                      </h4>
                      <div class="text-sm font-semibold text-emerald-500">
                        {{ edu.institution }}
                      </div>
                    </div>

                    <span class="font-mono text-xs text-muted-foreground border border-border rounded-md px-2.5 py-1 bg-secondary/30 self-start sm:self-auto shrink-0">
                      {{ edu.period }}
                    </span>
                  </div>

                  <!-- Lista de Destaques / Conquistas -->
                  @if (edu.highlights) {
                    <ul class="space-y-2.5 pt-2 border-t border-border/50">
                      @for (hl of edu.highlights; track hl) {
                        <li class="text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed">
                          <span class="text-emerald-500 font-bold select-none mt-0.5">✓</span>
                          <span>{{ hl }}</span>
                        </li>
                      }
                    </ul>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceTimelineComponent {
  protected readonly experiences = PORTFOLIO_EXPERIENCES;
  protected readonly education = PORTFOLIO_EDUCATION;
}
