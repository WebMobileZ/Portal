import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BenchsalesIndexComponent } from './benchsales-index/benchsales-index.component';
import { BenchsalesListComponent } from './benchsales-list/benchsales-list.component';
import { BenchsalesCreateComponent } from './benchsales-create/benchsales-create.component';

import { DocumentBenchListComponent } from './documents/documents-list/documents-list.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { MyBenchSalesComponent } from './mybenchsales/mybenchsales-list.component';
const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: BenchsalesIndexComponent,
    children: [

      {path: 'list', component: BenchsalesListComponent,data: {
        expectedRole: ['BenchSales','Admin']
      }},
      {path: 'mylist', component: MyBenchSalesComponent,data: {
        expectedRole: 'BenchSales'
      }},
      {path: 'create', component: BenchsalesCreateComponent,data: {
        expectedRole: ['BenchSales','Admin']
      }},

      {path: 'documentlist', component: DocumentBenchListComponent,data: {
        expectedRole: ['BenchSales','Admin']
      }},
      {path: 'contacts', component: ContactListComponent,data: {
        expectedRole: ['BenchSales','Admin']
      }},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenchSalesRoutingModule { }
