import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.authservice';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterLink, RouterOutlet],
})
export class AppComponent {
    m_bLoggedIn = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.getLoginStatus()
    }

    public isLoggedIn() {
        this.getLoginStatus()
        return this.m_bLoggedIn
    }

    public getLoginStatus() {
        let observable = this.authService.is_logged()
        return observable.subscribe(
            (response) => {
                console.log(response.body)
                if (response.body['isLogged'] == 'OK')
                    this.m_bLoggedIn = true
                else
                    this.m_bLoggedIn = false
            },
            (error) => {
                console.error('Request failed with error')
                alert(error);
            }
        )
    }
}
