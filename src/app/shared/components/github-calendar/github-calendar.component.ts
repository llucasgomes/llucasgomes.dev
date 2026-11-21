import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GithubService } from '@/core/services/github.service';
import { ContributionDay } from '@/core/models/github.model';

@Component({
  selector: 'app-github-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full rounded-xl border border-border/70 bg-card/60 p-5 sm:p-6 backdrop-blur-xs shadow-xs space-y-4">
      <!-- Topo do Card de Atividade -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/80 border border-border/60 text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </div>

          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm sm:text-base font-bold tracking-tight text-foreground">
                Atividade de Commits & Código Aberto
              </h3>
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <a
              href="https://github.com/llucasgomes"
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-xs text-muted-foreground hover:text-emerald-500 transition-colors"
            >
              github.com/llucasgomes →
            </a>
          </div>
        </div>

        <!-- Métrica de Total de Contribuições -->
        <div class="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-600 dark:text-emerald-400">
          <span class="font-bold">{{ githubService.totalContributions() }}</span>
          <span>contribuições no último ano</span>
        </div>
      </div>

      <!-- Grid de Contribuições Ocupando 100% da Largura de Ponta a Ponta -->
      <div class="overflow-x-auto pb-2 scrollbar-thin">
        <div class="w-full min-w-[700px] space-y-2">
          <!-- Grade de Semanas com 53 colunas proporcionais (1fr cada) -->
          <div
            class="w-full grid gap-1 sm:gap-1.5"
            [style.gridTemplateColumns]="'repeat(' + (githubService.contributionWeeks().length || 53) + ', minmax(0, 1fr))'"
          >
            @for (week of githubService.contributionWeeks(); track $index) {
              <div class="flex flex-col gap-1 sm:gap-1.5 w-full">
                @for (day of week.days; track day.date) {
                  <div
                    (mouseenter)="onHoverDay(day)"
                    (mouseleave)="onLeaveDay()"
                    [class]="getDayClass(day.level)"
                    class="w-full aspect-square rounded-[2px] transition-all duration-100 hover:scale-125 hover:z-10 cursor-pointer"
                  ></div>
                }
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Rodapé com Informação do Dia Selecionado & Legenda -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-border/50 text-xs font-mono text-muted-foreground">
        <!-- Texto do Hover (Tooltip) -->
        <div class="min-h-[20px] flex items-center">
          @if (hoveredDay()) {
            <span class="text-foreground font-medium">
              <span class="text-emerald-500 font-bold">{{ hoveredDay()!.count }}</span>
              {{ hoveredDay()!.count === 1 ? 'contribuição' : 'contribuições' }} em {{ formatDate(hoveredDay()!.date) }}
            </span>
          } @else {
            <span class="text-muted-foreground/80">
              Passe o mouse sobre os blocos para ver o histórico diário
            </span>
          }
        </div>

        <!-- Legenda de Cores -->
        <div class="flex items-center gap-1.5 self-end sm:self-auto">
          <span class="text-[11px]">Menos</span>
          <span class="h-2.5 w-2.5 rounded-[2px] bg-secondary/70 dark:bg-zinc-800 border border-border/40"></span>
          <span class="h-2.5 w-2.5 rounded-[2px] bg-emerald-500/30 border border-emerald-500/40"></span>
          <span class="h-2.5 w-2.5 rounded-[2px] bg-emerald-500/60 border border-emerald-500/60"></span>
          <span class="h-2.5 w-2.5 rounded-[2px] bg-emerald-500/85 border border-emerald-500/80"></span>
          <span class="h-2.5 w-2.5 rounded-[2px] bg-emerald-400 border border-emerald-300"></span>
          <span class="text-[11px]">Mais</span>
        </div>
      </div>
    </div>
  `,
})
export class GithubCalendarComponent {
  protected readonly githubService = inject(GithubService);
  protected readonly hoveredDay = signal<ContributionDay | null>(null);

  onHoverDay(day: ContributionDay): void {
    this.hoveredDay.set(day);
  }

  onLeaveDay(): void {
    this.hoveredDay.set(null);
  }

  getDayClass(level: number): string {
    switch (level) {
      case 1:
        return 'bg-emerald-500/30 border border-emerald-500/40';
      case 2:
        return 'bg-emerald-500/60 border border-emerald-500/60';
      case 3:
        return 'bg-emerald-500/85 border border-emerald-500/80';
      case 4:
        return 'bg-emerald-400 border border-emerald-300 shadow-xs';
      default:
        return 'bg-secondary/70 dark:bg-zinc-900 border border-border/40';
    }
  }

  formatDate(dateStr: string): string {
    try {
      const [year, month, day] = dateStr.split('-');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }
}
