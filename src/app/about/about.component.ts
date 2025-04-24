/* about.component.ts */
import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-about',
    templateUrl: 'about.component.html',
    imports: [MatButtonModule]
})
export class AboutComponent {
    m_endpoint = environment.apiUrl;
    _clientVersion: string;
    _apiServerStatus: string;
    _apiVersion: string;
    _apiDocUrl: string;
    _dbServerStatus: string;
    _dbVersion: string;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getServerInfo();
        this._clientVersion = environment.jenkinsBuildNumber
        this._apiDocUrl = environment.apiUrl + '/apidocs/'
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
