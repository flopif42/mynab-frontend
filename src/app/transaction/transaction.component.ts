import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Account } from '../account/account.model'
import { AccountService } from '../account/account.service'
import { Transaction } from './transaction.model'
import { TransactionService } from './transaction.service'
import { Payee } from '../payee/payee.model'
import { PayeeService } from '../payee/payee.service'

@Component({
    selector: 'app-transaction',
    templateUrl: 'transaction.component.html',
    styleUrl: 'transaction.component.css',
    imports: [ReactiveFormsModule]
})
export class TransactionComponent implements OnInit {
    _newTxnForm = new FormGroup({
        account_name: new FormControl('', [Validators.required]),
//        payee_name: new FormControl('', [Validators.required]),
  //      txn_date: new FormControl('', [Validators.required])
    });

    _transactions: Transaction[]
//    _accounts: Account[]
  //  _payees: Payee[]

    constructor(private txnService: TransactionService,
        private accountService: AccountService,
        private payeeService: PayeeService
    ) { }

    ngOnInit() {
        // We need to fetch the lists of accounts and payees to fill the dropdown lists
//        this.fetchAccounts()
//        this.fetchPayees()

        // Display the list of all transactions
        this.listTransactions()
    }
    /*
    fetchAccounts() {
        this.accountService.getList().subscribe(
            response => {
                this._accounts = response;
            },
            error => {
                console.error("Error fetching accounts")
            })
    }

    fetchPayees() {
        this.payeeService.getList().subscribe(
            response => {
                this._payees = response;
            },
            error => {
                console.error("Error fetching payees")
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
    */
    /*
    onSubmit() {
        console.log(this._newTxnForm.value.account_name)
    }
    */
}
