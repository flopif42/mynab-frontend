import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http'
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AuthInterceptorClass } from './app/auth/auth-interceptor.service'

bootstrapApplication(AppComponent,
    { providers: [
        provideHttpClient(
            withInterceptorsFromDi(),
        ),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorClass, multi: true },
    ]},
    appConfig).catch((err) => console.error(err));
