import {Component} from '@angular/core';

@Component({
    selector: 'main-layout-sidebar',
    templateUrl: './main-layout-sidebar.html'

})
export class MainLayoutSidebarComponent {
    role : String;
    ngOnInit() {
        this.role = localStorage.getItem('role');
        console.log(',,,'+this.role);
    }
}
