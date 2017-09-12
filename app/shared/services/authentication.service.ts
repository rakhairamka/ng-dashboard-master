import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map'
import {AppConfig} from '../../../config/app.config';
import {NgSpinningPreloader} from 'ng2-spinning-preloader';


@Injectable()
export class AuthenticationService {
    baseURL;
    private messageEvent = {};
    private newOrderEvent = new BehaviorSubject<Object>(this.messageEvent);
    newOrderEventAsObservable = this.newOrderEvent.asObservable();
    
    constructor(
        private http: Http,
        private config : AppConfig,
        private ngSpinningPreloader : NgSpinningPreloader) {
        this.ngSpinningPreloader.stop();
    }

    login(user) {
        let urls = this.config.getConfig('urls');
       let loginUrl: string = urls.signin;
        //loginUrl += '?userName=' + user.userName +'&password=' + user.password; 
        let headers = new Headers();
        headers.append('Authorization','RaviRoshanIsValidUserToken');
        headers.append('Content-Type','application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(loginUrl, user,options)
            .catch(this.handleError)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let responseObject = response.json();
                if (responseObject) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('name', responseObject.name);
                    localStorage.setItem('role', responseObject.role);
                    localStorage.setItem('validUser', responseObject.validUser);
                }
                // this.ngSpinningPreloader.stop();
                return responseObject;
            });
    }

    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        localStorage.removeItem('validUser');
    }


    // login(user) {
    //     //this.ngSpinningPreloader.start();
    //     let urls = this.config.getConfig('urls');
    //     let loginUrl: string = urls.signin;
    //     return this.http.post(loginUrl,user)
    //         .catch(this.handleError)
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             let responseObject = response.json();
    //             if (responseObject && responseObject.user) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('token', responseObject.jwt);
    //                 localStorage.setItem('currentUser', JSON.stringify(responseObject.user));
    //                 console.log('ssss>>>>'+responseObject.user);
    //             }
    //             // this.ngSpinningPreloader.stop();
    //             return responseObject;
    //         });
    // }
    
    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    //     localStorage.removeItem('token');
    // }

    sendSubscription(subInfo){
        let urls :any = {}; //this.config.getConfig('urls');
        let sendSubUrl: string = this.baseURL + urls.sendSubUrl;
        return this.http.post(sendSubUrl,subInfo)
            .catch(this.handleError)
            .map((response: Response) => {
                console.log('subscription info sent successfully. Response from sendSub '+response);
            });
    }
    
    
    handleError(error: any){
        return Observable.throw(error.json().error || 'Server Error');
    }
}
