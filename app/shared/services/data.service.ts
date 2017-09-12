import { Response ,Request } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpService} from './http.service';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {NgSpinningPreloader} from 'ng2-spinning-preloader';


@Injectable()
 export class DataService{
    baseURL;
    static counter: number = 0;
    constructor(
        private http : HttpService,
        private ngSpinningPreloader: NgSpinningPreloader,
        private config :  AppConfig
    ){
        this.baseURL = this.config.getConfig('baseURL');
    }
        getData(url) {
            this.ngSpinningPreloader.start();
            DataService.counter += 1;
            let getURL = this.baseURL+ url;
            let observable = new Observable(observer => {
                this.http.get(getURL).subscribe((data: any) => {
                let response = JSON.parse(data._body);
                DataService.counter -= 1;
                if(DataService.counter === 0) {
                    this.ngSpinningPreloader.stop();
                }
                observer.next(response);
            },
            (e) =>{ 
                DataService.counter -= 1;
                this.ngSpinningPreloader.stop();
                DataService.handleError(e);
        });
    });
        return observable;
}

    postData(url,data){
        this.ngSpinningPreloader.start();
        DataService.counter += 1;
        let postURL = this.baseURL+ url;
        let observable = new Observable(observer => {
        this.http.post(postURL,data).subscribe((data: any) => {
            let response = JSON.parse(data._body);
            DataService.counter -= 1;
            if(DataService.counter === 0) {
                this.ngSpinningPreloader.stop();
            }
            observer.next(response);
        },
            (e) =>{ 
                DataService.counter -= 1;
                this.ngSpinningPreloader.stop();
                DataService.handleError(e);
        })
    });
        return observable;
    }

    updateData(url,data){
        this.ngSpinningPreloader.start();
        DataService.counter += 1;
        let putURL = this.baseURL+ url;
        let observable = new Observable(observer => {
        this.http.put(putURL,data).subscribe((data: any) => {
            let response = JSON.parse(data._body);
            DataService.counter -= 1;
            if(DataService.counter === 0) {
                this.ngSpinningPreloader.stop();
            }
            observer.next(response);
        },
            (e) =>{ 
                DataService.counter -= 1;
                this.ngSpinningPreloader.stop();
                DataService.handleError(e);
        });
    });
        return observable;
    }

    deleteData(url){
        this.ngSpinningPreloader.start();
        DataService.counter += 1;
        let deleteURL = this.baseURL+ url;        
        let observable = new Observable(observer => {
        this.http.delete(deleteURL).subscribe((data: any) => {
            let response = JSON.parse(data._body);
            DataService.counter -= 1;
            if(DataService.counter === 0) {
                this.ngSpinningPreloader.stop();
            }
            observer.next(response);
        },
            (e) =>{ 
                DataService.counter -= 1;
                this.ngSpinningPreloader.stop();
                DataService.handleError(e);
        });
    });
        return observable;
    }

    static handleError(error: any){
            return Observable.throw(error.json().error || 'Server error');
    }

}
