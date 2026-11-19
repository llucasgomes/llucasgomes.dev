import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeService } from '@/core/services/theme.service';
import { ZardButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ZardButtonComponent],
  template: `
    <header class="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 transition-colors">
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Logo Tipográfico -->
        <a
          href="#"
          class="group flex items-center gap-2 text-sm font-semibold tracking-tight transition-opacity hover:opacity-90"
        >
          <span class="font-mono text-base font-bold text-foreground">
            llucasgomes<span class="text-emerald-500">.dev</span>
          </span>
          <span class="hidden sm:inline-block rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground uppercase">
            v2026.1
          </span>
        </a>

        <!-- Links de Navegação Desktop -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            href="#projetos"
            class="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-8"
          >
            Projetos
          </a>
          <a
            href="#stack"
            class="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-8"
          >
            Stack
          </a>
          <a
            href="#trajetoria"
            class="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-8"
          >
            Trajetória
          </a>
          <a
            href="#contato"
            class="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-8"
          >
            Contato
          </a>
        </nav>

        <!-- Ações do Header (Theme Toggle + CTA) -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Botão Toggle Dark/Light -->
          <button
            type="button"
            (click)="themeService.toggleTheme()"
            class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
            [attr.aria-label]="themeService.isDark() ? 'Alternar para modo claro' : 'Alternar para modo escuro'"
          >
            @if (themeService.isDark()) {
              <!-- Ícone Sol (quando escuro) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-300 rotate-0 hover:rotate-45 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            } @else {
              <!-- Ícone Lua (quando claro) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-300 rotate-0 hover:-rotate-12 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            }
          </button>

          <!-- CTA de Contato -->
          <a
            href="#contato"
            z-button
            variant="default"
            size="sm"
            class="hidden sm:inline-flex text-xs font-semibold"
          >
            Falar Comigo
          </a>

          <!-- Menu Mobile Toggle (Simples) -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu Mobile Expansível -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden border-t border-border bg-background/95 px-4 py-4 space-y-3 backdrop-blur-md animate-in slide-in-from-top-2 duration-150">
          <a
            (click)="closeMobileMenu()"
            href="#projetos"
            class="block py-1.5 text-sm font-medium text-foreground hover:text-emerald-500"
          >
            Projetos & Case Studies
          </a>
          <a
            (click)="closeMobileMenu()"
            href="#stack"
            class="block py-1.5 text-sm font-medium text-foreground hover:text-emerald-500"
          >
            Matriz de Stack
          </a>
          <a
            (click)="closeMobileMenu()"
            href="#trajetoria"
            class="block py-1.5 text-sm font-medium text-foreground hover:text-emerald-500"
          >
            Trajetória & Experiência
          </a>
          <a
            (click)="closeMobileMenu()"
            href="#contato"
            class="block py-1.5 text-sm font-medium text-foreground hover:text-emerald-500"
          >
            Contato Direto
          </a>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
