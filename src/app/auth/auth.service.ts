import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Md5 } from 'ts-md5';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    m_endpoint = environment.apiUrl + "/user"

    constructor(private http: HttpClient) { }

    // Login with credentials to request an Access Token
    login(email_address: string, password: string) {
        var passphrase_md5 = Md5.hashStr(password);
        return this.http.post<Object>(this.m_endpoint + "/login", { email_address, passphrase_md5 })
            .pipe(shareReplay());
    }

    // Logout
    logout() {
        return this.http.post<any>(this.m_endpoint + "/logout", { observe: 'response' })
            .pipe(shareReplay());
    }
}
