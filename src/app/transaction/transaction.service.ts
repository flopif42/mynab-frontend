import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { Transaction } from './transaction.model'

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    m_endpoint = environment.apiUrl + "/transaction"

    constructor(private http: HttpClient) { }

    create(formData) {
        const newTransaction = {
            "id_payee": formData.id_payee,
            "id_account": formData.id_account,
            "flow": formData.flow,
            "amount": formData.amount * 100,
            "memo": formData.memo,
            "date": "30/10/1980"
        }
        return this.http.post<Object>(this.m_endpoint + '/create', newTransaction);
    }

    getList(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(this.m_endpoint + '/list')
    }
}


/*
 *     "id_payee":10,
    "id_account":13,
    "flow":-1,
    "amount":1025,
    "memo":"Menu",
    "date":"07/02/2025"
 * */
