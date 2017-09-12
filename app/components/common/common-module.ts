import { NgModule } from '@angular/core';
import { PageBarComponent } from './page-bar/page-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ThemePanelComponent } from './theme-panel/theme-panel.component';

@NgModule({
        imports : [],
        declarations : [
            PageBarComponent,
            PageTitleComponent,
            ThemePanelComponent
        ],
        exports : [
            PageBarComponent,
            PageTitleComponent,
            ThemePanelComponent
        ]
})

export class CommonModules {}