import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxonomyRoutingModule } from './taxonomy-routing.module';
import { TaxonomyComponent } from './taxonomy.component';

@NgModule({
  imports: [
    CommonModule,
    TaxonomyRoutingModule
  ],
  declarations: [TaxonomyComponent]
})
export class TaxonomyModule { }
