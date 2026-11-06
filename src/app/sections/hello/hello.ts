import { Component } from '@angular/core';
import { SectionTitle } from '../../ui/section-title/section-title';

interface Experience {
  period: string;
  role: string;
  org: string;
}

interface Education {
  title: string;
  place: string;
  period: string;
}

@Component({
  selector: 'app-hello',
  imports: [SectionTitle],
  templateUrl: './hello.html',
  styleUrl: './hello.css',
})
export class Hello {
  protected readonly skills = [
    'Java', 'Spring Boot', 'Angular', 'TypeScript', 'Python',
    'PostgreSQL', 'Docker', 'ClickHouse', 'OpenTelemetry', 'Grafana',
  ];

  protected readonly experience: Experience[] = [
    { period: 'YYYY – Present', role: 'Data Science Pillar Lead', org: 'M-Pesa Africa (Safaricom)' },
    { period: 'YYYY – YYYY', role: 'Intern, 360 Programme', org: 'M-Pesa Africa (Safaricom)' },
  ];

  protected readonly education: Education[] = [
    { title: 'BSc Computer Science', place: 'Your University', period: 'YYYY – YYYY' },
    { title: 'KamiLimu Mentorship Programme', place: 'Alumnus', period: 'YYYY' },
  ];
}