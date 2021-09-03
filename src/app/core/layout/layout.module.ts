import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {PlainLayoutComponent} from './plain-layout/plain-layout.component';
import { LayoutRoutingModule } from './layout-routing';
 

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
  exports:[

  ],
  
})
export class LayoutModule { }
