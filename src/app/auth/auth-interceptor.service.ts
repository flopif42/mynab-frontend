import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from './auth.authservice';

/*
export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    console.log("> in AuthInterceptor:intercept()", req.url)
    req = req.clone({ withCredentials: true, });
    return next(req).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                console.log("< in AuthInterceptor: catchError(error)")
                const response = inject(AuthService).refresh()
                console.log(response)
                return next(req);
            }
            console.log("< in AuthInterceptor: throwError(error)")
            return throwError(() => error);
        })
    );
}
*/

export class AuthInterceptorClass implements HttpInterceptor {
    intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        console.log("> in AuthInterceptor:intercept()", req.url)
        req = req.clone({ withCredentials: true, });
        return handler.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    console.log("< in AuthInterceptor: catchError(error)")
                    const response = inject(AuthService).refresh()
                    console.log(response)
                    return handler.handle(req);
                }
                console.log("< in AuthInterceptor: throwError(error)")
                return throwError(() => error);
            })
        );
    }
}
