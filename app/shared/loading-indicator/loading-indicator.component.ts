import { Component } from '@angular/core';

@Component({
    selector: 'loading-indicator',
    templateUrl: './loading-indicator.component.pug',
    styleUrls : ['./loading-indicator.scss']
})
export class LoadingIndicator {} 

export class LoadingPage {
    public loading: boolean;
    constructor(val: boolean) {
        this.loading = val;
    }
    standby() {
        this.loading = true;
    }
    ready() {
        this.loading = false;
    }
}