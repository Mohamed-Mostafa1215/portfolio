import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ThemeService } from '../../../core/services/theme.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-agency-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './agency-layout.component.html',
  styleUrl: './agency-layout.component.css'
})
export class AgencyLayoutComponent implements OnInit {
  themeService = inject(ThemeService);
  loadingService = inject(LoadingService);
  mobileMenuOpen = false;
  
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    // Close mobile menu on navigation
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.mobileMenuOpen = false);

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        if (event['title']) {
          this.titleService.setTitle(event['title']);
          this.metaService.updateTag({ property: 'og:title', content: event['title'] });
          this.metaService.updateTag({ property: 'twitter:title', content: event['title'] });
        }
        if (event['description']) {
          this.metaService.updateTag({ name: 'description', content: event['description'] });
          this.metaService.updateTag({ property: 'og:description', content: event['description'] });
          this.metaService.updateTag({ property: 'twitter:description', content: event['description'] });
        }
      });
  }
}
