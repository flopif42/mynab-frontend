import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormatAmountPipe } from '../format-amount.pipe';
import { AccountService } from './account.service'
import { Account } from './account.model'
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
    imports: [ReactiveFormsModule, TransactionComponent, RouterLink, CommonModule, FormatAmountPipe]
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

    isSelectedAccount(accountId: number): boolean {
        return accountId == parseInt(this._selectedAccount)
    }

    parseInt(someNumber: string): number {
        return parseInt(someNumber)
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

    onTransactionsChanged() {
        this.listAccounts()
    }

    onClickCreateAccount() {
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

    onClickDeleteAccount(accountId) {
        if (confirm("Are you sure you want to delete this account ?")) {
            this.accountService.delete(accountId)
                .subscribe(
                    res => {
                        console.log("Account deleted")
                        this.listAccounts()
                    },
                    error => {
                        console.error("Error deleting account")
                    }
                )
        }
    }

    onClickStatusAccount(accountId, accountStatus) {
        accountStatus = accountStatus == 0 ? 1 : 0;
        this.accountService.setStatus(accountId, accountStatus)
            .subscribe(
                res => {
                    console.log("Account opened/closed")
                    this.listAccounts()
                },
                error => {
                    console.error("Error opening/closing account")
                }
            )
    }
}
