import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { CategoryComponent } from '../page/category/category.component';
import {CategoryDetailComponent} from '../page/category/category-detail.component';
import { ClaimsComponent } from './claims/claims.component';
import {CropComponent} from './crop/crop.component';
import {CropSubTypeComponent} from './crop/cropsubtype.component';
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

  export function isStatusScreen(url: UrlSegment[], group: UrlSegmentGroup) {
    return group.segments.length === 1 && group.segments[0].path.endsWith('statusscreen') ? ({consumed: url}) : null;
  }

const routes: Routes = [
  { path: 'category', component: CategoryComponent ,matcher:isSettings  },
  { path: 'categorydetail/:id', component: CategoryDetailComponent , matcher: isCategoryDetail },
  { path: 'claims', component: ClaimsComponent ,matcher:isClaims  },
  //{ path: 'statusscreen', component: ClaimsComponent ,matcher:isStatusScreen  },
  { path: 'crop', component: CropComponent ,matcher:isCrop  },
  { path: 'cropsubtype', component: CropSubTypeComponent ,matcher:isCropsubtype  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
