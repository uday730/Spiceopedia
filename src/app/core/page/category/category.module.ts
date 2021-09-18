import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule,ReactiveFormsModule   } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import{CategoryDetailComponent} from './category-detail.component';
import {EditButtonRenderer} from '../../../util/edit-button.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule ,
    AgGridModule.withComponents([EditButtonRenderer]),
    CommonModule,
    CategoryRoutingModule
  ],
  declarations: [CategoryComponent,CategoryDetailComponent,EditButtonRenderer]
})
export class CategoryModule {


 }
