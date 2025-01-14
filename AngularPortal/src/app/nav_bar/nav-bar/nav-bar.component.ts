import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Input() backgroundColor: string = '#2d84e7';

  constructor(private router: Router) { }

  isLoggedIn() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authToken') !== null;
    }
    return false;
  }


  onLogout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['']);
  }
}
