import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: UserIndexComponent,
    children: [

      {path: 'list', component: UserListComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'inactivelist', component: UserListComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'create', component: UserCreateComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'edit/:id', component: UserEditComponent,data: {
        expectedRole: 'Admin'
      }},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
