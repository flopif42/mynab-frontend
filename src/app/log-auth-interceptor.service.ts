import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from 'rxjs';
import { HttpInterceptor, HttpClient, HttpRequest, HttpHandlerFn, HttpHandler, HttpEvent, HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

/*
export function logAuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log("request log> " + req.url + " " + req.method);
    req = req.clone({ withCredentials: true });
    return next(req).pipe(
        tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log("response log> " + req.url + " " + req.method);
            }
        }),
        catchError((err: HttpErrorResponse) => {
            let errorMessage = "error response log> " + req.url + " " + req.method

            if (err.status === 401) {
                if (req.url === "https://budgetizator.ovh:543/user/refresh") {
                    errorMessage = "Attempt to refresh the access token failed."
                    // TODO: redirect user to login page
                } else {
                    errorMessage = "This is error 401. Client should try and refresh access token."
                }
            } else {
                errorMessage = "error not 401 log> " + req.url + " " + req.method
            }

            console.error(errorMessage)
            return throwError(() => err);
        })
    );
}
*/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private http: HttpClient, private router: Router) { }

    m_endpoint = environment.apiUrl + "/user"

    attemptRefresh(req: HttpRequest<unknown>, next: HttpHandler) {
        console.log("Attempting to refresh the token ...")
        this.http.get(this.m_endpoint + "/refresh", { observe: 'response' }).subscribe(
            res => {
                console.log("Access token successfully refreshed. Retrying the same request ...")
                req = req.clone({ withCredentials: true })
                return next.handle(req)
            },
            error => {
                console.error("Attempt to refresh the access token failed.");
                this.router.navigate(['/login']);
                return throwError(() => error);
            })
    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        console.log("request log> " + req.url + " " + req.method);
        req = req.clone({ withCredentials: true });
        return next.handle(req).pipe(
            tap(event => {
                if (event.type === HttpEventType.Response) {
                    console.log("response log> " + req.url + " " + req.method);
                }
            }),
            catchError((err: HttpErrorResponse) => {
                let errorMessage
                if (err.status === 401) {
                    if (req.url === "https://budgetizator.ovh:543/user/refresh") {
                        errorMessage = "Attempt to refresh the access token failed."
                        console.error(errorMessage)
                        this.router.navigate(['/login']);
  //                      return throwError(() => err);
                    } else {
                        errorMessage = "This is error 401 on a page that's not the refresh page. Try to refresh the access token."
                        console.error(errorMessage)
//                        return throwError(() => err);
  //                      return this.attemptRefresh(req, next)
                    }
                } else {
                    errorMessage = "error not 401 log> " + req.url + " " + req.method
                    console.error(errorMessage)
                    
                }
                return throwError(() => err);
            })
        );
    }
}
