import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { AuthGuardService } from 'app/auth-guard.service';
import { RouteGuardService } from 'app/rout-guard.service';
export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: UserComponent },
  {
    path: 'consultantdocuments', canActivateChild: [AuthGuardService],

    loadChildren: () => import('../../admin/consultantDocuments/documents.module').then(m => m.DocumentsModule),
  },

  {
    path: 'hotlist', canActivateChild: [AuthGuardService],
    loadChildren: () => import('../../admin/hotlist/hotlist.module').then(m => m.HotListModule),
  },
  {
    path: 'contacts', canActivateChild: [AuthGuardService],
    loadChildren: () => import('../../admin/contacts/contacts.module').then(m => m.ContactsModule),
  },

  {
    path: 'interviews', canActivateChild: [AuthGuardService],
    loadChildren: () => import('../../admin/interviews/interviews.module').then(m => m.InterviewsModule),
  },
  {
    path: 'consultants', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'Admin'
    },
    loadChildren: () => import('../../admin/consultants/consultant.module').then(m => m.ConsultantModule),
  },
  {
    path: 'vendorlist', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'Admin'
    },
    loadChildren: () => import('../../admin/vendorlist/vendorlist.module').then(m => m.VendorListModule),
  },

  {
    path: 'benchsales', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'BenchSales'
    },
    loadChildren: () => import('../../admin/benchsales/benchsales.module').then(m => m.BenchSalesModule),
  },
  {
    path: 'users', canActivateChild: [RouteGuardService],
     data: {
      expectedRole: 'Admin'
    },
    loadChildren: () => import('../../admin/users/user.module').then(m => m.UserModule),
  },



];

