import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { Budget } from './budget.model'

@Injectable({
    providedIn: 'root'
})
export class BudgetService {
    m_endpoint = environment.apiUrl + "/budget"

    constructor(private http: HttpClient) { }

    getList(): Observable<Budget[]> {
        return this.http.get<Budget[]>(this.m_endpoint + '/list')
    }

    setFunded(requestParams) {
        return this.http.post<Object>(this.m_endpoint + '/set_funded', requestParams)
    }
}
