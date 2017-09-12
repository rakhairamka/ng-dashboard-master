//3rd party Modules
import { NgModule ,APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule , RequestOptions, XHRBackend } from '@angular/http';
import { ModalModule, AlertModule } from 'ngx-bootstrap';
import {Ng2PaginationModule} from 'ng2-pagination'; 
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { SelectModule } from 'ng2-select';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { NgUploaderModule } from 'ngx-uploader';
//app Modules
import { LayoutModules } from './components/layout/layout-module';

//Components
import { appRouting } from './app.routes';
import { DashboardMainComponent } from './components/dashboard/dashboard-main.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { NotFoundComponent } from './components/not-found/not.found.component';
//Services

import { HttpService } from './shared/services/http.service';
import { DataService } from './shared/services/data.service';
import { AuthService } from './shared/services/auth.service';
import { RestaurantService } from './shared/services/restaurant.service';
import { AppConfig } from '../config/app.config';
import { InsideImageService } from './shared/services/inside-image.service';
import { ItemsImageService } from  './shared/services/items-image.service';
import { NotificationService } from './shared/services/notification.service';
import {NgSpinningPreloader} from 'ng2-spinning-preloader';

@NgModule({
    imports : [
        BrowserModule,
        LayoutModules,
        HttpModule,
        Ng2PaginationModule,
        SelectModule,
        appRouting,
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        Daterangepicker,
        FormsModule,
        SharedModule,
        JWBootstrapSwitchModule,
        NgUploaderModule
    ],
    declarations : [
        DashboardMainComponent,
        AppComponent,
        LoginComponent,
        NotFoundComponent,
    ],
    providers: [
        DataService,
        AuthService,
        NgSpinningPreloader,
        RestaurantService,
        InsideImageService,
        ItemsImageService,
        NotificationService,
    {
      provide: HttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new HttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    AppConfig,
        { 
            provide: APP_INITIALIZER, 
            useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true
         }
  ],
    bootstrap : [AppComponent]
})

export class AppModule {
}
