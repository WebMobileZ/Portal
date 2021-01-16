import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserRestService } from './user-rest.service';
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
  import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropdownModule } from 'primeng/dropdown';
import {InplaceModule} from 'primeng/inplace';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { DocumentsInactiveComponent } from './documents-inactive/documents-list.component';
import { DocumentsPlacedComponent } from './documents-placed/documents-placed.component';
import { ConsultantListComponent } from './consultants/consultant-list/consultant-list.component';
import { ConsultantCreateComponent } from './consultants/consultant-create/consultant-create.component';
import { ConsultantEditComponent } from './consultants/consultant-edit/consultant-edit.component';
import { BenchListComponent } from './benchsales/user-list/user-list.component';
import { BenchCreateComponent } from './benchsales/user-create/user-create.component';
import { InterviewComponent } from './interviews/user-list/user-list.component';
import { HotListComponent } from './hotlist/user-list/user-list.component';
import { FieldPipe } from '../../field.pipe';
import { EmailCreateComponent} from './email/email-create/email-create.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {ChipsModule} from 'primeng/chips';
import { ReplaceAdminPipe } from '../../replaceadmin-pipe';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [UserIndexComponent,FieldPipe,ReplaceAdminPipe, UserCreateComponent, UserEditComponent,UserListComponent,DocumentsListComponent,ConsultantListComponent,ConsultantCreateComponent,ConsultantEditComponent,
    BenchListComponent,BenchCreateComponent,EmailCreateComponent,HotListComponent,InterviewComponent,DocumentsInactiveComponent,DocumentsPlacedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,AngularEditorModule,
    ReactiveFormsModule, TableModule, MultiSelectModule, DynamicDialogModule,ConfirmDialogModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    CardModule,
    ProgressBarModule, ChipsModule,TabMenuModule, TooltipModule, NgxDropzoneModule, DropdownModule, FormsModule,InplaceModule
  ],
  providers: [
    UserRestService
  ]
})
export class SuperAdminModule { }
