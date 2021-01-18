import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenchSalesRoutingModule } from './benchsales-routing.module';
import { BenchsalesIndexComponent } from './benchsales-index/benchsales-index.component';
import { BenchsalesListComponent } from './benchsales-list/benchsales-list.component';
import { MyBenchSalesComponent } from './mybenchsales/mybenchsales-list.component';
import { BenchsalesCreateComponent } from './benchsales-create/benchsales-create.component';

import { BenchsalesRestService } from './benchsales-rest.service';
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
import { InplaceModule } from 'primeng/inplace';
import { FieldPipe1 } from '../../field1.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DocumentBenchListComponent } from './documents/documents-list/documents-list.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InputMaskModule } from 'primeng/inputmask';
import { ReplacePipe } from '../../replace-pipe.pipe';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [BenchsalesIndexComponent, BenchsalesListComponent, ReplacePipe, BenchsalesCreateComponent,
    FieldPipe1, DocumentBenchListComponent, ContactListComponent, MyBenchSalesComponent],
  imports: [
    CommonModule,
    BenchSalesRoutingModule,
    ReactiveFormsModule, TableModule, MultiSelectModule, CalendarModule, VirtualScrollerModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule, ConfirmDialogModule, InputMaskModule,

    ProgressBarModule, TabMenuModule, TooltipModule, FileUploadModule, NgxDropzoneModule, DropdownModule, FormsModule, InplaceModule
  ],
  providers: [
    BenchsalesRestService
  ]
})
export class UserModule { }
