import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldData } from '../field-data';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map implements AfterViewInit {
  photos: any[] = [];
  map!: L.Map;

  constructor(private fieldData: FieldData) {}

  ngAfterViewInit(): void {
    // Get photos from service
    this.photos = this.fieldData.getPhotos();

    // If empty try localStorage metadata
    if (this.photos.length === 0) {
      const saved = localStorage.getItem('farmtrack_meta');
      if (saved) this.photos = JSON.parse(saved);
    }

    // Fix Leaflet marker icon
    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    // Init map at your location
    this.map = L.map('map').setView([17.8986, 77.5097], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add pins for existing photos
    this.addMarkers();

    // Listen for new photos
    this.fieldData.photos$.subscribe(photos => {
      this.photos = photos;
      this.addMarkers();
    });
  }

  addMarkers(): void {
    this.photos.forEach(photo => {
      if (photo.lat && photo.lng) {
        const marker = L.marker([photo.lat, photo.lng]).addTo(this.map);
        marker.bindPopup(`
          <b>📸 ${photo.name}</b><br>
          🕐 ${photo.time}<br>
          📍 ${photo.lat.toFixed(4)}, ${photo.lng.toFixed(4)}<br>
          ${photo.image ? `<img src="${photo.image}" width="150" 
          style="margin-top:8px; border-radius:6px"/>` : ''}
        `);
        this.map.setView([photo.lat, photo.lng], 15);
      }
    });
  }
}