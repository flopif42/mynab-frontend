import { Observable } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";

export function logAuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log(req.urlWithParams);
    req = req.clone({ withCredentials: true });
    return next(req);
}
