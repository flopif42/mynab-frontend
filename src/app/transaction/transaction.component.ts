import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

export class Transaction {
    id_trans: Number;
    amount: String;
    date_trans: String;
    flow: String;
    id_account: String;
    id_payee: String;
    memo_trans: String
}

@Component({
    selector: 'app-transaction',
    templateUrl: 'transaction.component.html',
    styleUrl: 'transaction.component.css',
    imports: [HttpClientModule, ReactiveFormsModule]
})
export class TransactionComponent implements OnInit {
    m_serviceUrl = 'http://91.134.68.226:5000';
    m_transactions: Transaction[];

    m_newTransactionForm = new FormGroup({
        date_trans: new FormControl(''),
        id_account: new FormControl(''),
        id_payee: new FormControl(''),
        memo_trans: new FormControl(''),
        outflow: new FormControl(''),
        inflow: new FormControl(''),
        flow: new FormControl('')
    });

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getTransactions()
    }

    public getTransactions() {
        const endpoint = this.m_serviceUrl + "/transactions"
        return this.http.get<Transaction[]>(endpoint)
            .subscribe(
                (response) => {
                    console.log('response received')
                    this.m_transactions = response;
                },
                (error) => {
                    console.error('Request failed with error')
                    alert(error);
                },
                () => { console.log('Request completed') })
    }

    public createTransaction(txn) {
        const endpoint = this.m_serviceUrl + "/transactions/new"
        const headers = { 'Content-Type': 'application/json' };
        var result = this.http.post<any>(endpoint, txn, { headers }).subscribe({
            next: data => { console.log(data.lastRowId); this.getTransactions() },
            error: error => { console.error('There was an error!', error); }
        })
    }

    onSubmit() {
        var formData = this.m_newTransactionForm.value;
        this.createTransaction(formData);
    }
}
