import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor() {
    // Clean up broken photos from localStorage
    const saved = localStorage.getItem('farmtrack_meta');
    if (saved) {
      const meta = JSON.parse(saved);
      const clean = meta.filter((p: any) => p.lat && p.lng);
      localStorage.setItem('farmtrack_meta', JSON.stringify(clean));
    }
  }
}