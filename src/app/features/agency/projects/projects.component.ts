import { Component, OnInit, inject, ChangeDetectionStrategy, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AgencyService, Project } from '../../../core/services/agency.service';
import { GlassCardComponent } from '../../../shared/ui/glass-card/glass-card.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, GlassCardComponent, ButtonComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  private agencyService = inject(AgencyService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  projects: Project[] = [];
  filters = ['All', 'Web', 'Mobile', 'UI/UX'];
  activeFilter = 'All';

  ngOnInit() {
    this.agencyService.getProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.projects = [...data]; // new reference triggers OnPush
        this.cdr.markForCheck();
      });
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.cdr.markForCheck();
  }

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'All') return this.projects;
    return this.projects.filter(p => p.category === this.activeFilter);
  }
}
