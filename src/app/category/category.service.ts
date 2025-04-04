import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { ParentCategory } from './parent.category.model'

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    m_endpoint = environment.apiUrl + "/category"

    constructor(private http: HttpClient) { }

    create_parent(parent_category_name: string) {
        return this.http.post<Object>(this.m_endpoint + '/create_parent', { parent_category_name });
    }

    create(id_parent: number, category_name: string) {
        return this.http.post<Object>(this.m_endpoint + '/create', { id_parent, category_name });
    }

    getList(): Observable<ParentCategory[]> {
        return this.http.get<ParentCategory[]>(this.m_endpoint + '/list')
    }

    delete(categoryId) {
        let params = new HttpParams().set("id_category", categoryId)
        return this.http.delete<Object>(this.m_endpoint + "/delete", { params: params });
    }

    deleteParent(parentId) {
        let params = new HttpParams().set("id_parent", parentId)
        return this.http.delete<Object>(this.m_endpoint + "/delete_parent", { params: params });
    }
}
