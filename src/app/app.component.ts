import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.authservice';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterLink, RouterOutlet],
})
export class AppComponent {
    logged_in_status = 'Unknown'

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.isLoggedIn()
    }

    public isLoggedIn() {
        let observable = this.authService.is_logged()
        return observable.subscribe(
            (response) => {
                console.log(response.body)
                if (response.body['isLogged'] == 'OK')
                    this.logged_in_status = "Logged in"
                else
                    this.logged_in_status = "Logged out"
            },
            (error) => {
                console.error('Request failed with error')
                alert(error);
            }
        )
    }
}
