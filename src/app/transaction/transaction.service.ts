import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
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
    convertAmount(strAmount: string): number {
        return Math.floor(parseFloat(strAmount.replace(',', '.')) * 100)
    }

    m_endpoint = environment.apiUrl

    constructor(private http: HttpClient) { }

    create(formData) {
        const newTransaction = {
            "id_payee": formData.id_payee,
            "id_category": formData.id_category,
            "id_account": formData.id_account,
            "flow": formData.flow,
            "amount": this.convertAmount(formData.amount),
            "memo": formData.memo,
            "date": formatDate(formData.date),
            "is_transfer": 0
        }
        return this.http.post<Object>(this.m_endpoint + "/transaction/create", newTransaction);
    }

    create_transfer(formData) {
        const newTransfer = {
            "id_account_outflow": formData.id_account_outflow,
            "id_account_inflow": formData.id_account_inflow,
            "amount": this.convertAmount(formData.amount),
            "memo": formData.memo,
            "date": formatDate(formData.date)
        }
        return this.http.post<Object>(this.m_endpoint + '/transfer/create', newTransfer);
    }

    delete(transactionId) {
        let params = new HttpParams().set("id_transaction", transactionId)
        return this.http.delete<Object>(this.m_endpoint + "/transaction/delete", { params: params });
    }

    getList(accountId?: string): Observable<Transaction[]> {
        let params = {}
        if (accountId != null) {
            params = new HttpParams().set("id_account", accountId)
        }
        return this.http.get<Transaction[]>(this.m_endpoint + '/transaction/list', { params: params })
    }
}
