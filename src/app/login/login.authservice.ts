import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
/*
import { shareReplay } from 'rxjs/operators'
*/

@Injectable({
    providedIn: 'root',
    imports: [ReactiveFormsModule, HttpClientModule]
})
export class AuthService {
    m_serviceUrl = 'http://91.134.68.226:5000';

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        const endpoint = this.m_serviceUrl + "/transactions"

        return this.http.post<Object>(endpoint, { email, password })
            // .pipe(shareReplay())
            ;
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
    }
}
