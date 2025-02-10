import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { Transaction } from './transaction.model'

function formatDate(dateStr: string): string {
    // Split the input string into parts
    const parts = dateStr.split('-'); // parts[0] = YYYY, parts[1] = MM, parts[2] = DD
    if (parts.length !== 3) {
        throw new Error('Invalid date format');
    }
    // Rearrange and return as "dd/mm/yyyy"
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    m_endpoint = environment.apiUrl + "/transaction"

    constructor(private http: HttpClient) { }

    create(formData) {
        const newTransaction = {
            "id_payee": formData.id_payee,
            "id_category": formData.id_category,
            "id_account": formData.id_account,
            "flow": formData.flow,
            "amount": formData.amount * 100,
            "memo": formData.memo,
            "date": formatDate(formData.date)
        }
        return this.http.post<Object>(this.m_endpoint + '/create', newTransaction);
    }

    getList(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(this.m_endpoint + '/list')
    }
}
