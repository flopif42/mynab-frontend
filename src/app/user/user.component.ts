import { Component } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from "@angular/common/http";
import { AuthService } from '../auth/auth.authservice';

@Component({
    selector: 'user-home',
    templateUrl: 'user.component.html',
})
export class UserComponent {
    m_endpoint = environment.apiUrl + "/user/profile"
    m_data = []

    constructor(private http: HttpClient, private authService: AuthService) { }

    ngOnInit() {
        this.getUserProfile()
    }

    public getUserProfile() {
        let observable = this.http.get<Object>(this.m_endpoint)
        return observable.subscribe(
            (response) => {
                this.m_data = response[0];
            },
            (error) => {
                console.log('in getUserProfile() error, calling refresh ...')
                const x = this.authService.refresh()
                if (x == 1) {
                    alert("user must log in again")
                }
                else {
                    this.getUserProfile()
                }
                // if the refresh fails, redirect to log-in
                // else this call again
            }
        )
    }
}
