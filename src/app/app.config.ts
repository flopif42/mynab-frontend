import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
//import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
//import { AuthInterceptor } from './auth/auth.authservice'
//import { authInterceptor } from './auth/auth-interceptor.service'
import { LogInterceptor } from './auth/auth.authservice'
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptorClass } from './auth/auth-interceptor.service'

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes),
        provideHttpClient(
//        withInterceptors([/*LogInterceptor, */ authInterceptor]),
//            withInterceptorsFromDi(),
        ),
  //      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorClass, multi: true }
    ]
};

/*
{
    providers: [
        provideHttpClient(
            withInterceptorsFromDi(),
        ),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorClass, multi: true },
    ]
},
*/