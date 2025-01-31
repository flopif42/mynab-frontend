import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { AuthService } from '../auth/auth.authservice';

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

    constructor(private http: HttpClient, private authService: AuthService) { }

    ngOnInit() {
        // this.getHello()
        this.isLoggedIn()
    }

    public isLoggedIn() {
        let observable = this.authService.is_logged()
        return observable.subscribe(
            (response) => {
                console.log(response)
                if (response['isLogged'] == 'OK')
                    this.m_data = "Logged in"
                else
                    this.m_data = "Logged out"
            },
            (error) => {
                console.error('Request failed with error')
                alert(error);
            }
        )
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

