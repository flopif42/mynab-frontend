import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Account } from '../account/account.model'
import { AccountService } from '../account/account.service'
import { Transaction } from './transaction.model'
import { TransactionService } from './transaction.service'
import { Payee } from '../payee/payee.model'
import { PayeeService } from '../payee/payee.service'
import { ParentCategory } from '../category/parent.category.model'
import { CategoryService } from '../category/category.service'

@Component({
    selector: 'app-transaction',
    templateUrl: 'transaction.component.html',
    styleUrl: 'transaction.component.css',
    imports: [ReactiveFormsModule]
})
export class TransactionComponent implements OnInit, OnChanges {
    @Input() _selectedAccount: any;
    @Output() _transactionChanged = new EventEmitter();

    _amountRegex: string = '^[0-9]+(?:[.,][0-9]{1,2})?$'

    // Form used to add a new transaction
    _newTxnForm = new FormGroup({
        id_payee: new FormControl('', [Validators.required]),
        id_account: new FormControl('', [Validators.required]),
        id_category: new FormControl('', [Validators.required]),
        flow: new FormControl('-1', [Validators.required]),
        amount: new FormControl('', [Validators.required, Validators.pattern(this._amountRegex)]),
        memo: new FormControl(''),
        date: new FormControl('', [Validators.required])
    });

    // Form used to add a new transfer
    _newTsfForm = new FormGroup({
        id_account_outflow: new FormControl('', [Validators.required]),
        id_account_inflow: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required, Validators.pattern(this._amountRegex)]),
        memo: new FormControl(''),
        date: new FormControl('', [Validators.required])
    });

    _transactions: Transaction[]
    _payees: Payee[]
    _parentCategories: ParentCategory[]
    _accounts: Account[]
    _filteredInflowAccounts: Account[]
    _filteredOutflowAccounts: Account[]

    constructor(
        private txnService: TransactionService,
        private accountService: AccountService,
        private payeeService: PayeeService,
        private categoryService: CategoryService) { }

    ngOnInit() {
        // We need to fetch the lists of accounts, payees and categories to fill the dropdown lists
        this.fetchAccounts()
        this.fetchPayees()
        this.fetchCategories()

        // Display the list of all transactions
        this.listTransactions()

        // Subscribe to changes on the outflow account control.
        this._newTsfForm.get('id_account_outflow')?.valueChanges.subscribe(selectedOutflowId => {
            this._filteredInflowAccounts = this._accounts.filter(account => account.id !== parseInt(selectedOutflowId));
        });

        // Subscribe to changes on the inflow account control.
        this._newTsfForm.get('id_account_inflow')?.valueChanges.subscribe(selectedInflowId => {
            this._filteredOutflowAccounts = this._accounts.filter(account => account.id !== parseInt(selectedInflowId));
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['_selectedAccount']) {
            if (this._selectedAccount != null) {
                this._newTxnForm.controls.id_account.setValue(this._selectedAccount);
                this._newTsfForm.controls.id_account_outflow.setValue(this._selectedAccount)
            }
            this.listTransactions();
        }
    }

    fetchAccounts() {
        this.accountService.getList().subscribe(
            response => {
                this._accounts = response;
                this._filteredInflowAccounts = [...this._accounts]
                this._filteredOutflowAccounts = [...this._accounts]
            },
            error => {
                console.error("Error fetching accounts")
            })
    }

    fetchCategories() {
        this.categoryService.getList().subscribe(
            response => {
                this._parentCategories = response.sort((a, b) => a.position - b.position)
            },
            error => {
                console.error("Error fetching categories")
            })
    }
    
    fetchPayees() {
        this.payeeService.getList().subscribe(
            response => {
                this._payees = response;
                this._payees.sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                );
            },
            error => {
                console.error("Error fetching payees")
            })
    }

    listTransactions() {
        this.txnService.getList(this._selectedAccount).subscribe(
            response => {
                this._transactions = response;
                this._transactionChanged.emit();
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
