import { Component } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'user-home',
    templateUrl: 'user.component.html',
})
export class UserComponent {
    m_endpoint = environment.apiUrl + "/user/profile"
    _first_name: string
    _last_name: string
    _email_address: string

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getUserProfile()
    }

    public getUserProfile() {
        return this.http.get<Object>(this.m_endpoint).subscribe(
            response => {
                this._first_name = response['first_name'];
                this._last_name = response['last_name'];
                this._email_address = response['email_address'];
            },
            error => {
                console.error('in getUserProfile() error')
            }
        )
    }
}
