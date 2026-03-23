import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AgencyService, TeamMember } from '../../../core/services/agency.service';
import { GlassCardComponent } from '../../../shared/ui/glass-card/glass-card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, GlassCardComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  private agencyService = inject(AgencyService);
  private destroyRef = inject(DestroyRef);
  team: TeamMember[] = [];

  ngOnInit() {
    this.agencyService.getTeam()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(t => this.team = t);
  }
}
