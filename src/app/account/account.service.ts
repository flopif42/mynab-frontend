import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    m_endpoint = environment.apiUrl + "/account"

    constructor(private http: HttpClient) { }

    create(account_name: string) {
        return this.http.post<Object>(this.m_endpoint + '/create', { account_name });
    }

    getList() {
        return this.http.get<Account[]>(this.m_endpoint + '/list')
    }
}
