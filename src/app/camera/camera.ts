import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldData } from '../field-data';

@Component({
  selector: 'app-camera',
  imports: [CommonModule],
  templateUrl: './camera.html',
  styleUrl: './camera.css'
})
export class Camera {
  @ViewChild('video') videoRef!: ElementRef;
  @ViewChild('canvas') canvasRef!: ElementRef;

  latitude: number = 17.8986;
  longitude: number = 77.5097;
  cameraActive: boolean = false;
  savedPhotos: any[] = [];

  constructor(private fieldData: FieldData) {
    this.savedPhotos = this.fieldData.getPhotos();
    this.fieldData.photos$.subscribe(photos => {
      this.savedPhotos = photos;
    });
    this.getLocation();
  }

  async startCamera() {
    this.cameraActive = true;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.videoRef.nativeElement.srcObject = stream;
    this.videoRef.nativeElement.play();
  }

  getLocation() {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }, (error) => {
        this.latitude = 17.8986;
        this.longitude = 77.5097;
      });
    } catch (e) {
      this.latitude = 17.8986;
      this.longitude = 77.5097;
    }
  }

  capturePhoto() {
    const canvas = this.canvasRef.nativeElement;
    const video = this.videoRef.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    const photo = {
      image: canvas.toDataURL('image/png'),
      lat: this.latitude,
      lng: this.longitude,
      time: new Date().toLocaleString(),
      name: 'Field Photo ' + (this.savedPhotos.length + 1)
    };

    // Add to service only — subscription updates savedPhotos
    this.fieldData.addPhoto(photo);
  }

  stopCamera() {
    const stream = this.videoRef.nativeElement.srcObject;
    stream?.getTracks().forEach((track: any) => track.stop());
    this.cameraActive = false;
  }
}