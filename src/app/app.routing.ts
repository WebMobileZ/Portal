import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { WelcomeLayoutComponent } from './layouts/welcome-layout/welcome-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home/login',
    pathMatch: 'full',
  },{
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  }]},{
    path: 'home',
    component: WelcomeLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/welcome-layout/welcome-layout.module').then(m => m.WelcomeLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
