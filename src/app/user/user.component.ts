import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserProfile } from './user.model';

@Component({
    selector: 'user-home',
    templateUrl: 'user.component.html',
})
export class UserComponent implements OnInit {
    // _user: UserProfile;

    _user = {
        "email_address": "mail bla bla",
        "first_name": "flo",
        "last_name": "ngu",
        "ui_collapse_cash": 0,
        "ui_collapse_closed": 1,
        "ui_collapse_tracking": 1
    };

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
