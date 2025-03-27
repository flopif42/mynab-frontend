import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-about',
    template: `
    <div>Client version (Jenkins build number) : {{ this._clientVersion }}<div>
    <div>API server status : {{ this._apiServerStatus }}</div>
    <div>API version : {{ this._apiVersion }}</div>
    <div><a href="apidocs/">API Documentation</a></div>
    <div>Database server status : {{ this._dbServerStatus }}</div>
    <div>Database version : {{ this._dbVersion }}</div>
    
  `
})
export class AboutComponent {
    m_endpoint = environment.apiUrl;
    _clientVersion: string;
    _apiServerStatus: string;
    _apiVersion: string;
    _dbServerStatus: string;
    _dbVersion: string;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getServerInfo();
        this._clientVersion = environment.jenkinsBuildNumber
    }

    public getServerInfo() {
        return this.http.get<Object>(this.m_endpoint + "/about").subscribe(
            (response) => {
                this._apiServerStatus = 'Up';
                this._apiVersion = response['API version'];
                this._dbServerStatus = response['Database server status']
                this._dbVersion = response['Database version']
            },
            (error) => {
                this._apiServerStatus = 'Down'
            }
        )
    }
}
