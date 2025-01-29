import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './auth/auth.authservice'
import { LogInterceptor } from './auth/auth.authservice'

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient(
        withInterceptors([LogInterceptor, AuthInterceptor]),
    )],
};
