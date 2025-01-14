import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';

export class Transaction {
    id_trans: Number;
    amount: Number;
    date_trans: String;
    flow: String;
    id_account: String;
    id_payee: String;
    memo_trans: String
}

@Component({
    selector: 'transaction-home',
    template: `
        <div>Transactions</div>
        {{ this.m_transactions }}
        <div>Apres</div>
    `,
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
                    console.log(response);
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

    /*
    m_transactions = [
        {
            amount: 810,
            date_trans: "14/01/2025",
            flow: "outflow",
            id_account: "tickets_resto",
            id_payee: "quick",
            id_trans: 1,
            memo_trans: "menu"
        }
    ];
    */
}
