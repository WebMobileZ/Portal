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
  {
    path: 'commonmodule', canActivateChild: [AuthGuardService],
    loadChildren: () => import('../../admin/sharemodule/sharemodule.module').then(m => m.ShareModule),
  },


  {
    path: 'superadmin', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: 'Admin'
    },
    loadChildren: () => import('../../admin/super-admin/superAdmin.module').then(m => m.SuperAdminModule),
  }, {
    path: 'jobs', canActivateChild: [AuthGuardService],

    loadChildren: () => import('../../admin/accountmanager/job.module').then(m => m.JobModule),
  },
  {
    path: 'benchsales', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: ['BenchSales', 'Admin']
    },
    loadChildren: () => import('../../admin/benchsales/benchsales.module').then(m => m.UserModule),
  },

  {
    path: 'headadminconsultants', canActivateChild: [RouteGuardService],
    data: {
      expectedRole: ['HeadHuntersAdmin', 'Admin']
    },
    loadChildren: () => import('../../admin/headAdminconsultants/user.module').then(m => m.UserModule),
  },
];

