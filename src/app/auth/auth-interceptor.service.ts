import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthService } from './auth.authservice';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    console.log("> in AuthInterceptor:intercept()", req.url)
    req = req.clone({ withCredentials: true, });
    return next(req).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                console.log("< in AuthInterceptor: catchError(error)")

                const response = inject(TokenRefreshService).someMethod()
                console.log(response)

                return next(req);
            }
            console.log("< in AuthInterceptor: throwError(error)")
            return throwError(() => error);
        })
    );
}

@Injectable()
export class TokenRefreshService {
    someMethod() {
        console.log("In someMethod()")
    }
}
