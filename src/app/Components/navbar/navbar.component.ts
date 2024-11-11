import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showUserMenu: boolean = false;
  showLoginModal: boolean = false;
  showRegisterModal: boolean = false;
  isLoggedIn: boolean = false;
  userIcon: string = 'usuario.png';
  userName: string = '';

  constructor(public router: Router) { }

  ngOnInit() {
    this.checkUserStatus();
  }

  checkUserStatus() {
    const userData = localStorage.getItem('userData');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (userData && isLoggedIn === 'true') {
      const user = JSON.parse(userData);
      this.isLoggedIn = true;
      this.userName = user.name || 'Usuario';
      this.userIcon = 'registrarse.png';
    } else {
      this.isLoggedIn = false;
      this.userIcon = 'usuario.png';
    }
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  openModal(modalType: string) {
    if (modalType === 'login') {
      this.showLoginModal = true;
      this.showRegisterModal = false;
    } else if (modalType === 'register') {
      this.showRegisterModal = true;
      this.showLoginModal = false;
    }
  }

  closeModal(modalType: string) {
    if (modalType === 'login') {
      this.showLoginModal = false;
    } else if (modalType === 'register') {
      this.showRegisterModal = false;
    }
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    this.checkUserStatus();
    this.router.navigate(['/']);
  }

  openLoginAfterRegister() {
    this.showRegisterModal = false;
    this.showLoginModal = true;
  }

  // Método para verificar el estado de inicio de sesión después de login
  onLoginSuccess() {
    this.checkUserStatus();
    this.showLoginModal = false;
  }

  // Método para abrir el perfil
  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
