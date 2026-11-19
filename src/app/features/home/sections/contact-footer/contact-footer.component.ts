import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PORTFOLIO_HERO } from '@/core/data/portfolio.data';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { RevealOnScrollDirective } from '@/shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ZardButtonComponent, RevealOnScrollDirective],
  template: `
    <footer id="contato" class="py-16 md:py-24 bg-card/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <!-- Card de Chamada Final para Contato -->
        <div
          appRevealOnScroll
          class="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden"
        >
          <!-- Brilho sutil de fundo -->
          <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-500">
            <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Pronto para novos desafios técnicos
          </div>

          <div class="space-y-3 max-w-xl mx-auto">
            <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Vamos discutir a arquitetura do seu próximo projeto?
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Disponível para posições sênior de engenharia de software, liderança front-end e consultorias arquiteturais especializadas em sistemas críticos.
            </p>
          </div>

          <!-- Ação de Cópia Rápida de E-mail -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              (click)="copyEmail()"
              z-button
              variant="default"
              size="lg"
              class="w-full sm:w-auto font-mono text-sm shadow-md cursor-pointer"
            >
              @if (copied()) {
                <span class="inline-flex items-center gap-2 text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  E-mail Copiado com Sucesso!
                </span>
              } @else {
                <span class="inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copiar E-mail: {{ hero.links.email }}
                </span>
              }
            </button>

            <a
              [href]="'mailto:' + hero.links.email"
              z-button
              variant="outline"
              size="lg"
              class="w-full sm:w-auto text-sm"
            >
              Enviar Mensagem Direta
            </a>
          </div>

          <!-- Links de Redes & Canais -->
          <div class="flex items-center justify-center gap-6 pt-6 border-t border-border/60">
            <a
              [href]="hero.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs font-mono"
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
              class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </a>

            <a
              [href]="hero.links.whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <!-- Linha Final de Créditos e Metadados -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground pt-4">
          <div>
            © {{ currentYear }} Lucas Gomes. Todos os direitos reservados.
          </div>
          <div class="flex items-center gap-3">
            <span>Angular 22</span>
            <span>•</span>
            <span>Tailwind CSS v4</span>
            <span>•</span>
            <span>ZardUI</span>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class ContactFooterComponent {
  protected readonly hero = PORTFOLIO_HERO;
  protected readonly copied = signal(false);
  protected readonly currentYear = new Date().getFullYear();

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.hero.links.email).then(() => {
        this.copied.set(true);
        setTimeout(() => {
          this.copied.set(false);
        }, 2000);
      });
    }
  }
}
