import { Component } from '@angular/core';
import { GlobeCanvas } from './globe-canvas/globe-canvas';

@Component({
  selector: 'app-globe-hero',
  imports: [GlobeCanvas],
  templateUrl: './globe-hero.html',
  styleUrl: './globe-hero.css',
})
export class GlobeHero {}