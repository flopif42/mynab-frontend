import { Component, Injectable } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { materialImports } from './material';
import { FormatAmountPipe } from './format-amount.pipe';
import { AccountService } from './account/account.service'
import { Account } from './account/account.model'

export enum AccountLabel {
    CASH,
    TRACKING,
    CLOSED
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterLink, RouterOutlet, materialImports, ReactiveFormsModule, FormatAmountPipe]
})

@Injectable({
    providedIn: 'root'
})
export class AppComponent implements OnInit {
    AccountLabel = AccountLabel;
    _accountLabelKeys = [
        AccountLabel.CASH,
        AccountLabel.TRACKING,
        AccountLabel.CLOSED
    ];

    _isLoggedIn = false;
    _collapsed = false;
    _accounts: Map<AccountLabel, Account[]> = new Map();
    _expandedSections = new Set<AccountLabel>();
    _selectedAccount: string | null = '';

    constructor(private router: Router, private route: ActivatedRoute, private accountService: AccountService) { }

    ngOnInit() {
        this.listAccounts()
        this.route.paramMap.subscribe(params => {
            this._selectedAccount = params.get('id_account')!;
        });
    }

    isSelectedAccount(accountId: number): boolean {
        return accountId == parseInt(this._selectedAccount)
    }

    isExpanded(label: AccountLabel): boolean {
        return this._expandedSections.has(label);
    }

    toggle(label: AccountLabel) {
        if (this._expandedSections.has(label)) {
            this._expandedSections.delete(label);
        } else {
            this._expandedSections.add(label);
        }
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

    logout() {
        this._isLoggedIn = false
        this.router.navigate(['/login'])
    }

    toggleSidenav() {
        this._collapsed = !this._collapsed;
    }

}
