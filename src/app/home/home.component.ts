import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'


@Component({
  selector: 'app-home',
  template: `
    <div>Home Page</div>
    <div>{{ this.m_data }}</div>
  `
})
export class HomeComponent {
    m_endpoint = environment.apiUrl;
    m_data = {};

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getHello()
    }

    public getHello() {
        let observable = this.http.get<Object>(this.m_endpoint + "/hello")
        return observable.subscribe(
            (response) => {
                this.m_data = response['response'];
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

