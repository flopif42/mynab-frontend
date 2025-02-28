import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-about',
  template: `
    <div>Server status : {{ this._serverStatus }}</div>
    <div>API Version : {{ this._serverVersion }}</div>
    <div>Client version (Jenkins build number) : {{ this._clientVersion }}<div>
  `
})
export class AboutComponent {
    m_endpoint = environment.apiUrl;
    _serverStatus: string;
    _serverVersion: string;
    _clientVersion: string;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getServerInfo();
        this._clientVersion = environment.jenkinsBuildNumber
    }

    public getServerInfo() {
        return this.http.get<Object>(this.m_endpoint + "/hello").subscribe(
            (response) => {
                this._serverStatus = 'Up';
                this._serverVersion = response['Version'];
            },
            (error) => {
                this._serverStatus = 'Down'
            }
        )
    }
}
