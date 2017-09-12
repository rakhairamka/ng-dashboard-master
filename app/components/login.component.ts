import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, ElementRef} from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { AppConfig } from '../../config/app.config';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
    selector : 'login',
    templateUrl : './login.component.html',
    styleUrls :['./login.component.scss']
})

export class LoginComponent implements OnInit  {
    private alerts = [];
    user = {};
    images = [];
    showLoginForm;
    returnURL;
    constructor(
        private dataService : DataService,
        private route :  ActivatedRoute,
        private router : Router,
        private authenticationService :  AuthenticationService ,
        private el : ElementRef
    ){
        this.images = ["assets/global/img/login/bg1.jpg", "assets/global/img/login/bg2.jpg", "assets/global/img/login/bg3.jpg"];
        this.showLoginForm = true;
    }
    
    ngOnInit() {
    }
    
    signin(user) {
        console.log(user);
        this.authenticationService.login(user).subscribe((response : any)=> {
            console.log(response);
            if(response.validUser){
                this.router.navigateByUrl("/dashboard");
            }else{
                this.router.navigateByUrl("/login");
            }
            
        });
    }
    
}
