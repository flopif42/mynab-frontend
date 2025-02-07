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

/*
    create(account_name: string, account_type: number) {
        return this.http.post<Object>(this.m_endpoint + '/create', { account_name, account_type });
    }
*/

    getList(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(this.m_endpoint + '/list')
    }
}
