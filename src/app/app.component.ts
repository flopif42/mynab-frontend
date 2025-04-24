import { Component, Injectable } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { materialImports } from './material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterLink, RouterOutlet, materialImports]
})

@Injectable({
    providedIn: 'root'
})
export class AppComponent {
    _isLoggedIn = false;
    _collapsed = false;
    
    constructor(private router: Router) { }

    logout() {
        this._isLoggedIn = false
        this.router.navigate(['/login'])
    }

    toggleSidenav() {
        this._collapsed = !this._collapsed;
    }
}
