import { CommonModule } from '@angular/common';
import {
  Component, OnInit, OnDestroy, inject,
  ChangeDetectionStrategy, ChangeDetectorRef, DestroyRef, signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AgencyService, Testimonial } from '../../../core/services/agency.service';
import { GlassCardComponent } from '../../../shared/ui/glass-card/glass-card.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, GlassCardComponent, RouterLink],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private agencyService = inject(AgencyService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  testimonials: Testimonial[] = [];
  activeIndex = signal(0);
  isAnimating = signal(false);
  private autoTimer: any;

  // Items visible per slide (3 at a time)
  readonly PER_PAGE = 3;

  get totalPages(): number {
    return Math.ceil(this.testimonials.length / this.PER_PAGE);
  }

  get visibleTestimonials(): Testimonial[] {
    const start = this.activeIndex() * this.PER_PAGE;
    return this.testimonials.slice(start, start + this.PER_PAGE);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  ngOnInit() {
    this.agencyService.getTestimonials()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(t => {
        this.testimonials = t;
        this.cdr.markForCheck();
        this.startAutoPlay();
      });
  }

  goTo(index: number) {
    if (this.isAnimating()) return;
    this.isAnimating.set(true);
    this.activeIndex.set(index);
    this.cdr.markForCheck();
    setTimeout(() => { this.isAnimating.set(false); this.cdr.markForCheck(); }, 450);
    this.resetAutoPlay();
  }

  next() {
    const next = (this.activeIndex() + 1) % this.totalPages;
    this.goTo(next);
  }

  prev() {
    const prev = (this.activeIndex() - 1 + this.totalPages) % this.totalPages;
    this.goTo(prev);
  }

  private startAutoPlay() {
    this.autoTimer = setInterval(() => {
      this.next();
    }, 5000);
  }

  private resetAutoPlay() {
    clearInterval(this.autoTimer);
    this.startAutoPlay();
  }

  ngOnDestroy() {
    clearInterval(this.autoTimer);
  }

  getInitials(name: string): string {
    const parts = name.split(' ');
    return parts.length >= 2 ? parts[0][0] + parts[1][0] : name[0];
  }

  getAvatarColor(id: number): string {
    const colors = [
      'from-[#0ff]/30 to-[#0ff]/10 border-[#0ff]/40 text-[#0ff]',
      'from-purple-400/30 to-purple-400/10 border-purple-400/40 text-purple-300',
      'from-green-400/30 to-green-400/10 border-green-400/40 text-green-300',
      'from-yellow-400/30 to-yellow-400/10 border-yellow-400/40 text-yellow-300',
      'from-pink-400/30 to-pink-400/10 border-pink-400/40 text-pink-300',
      'from-orange-400/30 to-orange-400/10 border-orange-400/40 text-orange-300',
    ];
    return colors[id % colors.length];
  }
}
