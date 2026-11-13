import { Component } from '@angular/core';
import { SectionTitle } from '../../ui/section-title/section-title';

@Component({
  selector: 'app-journey',
  imports: [SectionTitle],
  templateUrl: './journey.html',
  styleUrl: './journey.css',
})
export class Journey {
  protected readonly milestones = [
    {
      period: 'Mar – Dec 2024',
      title: 'Mentee',
      org: 'KamiLimu',
      points: [
        'One of 38 students selected nationwide for a programme on technical excellence, leadership and innovation.',
        'Contributed to open-source work on governance, transparency and digital inclusion.',
      ],
    },
    {
      period: '2024',
      title: 'AI / ML Bootcamp',
      org: 'Safaricom Women in Technology',
      points: [
        'Intensive training in predictive modelling and data-driven problem solving.',
        'Applied machine learning to log analysis and failure prediction for AIOps.',
      ],
    },
    {
      period: 'Jul 2025 – May 2026',
      title: 'Service Observability Engineer (Intern)',
      org: 'M-PESA Africa',
      points: [
        'Backend services in Java (Spring Boot) that automate operational processes.',
        'Dashboards in Dynatrace and Grafana for service health, latency and operational metrics.',
        'Onboarding new services into monitoring for end-to-end visibility from day one.',
      ],
    },
    {
      period: 'Jun 2026 – Present',
      title: 'Service Observability Engineer',
      org: 'M-PESA Africa',
      points: [
        'Backend services in Java (Spring Boot) that automate operational processes.',
        'Dashboards in Dynatrace and Grafana for service health, latency and operational metrics.',
        'Onboarding new services into monitoring for end-to-end visibility from day one.',
      ],
    },
  ];
}