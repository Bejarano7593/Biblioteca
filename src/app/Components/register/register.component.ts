import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() close = new EventEmitter<void>();
  @Output() openLoginModal = new EventEmitter<void>();

  userData = {
    user: '',
    password: '',
    name: '',
    lastName: '',
    email: '',
    direction: '',
    phone: ''
  };

  constructor(private router: Router) { }

  registerUser() {
    if (this.userData.user && this.userData.password && this.userData.name &&
        this.userData.lastName && this.userData.email && this.userData.direction) {
      localStorage.setItem('userData', JSON.stringify(this.userData));
      alert('Usuario registrado con éxito');
      this.resetForm();
      this.closeModal();
      this.openLoginModal.emit();
    } else {
      alert('Por favor, complete todos los campos requeridos');
    }
  }

  resetForm() {
    this.userData = {
      user: '',
      password: '',
      name: '',
      lastName: '',
      email: '',
      direction: '',
      phone: ''
    };
  }

  closeModal() {
    this.close.emit();
  }
}
