import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule,ReactiveFormsModule   } from '@angular/forms';
//import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from '../page/category/category.component';
import{CategoryDetailComponent} from '../page/category/category-detail.component';
import {EditButtonRenderer} from '../../util/edit-button.component';
import {ModalPopupComponent} from '../../util/modal-popup.component';
import {CustomJSExtention} from '../../util/custom-js-extension';
import {PageRoutingModule} from './page-routing.module'
import {ClaimsComponent} from './claims/claims.component';
import {CropComponent} from './crop/crop.component';
import {CropSubTypeComponent} from './crop/cropsubtype.component';
import { DescriptionComponent } from './description/description.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
import { RouterModule } from '@angular/router';
import { AttachmentComponent } from './attachment/attachment.component';
import { AttachmentTypeComponent } from './attachment/attachment-type.component';
import { AttachmentDetailComponent } from './attachment/attachment-details.component';
//import {StatusScreenComponent} from './status-screen/status-screen.component';
 
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule ,
    AgGridModule.withComponents([EditButtonRenderer]),
    CommonModule,
    PageRoutingModule
  ],
  declarations: [CategoryComponent,
          CategoryDetailComponent,
          ClaimsComponent,
          CropComponent,
          DescriptionComponent,
          LifecycleComponent,
          CropSubTypeComponent,
          AttachmentComponent,
          AttachmentDetailComponent,
          AttachmentTypeComponent,
        //  StatusScreenComponent,
          EditButtonRenderer,
          ModalPopupComponent,
          
        ]
})
export class PageModule {

 }
