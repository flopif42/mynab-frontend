import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './login.authservice';
import { ReactiveFormsModule } from '@angular/forms';

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

    refreshAccessToken() {
        this.authService.refresh().subscribe(
            (response) => {
                console.log("Access token refreshed");
            },

            (error) => {
                if (error.status == 401) {
                    console.log("Refresh token expired. User needs to log in again.");
                    alert(error);
                }
            });
    }

    onSubmit() {
        const val = this.loginForm.value;
        if (val.email && val.password) {
            this.authService.login(val.email, val.password).subscribe(
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
