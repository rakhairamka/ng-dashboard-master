/**
 * Created by Nutan on 4/11/2017.
 */
import { Component, AfterViewInit} from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.pug'
})

export class AppMainComponent implements AfterViewInit
{
    ngAfterViewInit() {
        App.init();
        App.initAjax();
        Layout.init();
        QuickSidebar.init();
    }
}
