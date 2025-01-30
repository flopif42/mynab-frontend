import { Component } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  template: `
    <div>Home Page</div>
    <div>{{ this.m_data }}</div>
  `
})
export class HomeComponent {
    m_endpoint = environment.apiUrl + "/hello"
    m_data = []

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getHello()
    }

    public getHello() {
        let observable = this.http.get<Object>(this.m_endpoint)
        return observable.subscribe(
            (response) => {
                this.m_data = response[0];
            },
            (error) => {
                console.error('Request failed with error')
                alert(error);
            },
            () => {
                // stuff to do ?
            }
        )
    }
}

