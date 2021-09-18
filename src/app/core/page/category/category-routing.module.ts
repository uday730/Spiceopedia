import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { CategoryComponent } from './category.component';
import {CategoryDetailComponent} from './category-detail.component';


export function isCategoryDetail(url: UrlSegment[], group: UrlSegmentGroup) {
  // console.log(group.segments[0].path)
  // console.log(url)
  //return group.segments.length === 1 && group.segments[0].path.endsWith('categorydetail') ? ({consumed: url}) : null;
  //const test = /categorydetail(\d+)$/.exec(location.href);
  //const test = /categorydetail/.exec(location.href);
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

const routes: Routes = [
  { path: 'category', component: CategoryComponent ,matcher:isSettings  },
  { path: 'categorydetail/:id', component: CategoryDetailComponent , matcher: isCategoryDetail },
  // { path: 'category', component: CategoryComponent   },
  // { path: 'categorydetail', component: CategoryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
