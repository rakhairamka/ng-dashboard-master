import {Component} from '@angular/core';
import{ Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
    selector: 'main-layout-header',
    templateUrl: './main-layout-header.template.html'
})
export class MainLayoutHeaderComponent {
    constructor(private authenticationService : AuthenticationService,
    private router : Router) {}

    logout(){
        this.authenticationService.logout();
        this.router.navigate(['login']);
        //this.router.navigate([this.returnURL]);
    }
}