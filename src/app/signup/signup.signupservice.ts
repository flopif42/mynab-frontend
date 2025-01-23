import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Md5 } from 'ts-md5';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    m_endpoint = environment.apiUrl + "/sign-up"

    constructor(private http: HttpClient) { }

    signup(first_name: string, last_name: string, email_address: string, password: string){
        var passphrase_md5 = Md5.hashStr(password);
        return this.http.post<Object>(this.m_endpoint, {
            first_name, last_name, email_address, passphrase_md5
        });
        // this is just the HTTP call, 
        // we still need to handle the reception of the token
    }
}
