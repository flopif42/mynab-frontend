import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { confirmPasswordValidator } from '../confirm-password.validator';

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

    onSubmit() {
        const val = this.signupForm.value;

        if (this.signupForm && val.email && val.password && val.confirm_password) {
            console.log(val)
        }
    }
}
