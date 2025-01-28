import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './login.authservice';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpResponse } from "@angular/common/http";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    imports: [ReactiveFormsModule]
})

export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });
    m_bLoginFailed = false;
    constructor(private authService: AuthService) { }

    onSubmit() {
        const val = this.loginForm.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe(
                    /*
                    (res: HttpResponse<any>) => {
                        console.log('response from server:', res);
                        console.log('response headers', res.headers.keys())
                        */
                (response) => {
                    this.m_bLoginFailed = false;
                },

                (error) => {
                    if (error.status == 401) {
                        this.m_bLoginFailed = true;
                    }
                });
        }
    }
}
