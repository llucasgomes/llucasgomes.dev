import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO_TESTIMONIALS } from '@/core/data/portfolio.data';
import { SectionHeaderComponent } from '@/shared/components/section-header/section-header.component';
import { RevealOnScrollDirective } from '@/shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-testimonials-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeaderComponent, RevealOnScrollDirective],
  template: `
    @if (testimonials.length > 0) {
      <section id="recomendacoes" class="py-16 md:py-24 border-b border-border/60">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <app-section-header
            eyebrow="Validação Técnica & Cultura"
            title="Recomendações & Depoimentos"
            description="Depoimentos reais de Tech Leads, gestores e engenheiros com quem atuei em projetos críticos e times de alta performance."
          ></app-section-header>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (item of testimonials; track item.id; let i = $index) {
              <div
                appRevealOnScroll
                [delay]="i * 100"
                class="flex flex-col justify-between rounded-xl border border-border bg-card p-6 md:p-7 shadow-xs hover:border-foreground/30 transition-all duration-200"
              >
                <!-- Citação / Depoimento Resumido -->
                <div class="space-y-4">
                  <div class="text-emerald-500 font-serif text-3xl leading-none select-none">“</div>
                  <p class="text-sm text-foreground/90 leading-relaxed italic">
                    {{ item.summary }}
                  </p>
                </div>

                <!-- Autor do Depoimento com Link do LinkedIn -->
                <div class="mt-6 pt-5 border-t border-border/60 flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="h-10 w-10 shrink-0 rounded-full bg-secondary border border-border flex items-center justify-center font-mono text-xs font-bold text-foreground">
                      {{ item.initials }}
                    </div>
                    <div class="min-w-0">
                      <div class="text-sm font-semibold text-foreground truncate">
                        {{ item.name }}
                      </div>
                      <div class="text-xs text-muted-foreground truncate">
                        {{ item.role }} • {{ item.company }}
                      </div>
                    </div>
                  </div>

                  @if (item.linkedinUrl) {
                    <a
                      [href]="item.linkedinUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      [attr.aria-label]="'LinkedIn de ' + item.name"
                      title="Ver perfil no LinkedIn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    }
  `,
})
export class TestimonialsSectionComponent {
  protected readonly testimonials = PORTFOLIO_TESTIMONIALS;
}
