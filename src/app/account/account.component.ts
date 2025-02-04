import { Router } from '@angular/router'
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { confirmPasswordValidator } from '../confirm-password.validator';
import { AccountService } from './account.service';

@Component({
    selector: 'app-account',
    templateUrl: 'account.component.html',
    imports: [ReactiveFormsModule]
})

export class AccountComponent {
    createAccountForm = new FormGroup({
        accountName: new FormControl('', [Validators.required])
    });

    constructor(private router: Router, private accountService: AccountService) { }

    onSubmit() {
        const val = this.createAccountForm.value;

        if (this.createAccountForm && val.accountName) {
            this.accountService.create(val.accountName)
                .subscribe(
                    (response) => {
                        console.log("Account created");
//                        this.router.navigate(['/']);
                    }
                );
        }
    }
}
