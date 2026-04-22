import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldData {
  private photos: any[] = [];
  private photosSubject = new BehaviorSubject<any[]>([]);

  photos$ = this.photosSubject.asObservable();

  constructor() {
    // Load metadata only from localStorage (no images)
    const saved = localStorage.getItem('farmtrack_meta');
    if (saved) {
      this.photos = JSON.parse(saved);
      this.photosSubject.next(this.photos);
    }
  }

  addPhoto(photo: any) {
    this.photos.unshift(photo);

    // Save only metadata without image to localStorage
    const meta = this.photos.map(p => ({
      name: p.name,
      lat: p.lat,
      lng: p.lng,
      time: p.time,
      image: null
    }));
    localStorage.setItem('farmtrack_meta', JSON.stringify(meta));
    this.photosSubject.next(this.photos);
  }

  getPhotos() {
    return this.photos;
  }

  getTotalPhotos(): number {
    const saved = localStorage.getItem('farmtrack_meta');
    return saved ? JSON.parse(saved).length : this.photos.length;
  }
}