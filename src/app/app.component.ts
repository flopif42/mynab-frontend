import { Component, Injectable } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterLink, RouterOutlet, MatSidenavModule, MatListModule]
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
