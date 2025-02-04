import { Router } from '@angular/router'
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './account.service';

@Component({
    selector: 'app-account',
    templateUrl: 'account.component.html',
    imports: [ReactiveFormsModule]
})

export class AccountComponent {
    _createAccountForm = new FormGroup({
        account_name: new FormControl('', [Validators.required]),
        account_type: new FormControl('')
    });

    _accountTypes = [
        { id: 1, label: 'On-budget' },
        { id: 2, label: 'Off-budget' },
        { id: 3, label: 'Closed' }
    ];

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
        const val = this._createAccountForm.value;

        if (this._createAccountForm && val.account_name) {
            this.accountService.create(val.account_name, val.account_type)
                .subscribe(
                    (response) => {
                        console.log("Account created");
//                        this.router.navigate(['/']);
                    }
                );
        }
    }
}
