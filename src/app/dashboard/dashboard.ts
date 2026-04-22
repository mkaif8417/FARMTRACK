import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldData } from '../field-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  totalPhotos: number = 0;
  recentPhotos: any[] = [];

  constructor(private fieldData: FieldData) {}

  ngOnInit(): void {
    // Get photos from memory
    const photos = this.fieldData.getPhotos();
    this.totalPhotos = photos.length;
    this.recentPhotos = photos.slice(0, 3);

    // If empty get count from localStorage
    if (photos.length === 0) {
      const saved = localStorage.getItem('farmtrack_meta');
      if (saved) {
        const meta = JSON.parse(saved);
        this.totalPhotos = meta.length;
        this.recentPhotos = meta.slice(0, 3);
      }
    }

    // Listen for new photos
    this.fieldData.photos$.subscribe(photos => {
      this.totalPhotos = photos.length;
      this.recentPhotos = photos.slice(0, 3);
    });
  }
}