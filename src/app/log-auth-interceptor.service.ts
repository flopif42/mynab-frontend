import { Observable, tap, catchError, throwError } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType, HttpErrorResponse } from "@angular/common/http";

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
                } else {
                    errorMessage = "error 401 log> " + req.url + " " + req.method
                }
            } else {
                errorMessage = "error not 401 log> " + req.url + " " + req.method
            }

            console.error(errorMessage)
            return throwError(() => err);
        })
    );
}
