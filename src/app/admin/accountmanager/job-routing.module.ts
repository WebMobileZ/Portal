import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobIndexComponent } from './job-index/job-index.component';

import { JobListComponent } from './job-list/job-list.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { JobEditComponent } from './job-edit/job-edit.component';
const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: JobIndexComponent,
    children: [

    /*  {path: 'list', component: UserListComponent,data: {
        expectedRole: 'Accountmanager'
      }},
      {path: 'inactivelist', component: UserListComponent,data: {
        expectedRole: 'Accountmanager'
      }},
      {path: 'create', component: UserCreateComponent,data: {
        expectedRole: 'Accountmanager'
      }},
      {path: 'edit/:id', component: UserEditComponent,data: {
        expectedRole: 'Accountmanager'
      }}, */
      {path: 'list', component: JobListComponent},
      {path: 'create', component: JobCreateComponent},
      {path: 'edit/:id', component: JobEditComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
