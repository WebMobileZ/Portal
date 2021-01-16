import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CalculatorPageComponent } from '../../pages/calculatorpage/calculatorpage.component';
import { UserComponent } from '../../pages/user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { UserService } from './user.serviuce';
import { CalculatorDashComponent } from '../../pages/calculatorDash/calculatordash.component';
import {CardModule} from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule, ReactiveFormsModule, ToastModule,
    CardModule
  ],
  declarations: [
    DashboardComponent,CalculatorPageComponent,
    UserComponent,CalculatorDashComponent
  ],
  providers: [UserService],
})

export class AdminLayoutModule { }
