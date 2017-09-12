import { Component, AfterViewInit} from '@angular/core';

@Component({
  selector: 'myapp',
  templateUrl: 'app.pug'
})

export class AppComponent
    implements AfterViewInit
{
    ngAfterViewInit() {
        App.init();
        App.initAjax();
        Layout.init();
        QuickSidebar.init();}
}
