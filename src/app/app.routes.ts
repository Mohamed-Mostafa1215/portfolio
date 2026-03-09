import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirect root to agency home
  {
    path: '',
    redirectTo: 'agency/home',
    pathMatch: 'full',
  },

  // Agency Landing Pages
  {
    path: 'agency',
    loadComponent: () =>
      import('./shared/layouts/agency-layout/agency-layout.component').then(
        (c) => c.AgencyLayoutComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/agency/home/home.component').then((c) => c.HomeComponent),
        data: { title: 'Home | WebDev', description: 'Crafting next-generation digital experiences.' }
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/agency/about/about.component').then((c) => c.AboutComponent),
        data: { title: 'Our Team | WebDev', description: 'Meet the expert team behind your web development needs.' }
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/agency/projects/projects.component').then((c) => c.ProjectsComponent),
        data: { title: 'Projects | WebDev', description: 'Explore our recent work and cutting-edge solutions.' }
      },
      {
        path: 'testimonials',
        loadComponent: () =>
          import('./features/agency/testimonials/testimonials.component').then((c) => c.TestimonialsComponent),
        data: { title: 'Testimonials | WebDev', description: 'Hear what our clients have to say about working with us.' }
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/agency/contact/contact.component').then((c) => c.ContactComponent),
        data: { title: 'Contact Us | WebDev', description: 'Reach out and let\'s discuss your next project.' }
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/agency/not-found/not-found.component').then((c) => c.NotFoundComponent),
        data: { title: '404 - Not Found | WebDev', description: 'The page you\'re looking for doesn\'t exist.' }
      },
    ],
  },

  // Wildcard route (404)
  {
    path: '**',
    redirectTo: 'agency/home',
  },
];