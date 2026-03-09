import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() block = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  @Output() onClick = new EventEmitter<MouseEvent>();

  get variantClass(): string {
    if (this.disabled) return 'btn-disabled';
    switch (this.variant) {
      case 'primary': return 'btn-primary';
      case 'outline': return 'btn-outline';
      default: return 'btn-primary';
    }
  }

  get sizeClasses(): string {
    switch (this.size) {
      case 'sm': return 'px-4 py-1.5 text-xs';
      case 'md': return 'px-6 py-2.5 text-sm';
      case 'lg': return 'px-8 py-3.5 text-base';
      default: return 'px-6 py-2.5 text-sm';
    }
  }
}
