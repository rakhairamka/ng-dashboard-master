import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModules } from '../common/common-module';
import {MainLayoutSidebarComponent} from './main-layout-sidebar/main-layout-sidebar.component';
import {MainLayoutHeaderComponent} from  './main-layout-header/main-layout-header.component';
import {MainLayoutQuickSidebarComponent} from  './main-layout-quicksidebar/main-layout-quicksidebar.component';
import {MainLayoutFooterComponent} from  './main-layout-footer/main-layout-footer.component';
import {PageLayoutTopComponent} from  './page-layout-top/page-layout-top.component';
import { appRouting } from '../../app.routes';

import { AuthenticationService } from '../../shared/services/authentication.service';


@NgModule({
    imports : [
        appRouting,
        CommonModules,
        CommonModule
    ],
    declarations : [
        MainLayoutSidebarComponent,
        MainLayoutHeaderComponent,
        MainLayoutQuickSidebarComponent,
        MainLayoutFooterComponent,
        PageLayoutTopComponent
    ],
    exports : [
        MainLayoutSidebarComponent,
        MainLayoutHeaderComponent,
        MainLayoutQuickSidebarComponent,
        MainLayoutFooterComponent,
        PageLayoutTopComponent
    ],
    providers :[
        AuthenticationService
    ]
})

export class LayoutModules {}