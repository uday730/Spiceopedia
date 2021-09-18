import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {PlainLayoutComponent} from './plain-layout/plain-layout.component';
import { LayoutRoutingModule } from './layout-routing';
import { SpiceopediaService } from '../service/spiceopedia.service';
import { BaseService } from '../service/base.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainLayoutComponent,
    PlainLayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  providers:[SpiceopediaService,BaseService],
  exports:[

  ],
  
})
export class LayoutModule { }
