import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareIndexComponent } from './shareindex/share-index.component';
import { InterviewListComponent } from './interview/interview-list.component';
import { HotListBenchComponent } from './hotlist/hot-list.component';

const routes: Routes = [
 // { path: 'list', component: UserListComponent, outlet: 'users' },
  {
    path: '',
    component: ShareIndexComponent,
    children: [

      {path: 'interviews', component: InterviewListComponent,data: {
        expectedRole: 'BenchSales'
      }},
      {path: 'hotlist', component: HotListBenchComponent,data: {
        expectedRole: 'BenchSales'
      }},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareRoutingModule { }
