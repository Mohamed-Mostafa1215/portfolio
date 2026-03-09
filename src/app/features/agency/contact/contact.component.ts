import { Component, inject } from '@angular/core';
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
  agencyService = inject(AgencyService);
  
  form: ContactForm = {
    name: '',
    email: '',
    projectType: '',
    message: ''
  };
  
  submitting = false;
  success = false;
  errors: { [key: string]: string } = {};

  validate(): boolean {
    this.errors = {};
    
    if (!this.form.name.trim()) {
      this.errors['name'] = 'Name is required';
    }
    
    if (!this.form.email.trim()) {
      this.errors['email'] = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
      this.errors['email'] = 'Please enter a valid email';
    }
    
    if (!this.form.message.trim()) {
      this.errors['message'] = 'Message is required';
    }
    
    return Object.keys(this.errors).length === 0;
  }

  onSubmit() {
    if (!this.validate()) return;
    
    this.submitting = true;
    this.agencyService.submitContactForm(this.form).subscribe(() => {
      this.submitting = false;
      this.success = true;
      this.form = { name: '', email: '', projectType: '', message: '' };
      this.errors = {};
      setTimeout(() => this.success = false, 5000);
    });
  }
}
