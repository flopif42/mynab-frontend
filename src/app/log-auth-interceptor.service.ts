import { Observable, tap, catchError, throwError } from 'rxjs';
import { HttpInterceptor, HttpClient, HttpRequest, HttpHandlerFn, HttpHandler, HttpEvent, HttpEventType, HttpErrorResponse } from "@angular/common/http";

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

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        return next.handle(req)
    }
}
