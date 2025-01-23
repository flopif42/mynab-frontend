import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Md5 } from 'ts-md5';
import { shareReplay } from 'rxjs/operators'
//import { environment } from '../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  //  m_endpoint = environment.apiUrl + "/user/login"
    m_endpoint = "91.134.68.226:5000" + "/user/login"

    constructor(private http: HttpClient) { }

    login(email_address: string, password: string) {
        console.log("in login() m_endpoint = ");
        console.log(this.m_endpoint);
        var passphrase_md5 = Md5.hashStr(password);

        return this.http.post<Object>(this.m_endpoint, { email_address, passphrase_md5 })
            .pipe(shareReplay());
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
    }
}
