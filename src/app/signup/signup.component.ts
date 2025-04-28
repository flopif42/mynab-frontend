import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { confirmPasswordValidator } from '../utils/confirm-password.validator';
import { SignupService, checkEmailResponse } from './signup.service';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrl: 'signup.component.css',
    imports: [ReactiveFormsModule]
})
export class SignupComponent implements OnInit {
    _signupForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirm_password: new FormControl('', [Validators.required]),
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        email_OK: new FormControl('no', [Validators.pattern('yes')])
    }, confirmPasswordValidator());

    _emailAdressAvailable = false

    constructor(private router: Router, private signupService: SignupService) { }

    ngOnInit() {
        this._signupForm.get('email')?.valueChanges.subscribe(txt => {
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
        this.signupService.checkEmailAvailable(txt).subscribe(
            (response) => {
                const resp: checkEmailResponse = response;
                this._emailAdressAvailable = resp['available'];
                let email_OK_value = this._emailAdressAvailable ? "yes" : "no";
                this._signupForm.get('email_OK').setValue(email_OK_value);
            }
        );
    }
}
