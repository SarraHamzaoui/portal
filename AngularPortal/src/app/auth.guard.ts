import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private platform: Platform) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.platform.isBrowser) {
            if (!localStorage.getItem('authToken')) {
                this.router.navigate(['']);
                return false;
            }
        } else {
            return true;
        }
        return true;
    }



}
