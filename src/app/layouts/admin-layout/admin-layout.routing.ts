import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { AuthGuardService } from 'app/auth-guard.service';
import { RouteGuardService } from 'app/rout-guard.service';
import { CalculatorPageComponent } from '../../pages/calculatorpage/calculatorpage.component';
export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: UserComponent },
  { path: 'calculator', canActivate: [AuthGuardService], component: CalculatorPageComponent },
  /*{
    path: 'consultantdocuments', canActivateChild: [AuthGuardService],

    loadChildren: () => import('../../admin/consultantDocuments/documents.module').then(m => m.DocumentsModule),
  },
  {
    path: 'admindocuments', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'Admin'
    },
    loadChildren: () => import('../../admin/adminDocuments/documents.module').then(m => m.DocumentsModule),
  },
  {
    path: 'adminInDocuments', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'Admin'
    },
    loadChildren: () => import('../../admin/adminInDocuments/documents.module').then(m => m.DocumentsInModule),
  },
  {
    path: 'hotlist', canActivateChild: [AuthGuardService],
    loadChildren: () => import('../../admin/hotlist/documents.module').then(m => m.DocumentsModule),
  },
  {
    path: 'contacts', canActivateChild: [AuthGuardService],
    loadChildren: () => import('../../admin/contacts/documents.module').then(m => m.DocumentsModule),
  },

  {
    path: 'interviews', canActivateChild: [AuthGuardService],
    loadChildren: () => import('../../admin/interviews/user.module').then(m => m.UserModule),
  },
  {
    path: 'consultants', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'Admin'
    },
    loadChildren: () => import('../../admin/consultants/user.module').then(m => m.UserModule),
  },
  {
    path: 'vendorlist', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'Admin'
    },
    loadChildren: () => import('../../admin/vendorlist/user.module').then(m => m.UserModule),
  },
  {
    path: 'headadminconsultants', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'HeadHuntersAdmin'
    },
    loadChildren: () => import('../../admin/headAdminconsultants/user.module').then(m => m.UserModule),
  },
  {
    path: 'jobs', canActivateChild: [AuthGuardService],

    loadChildren: () => import('../../admin/accountmanager/user.module').then(m => m.UserModule),
  },
  {
    path: 'submissions', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'Recruiters'
    },
    loadChildren: () => import('../../admin/submissions/user.module').then(m => m.UserModule),
  },
  {
    path: 'benchsales', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'BenchSales'
    },
    loadChildren: () => import('../../admin/benchsales/user.module').then(m => m.UserModule),
  },
  {
    path: 'recruiters', canActivateChild: [AuthGuardService],

    loadChildren: () => import('../../admin/recruiters/user.module').then(m => m.UserModule),
  },


  {
    path: 'users', canActivateChild: [RouteGuardService],
     data: {
      expectedRole: 'Admin'
    },
    loadChildren: () => import('../../admin/users/user.module').then(m => m.UserModule),
  },
*/
{
  path: 'vendorlist', canActivateChild: [RouteGuardService],
  data: {
    expectedRole: 'Admin'
  },
  loadChildren: () => import('../../admin/vendorlist/user.module').then(m => m.UserModule),
},
{
  path: 'superadmin', canActivateChild: [RouteGuardService],
  data: {
    expectedRole: 'Admin'
  },
  loadChildren: () => import('../../admin/superadmin/superAdmin.module').then(m => m.SuperAdminModule),
  },  {
    path: 'jobs', canActivateChild: [AuthGuardService],

    loadChildren: () => import('../../admin/accountmanager/user.module').then(m => m.UserModule),
  },
  {
    path: 'benchsales', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'BenchSales'
    },
    loadChildren: () => import('../../admin/benchsales/user.module').then(m => m.UserModule),
  },
  {
    path: 'huntersconsultants', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'HeadHunters'
    },
    loadChildren: () => import('../../admin/huntersconsultants/hunter.module').then(m => m.HunterModule),
  },
  {
    path: 'headadminconsultants', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'HeadHuntersAdmin'
    },
    loadChildren: () => import('../../admin/headAdminconsultants/user.module').then(m => m.UserModule),
  },
];

