import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
        return this.http.post<Object>(this.m_endpoint + "/delete", { "id_category": categoryId });
    }

    deleteParent(parentId) {
        return this.http.post<Object>(this.m_endpoint + "/delete_parent", { "id_parent": parentId });
    }

    setParentCategoryPosition(parentId, newPosition) {
        return this.http.post<Object>(this.m_endpoint + "/move_parent",
            {
                "id_parent": parentId,
                "new_position": newPosition
            });
    }
}
