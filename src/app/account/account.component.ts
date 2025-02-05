import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './account.service'
import { Account } from './account.model'

@Component({
    selector: 'app-dropdown',
    templateUrl: './account.component.html',
    imports: [ReactiveFormsModule]
})
export class AccountComponent implements OnInit {
    /*
     * 
     * signupForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirm_password: new FormControl('', [Validators.required]),
        first_name: new FormControl(''),
        last_name: new FormControl('')
    }, confirmPasswordValidator());
     * 
     * 
     * */



    _newAccountForm = new FormGroup({
        account_type: new FormControl('', [Validators.required]),
        account_name: new FormControl('', [Validators.required])
    });

    _accountTypes = [
        { value: '1', label: 'On-budget' },
        { value: '2', label: 'Off-budget' }
    ];

    _accounts = []

    constructor(/*private fb: FormBuilder, */private accountService: AccountService) { }

    ngOnInit(): void {
        /*
        this._newAccountForm = this.fb.group({
            account_type: ['On-budget'],
            account_name: ['']
        });
        */

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

    // Optional: For debugging, you can log the selected option
    onSubmit(): void {
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
