import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareRoutingModule } from './share-routing.module';
import { ShareIndexComponent } from './shareindex/share-index.component';
import { ShareRestService } from './share-rest.service';
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
import { FieldPipeShare } from '../../fieldshare.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InterviewListComponent } from './interview/interview-list.component';
import { HotListBenchComponent } from './hotlist/hot-list.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InputMaskModule } from 'primeng/inputmask';
import { SharePipe } from '../../share-pipe.pipe';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ShareIndexComponent, SharePipe,
    FieldPipeShare, HotListBenchComponent, InterviewListComponent],
  imports: [
    CommonModule,
    ShareRoutingModule,
    ReactiveFormsModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    VirtualScrollerModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ConfirmDialogModule,
    InputMaskModule,
    ProgressBarModule,
    TabMenuModule,
    TooltipModule,
    FileUploadModule,
    NgxDropzoneModule,
    DropdownModule,
    FormsModule,
    InplaceModule
  ],
  providers: [
    ShareRestService
  ]
})
export class ShareModule { }
