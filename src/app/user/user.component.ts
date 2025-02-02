import { AppComponent } from '../app.component';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from "@angular/common/http";
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'user-home',
    templateUrl: 'user.component.html',
})
export class UserComponent {
    m_endpoint = environment.apiUrl + "/user/profile"
    m_data = []

    constructor(private app: AppComponent, private http: HttpClient, private authService: AuthService) { }

    ngOnInit() {
        this.getUserProfile()
    }

    public getUserProfile() {
        let observable = this.http.get<Object>(this.m_endpoint)
        return observable.subscribe(
            response => {
                this.m_data = response[0];
            },
            error => {
                console.error('in getUserProfile() error')
                if (error.status === 401) {
                    console.error("This is error 401, should try and refresh access token.")
                    this.app.refreshAccessToken()
                }
            }
        )
    }
}
