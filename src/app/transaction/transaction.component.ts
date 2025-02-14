import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Account } from '../account/account.model'
import { AccountService } from '../account/account.service'
import { Transaction } from './transaction.model'
import { TransactionService } from './transaction.service'
import { Payee } from '../payee/payee.model'
import { PayeeService } from '../payee/payee.service'
import { Category } from '../category/category.model'
import { CategoryService } from '../category/category.service'

@Component({
    selector: 'app-transaction',
    templateUrl: 'transaction.component.html',
    styleUrl: 'transaction.component.css',
    imports: [ReactiveFormsModule]
})
export class TransactionComponent implements OnInit {
    @Input() _selectedAccount: any;

    _newTxnForm = new FormGroup({
        id_payee: new FormControl('', [Validators.required]),
        id_account: new FormControl('', [Validators.required]),
        id_category: new FormControl('', [Validators.required]),
        flow: new FormControl('-1', [Validators.required]),
        amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(?:[.,][0-9]{1,2})?$')]),
        memo: new FormControl(''),
        date: new FormControl('', [Validators.required])
    });

    _newTsfForm = new FormGroup({
        id_account_outflow: new FormControl('', [Validators.required]),
        id_account_inflow: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(?:[.,][0-9]{1,2})?$')]),
        memo: new FormControl(''),
        date: new FormControl('', [Validators.required])
    });

    _transactions: Transaction[]
    _accounts: Account[]
    _payees: Payee[]
    _categories: Category[]

    constructor(private txnService: TransactionService, private accountService: AccountService,
        private payeeService: PayeeService, private categoryService: CategoryService) { }

    ngOnInit() {
        // We need to fetch the lists of accounts, payees and categories to fill the dropdown lists
        this.fetchAccounts()
        this.fetchPayees()
        this.fetchCategories()

        // Display the list of all transactions
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

    fetchCategories() {
        this.categoryService.getList().subscribe(
            response => {
                this._categories = response;
            },
            error => {
                console.error("Error fetching categories")
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
        this.txnService.getList(this._selectedAccount).subscribe(
            response => {
                this._transactions = response;
            },
            error => {
                console.error("Error fetching transactions")
            })
    }

    onAddTransactionClick() {
        const formData = this._newTxnForm.value;
        this.txnService.create(formData)
            .subscribe(
                res => {
                    console.log("Transaction added")
                    this.listTransactions()
                },
                error => {
                    console.error("Error adding transaction")
                }
            )
    }

    onAddTransferClick() {
        const formData = this._newTsfForm.value;
        this.txnService.create_transfer(formData)
            .subscribe(
                res => {
                    console.log("Transfer added")
                    this.listTransactions()
                },
                error => {
                    console.error("Error adding transfer")
                }
            )
    }

    deleteTransaction(transactionId) {
        if (confirm("Are you sure you want to delete this transaction ?")) {
            this.txnService.delete(transactionId)
                .subscribe(
                    res => {
                        console.log("Transaction deleted")
                        this.listTransactions()
                    },
                    error => {
                        console.error("Error deleting transaction")
                    }
                )
        }
    }
}
