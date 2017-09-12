import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { AppConfig } from '../../../config/app.config';

@Component({
    selector : 'dashboard-main',
    templateUrl : 'dashboard-main.html'
})

export class DashboardMainComponent  {

    dashboardOrders = {};
    deliveryBoys = {};
    public getResturl : string;
    public data : Object;
    dataSub;
    
    constructor(
        private dataService : DataService,
        private config : AppConfig
    ){}
    name : String;
    ngOnInit(){
        this.name = localStorage.getItem('name');
        console.log(this.name);
    }
}
