import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// import { AuthService } from './auth.authservice';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    console.log("> in AuthInterceptor:intercept()", req.url)
    req = req.clone({ withCredentials: true, });
    return next(req).pipe(tap(event => {
        if (event.type === HttpEventType.Response && event.status == 401) {
            console.log("< in AuthInterceptor: catchError(error)")
            return next(req);
        }
        return next(req);
    }));
}
