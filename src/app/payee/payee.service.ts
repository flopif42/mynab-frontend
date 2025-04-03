import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { Payee } from './payee.model'

@Injectable({
    providedIn: 'root'
})
export class PayeeService {
    m_endpoint = environment.apiUrl + "/payee"

    constructor(private http: HttpClient) { }

    create(payee_name: string) {
        return this.http.post<Object>(this.m_endpoint + '/create', { payee_name });
    }

    getList(): Observable<Payee[]> {
        return this.http.get<Payee[]>(this.m_endpoint + '/list')
    }

    delete(payeeId) {
        let params = new HttpParams().set("id_payee", payeeId)
        return this.http.delete<Object>(this.m_endpoint + "/delete", { params: params });
    }
}
