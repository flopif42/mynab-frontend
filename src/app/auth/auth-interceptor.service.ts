import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// import { AuthService } from './auth.authservice';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    console.log("> in AuthInterceptor:intercept()", req.url)
    req = req.clone({ withCredentials: true, });
    return next(req).pipe(tap(
        error => {
            console.log("error = ", error)
        },
        event => {
            if (event.type === HttpEventType.Response) {
                console.log("event type = response")
                if (event.status == 401) {
                    console.log("event status = 401")
                }
                else {
                    console.log("event status = ", event.status)
                }
            }
            else {
                console.log("event type = ", event.type)
            }
            return next(req);
        }
    ));
}
