import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { UserProfile } from './user.model'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    m_endpoint = environment.apiUrl + "/user"

    constructor(private http: HttpClient) { }

    getProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(this.m_endpoint + '/profile')
    }

    logout(): Object {
        return this.http.get<Object>(this.m_endpoint + '/logout')
    }
}
