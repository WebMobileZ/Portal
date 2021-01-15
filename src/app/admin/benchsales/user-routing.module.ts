import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { DocumentBenchListComponent } from './documents/user-list/user-list.component';
import { InterviewComponent } from '../superadmin/interviews/user-list/user-list.component';
import { HotListComponent } from '../superadmin/hotlist/user-list/user-list.component';
import { ContactListComponent } from './/contacts/user-list/user-list.component';
import { InterviewBenchComponent } from './interviews/user-list/user-list.component';
import { HotListBenchComponent } from './hotlist/user-list/user-list.component';
import { MyBenchSalesComponent } from './mybenchsales/mybenchsales-list.component';
const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: UserIndexComponent,
    children: [

      {path: 'list', component: UserListComponent,data: {
        expectedRole: 'BenchSales'
      }},
      {path: 'mylist', component: MyBenchSalesComponent,data: {
        expectedRole: 'BenchSales'
      }},
      {path: 'create', component: UserCreateComponent,data: {
        expectedRole: 'BenchSales'
      }},
      {path: 'edit/:id', component: UserEditComponent,data: {
        expectedRole: 'BenchSales'
      }},
      {path: 'documentlist', component: DocumentBenchListComponent,data: {
        expectedRole: 'BenchSales'
      }},
      {path: 'interviews', component: InterviewBenchComponent,data: {
        expectedRole: 'BenchSales'
      }},
      {path: 'hotlist', component: HotListBenchComponent,data: {
        expectedRole: 'BenchSales'
      }},
      {path: 'contacts', component: ContactListComponent,data: {
        expectedRole: 'BenchSales'
      }},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
