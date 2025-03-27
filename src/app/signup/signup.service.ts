import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Md5 } from 'ts-md5';
import { environment } from '../../environments/environment'

export class checkEmailResponse {
    available: Boolean;
}

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    m_endpoint = environment.apiUrl + "/user"

    constructor(private http: HttpClient) { }

    signup(first_name: string, last_name: string, email_address: string, password: string){
        var passphrase_md5 = Md5.hashStr(password);
        return this.http.post<Object>(this.m_endpoint + "/sign-up", {
            first_name, last_name, email_address, passphrase_md5
        });
    }

    checkEmailAvailable(email_address: string): Observable<checkEmailResponse> {
        let params = new HttpParams().set("email_address", email_address)
        return this.http.get<checkEmailResponse>(this.m_endpoint + "/check_email_available", { params: params });
    }
}
