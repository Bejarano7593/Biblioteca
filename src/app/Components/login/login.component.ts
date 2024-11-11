import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

  userData = {
    user: '',
    password: ''
  };

  constructor(private router: Router) {}

  loginUser() {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (this.userData.user === user.user && this.userData.password === user.password) {
        alert('Inicio de sesión exitoso');
        localStorage.setItem('isLoggedIn', 'true');
        this.closeModal();
        this.loginSuccess.emit(); 
        this.router.navigate(['/categoria']);
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } else {
      alert('No se ha encontrado ningún usuario registrado');
    }
  }

  closeModal() {
    this.close.emit();
  }
}
