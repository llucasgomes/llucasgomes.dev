import { Injectable, effect, signal, inject, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly STORAGE_KEY = 'llucasgomes_theme';

  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      if (this.isBrowser) {
        const root = document.documentElement;
        if (currentTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        try {
          localStorage.setItem(this.STORAGE_KEY, currentTheme);
        } catch {
          // LocalStorage fallback se indisponível
        }
      }
    });
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'dark';
    }

    try {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // Ignora erro de acesso ao localStorage
    }

    return 'dark';
  }

  toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
