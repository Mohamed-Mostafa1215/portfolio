import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './glass-card.component.html',
  styleUrl: './glass-card.component.css'
})
export class GlassCardComponent {
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  get paddingClasses(): string {
    switch (this.padding) {
      case 'none': return 'p-0';
      case 'sm': return 'p-4';
      case 'md': return 'p-6';
      case 'lg': return 'p-8 md:p-10';
      default: return 'p-6';
    }
  }
}
