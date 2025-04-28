import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserProfile } from './user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'user-home',
    templateUrl: 'user.component.html',
    styleUrl: 'user.component.css'
})
export class UserComponent implements OnInit {
    _user: UserProfile;
    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
        this.getUserProfile()
        this._user = new UserProfile();
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

    logout(): void {
        this.router.navigate(['/']); // Use Angular Router to navigate
    }
}
