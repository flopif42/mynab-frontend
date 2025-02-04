import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpResponse } from "@angular/common/http";
import { Md5 } from 'ts-md5';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private http: HttpClient;

    m_endpoint = environment.apiUrl + "/user"

    // constructor(private http: HttpClient) { }

    constructor(private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend)
    }

    // Login with credentials to request an Access Token and a Refresh Token
    login(email_address: string, password: string) {
        var passphrase_md5 = Md5.hashStr(password);
        return this.http.post<Object>(this.m_endpoint + "/login", { email_address, passphrase_md5 }, { observe: 'response' })
            .pipe(shareReplay());
    }

    // Call the refresh endpoint to request a new Access Token, provided the Refresh token is not expired.
    refresh() {
        console.log('in AuthService.refresh() called by httpbackend')
        //return this.http.get(this.m_endpoint + "/refresh", {observe: 'response'})
        return this.http.get(this.m_endpoint + "/refresh", { observe: 'response' }, { withCredentials: true })
    }
}
