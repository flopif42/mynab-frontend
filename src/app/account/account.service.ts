import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { Account } from './account.model'

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    m_endpoint = environment.apiUrl + "/account"
    constructor(private http: HttpClient) { }

    getList(): Observable<Account[]> {
        return this.http.get<Account[]>(this.m_endpoint + '/list')
    }

    create(account_name: string, account_type: number) {
        return this.http.post<Object>(this.m_endpoint + '/create', { account_name, account_type });
    }

    delete(accountId) {
        return this.http.delete<Object>(this.m_endpoint + "/delete", { body: { "id_account": accountId }});
    }

    toggleStatus(accountId) {
        return this.http.post<Object>(this.m_endpoint + "/toggle_status", { "id_account": accountId });
    }
}
