// import { environment } from '../../environments/environment'
import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { HttpClient } from "@angular/common/http";
// import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from './transaction.service'
import { Transaction } from './transaction.model'

@Component({
    selector: 'app-transaction',
    templateUrl: 'transaction.component.html',
    styleUrl: 'transaction.component.css',
    imports: [ReactiveFormsModule]
})
export class TransactionComponent implements OnInit {
    _transactions: Transaction[];

    constructor(private txnService: TransactionService) { }

    ngOnInit() {
        this.listTransactions()
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
}
