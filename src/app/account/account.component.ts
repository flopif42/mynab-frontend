/* account.component.ts */
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from './account.service'
import { Account } from './account.model'
import { TransactionComponent } from '../transaction/transaction.component';

export enum AccountLabel {
    CASH,
    TRACKING,
    CLOSED
}

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
    imports: [ReactiveFormsModule, TransactionComponent]
})
export class AccountComponent implements OnInit {
    AccountLabel = AccountLabel;

    _accountLabelKeys = [
        AccountLabel.CASH,
        AccountLabel.TRACKING,
        AccountLabel.CLOSED
    ];

    _accounts: Map<AccountLabel, Account[]> = new Map();    
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
                    let accountLabel;
                    if (account.status == 0) {
                        accountLabel = AccountLabel.CLOSED;
                    } else if (account.type == 1) {
                        accountLabel = AccountLabel.CASH;
                    } else {
                        accountLabel = AccountLabel.TRACKING;
                    }

                    if (this._accounts.has(accountLabel)) {
                        this._accounts.get(accountLabel)!.push(account);
                    } else {
                        this._accounts.set(accountLabel, [account])
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
