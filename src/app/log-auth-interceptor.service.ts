import { Observable, tap, catchError, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType, HttpErrorResponse } from "@angular/common/http";

function refreshAccessToken() {
    const http = new HttpClient()
    console.log('in refreshAccessToken()')
    http.get(this.m_endpoint + "/refresh", { observe: 'response' }).subscribe(
        res => {
            console.log('Response status:', res.status);
            console.log('Body:', res.body);
        },
        error => {
            console.error('Observer got an error: ', error.status);
        }
    )
}

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
                    errorMessage = "This is error 401. Client should try and refresh access token."
                    refreshAccessToken()
                }
            } else {
                errorMessage = "error not 401 log> " + req.url + " " + req.method
            }

            console.error(errorMessage)
            return throwError(() => err);
        })
    );
}
