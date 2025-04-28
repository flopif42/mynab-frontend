import { Component, Injectable } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { materialImports } from '../utils/material';
import { FormatAmountPipe } from '../utils/format-amount.pipe';
import { AccountService } from '../account/account.service'
import { UserService } from '../user/user.service'
import { UserProfile } from '../user/user.model'
import { Account } from '../account/account.model'

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    imports: [RouterLink, RouterOutlet, materialImports, ReactiveFormsModule, FormatAmountPipe]
})

/*
@Injectable({
    providedIn: 'root'
})
*/
export class ShellComponent implements OnInit {
    _accountSections = [
        'CASH',
        'TRACKING',
        'CLOSED'
    ];

    _isLoggedIn = false;
    _isSidenavCollapsed = false;
    _accounts: Map<number, Account[]> = new Map();
    _collapsedSections = new Set<number>();
    _selectedAccount: string | null = '';
    _user: UserProfile;

    constructor(private router: Router, private route: ActivatedRoute, private accountService: AccountService, private userService: UserService) { }

    ngOnInit() {
        this._user = new UserProfile();
        this.getCollapsePreferences()
        this.listAccounts()
        this.route.paramMap.subscribe(params => {
            this._selectedAccount = params.get('id_account')!;
        });
    }

    isSelectedAccount(accountId: number): boolean {
        return accountId == parseInt(this._selectedAccount)
    }

    isSectionCollapsed(section: number): boolean {
        return this._collapsedSections.has(section);
    }

    toggleCollapse(section: number) {
        if (this._collapsedSections.has(section)) {
            this._collapsedSections.delete(section);
        } else {
            this._collapsedSections.add(section);
        }
    }

    parseInt(someNumber: string): number {
        return parseInt(someNumber)
    }

    getCollapsePreferences() {
        this.userService.getProfile().subscribe(
            response => {
                this._user = response;
                console.log(this._user);
                if (this._user.ui_collapse_cash) {
                    this._collapsedSections.add(0)
                }
                if (this._user.ui_collapse_tracking) {
                    this._collapsedSections.add(1)
                }
                if (this._user.ui_collapse_closed) {
                    this._collapsedSections.add(2)
                }
            },
            error => {
                console.error('in getUserProfile() error')
            }
        )
    }

    getAccountSection(account: Account): number {
        if (account.status == 0) {
            return 2;
        }
        if (account.type == 1) {
            return 0;
        }
        return 1;
    }

    assignSection(account: Account, section: number) {
        if (this._accounts.has(section)) {
            this._accounts.get(section)!.push(account);
        } else {
            this._accounts.set(section, [account])
        }
    }

    listAccounts() {
        this.accountService.getList().subscribe(
            response => {
                const accountsFromApi: Account[] = response
                this._accounts.clear()
                accountsFromApi.forEach((account: Account) => {
                    this.assignSection(account, this.getAccountSection(account));
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
        this._isSidenavCollapsed = !this._isSidenavCollapsed;
    }

}
