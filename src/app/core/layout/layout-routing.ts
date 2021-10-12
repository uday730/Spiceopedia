import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {PlainLayoutComponent} from './plain-layout/plain-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import(`../page/dashboard/dashboard.module`).then(m => m.DashboardModule) },
      // { path: 'category', loadChildren: () => import(`../page/category/category.module`).then(m => m.CategoryModule) },
      // { path: 'categorydetail', loadChildren: () => import(`../page/category/category.module`).then(m => m.CategoryModule) },
      // { path: 'claims', loadChildren: () => import(`../page/claims/claims.module`).then(m => m.ClaimsModule) },
      //{ path: 'status', loadChildren: () => import(`../page/status/status.module`).then(m => m.StatusModule) },
      { path: 'category', loadChildren: () => import(`../page/page.module`).then(m => m.PageModule) },
      { path: 'categorydetail', loadChildren: () => import(`../page/page.module`).then(m => m.PageModule) },
      { path: 'claims', loadChildren: () => import(`../page/page.module`).then(m => m.PageModule) },
      { path: 'crop', loadChildren: () => import(`../page/page.module`).then(m => m.PageModule) },
      { path: 'cropsubtype', loadChildren: () => import(`../page/page.module`).then(m => m.PageModule) },
      { path: 'description', loadChildren: () => import(`../page/page.module`).then(m => m.PageModule) },
      { path: 'lifecycle', loadChildren: () => import(`../page/page.module`).then(m => m.PageModule) },
      { path: 'attachment', loadChildren: () => import(`../page/page.module`).then(m => m.PageModule) },
      { path: 'attachmenttype', loadChildren: () => import(`../page/page.module`).then(m => m.PageModule) },
      { path: 'attachmentdetail', loadChildren: () => import(`../page/page.module`).then(m => m.PageModule) },
      
      { path: 'taxonomy', loadChildren: () => import(`../page/taxonomy/taxonomy.module`).then(m => m.TaxonomyModule) },
      { path: 'logout', loadChildren: () => import(`../page/logout/logout.module`).then(m => m.LogoutModule) },
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: PlainLayoutComponent,
    children: [
      { path: 'login', loadChildren: '../login/login.module#LoginModule' },
      { path: 'registration', loadChildren: '../registration/registration.module#RegistrationModule' }
    ]
  },
  {
    path: '',
    component: PlainLayoutComponent,
    children: [
      { path: 'auth-callback', loadChildren: () => import(`../page/auth-callback/auth-callback.module`).then(m => m.AuthCallbackModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
