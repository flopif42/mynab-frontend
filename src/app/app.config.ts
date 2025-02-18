import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withInterceptorsFromDi, HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './log-auth-interceptor.service'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(
            withInterceptorsFromDi(),
        ),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ]
};
