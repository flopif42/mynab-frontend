import { Component, Injectable } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterLink, RouterOutlet, MatSidenavModule],
})

@Injectable({
    providedIn: 'root'
})
export class AppComponent {
    _isLoggedIn = false;

    constructor(private router: Router, private authService: AuthService) { }

    logout() {
        this._isLoggedIn = false
        this.router.navigate(['/login'])
    }
}
