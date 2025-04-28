import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { tap, catchError, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        // console.log("request log> " + req.url + " " + req.method);
        req = req.clone({ withCredentials: true });
        return next.handle(req).pipe(
            tap(event => {
                if (event.type === HttpEventType.Response) {
                    // console.log("response log> " + req.url + " " + req.method);
                }
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    console.error("This is error 401 : the login failed or the token has expired.")
                    this.router.navigate(['/'])

                } else {
                    console.error("error not 401 log> " + req.url + " " + req.method)
                }
                return throwError(() => err);
            })
        );
    }
}
