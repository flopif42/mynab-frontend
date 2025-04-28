/* about.component.ts */
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { materialImports } from '../utils/material';

@Component({
    selector: 'app-about',
    templateUrl: 'about.component.html',
    imports: [materialImports, RouterModule]
})
export class AboutComponent {
    m_endpoint = environment.apiUrl;
    _clientVersion: string;
    _apiServerStatus: string;
    _apiVersion: string;
    _apiDocUrl: string;
    _loginUrl: string;
    _signUpUrl: string;
    _dbServerStatus: string;
    _dbVersion: string;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getServerInfo();
        this._clientVersion = environment.jenkinsBuildNumber;
        this._apiDocUrl = environment.apiUrl + '/apidocs/';
        this._loginUrl = '/login';
        this._signUpUrl = '/sign-up';
    }

    public getServerInfo() {
        return this.http.get<Object>(this.m_endpoint + '/about').subscribe(
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
