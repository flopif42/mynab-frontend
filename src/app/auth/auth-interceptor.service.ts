import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from './auth.authservice';

export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    console.log("> in AuthInterceptor:intercept()")
    req = req.clone({ withCredentials: true, });
    return next(req).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                console.log("< in AuthInterceptor: catchError(error)")
                const authService = inject(AuthService);
                const response = authService.refresh()
                console.log(response)
                return next(req);
            }
            console.log("< in AuthInterceptor: throwError(error)")
            return throwError(() => error);
        })
    );
}
