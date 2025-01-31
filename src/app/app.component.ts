import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.authservice';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterLink, RouterOutlet],
})
export class AppComponent {
    isLoggedIn = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.getLoginStatus()
    }

    public getLoginStatus() {
        let observable = this.authService.is_logged()
        return observable.subscribe(
            (response) => {
                console.log(response.body)
                if (response.body['isLogged'] == 'OK')
                    this.isLoggedIn = true
                else
                    this.isLoggedIn = false
            },
            (error) => {
                console.error('Request failed with error')
                alert(error);
            }
        )
    }
}
