import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from 'rxjs';
import { HttpBackend, HttpInterceptor, HttpClient, HttpRequest, HttpHandlerFn, HttpHandler, HttpEvent, HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        console.log("request log> " + req.url + " " + req.method);
        req = req.clone({ withCredentials: true });
        return next.handle(req).pipe(
            tap(event => {
                if (event.type === HttpEventType.Response) {
                    console.log("response log> " + req.url + " " + req.method);
                }
            }),
            catchError((err: HttpErrorResponse) => {
                console.error("in intercept() catchError()")
                let errorMessage
                if (err.status === 401) {
                    if (req.url === "https://budgetizator.ovh:543/user/refresh") {
                        errorMessage = "in intercept() : Attempt to refresh the access token failed."
                        console.error(errorMessage)
//                        this.router.navigate(['/login']);
  //                      return throwError(() => err);
                    } else {
                        errorMessage = "This is error 401 on a page that's not the refresh page. Try to refresh the access token."
                        console.error(errorMessage)
//                        return next.handle(req)
//                        return throwError(() => err);
                        return this.authService.attemptRefresh(req, next)
                    }
                } else {
                    errorMessage = "error not 401 log> " + req.url + " " + req.method
                    console.error(errorMessage)
                    
                }
                return throwError(() => err);
            })
        );
    }
}
