import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {PreloadAllModules, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {LayoutModule} from './core/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
     // RouterModule.forRoot([], { preloadingStrategy: PreloadAllModules }),
     LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
