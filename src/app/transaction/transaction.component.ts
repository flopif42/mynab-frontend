import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Account } from '../account/account.model'
import { AccountService } from '../account/account.service'
import { TransactionService } from './transaction.service'
import { Transaction } from './transaction.model'

@Component({
    selector: 'app-transaction',
    templateUrl: 'transaction.component.html',
    styleUrl: 'transaction.component.css',
    imports: [ReactiveFormsModule]
})
export class TransactionComponent implements OnInit {
    _newTxnForm = new FormGroup({
        account_name: new FormControl('', [Validators.required])
    });

    _transactions: Transaction[];
    _accounts: Account[]

    constructor(private txnService: TransactionService, private accountService: AccountService) { }

    ngOnInit() {
        this.listTransactions()
    }

    fetchAccounts() {
        this.accountService.getList().subscribe(
            response => {
                this._accounts = response;
            },
            error => {
                console.error("Error fetching accounts")
            })
    }

    listTransactions() {
        this.txnService.getList().subscribe(
                response => {
                    this._transactions = response;
                },
                error => {
                    console.error("Error fetching transactions")
                })
    }

    onSubmit() {
        console.log(this._newTxnForm.value.account_name)
    }
}
