import { Observable } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType } from "@angular/common/http";

export function logInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log("> log interceptor");
    console.log(req.url);
    return next(req);
}
