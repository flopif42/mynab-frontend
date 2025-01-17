import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';

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
    selector: 'transaction-home',
    templateUrl: 'transaction.component.html',
    styleUrl: 'transaction.component.css',
    imports: [HttpClientModule]
})
export class TransactionComponent implements OnInit {
    m_serviceUrl = 'http://91.134.68.226:5000/transactions';
    m_transactions: Transaction[];
    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getTransactions()
    }

    public getTransactions() {
        return this.http.get<Transaction[]>(this.m_serviceUrl)
            .subscribe(
                (response) => {
                    console.log('response received')
                    this.m_transactions = response;
                },
                (error) => {
                    console.error('Request failed with error')
                    alert(error);
                },
                () => {
                    console.log('Request completed')
                })
    }
}
