import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private storageKey = 'users';

  constructor() { }

  // Obtener los usuarios almacenados
  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  // Guardar un nuevo usuario
  saveUser(userData: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]'); 
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Usuario guardado:', userData);
    console.log('Usuarios actualizados en localStorage:', users);
  }
}
