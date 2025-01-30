import { Component } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'user-home',
    templateUrl: 'user.component.html',
})
export class UserComponent {
    m_endpoint = environment.apiUrl + "/user/profile"
    m_data = []

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getUserProfile()
    }

    public getUserProfile() {
        console.log("> getUserProfile");
        let observable = this.http.get<Object>(this.m_endpoint)
        return observable.subscribe(
            (response) => {
                console.log("< getUserProfile : (response)");
                this.m_data = response[0];
            },
            (error) => {
                console.log("< getUserProfile : (error)");
                console.error('Request failed with error')
                alert(error);
            },
            () => {
                console.log("< getUserProfile : ()");
                // stuff to do ?
            }
        )
    }
}
