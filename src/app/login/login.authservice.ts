import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType } from "@angular/common/http";
import { Md5 } from 'ts-md5';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const clonedRequest = req.clone({
        withCredentials: true,
    });
    
    return next(clonedRequest).pipe(tap(event => {
        if (event.type === HttpEventType.Response) {
            //console.log(req.url, 'returned a response with status', event.status);
        }
    }
    ));
    
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    m_endpoint = environment.apiUrl + "/user/login"

    constructor(private http: HttpClient) { }

    login(email_address: string, password: string) {
        var passphrase_md5 = Md5.hashStr(password);
        var response = this.http.post<Object>(this.m_endpoint, { email_address, passphrase_md5 }, { observe: 'response' })
            .pipe(shareReplay());
        return response;
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
    }
}
