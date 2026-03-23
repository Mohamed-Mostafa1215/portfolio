import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Project, TeamMember, Testimonial, ContactForm } from '../models/agency.models';
import { PROJECTS_DATA, TEAM_DATA, TESTIMONIALS_DATA } from '../data/agency.data';

export type { Project, TeamMember, Testimonial, ContactForm };

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  getProjects(): Observable<Project[]> {
    return of(PROJECTS_DATA).pipe(delay(300));
  }

  getTeam(): Observable<TeamMember[]> {
    return of(TEAM_DATA).pipe(delay(400));
  }

  getTestimonials(): Observable<Testimonial[]> {
    return of(TESTIMONIALS_DATA).pipe(delay(300));
  }

  submitContactForm(data: ContactForm): Observable<{ success: boolean; message?: string }> {
    if (!data.email || !data.name || !data.message) {
      return of({ success: false, message: 'All fields are required' }).pipe(delay(800));
    }
    return of({ success: true, message: 'Message sent successfully!' }).pipe(delay(800));
  }
}
