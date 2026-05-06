import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { BLOG_DATA } from '../../../core/data/agency.data';
import { BlogPost } from '../../../core/models/agency.models';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.component.html',
})
export class BlogPostComponent implements OnInit {
  post: BlogPost | undefined;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.post = BLOG_DATA.find(p => p.slug === slug);
      
      if (this.post) {
        // Dynamic SEO for the article
        this.titleService.setTitle(`${this.post.title} | مدونة DarWeb`);
        this.metaService.updateTag({ name: 'description', content: this.post.excerpt });
        
        // Open Graph
        this.metaService.updateTag({ property: 'og:title', content: this.post.title });
        this.metaService.updateTag({ property: 'og:description', content: this.post.excerpt });
        this.metaService.updateTag({ property: 'og:image', content: this.post.image });
      }
    });
  }
}
