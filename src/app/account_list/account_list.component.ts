import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormatAmountPipe } from '../format-amount.pipe';
import { AccountService } from '../account/account.service'
import { Account } from '../account/account.model'

export enum AccountLabel {
    CASH,
    TRACKING,
    CLOSED
}

@Component({
    selector: 'app-account_list',
    templateUrl: './account_list.component.html',
    styleUrl: './account_list.component.css',
    imports: [ReactiveFormsModule, RouterLink, FormatAmountPipe]
})
export class AccountListComponent implements OnInit {
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
}
