import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenchSalesRoutingModule } from './bench-routing.module';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { BenchSalesService } from './benchsales-rest.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import {InplaceModule} from 'primeng/inplace';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { CalculatorComponent } from './calculator/calculator.component';
import { FieldPipe } from '../../field.pipe';
@NgModule({
  declarations: [UserIndexComponent,FieldPipe, UserListComponent,UserCreateComponent,CalculatorComponent],
  imports: [
    CommonModule,
    BenchSalesRoutingModule,
    ReactiveFormsModule, TableModule, MultiSelectModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,ConfirmDialogModule,
    ProgressBarModule, TabMenuModule, TooltipModule, FileUploadModule,  DropdownModule, FormsModule,InplaceModule
  ],
  exports:[FieldPipe],
  providers: [
    BenchSalesService
  ]
})
export class BenchSalesModule { }
