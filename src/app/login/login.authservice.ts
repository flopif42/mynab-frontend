import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Md5 } from 'ts-md5';

/*
import { shareReplay } from 'rxjs/operators'
*/

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    m_serviceUrl = 'http://91.134.68.226:5000';
    m_endpoint = this.m_serviceUrl + "/user/login"

    constructor(private http: HttpClient) { }

    login(email_address: string, password: string) {
        var passphrase_md5 = Md5.hashStr(password);

        return this.http.post<Object>(this.m_endpoint, { email_address, passphrase_md5 })
            // .pipe(shareReplay())
            ;
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
    }
}
