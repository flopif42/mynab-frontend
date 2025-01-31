import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component'
import { AuthService } from '../auth/auth.authservice';
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
    constructor(private myApp: AppComponent, private authService: AuthService) { }

    // log in button
    onSubmit() {
        const val = this.loginForm.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password).subscribe(
                (response) => { this.m_bLoginFailed = false; },

                (error) => {
                    if (error.status == 401) {
                        this.m_bLoginFailed = true;
                    }
                });
        }
    }
}
