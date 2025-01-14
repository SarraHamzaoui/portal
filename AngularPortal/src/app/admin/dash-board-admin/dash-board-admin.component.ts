import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../nav_bar/nav-bar/nav-bar.component';


@Component({
  selector: 'app-dash-board-admin',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './dash-board-admin.component.html',
  styleUrl: './dash-board-admin.component.scss'
})
export class DashBoardAdminComponent {

  node = [
    { name: 'User Management' }
  ];

  constructor(private router: Router) { }

  // ngOnInit(): void {
  //   // Vérifie si l'utilisateur est authentifié
  //   if (!localStorage.getItem('authToken')) {
  //     this.router.navigate(['']);
  //   }
  // }

  navigateToPage(name: string) {
    const basePath = 'dashBoardAdmin';
    switch (name) {
      case 'User Management':
        this.router.navigate([basePath, 'gestionUser']);
        break;
      case 'News Management':
        this.router.navigate([basePath, 'news']);
        break;
      case 'Real-Time Chat':
        this.router.navigate([basePath, 'chat']);
        break;
      case 'Send Email':
        this.router.navigate([basePath, 'email']);
        break;
      default:
        console.error(`Page inconnue: ${name}`);
    }
  }



}
