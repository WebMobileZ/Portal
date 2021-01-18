import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { ConsultantListComponent } from './consultants/consultant-list/consultant-list.component';
import { ConsultantCreateComponent } from './consultants/consultant-create/consultant-create.component';
import { ConsultantEditComponent } from './consultants/consultant-edit/consultant-edit.component';

import { DocumentsListComponent } from './documents-list/documents-list.component';
import { DocumentsInactiveComponent } from './documents-inactive/documents-list.component';
import { DocumentsPlacedComponent } from './documents-placed/documents-placed.component';
import { EmailCreateComponent} from './email/email-create/email-create.component'
const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: UserIndexComponent,
    children: [
      {path: 'usercreate', component: UserCreateComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'useredit/:id', component: UserEditComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'userlist', component: UserListComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'documents', component: DocumentsListComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'consultantlist', component: ConsultantListComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'consultantcreate', component: ConsultantCreateComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'consultantedit/:id', component: ConsultantEditComponent,data: {
        expectedRole: 'Admin'
      }},


      {path: 'documentsinactive', component: DocumentsInactiveComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'documentsplaced', component: DocumentsPlacedComponent,data: {
        expectedRole: 'Admin'
      }},
      {path: 'email', component: EmailCreateComponent,data: {
        expectedRole: 'Admin'
      }},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
