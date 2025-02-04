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
    /*
    _createAccountForm = new FormGroup({
        account_name: new FormControl('', [Validators.required]),
        selectedOption: new FormControl('')
    });
    */
    /*
    _accountTypes = [
        { id: 1, label: 'On-budget' },
        { id: 2, label: 'Off-budget' },
        { id: 3, label: 'Closed' }
    ];
    */
    myForm = new FormGroup({
        selectedOption: new FormControl('Choose an option')
    });

    // Options for the dropdown list
    options = [];

    //_accountList = []

    constructor(/*, private router: Router, private accountService: AccountService*/) {
        this.options = [
            { value: '1', label: 'Option One' },
            { value: '2', label: 'Option Two' },
            { value: '3', label: 'Option Three' }
        ];
    }

    ngOnInit() {
        //this.listAccounts()
        /*
        this.myForm = this.fb.group({
            selectedOption: ['']  // Initial value is empty or you can set a default value
        });
        */
        console.log(this.options)
    }

    /*
    listAccounts() {
        return this.accountService.getList()
            .subscribe(
                (response) => {
                    this._accountList = response
                }
            )
    }*/

    onSubmit() {
//        const val = this._createAccountForm.value;
        console.log('Selected option:', this.myForm.value.selectedOption);

/*
        if (this._createAccountForm && val.account_name) {
            this.accountService.create(val.account_name, val.account_type)
                .subscribe(
                    (response) => {
                        console.log("Account created");
//                        this.router.navigate(['/']);
                    }
                );
                
        }
        */
    }
}
