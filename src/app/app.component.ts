import { Component, Injectable } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterLink, RouterOutlet],
})

@Injectable({
    providedIn: 'root'
})
export class AppComponent {
    _isLoggedIn = false;

    constructor(private router: Router, private authService: AuthService) { }

    logout() {
        this.authService.logout().subscribe(
            res => {
                console.log('Response :', res['logout']);
                this._isLoggedIn = false
                this.router.navigate(['/login'])
            },
            error => {
                console.error('Observer got an error: ', error);
                this._isLoggedIn = false
                this.router.navigate(['/login'])
            }
        )
    }
}
