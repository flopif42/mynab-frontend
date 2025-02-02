import { environment } from '../../environments/environment'
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
    m_endpoint = environment.apiUrl + "/transaction"
    m_transactions: Transaction[];

    m_newTransactionForm = new FormGroup({
        date_trans: new FormControl(''),
        id_account: new FormControl(''),
        id_payee: new FormControl(''),
        memo_trans: new FormControl(''),
        outflow: new FormControl(''),
        inflow: new FormControl(''),
    });

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getTransactions()
    }

    public getTransactions() {
        return this.http.get<Transaction[]>(this.m_endpoint)
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
        const headers = { 'Content-Type': 'application/json' };
        var result = this.http.post<any>(this.m_endpoint + "/new", txn, { headers }).subscribe({
            next: data => { console.log(data.lastRowId); this.getTransactions() },
            error: error => { console.error('There was an error!', error); }
        })
    }

    onSubmit() {
        var formData = this.m_newTransactionForm.value;

        if (formData['inflow'] == '') {
            formData['amount'] = formData['outflow']
            formData['flow'] = 'outflow'
        }
        else {
            formData['amount'] = formData['inflow']
            formData['flow'] = 'inflow'
        }
        this.createTransaction(formData);
    }
}
