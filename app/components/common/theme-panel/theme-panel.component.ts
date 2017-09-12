import {Component, AfterViewInit} from '@angular/core';

@Component({
    selector: 'theme-panel',
    templateUrl: './theme-panel.template.html'
})
export class ThemePanelComponent {
    ngAfterViewInit() {
        Demo.init();
    }
}