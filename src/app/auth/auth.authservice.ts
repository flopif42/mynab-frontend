import { Observable, tap, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType } from "@angular/common/http";
import { Md5 } from 'ts-md5';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const clonedRequest = req.clone({ withCredentials: true, });
    
    return next(clonedRequest).pipe(tap(
        event => {
            if (event.type === HttpEventType.Response) {
                console.log(req.url, 'In interceptor. Server returned a response with status', event.status);
            }
        })
    );
}

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
        var response = this.http.post<Object>(this.m_endpoint + "/refresh", { observe: 'response' })
            .pipe(shareReplay());
        return response;
    }
}
