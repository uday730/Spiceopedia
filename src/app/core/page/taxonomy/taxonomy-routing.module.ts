import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxonomyComponent } from './taxonomy.component';

const routes: Routes = [
  { path: '', component: TaxonomyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxonomyRoutingModule { }
