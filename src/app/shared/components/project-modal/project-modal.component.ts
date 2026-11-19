import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  viewChild,
  effect,
} from '@angular/core';
import { Project } from '@/core/models/project.model';
import { ZardButtonComponent } from '../button/button.component';
import { ZardBadgeComponent } from '../badge/badge.component';
import { ZardSeparatorComponent } from '../separator/separator.component';

@Component({
  selector: 'app-project-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ZardButtonComponent, ZardBadgeComponent, ZardSeparatorComponent],
  template: `
    @if (project()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'modal-title-' + project()!.id"
      >
        <!-- Backdrop com blur sutil -->
        <div
          class="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          (click)="closeModal()"
          aria-hidden="true"
        ></div>

        <!-- Conteúdo do Dialog / Modal -->
        <div
          #dialogContent
          tabindex="-1"
          class="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card text-card-foreground shadow-2xl animate-in zoom-in-95 duration-200 scrollbar-thin"
        >
          <!-- Header do Modal -->
          <div class="sticky top-0 z-20 flex items-start justify-between border-b border-border bg-card/95 px-6 py-4 backdrop-blur-md">
            <div>
              <div class="flex items-center gap-2 mb-1.5">
                <z-badge variant="outline" class="text-[11px]">{{ project()!.categoryLabel }}</z-badge>
                @if (project()!.featured) {
                  <z-badge variant="emerald" class="text-[11px]">Destaque Arquitetural</z-badge>
                }
              </div>
              <h3 [id]="'modal-title-' + project()!.id" class="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {{ project()!.title }}
              </h3>
            </div>
            <button
              type="button"
              (click)="closeModal()"
              class="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Fechar modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Corpo do Modal -->
          <div class="p-6 space-y-6">
            <!-- Resumo executivo -->
            <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {{ project()!.summary }}
            </p>

            <!-- Métricas de Impacto em Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-secondary/50 border border-border/60">
              @for (metric of project()!.metrics; track metric.label) {
                <div>
                  <div class="font-mono text-lg sm:text-xl font-bold text-amber-500 dark:text-amber-400">
                    {{ metric.value }}
                  </div>
                  <div class="text-xs text-muted-foreground mt-0.5">
                    {{ metric.label }}
                  </div>
                </div>
              }
            </div>

            <!-- Seção 1: O Problema Real -->
            <div class="space-y-2">
              <h4 class="text-sm font-semibold tracking-wide uppercase font-mono text-foreground flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                1. O Problema Real
              </h4>
              <p class="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l-2 border-red-500/30">
                {{ project()!.architecture.problem }}
              </p>
            </div>

            <z-separator></z-separator>

            <!-- Seção 2: Decisões de Arquitetura & Stack -->
            <div class="space-y-3">
              <h4 class="text-sm font-semibold tracking-wide uppercase font-mono text-foreground flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                2. Decisões de Arquitetura & Engenharia
              </h4>
              <ul class="space-y-2 pl-3.5 border-l-2 border-blue-500/30">
                @for (decision of project()!.architecture.decisions; track decision) {
                  <li class="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span class="text-blue-500 select-none mt-1 text-xs">▸</span>
                    <span>{{ decision }}</span>
                  </li>
                }
              </ul>
            </div>

            <z-separator></z-separator>

            <!-- Seção 3: Resultados & Impacto Técnico -->
            <div class="space-y-3">
              <h4 class="text-sm font-semibold tracking-wide uppercase font-mono text-foreground flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                3. Resultados & Impacto Técnico
              </h4>
              <ul class="space-y-2 pl-3.5 border-l-2 border-emerald-500/30">
                @for (impact of project()!.architecture.techImpact; track impact) {
                  <li class="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span class="text-emerald-500 select-none mt-1 text-xs">✓</span>
                    <span>{{ impact }}</span>
                  </li>
                }
              </ul>
            </div>

            <z-separator></z-separator>

            <!-- Stack Tecnológica Utilizada -->
            <div class="space-y-2">
              <h4 class="text-xs font-semibold tracking-wider uppercase font-mono text-muted-foreground">
                Stack & Tecnologias
              </h4>
              <div class="flex flex-wrap gap-1.5">
                @for (tech of project()!.stack; track tech) {
                  <z-badge variant="secondary" class="text-xs">{{ tech }}</z-badge>
                }
              </div>
            </div>
          </div>

          <!-- Footer com Ações -->
          <div class="sticky bottom-0 z-20 flex items-center justify-between border-t border-border bg-card/95 px-6 py-4 backdrop-blur-md">
            <span class="text-xs text-muted-foreground font-mono">Pressione ESC para fechar</span>
            <div class="flex items-center gap-2">
              @if (project()!.links.github) {
                <a
                  [href]="project()!.links.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  z-button
                  variant="outline"
                  size="sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  Repositório
                </a>
              }
              @if (project()!.links.demo) {
                <a
                  [href]="project()!.links.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  z-button
                  variant="default"
                  size="sm"
                >
                  Ver Demonstração →
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class ProjectModalComponent {
  readonly project = input<Project | null>(null);
  readonly closed = output<void>();

  private readonly dialogRef = viewChild<ElementRef<HTMLElement>>('dialogContent');

  constructor() {
    effect(() => {
      const p = this.project();
      if (p) {
        // Trava o scroll do body enquanto o modal estiver aberto
        if (typeof document !== 'undefined') {
          document.body.style.overflow = 'hidden';
        }
        setTimeout(() => {
          this.dialogRef()?.nativeElement.focus();
        }, 50);
      } else {
        if (typeof document !== 'undefined') {
          document.body.style.overflow = '';
        }
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.project()) {
      this.closeModal();
    }
  }

  closeModal(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    this.closed.emit();
  }
}
