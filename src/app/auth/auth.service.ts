import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from "@angular/common/http";
import { Md5 } from 'ts-md5';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    m_endpoint = environment.apiUrl + "/user"
    private http: HttpClient;
    constructor(private httpBackend: HttpBackend, private router: Router) {
        this.http = new HttpClient(httpBackend)
    }

    // Login with credentials to request an Access Token and a Refresh Token
    login(email_address: string, password: string) {
        var passphrase_md5 = Md5.hashStr(password);
        return this.http.post<Object>(this.m_endpoint + "/login", { email_address, passphrase_md5 }, { observe: 'response', withCredentials: true })
            .pipe(shareReplay());
    }

    // Attempt to refresh the access token
    attemptRefresh(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log("Attempting to refresh the token ...")
        req = req.clone({ withCredentials: true })
        var obs = this.http.get(this.m_endpoint + "/refresh", { observe: 'response', withCredentials: true })
        obs.subscribe(
            res => {
                console.log("Access token successfully refreshed. Retrying the same request ...")
                console.log(req.url)
                return next.handle(req)
            },
            error => {
                console.error("in attemptRefresh() : Attempt to refresh the access token failed.");
                this.router.navigate(['/login']);
            })
        return obs
    }

    // Call the refresh endpoint to request a new Access Token, provided the Refresh token is not expired.
    /*
    refresh() {
        console.log('in AuthService.refresh() called by httpbackend')
        return this.http.get(this.m_endpoint + "/refresh", { observe: 'response', withCredentials: true })
    }
    */
}
