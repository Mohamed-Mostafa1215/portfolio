import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AgencyService, Testimonial } from '../../../core/services/agency.service';
import { GlassCardComponent } from '../../../shared/ui/glass-card/glass-card.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, GlassCardComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent implements OnInit {
  private agencyService = inject(AgencyService);
  private destroyRef = inject(DestroyRef);
  testimonials: Testimonial[] = [];

  ngOnInit() {
    this.agencyService.getTestimonials()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(t => this.testimonials = t);
  }
}
