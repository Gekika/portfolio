import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.html',
  styleUrl: './section-title.css',
  host: { class: 'block' },
})
export class SectionTitle {
  readonly label = input.required<string>();
}