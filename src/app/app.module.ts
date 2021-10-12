import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {PreloadAllModules, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {LayoutModule} from './core/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import {AgGridModule} from 'ag-grid-angular';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {   scrollPositionRestoration: 'enabled'  }),
     // RouterModule.forRoot([], { preloadingStrategy: PreloadAllModules }),
   
     HttpClientModule,
     AgGridModule.withComponents([]),
     LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 