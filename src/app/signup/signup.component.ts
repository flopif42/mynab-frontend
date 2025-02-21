import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { confirmPasswordValidator } from '../confirm-password.validator';
import { SignupService } from './signup.service';

export class checkEmailResponse {
    available: string;
}

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    imports: [ReactiveFormsModule]
})
export class SignupComponent {
    _signupForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirm_password: new FormControl('', [Validators.required]),
        first_name: new FormControl(''),
        last_name: new FormControl('')
    }, confirmPasswordValidator());

    _emailAdressAvailable = 'no'

    constructor(private router: Router, private signupService: SignupService) { }

    ngOnInit() {
        this._signupForm.get('email')?.valueChanges.subscribe(txt => {
//            console.log("Text changed :" + txt);
            this.onEmailAdressChanged(txt);
        });
    }

    onSubmit() {
        const val = this._signupForm.value;

        if (this._signupForm && val.email && val.password && val.confirm_password) {
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

    onEmailAdressChanged(txt: string) {
        this.signupService.checkEmailAvailableForSignup(txt).subscribe(
            (response) => {
                const isAvailable: checkEmailResponse = response;
                // console.log("response from server:" + isAvailable['available'])
                this._emailAdressAvailable = isAvailable['available']
            }
        );
    }
}
