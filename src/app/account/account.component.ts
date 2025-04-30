/* account.component.ts */
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
    imports: [ReactiveFormsModule, TransactionComponent]
})
export class AccountComponent implements OnInit {
    _selectedAccount: string | null = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this._selectedAccount = params.get('id_account')!;
        });
    }

    onTransactionsChanged() {
        console.log('Transactions have changed, update account list')
    }
}
