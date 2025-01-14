import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  /*
    getUserIdFromToken(): string | null {
      const token = localStorage.getItem('token');
      if (!token) return null;
  
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload._id;
      } catch (e) {
        console.error('Invalid token:', e);
        return null;
      }
    }*/


  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('authToken'); // Utilisez la clé correcte
    if (!token) {
      console.warn('No token found in localStorage under "authToken"');
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
      console.log('Decoded payload:', payload); // Debug
      return payload._id || null; // Retourner l'ID utilisateur
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

}