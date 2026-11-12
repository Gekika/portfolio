import { Component } from '@angular/core';
import { SectionTitle } from '../../ui/section-title/section-title';

interface Project {
  title: string;
  summary: string;
  tags: string[];
  image?: string; // a file in public/, e.g. 'projects/gekika-dev.png'
  link?: string;
}

@Component({
  selector: 'app-projects',
  imports: [SectionTitle],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  protected readonly projects: Project[] = [
    {
      title: 'gekika.dev',
      summary:
        'This site. An Angular app with a WebGL globe, shipped by my own CI/CD pipeline: every push builds a Docker image and deploys it to my VPS behind Nginx with HTTPS.',
      tags: ['Angular', 'Tailwind', 'Docker', 'GitHub Actions', 'Nginx'],
      link: 'https://github.com/Gekika/portfolio', // remove if the repo is private
    },
    {
      title: 'Your next project',
      summary: 'One or two sentences: what it does, why you built it, and what you learned.',
      tags: ['Java', 'Spring Boot'],
    },
  ];
}