import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgencyService } from '../../../core/services/agency.service';
import type { ContactForm } from '../../../core/models/agency.models';
import { GlassCardComponent } from '../../../shared/ui/glass-card/glass-card.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { InputComponent } from '../../../shared/ui/input/input.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, GlassCardComponent, ButtonComponent, InputComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private agencyService = inject(AgencyService);
  
  form: ContactForm = {
    name: '',
    email: '',
    projectType: '',
    message: ''
  };
  
  submitting = signal(false);
  success = signal(false);
  error = signal<string | null>(null);
  errors = signal<{ [key: string]: string }>({});

  validate(): boolean {
    const newErrors: { [key: string]: string } = {};
    
    if (!this.form.name.trim()) {
      newErrors['name'] = 'Name is required';
    }
    
    if (!this.form.email.trim()) {
      newErrors['email'] = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
      newErrors['email'] = 'Please enter a valid email';
    }
    
    if (!this.form.message.trim()) {
      newErrors['message'] = 'Message is required';
    }
    
    this.errors.set(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  onSubmit() {
    this.error.set(null);
    
    if (!this.validate()) return;
    
    this.submitting.set(true);
    this.agencyService.submitContactForm(this.form).subscribe({
      next: (response) => {
        this.submitting.set(false);
        if (response.success) {
          this.success.set(true);
          this.form = { name: '', email: '', projectType: '', message: '' };
          this.errors.set({});
          setTimeout(() => this.success.set(false), 5000);
        } else {
          this.error.set(response.message || 'Failed to send message. Please try again.');
        }
      },
      error: (err) => {
        this.submitting.set(false);
        this.error.set('An error occurred. Please try again later.');
        console.error('Contact form error:', err);
      }
    });
  }

  clearError() {
    this.error.set(null);
  }
}
