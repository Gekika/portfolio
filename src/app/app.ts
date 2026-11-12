import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobeHero } from './sections/globe-hero/globe-hero';
import { Hello } from './sections/hello/hello';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobeHero, Hello],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('portfolio');
}