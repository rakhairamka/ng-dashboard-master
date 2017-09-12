import { NgModule }               from '@angular/core';
import { RouterModule }           from '@angular/router';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { LayoutModules }            from '../components/layout/layout-module';

//COMPONENTS
import { LoadingIndicator ,LoadingPage} from './loading-indicator/loading-indicator.component'
import { AppMainComponent} from '../components/app/app.main.component'

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    LayoutModules
  ],
  exports: [
    LoadingIndicator,
    AppMainComponent
  ],
  declarations: [
    LoadingIndicator,
    AppMainComponent
  ],
})
export class SharedModule { }
