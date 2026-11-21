import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO_HERO } from '@/core/data/portfolio.data';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { RevealOnScrollDirective } from '@/shared/directives/reveal-on-scroll.directive';
import { GithubCalendarComponent } from '@/shared/components/github-calendar/github-calendar.component';

@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ZardButtonComponent, ZardBadgeComponent, RevealOnScrollDirective, GithubCalendarComponent],
  template: `
    <section class="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border/60">
      <!-- Fundo de grid sutil de linhas hairline -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <!-- Badge de Disponibilidade com pulso esmeralda -->
        <div appRevealOnScroll class="inline-flex items-center gap-2">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <z-badge variant="emerald" class="py-1 px-3 text-xs font-mono">
            {{ hero.availability }}
          </z-badge>
        </div>

        <!-- Headline de Alto Impacto -->
        <div appRevealOnScroll [delay]="100" class="space-y-4 max-w-4xl">
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
            Desenvolvimento Front-End & Full-Stack com <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">foco em escala</span> e alta performance.
          </h1>
          <p class="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal">
            {{ hero.bio }}
          </p>
        </div>

        <!-- CTAs e Links de Ação -->
        <div appRevealOnScroll [delay]="200" class="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#projetos"
            z-button
            variant="default"
            size="lg"
            class="font-semibold text-sm shadow-md"
          >
            Ver Case Studies Técnicos
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>

          <a
            [href]="hero.links.github"
            target="_blank"
            rel="noopener noreferrer"
            z-button
            variant="outline"
            size="lg"
            class="text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GitHub
          </a>

          <a
            [href]="hero.links.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            z-button
            variant="ghost"
            size="lg"
            class="text-sm font-medium"
          >
            LinkedIn →
          </a>
        </div>

        <!-- Barra de Métricas Rápidas em Grid -->
        <div
          appRevealOnScroll
          [delay]="300"
          class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border/80"
        >
          @for (metric of hero.metrics; track metric.label) {
            <div class="p-4 rounded-lg bg-card/60 border border-border/60 backdrop-blur-xs">
              <div class="font-mono text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {{ metric.value }}
              </div>
              <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1 font-mono">
                {{ metric.label }}
              </div>
              <div class="text-[11px] text-muted-foreground/80 mt-0.5">
                {{ metric.detail }}
              </div>
            </div>
          }
        </div>

        <!-- Grid de Atividade do GitHub (Commits Calendar) com a mesma largura -->
        <div appRevealOnScroll [delay]="350" class="pt-2">
          <app-github-calendar></app-github-calendar>
        </div>
      </div>
    </section>
  `,
})
export class HeroSectionComponent {
  protected readonly hero = PORTFOLIO_HERO;
}
