import {Routes, RouterModule} from '@angular/router';
import {DashboardMainComponent} from './components/dashboard/dashboard-main.component';

import {LoginComponent} from './components/login.component';
import {AuthService} from './shared/services/auth.service';
import {AppMainComponent} from './components/app/app.main.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: '',
        component: AppMainComponent,
        children: [{
            path: 'dashboard',
            component: DashboardMainComponent,
            canActivate: [AuthService],
            pathMatch: 'full'
        }, {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
        }]
    }

];

export const appRouting = RouterModule.forRoot(appRoutes);
