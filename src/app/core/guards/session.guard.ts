import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { APP_CONFIG } from '../configs';

@Injectable(
    { providedIn: 'root' }
)
export class SessionGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        let token = localStorage.getItem("token");

        if (token === null) {
            return true;
        } else if (!JSON.parse(token).token) {
            return true;
        }

        this.router.navigate(['/home']);
        return false;
    }
}
