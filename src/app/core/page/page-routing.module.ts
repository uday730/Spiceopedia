import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { CategoryComponent } from '../page/category/category.component';
import {CategoryDetailComponent} from '../page/category/category-detail.component';
import { ClaimsComponent } from './claims/claims.component';
import {CropComponent} from './crop/crop.component';
import {CropSubTypeComponent} from './crop/cropsubtype.component';
import { DescriptionComponent } from './description/description.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
import { AttachmentTypeComponent } from './attachment/attachment-type.component';
import { AttachmentDetailComponent } from './attachment/attachment-details.component';
import { AttachmentComponent } from './attachment/attachment.component';
//import {StatusScreenComponent} from './status-screen/status-screen.component';


export function isCategoryDetail(url: UrlSegment[], group: UrlSegmentGroup) {
  if(group.segments.length >= 1 && group.segments[0].path.endsWith('categorydetail')) {
    const id = group.segments[1].path;
    url = [new UrlSegment(id, {} )];
    return { 
      consumed: url,
      posParams: {'id': new UrlSegment(id, {}) }
    }
  }
  return null; 
}

export function isAttachmentDetail(url: UrlSegment[], group: UrlSegmentGroup) {
  if(group.segments.length >= 1 && group.segments[0].path.endsWith('attachmentdetail')) {
    const id = group.segments[1].path;
    url = [new UrlSegment(id, {} )];
    return { 
      consumed: url,
      posParams: {'id': new UrlSegment(id, {}) }
    }
  }
  return null; 
}


export function isSettings(url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('category') ? ({consumed: url}) : null;
}

export function isClaims(url: UrlSegment[], group: UrlSegmentGroup) {
    return group.segments.length === 1 && group.segments[0].path.endsWith('claims') ? ({consumed: url}) : null;
  }

export function isCrop(url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('crop') ? ({consumed: url}) : null;
}
export function isCropsubtype(url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('cropsubtype') ? ({consumed: url}) : null;
}
export function isDescription(url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('description') ? ({consumed: url}) : null;
}
export function isStatusScreen(url: UrlSegment[], group: UrlSegmentGroup) {
    return group.segments.length === 1 && group.segments[0].path.endsWith('statusscreen') ? ({consumed: url}) : null;
}
export function isLifecycle( url: UrlSegment[], group: UrlSegmentGroup) {
    return group.segments.length === 1 && group.segments[0].path.endsWith('lifecycle') ? ({consumed: url}) : null;
}

export function isAttachmentType( url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('attachmenttype') ? ({consumed: url}) : null;
}
export function isAttachment( url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('attachment') ? ({consumed: url}) : null;
}
// function matcherHelper(url: UrlSegment[], group: UrlSegmentGroup, routeName:string) {
//   // Logic and return
//   //return group.segments.length === 1 && group.segments[0].path.endsWith('lifecycle') ? ({consumed: url}) : null;
//   return group.segments.length === 1 && group.segments[0].path.endsWith(routeName) ? ({consumed: url}) : null;
// }

const routes: Routes = [
  { path: 'category', component: CategoryComponent ,matcher:isSettings  },
  { path: 'categorydetail/:id', component: CategoryDetailComponent , matcher: isCategoryDetail },
  { path: 'claims', component: ClaimsComponent ,matcher:isClaims  },
  { path: 'crop', component: CropComponent ,matcher:isCrop  },
  { path: 'cropsubtype', component: CropSubTypeComponent ,matcher:isCropsubtype  },
  { path: 'description', component: DescriptionComponent ,matcher:isDescription  },
  { path: 'lifecycle', component: LifecycleComponent ,matcher:isLifecycle  },
  { path: 'attachment', component: AttachmentComponent ,matcher:isAttachment  },
  { path: 'attachmenttype', component: AttachmentTypeComponent ,matcher:isAttachmentType  },
  { path: 'attachmentdetail/:id', component: AttachmentDetailComponent , matcher: isAttachmentDetail },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
