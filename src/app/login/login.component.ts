import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
// import { ShellComponent } from '../shell/shell.component'

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
    _displayLoginErrorMessage = false;
    constructor(/*private app: ShellComponent, */private router: Router, private authService: AuthService) { }

    // log in button
    onSubmit() {
        const val = this.loginForm.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password).subscribe(
                (response) => {
                    this._displayLoginErrorMessage = false;
                    this.router.navigate(['/accounts'])
            //        this.app._isLoggedIn = true;
                },
                (error) => {
                    if (error.status == 401) {
                        this._displayLoginErrorMessage = true;
              //          this.app._isLoggedIn = false;
                    }
                });
        }
    }
}
