import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BLOG_DATA } from '../../../core/data/agency.data';
import { BlogPost } from '../../../core/models/agency.models';
import { GlassCardComponent } from '../../../shared/ui/glass-card/glass-card.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, GlassCardComponent],
  templateUrl: './blog.component.html',
})
export class BlogComponent {
  posts: BlogPost[] = BLOG_DATA;
}
