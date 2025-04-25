import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
    selector: 'user-home',
    templateUrl: 'user.component.html',
})
export class UserComponent implements OnInit {
    _user: UserService;
    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getUserProfile()
    }

    getUserProfile() {
        this.userService.getProfile().subscribe(
            response => {
                this._user = response;
            },
            error => {
                console.error('in getUserProfile() error')
            }
        )
    };
}
