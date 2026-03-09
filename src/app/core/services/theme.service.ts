import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  /** Current theme signal */
  readonly theme = signal<Theme>(this.getStoredTheme());

  /** Whether the current theme is dark */
  readonly isDark = () => this.theme() === 'dark';

  constructor() {
    // Persist theme changes to localStorage
    effect(() => {
      const current = this.theme();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('agency-theme', current);
      }
    });
  }

  /** Toggle between dark and light */
  toggle(): void {
    this.theme.set(this.isDark() ? 'light' : 'dark');
  }

  private getStoredTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) return 'dark';
    const stored = localStorage.getItem('agency-theme');
    return (stored === 'light' || stored === 'dark') ? stored : 'dark';
  }
}
