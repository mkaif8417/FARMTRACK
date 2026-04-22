import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  submitted: boolean = false;

  sendMessage() {
    if (this.name && this.email && this.message) {
      this.submitted = true;
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
      setTimeout(() => this.submitted = false, 4000);
    } else {
      alert('⚠️ Please fill in all required fields!');
    }
  }
}