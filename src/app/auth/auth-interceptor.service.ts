import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("> in AuthInterceptor:intercept()")
        return next.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    console.log("< in AuthInterceptor: catchError(error)")
                    return next.handle(req);
                }
                console.log("< in AuthInterceptor: throwError(error)")
                return throwError(() => error);
            })
        );
    }
}
