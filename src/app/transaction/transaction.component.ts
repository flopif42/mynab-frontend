import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'transaction-home',
    template: `
        <div>Transactions</div>
        {{ this.m_output }}
        <div>Apres</div>
    `,
    imports: [HttpClientModule]
})
export class TransactionComponent implements OnInit {
    
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
    m_req: Observable<Object[]>;
    m_serviceUrl = 'http://91.134.68.226:5000/transactions';
    posts : any;
    constructor(private http: HttpClient) { }

    m_output: string = '';
    ngOnInit() {
        this.http.get<Object[]>(this.m_serviceUrl).subscribe((response) => { this.posts = response; },
            (error) => { console.log(error); });
        this.m_output = 'on est passes dans ngOnInit'
    }
}
