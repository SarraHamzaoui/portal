import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../../nav_bar/nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    NavBarComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  loginForm: FormGroup;
  loginError: string | null = null;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.loginService.login(credentials).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.mytoken);
        localStorage.setItem(
          'userData',
          JSON.stringify(this.decryptToken(response.mytoken))
        );
        console.log(
          'Login successful, token stored in localStorage:',
          response
        );
        console.log('User role:', response.role);
        console.log('Status user:', response.status);
        this.loginError = null;

        // Rediriger l'utilisateur en fonction du rôle et du statut
        if (response.role === 'admin' && response.status === 'activate') {
          this.router.navigate(['dashBoardAdmin']);
        } else if (response.role === 'user' && response.status === 'activate') {
          this.router.navigate(['dashBoardUser']);
        }
      },
      (error) => {
        console.error('Login failed:', error);
        if (error.status === 401) {
          this.loginError = 'Email or password invalid!';
        } else {
          this.loginError = 'An unexpected error occurred. Please try again.';
        }
      }
    );
  }

  private decryptToken(token: string): any {
    if (!token) {
      return null;
    }
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
