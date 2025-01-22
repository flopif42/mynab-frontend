import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { shareReplay } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {
    }
    login(email: string, password: string) {
        return this.http.post<Object>('http://91.134.68.226:5000/user/login', { email, password }).pipe(
            shareReplay()
        );
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
    }
}
