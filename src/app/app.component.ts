import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.authservice';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterLink, RouterOutlet],
})

@Injectable({
    providedIn: 'root'
})
export class AppComponent {
    m_bLoggedIn = false;

    constructor(private authService: AuthService) { }

    refreshAccessToken() {
        this.authService.refresh().subscribe(
            res => {
                console.log('Response status:', res.status);
                console.log('Body:', res.body);
            },
            error => {
                console.error('Observer got an error: ', error.status);
            }
        )
    }
}
