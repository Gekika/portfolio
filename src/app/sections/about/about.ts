import { Component } from '@angular/core';
import { SectionTitle } from '../../ui/section-title/section-title';

@Component({
  selector: 'app-about',
  imports: [SectionTitle],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly skillGroups = [
    { name: 'Languages & Development', items: ['Java', 'Spring Boot', 'Python', 'TypeScript', 'Angular'] },
    { name: 'Observability & DevOps', items: ['Dynatrace', 'Grafana', 'OpenTelemetry', 'Docker', 'GitHub Actions', 'Nginx'] },
    { name: 'Data & AI/ML', items: ['Pandas', 'NumPy', 'scikit-learn', 'Anomaly detection', 'Predictive modelling'] },
    { name: 'Systems & Architecture', items: ['Microservices', 'Distributed systems', 'REST APIs', 'Kubernetes'] },
  ];
}