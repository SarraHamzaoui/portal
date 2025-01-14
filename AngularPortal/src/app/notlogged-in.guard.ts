import { CanActivateFn } from '@angular/router';

import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from './services/login.service';


@Injectable({
  providedIn: 'root',

})
export class notloggedInGuard implements CanActivate {

  constructor(private router: Router, private platform: Platform, private loginService: LoginService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.platform.isBrowser) {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decoded = this.loginService.decodeJwt(token);
        if (decoded.role === 'admin' && decoded.status === 'activate') {
          this.router.navigate(['dashBoardAdmin']);
        } else if (decoded.role === 'user' && decoded.status === 'activate') {
          this.router.navigate(['dashBoardUser']);
        }
        return false;
      }
    }
    return true;
  }



}
