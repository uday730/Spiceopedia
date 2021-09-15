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
