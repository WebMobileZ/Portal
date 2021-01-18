import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './job-routing.module';
import { JobIndexComponent } from './job-index/job-index.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobRestService } from './job-rest.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { FileUploadModule } from 'primeng/fileupload';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropdownModule } from 'primeng/dropdown';
import {InplaceModule} from 'primeng/inplace';
import { FieldPipe2 } from '../../field2.pipe';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  declarations: [JobIndexComponent, JobListComponent,JobCreateComponent,JobEditComponent,FieldPipe2],
  imports: [
    CommonModule,  AngularEditorModule ,
    UserRoutingModule,
    ReactiveFormsModule,TableModule, MultiSelectModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,ConfirmDialogModule,
    ProgressBarModule, TabMenuModule, TooltipModule, FileUploadModule, NgxDropzoneModule, DropdownModule, FormsModule,InplaceModule
  ],
  providers: [
    JobRestService
  ]
})
export class JobModule { }
