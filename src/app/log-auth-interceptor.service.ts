import { Observable, tap, catchError } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType, HttpErrorResponse } from "@angular/common/http";

export function logAuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log("request log> " + req.urlWithParams + " " + req.method);
    req = req.clone({ withCredentials: true });
    return next(req).pipe(
        tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log("response log> " + req.urlWithParams + " " + req.method);
            }
        }),
        catchError((e: HttpErrorResponse) => {
            console.error("error response log> " + req.urlWithParams + " " + req.method);
        })
    );
}
