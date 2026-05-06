import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  /** Current theme signal */
  readonly theme = signal<Theme>(this.getInitialTheme());

  /** Whether the current theme is dark */
  readonly isDark = () => this.theme() === 'dark';

  constructor() {
    // Persist theme changes to localStorage
    effect(() => {
      const current = this.theme();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('agency-theme', current);
        // Also apply to <html> for global CSS variable support
        document.documentElement.setAttribute('data-theme', current);
      }
    });
  }

  /** Toggle between dark and light */
  toggle(): void {
    this.theme.set(this.isDark() ? 'light' : 'dark');
  }

  private getInitialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) return 'dark';

    // 1. Respect explicit user choice stored in localStorage
    const stored = localStorage.getItem('agency-theme');
    if (stored === 'light' || stored === 'dark') return stored;

    // 2. Detect system/device preference (iPhone dark mode, Windows dark mode, etc.)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
