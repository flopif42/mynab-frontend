import { Router } from '@angular/router'
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Account } from './account.model'
import { AccountService } from './account.service';

@Component({
    selector: 'app-account',
    templateUrl: 'account.component.html',
    imports: [ReactiveFormsModule]
})

export class AccountComponent {
    createAccountForm = new FormGroup({
        account_name: new FormControl('', [Validators.required])
    });

    _accountList = []

    constructor(private router: Router, private accountService: AccountService) { }

    ngOnInit() {
        this.listAccounts()
    }

    listAccounts() {
        return this.accountService.getList()
            .subscribe(
                (response) => {
                    this._accountList = response
                }
            )
    }

    onSubmit() {
        const val = this.createAccountForm.value;

        if (this.createAccountForm && val.account_name) {
            this.accountService.create(val.account_name)
                .subscribe(
                    (response) => {
                        console.log("Account created");
//                        this.router.navigate(['/']);
                    }
                );
        }
    }
}
