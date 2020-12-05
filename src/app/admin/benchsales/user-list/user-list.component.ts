import { Component, TemplateRef, OnInit, Pipe, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BenchSalesService } from '../benchsales-rest.service';
import { Table } from 'primeng/table';
import { FormGroup, FormControlName, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Product } from '../../consultants/product';
import { LazyLoadEvent } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  providers: [MessageService, ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  benchsales: Array<object> = [];
  displayModal: boolean;
  displayModal1: boolean;
  comment: any;
  confirmDropDatabaseDialogVisible = false;
  frozenCols: any[];
  statuses: any[];
  totalRecords: number;
  cols: any[];
  loading: boolean = true;
  registerVendor: FormGroup;
  submissionId: number;
  scrollableCols: any[];
  serverErrors = [];
  heading1: any;
  constructor(private confirmation: ConfirmationService, private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: BenchSalesService,
    private router: Router) { }
  ngOnInit() {
    this.registerVendor = new FormGroup({
      'vendorStatus': new FormControl(''),
      'vendorComments': new FormControl(''),
      'scheduleDate': new FormControl(''),
      'timezone': new FormControl(''),
    });
    this.userRest.getConsultants().subscribe(
      (response) => {
        console.log(this.benchsales = response.submissions);
        this.totalRecords = this.benchsales.length;
        this.loading = false;
      },
      (error) => { console.log(error) }
    );
    this.scrollableCols = [
      { field: 'user_details.name', header: 'Created By', width: '20%', editable: false },
      { field: 'consultant.consultatName', header: 'Consultant Name', width: '20%', editable: false },
      { field: 'vendorStatus', header: 'Status', width: '40%', editable: true },
      { field: 'consultant.technology', header: 'Technology', width: '20%', editable: false },
      { field: 'vendorCompanyName', header: 'Company Name', width: '20%', editable: false },
      { field: 'vendorName', header: 'Vendor Name', width: '20%', editable: false },
      { field: 'vendorEmail', header: 'Vendor Email', width: '20%', editable: false },
      { field: 'vendorMobileNumber', header: 'Vendor Mobile', width: '20%', editable: false },
      { field: 'endClientName', header: 'End Client Name', width: '20%', editable: false },
      { field: 'actualRate', header: 'Actual Rate', width: '20%', editable: true },
      { field: 'submissionRate', header: 'Submissio Rate', width: '20%', editable: true },

    ];

  }

  showModalDialog(data: any) {
    console.log(data)
    this.heading1 = data.consultant.consultatName + " submiting to " + data.vendorCompanyName;
    this.displayModal = true;
    this.submissionId = data.vendorId;
    this.registerVendor.patchValue({
      vendorComments: data.vendorComments,
      vendorStatus: data.vendorStatus,
      timezone: data.timezone,
      scheduleDate: this.formatDate(data.scheduleDate),
      // formControlName2: myValue2 (can be omitted)
    });
  }

  showModalDialog1(data: any) {
    this.displayModal1 = true;
    this.comment = data;
  }

  formatDate(date) {
    if (date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    } else {
      const d = new Date();
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }
  }


  dropDatabase(event: Event, index: number) {
    if (event.defaultPrevented) return;
    event.preventDefault();

    this.confirmation.confirm({
      key: 'confirm-drop-database',
      message: 'Are you sure to Aprove for Hotlist',
      accept: () => { this._dropDatabase(index); },
    });
  }

  private _dropDatabase(index) {
    const formData = new FormData();
    formData.append("index", index);
    console.log(formData);
    this.userRest.statusChangeConsultant(formData).subscribe(
      (response) => {
        console.log(response); this.loading = false;
        this.benchsales = response.timesheet;
      },
      (error) => { console.log(error) }
    );

  }
  editUser(id: number) {
    this.router.navigate(['jobs/edit', id]);
  }
  getColor(status: string, adminStatus: string) {
    if (adminStatus == "A") {
      return "#d4edda"
    } else if (status == "not interested") {
      return "#f8d7da"
    }
  }
  get vendorStatus() { return this.registerVendor.get('vendorStatus'); }
  get vendorComments() { return this.registerVendor.get('vendorComments'); }
  get scheduleDate() { return this.registerVendor.get('scheduleDate'); }
  get timezone() { return this.registerVendor.get('timezone'); }
  registerUser(submissionId: number) {
    console.log(this.registerVendor);

    this.userRest.updateSubmission(this.registerVendor, submissionId).subscribe(
      response => {
        this.displayModal = false;
        console.log(response),
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Submision Updated' });
        this.benchsales  = response.submissions;
      },
      error => {
        this.serverErrors = error.error.errors
      }
    );
  }
}
