import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { Md5 } from 'ts-md5';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log(req.url);
    return next(req);
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    m_endpoint = environment.apiUrl + "/user/login"

    constructor(private http: HttpClient) { }

    login(email_address: string, password: string) {
        var passphrase_md5 = Md5.hashStr(password);

        return this.http.post<Object>(this.m_endpoint, { email_address, passphrase_md5 }, { observe: 'response' })
            .pipe(shareReplay());
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
    }
}
