import { Component } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'user-home',
    templateUrl: 'user.component.html',
})
export class UserComponent {
    m_endpoint = environment.apiUrl + "/user/profile"
    m_data = {}

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getUserProfile()
    }

    public getUserProfile() {
        return this.http.get<Object>(this.m_endpoint).subscribe(
            response => {
                this.m_data = response;
            },
            error => {
                console.error('in getUserProfile() error')
            }
        )
    }
}
