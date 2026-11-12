import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { About } from './sections/about/about';
import { GlobeHero } from './sections/globe-hero/globe-hero';
import { Journey } from './sections/journey/journey';
import { Projects } from './sections/projects/projects';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobeHero, About, Journey, Projects],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('portfolio');
}