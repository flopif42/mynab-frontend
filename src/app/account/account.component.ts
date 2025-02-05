import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './account.service'

@Component({
    selector: 'app-dropdown',
    templateUrl: './account.component.html',
    imports: [ReactiveFormsModule]
})
export class AccountComponent implements OnInit {
    _newAccountForm = new FormGroup({
        account_type: new FormControl(1, [Validators.required]),
        account_name: new FormControl('', [Validators.required])
    });

    _accountTypes = [
        { value: 1, label: 'On-budget' },
        { value: 2, label: 'Off-budget' }
    ];

    _accounts = []

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.listAccounts()
    }

    listAccounts() {
        this.accountService.getList()
            .subscribe(
                response => {
                    this._accounts = response
                },
                error => {
                    console.error("Error fetching accounts")
                }
            )
    }

    onSubmit(): void {
        if (this._newAccountForm.value && this._newAccountForm.value.account_name && this._newAccountForm.value.account_type) {
            console.log(this._newAccountForm.value);
            this.accountService.create(this._newAccountForm.value.account_name, this._newAccountForm.value.account_type)
                .subscribe(
                    res => {
                        console.log("Account created.")
                    },
                    error => {
                        console.error("Error creating account")
                    }
                )
        }
    }
}
