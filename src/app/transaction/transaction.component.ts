import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'transaction-home',
    template: `
        <div>Transactions</div>
    `
})
export class TransactionComponent /*implements OnInit */ {
    /*
    m_serviceUrl = 'http://91.134.68.226:5000/transactions';
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
    m_response$: Observable<Object[]>;
    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.m_response$ = this.http.get<Object[]>(this.m_serviceUrl);
    }
    */
}
