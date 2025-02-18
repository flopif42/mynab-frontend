import { Router } from '@angular/router'
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { confirmPasswordValidator } from '../confirm-password.validator';
import { SignupService } from './signup.service';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    imports: [ReactiveFormsModule]
})

export class SignupComponent {
    signupForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirm_password: new FormControl('', [Validators.required]),
        first_name: new FormControl(''),
        last_name: new FormControl('')
    }, confirmPasswordValidator());

    constructor(private router: Router, private signupService: SignupService) { }

    onSubmit() {
        const val = this.signupForm.value;

        if (this.signupForm && val.email && val.password && val.confirm_password) {
            this.signupService.signup(
                val.first_name, val.last_name, val.email, val.password
            ).subscribe(
                (response) => {
                    console.log("User created");
                    this.router.navigate(['/']);
                }
            );
        }
    }
}
