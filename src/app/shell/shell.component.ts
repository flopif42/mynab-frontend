import { ChangeDetectionStrategy,  inject, model, signal } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { materialImports } from '../utils/material';
import { MatDialog } from '@angular/material/dialog';
import { FormatAmountPipe } from '../utils/format-amount.pipe';
import { AccountService } from '../account/account.service'
import { UserService } from '../user/user.service'
import { UserProfile } from '../user/user.model'
import { Account } from '../account/account.model'
import { AddAccountDialogComponent } from '../account/dialogs/add-account-dialog.component'

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    imports: [RouterLink, RouterOutlet, materialImports, ReactiveFormsModule, FormatAmountPipe]
})
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

    constructor(private router: Router, private route: ActivatedRoute,
        private accountService: AccountService, private userService: UserService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this._user = new UserProfile();
        this.getCollapsePreferences()
        this.listAccounts()
        this.route.paramMap.subscribe(params => {
            this._selectedAccount = params.get('id_account')!;
        });
    }

    /* Add account dialog */
    readonly animal = signal('');
    readonly name = model('');

    openAddAccountDialog() {
        const dialogRef = this.dialog.open(AddAccountDialogComponent, {
            data: { name: this.name(), animal: this.animal() },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result !== undefined) {
                this.animal.set(result);
            }
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

    getCollapsePreferences() {
        this.userService.getProfile().subscribe(
            response => {
                this._user = response;
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

    assignSection(account: Account) {
        let section = 0; // -> section CASH

        if (account.type == 2) { // type = off-budget
            section = 1; // -> section TRACKING
        }
        if (account.status == 0) { // status = closed
            section = 2; // -> section CLOSED
        }
        if (this._accounts.has(section)) {
            this._accounts.get(section)!.push(account);
        } else {
            this._accounts.set(section, [account]);
        }
    }

    listAccounts() {
        this.accountService.getList().subscribe(
            response => {
                const accountsFromApi: Account[] = response
                this._accounts.clear()
                accountsFromApi.forEach((account: Account) => {
                    this.assignSection(account);
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
