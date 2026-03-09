import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Project, TeamMember, Testimonial, ContactForm } from '../models/agency.models';

export type { Project, TeamMember, Testimonial, ContactForm };

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  getProjects(): Observable<Project[]> {
    return of([
      {
        id: 1,
        title: 'Zayngular E-Commerce',
        category: 'Web',
        description: 'A modern, full-featured e-commerce platform with sleek UI, social login, product management, and seamless checkout experience.',
        image: 'assets/projects/zayngular.png',
        liveUrl: 'https://zayngular.vercel.app/home'
      },
      {
        id: 2,
        title: 'ChainPulse Dashboard',
        category: 'Web',
        description: 'A comprehensive workshop management system with real-time analytics, revenue tracking, customer management, and maintenance workflow automation.',
        image: 'assets/projects/chainpulse.png',
        liveUrl: 'https://chainpulse-dashboard.vercel.app/'
      },
      {
        id: 3,
        title: 'Nour Coaching',
        category: 'Web',
        description: 'A professional life coaching landing page with elegant design, service showcases, testimonials, and booking integration.',
        image: 'assets/projects/nour-coaching.png',
        liveUrl: 'https://nour-potential-unlocked.vercel.app/'
      },
      {
        id: 4,
        title: 'Smile Dental Clinic',
        category: 'Web',
        description: 'A healthcare landing page for a dental clinic featuring appointment booking, service details, patient statistics, and a trustworthy design.',
        image: 'assets/projects/smile-clinic.png',
        liveUrl: 'https://smile-appointment-arabia.vercel.app/'
      },
      {
        id: 5,
        title: 'CryptoTrack App',
        category: 'Mobile',
        description: 'A sleek mobile application for tracking cryptocurrency markets, featuring real-time alerts, portfolio management, and news aggregation.',
        image: 'https://placehold.co/600x400/122830/0ff?font=montserrat&text=CryptoTrack+Mobile',
        liveUrl: 'https://github.com'
      },
      {
        id: 6,
        title: 'ZenMind Meditation',
        category: 'Mobile',
        description: 'A wellness mobile app focused on mindfulness, offering guided meditation sessions, habit tracking, and sleep improvements.',
        image: 'https://placehold.co/600x400/122830/0ff?font=montserrat&text=ZenMind+App',
        liveUrl: 'https://github.com'
      },
      {
        id: 7,
        title: 'Nexus UI Kit',
        category: 'UI/UX',
        description: 'A comprehensive design system and UI kit for enterprise applications, focusing on accessibility, modularity, and atomic design principles.',
        image: 'https://placehold.co/600x400/122830/0ff?font=montserrat&text=Nexus+UI+Kit',
        liveUrl: 'https://behance.net'
      },
      {
        id: 8,
        title: 'Glow Up Branding',
        category: 'UI/UX',
        description: 'A complete visual identity and brand guidelines for a modern skincare company, including logo design, color palette, and packaging.',
        image: 'https://placehold.co/600x400/122830/0ff?font=montserrat&text=GlowUp+Branding',
        liveUrl: 'https://dribbble.com'
      },
   
    ]).pipe(delay(300));
  }

  getTeam(): Observable<TeamMember[]> {
    return of([
      { id: 1, name: 'Alex Chen', role: 'Lead Developer', image: 'https://placehold.co/200x200/122830/0ff?font=montserrat&text=AC' },
      { id: 2, name: 'Jahna Cheg', role: 'UI/UX Designer', image: 'https://placehold.co/200x200/122830/0ff?font=montserrat&text=JC' },
      { id: 3, name: 'Alvn Gutnson', role: 'Backend Lead', image: 'https://placehold.co/200x200/122830/0ff?font=montserrat&text=AG' },
      { id: 4, name: 'Maria Rodriguez', role: 'Project Manager', image: 'https://placehold.co/200x200/122830/0ff?font=montserrat&text=MR' },
      { id: 5, name: 'David Lee', role: 'DevOps Engineer', image: 'https://placehold.co/200x200/122830/0ff?font=montserrat&text=DL' },
      { id: 6, name: 'Sarah J.', role: 'Frontend Lead', image: 'https://placehold.co/200x200/122830/0ff?font=montserrat&text=SJ' }
    ]).pipe(delay(400));
  }

  getTestimonials(): Observable<Testimonial[]> {
    return of([
      { id: 1, text: 'Their expertise transformed our platform. Highly recommend.', author: 'Sarah J.', authorRole: 'CEO of TechGlobal', image: 'https://placehold.co/100x100/122830/0ff?font=montserrat&text=SJ' },
      { id: 2, text: 'Exceptional delivery and cutting-edge approach.', author: 'Mack T.', authorRole: 'CTO of InnovateNow', image: 'https://placehold.co/100x100/122830/0ff?font=montserrat&text=MT' },
      { id: 3, text: 'A true partnership that drove absolute results.', author: 'Emily R.', authorRole: 'Product Lead', image: 'https://placehold.co/100x100/122830/0ff?font=montserrat&text=ER' }
    ]).pipe(delay(300));
  }

  submitContactForm(data: ContactForm): Observable<{success: boolean}> {
    return of({ success: true }).pipe(delay(800));
  }
}
