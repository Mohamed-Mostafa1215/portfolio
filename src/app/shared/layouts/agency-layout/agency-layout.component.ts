import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
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
export class AgencyLayoutComponent implements OnInit, OnDestroy {
  themeService = inject(ThemeService);
  loadingService = inject(LoadingService);
  mobileMenuOpen = false;
  
  socialProofVisible = signal(false);
  currentProof = signal<{name: string, location: string, action: string, time: string} | null>(null);
  private proofInterval: any;
  private proofs = [
    { name: 'محمد', location: 'الرياض', action: 'طلب إنشاء متجر إلكتروني', time: 'منذ 5 دقائق' },
    { name: 'أحمد', location: 'القاهرة', action: 'حجز استشارة لتطوير موقعه', time: 'منذ 15 دقيقة' },
    { name: 'سارة', location: 'جدة', action: 'طلبت نظام إدارة لشركتها', time: 'منذ ساعة' },
    { name: 'محمود', location: 'الإسكندرية', action: 'طلب إعادة تصميم متجره', time: 'منذ ساعتين' },
    { name: 'خالد', location: 'دبي', action: 'بدأ مشروع موقع شركة', time: 'منذ 3 ساعات' },
  ];

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

    // Start Social Proof notifications
    setTimeout(() => this.showNextProof(), 8000); 
    this.proofInterval = setInterval(() => {
      this.showNextProof();
    }, 45000);
  }

  showNextProof() {
    const randomProof = this.proofs[Math.floor(Math.random() * this.proofs.length)];
    this.currentProof.set(randomProof);
    this.socialProofVisible.set(true);
    
    // Hide after 5 seconds
    setTimeout(() => {
      this.socialProofVisible.set(false);
    }, 6000);
  }

  ngOnDestroy() {
    if (this.proofInterval) {
      clearInterval(this.proofInterval);
    }
  }
}
