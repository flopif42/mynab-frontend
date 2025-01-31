import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Md5 } from 'ts-md5';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    m_endpoint = environment.apiUrl + "/user"

    constructor(private http: HttpClient) {}

    // Login with credentials to request an Access Token and a Refresh Token
    login(email_address: string, password: string) {
        var passphrase_md5 = Md5.hashStr(password);
        var response = this.http.post<Object>(this.m_endpoint + "/login", { email_address, passphrase_md5 }, { observe: 'response' })
            .pipe(shareReplay());
        return response;
    }

    // Call the refresh endpoint to request a new Access Token, provided the Refresh token is not expired.
    refresh() {
        console.log('in AuthService.refresh()')
        var response = this.http.get<Object>(this.m_endpoint + "/refresh", { observe: 'response' })
            .subscribe(
                (response) => {
                    console.log("Access token refreshed");
                    return response
                },

                (error) => {
                    if (error.status == 401) {
                        console.log("Refresh token expired. User needs to log in again.");
                        alert(error);
                    }
                }
        );
    }

    // Function used to test if the user is logged in by checking the existence / validity of the refresh token
    is_logged() {
        var response = this.http.get<string>(this.m_endpoint + "/is_logged", { observe: 'response' })
            .pipe(shareReplay());
        return response;
    }
}
