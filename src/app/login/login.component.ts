import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

    constructor(private authService: AuthService) {}

    


    /*
    constructor(private authService: AuthService,
                private router: Router) {
    }
    */
    login() {
        const val = this.loginForm.value;

        if (val.email && val.password) {
            console.log("in login()")
            console.log(this.authService.hello())
            /*
            this.authService.login(val.email, val.password)
                .subscribe(
                    () => {
                        console.log("User is logged in");
                        this.router.navigateByUrl('/');
                    }
                );
                */
        }
    }
}
