import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crops',
  imports: [CommonModule, FormsModule],
  templateUrl: './crops.html',
  styleUrl: './crops.css'
})
export class Crops {
  crops: any[] = [];
  showForm: boolean = false;

  newCrop = {
    name: '',
    field: '',
    size: '',
    plantDate: '',
    stage: 'Seeding',
    notes: ''
  };

  stages = ['Seeding', 'Germination', 'Growing', 'Flowering', 'Harvesting', 'Harvested'];

  addCrop() {
    if (this.newCrop.name && this.newCrop.field) {
      this.crops.unshift({ ...this.newCrop });
      this.newCrop = {
        name: '',
        field: '',
        size: '',
        plantDate: '',
        stage: 'Seeding',
        notes: ''
      };
      this.showForm = false;
    }
  }

  deleteCrop(index: number) {
    this.crops.splice(index, 1);
  }

  getStageColor(stage: string): string {
    const colors: any = {
      'Seeding': '#f4a261',
      'Germination': '#e9c46a',
      'Growing': '#2d6a4f',
      'Flowering': '#52b788',
      'Harvesting': '#1b4332',
      'Harvested': '#888'
    };
    return colors[stage] || '#888';
  }
}