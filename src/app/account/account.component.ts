import { KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './account.service'
import { Account } from './account.model'
import { TransactionComponent } from '../transaction/transaction.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
    imports: [ReactiveFormsModule, KeyValuePipe, TransactionComponent, RouterLink, NgClass]
})
export class AccountComponent implements OnInit {
    _newAccountForm = new FormGroup({
        account_type: new FormControl(1, [Validators.required]),
        account_name: new FormControl('', [Validators.required])
    });

    _accountTypes: { [key: number]: string } = {
        1: 'On-budget',
        2: 'Off-budget'
    };

    _accountStatus: { [key: number]: string } = {
        1: 'Open',
        0: 'Closed'
    };

    _accounts: Map<number, Account[]> = new Map();    
    _selectedAccount: string | null = '';

    constructor(private route: ActivatedRoute, private accountService: AccountService) { }

    ngOnInit() {
        this.listAccounts()
        this.route.paramMap.subscribe(params => {
            this._selectedAccount = params.get('id_account')!;
        });
    }

    isSelectedAccount(accountId: string): boolean {
        return accountId == this._selectedAccount
    }

    listAccounts() {
        this.accountService.getList().subscribe(
            response => {
                const accountsFromApi: Account[] = response
                this._accounts.clear()
                accountsFromApi.forEach((account: Account) => {
                    const typeKey = account.type;
                    if (this._accounts.has(typeKey)) {
                        this._accounts.get(typeKey)!.push(account);
                    } else {
                        this._accounts.set(typeKey, [account])
                    }
                })
            },
            error => {
                console.error("Error fetching accounts")
            }
        )
    }

    onSubmit() {
        if (this._newAccountForm.value && this._newAccountForm.value.account_name && this._newAccountForm.value.account_type) {
            this.accountService.create(this._newAccountForm.value.account_name, this._newAccountForm.value.account_type)
                .subscribe(
                    res => {
                        console.log("Account created.")
                        this.listAccounts()
                    },
                    error => {
                        console.error("Error creating account")
                    }
                )
        }
    }
}
