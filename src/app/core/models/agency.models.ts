export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  liveUrl: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  authorRole: string;
  image: string;
}

export interface ContactForm {
  name: string;
  email: string;
  projectType: string;
  message: string;
}
