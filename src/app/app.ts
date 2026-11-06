import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './sections/hero/hero';
import { Hello } from './sections/hello/hello';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Hero, Hello] ,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
