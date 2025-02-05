import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './account.service'

@Component({
    selector: 'app-dropdown',
    templateUrl: './account.component.html',
    imports: [ReactiveFormsModule]
})
export class AccountComponent implements OnInit {
    _newAccountForm: FormGroup;

    _accountTypes = [
        { value: '1', label: 'On-budget' },
        { value: '2', label: 'Off-budget' }
    ];

    constructor(private fb: FormBuilder, private accountService: AccountService) { }

    ngOnInit(): void {
        this._newAccountForm = this.fb.group({
            account_type: ['On-budget'],
            account_name: ['']
        });
    }

    // Optional: For debugging, you can log the selected option
    onSubmit(): void {
        console.log(this._newAccountForm.value);
        this.accountService.create(this._newAccountForm.value.account_name, this._newAccountForm.value.account_type)
            .subscribe(
                res => {
                    console.log("Account created")
                },
                error => {
                    console.error("Error creating account")
                }
        )
    }
}
