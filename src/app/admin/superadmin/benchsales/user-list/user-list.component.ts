import { Component, TemplateRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { Table } from 'primeng/table';
import { FormGroup, FormControlName, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { event } from 'jquery';

@Component({
  selector: 'app-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class BenchListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  submissions: Array<object> = [];
  cities: SelectItem[]
  statusesVendor: SelectItem[]
  selectedCity: any
  selectedStatus: any;
  displayModal: boolean;
  displayModal1: boolean;
  comment: any;
  totalRecords: number;
  frozenCols: any[];
  statuses: any[];
  cols: any[];
  loading: boolean = true;
  registerVendor: FormGroup;
  submissionId: number;
  scrollableCols: any[];
  serverErrors = [];
  heading1: any;
  lastLazyEvent:any;
  clonedProducts: { [s: string]: any; } = {};
  constructor(private confirmation: ConfirmationService, private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
    private router: Router) { }

  clearFilters(dt) {
    // reset the table
    dt.reset();
    this.selectedCity = '';
    this.selectedStatus='';
  }

  loadSubmissionLazy(event: LazyLoadEvent) {
    this.lastLazyEvent = event;
    this.loading = true;
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    //imitate db connection over a network
    setTimeout(() => {
      this.userRest.getConsultants((event)).subscribe(
        (response) => {
          console.log(this.submissions = response.submissions.data);
          this.totalRecords = response.submissions.total;
          this.loading = false;
        },
        (error) => { console.log(error) }
      );
    }, 1000);
  }

  ngOnInit() {
    this.cities = [];
    this.statusesVendor = [{ label: 'Select Status', value: null },
    { label: 'Interview scheduled', value: 'Interview scheduled' },
    { label: 'Submitted to Client', value: 'Submitted to Client' },
    { label: 'Submitted to Vendor', value: 'Submitted to Vendor' }
      , { label: 'Disqualified', value: 'Disqualified' },
    { label: 'Client rejected', value: 'Client rejected' },
    { label: 'Vendor Rejected', value: 'Vendor Rejected' },
    { label: 'Vendor screening call', value: 'Vendor screening call' },
    { label: 'Waiting for Evaluation', value: 'Waiting for Evaluation' },
    { label: 'Placed', value: 'Placed' }
    ];
    this.userRest.getConsultantsOnly().subscribe(
      (response) => {
        this.cities = response.submissions;
      },
      (error) => { console.log(error) }
    );
    this.registerVendor = new FormGroup({
      'vendorStatus': new FormControl(''),
      'vendorComments': new FormControl(''),
      'scheduleDate': new FormControl(''),
      'timezone': new FormControl(''),
    });
    this.frozenCols = [
      { field: 'consultatName', header: 'Name' },
    ];
    this.scrollableCols = [
      //{ field: 'user_details.name', header: 'Created By', width: '20%', editable: false },
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
      //{ field: 'vendorComments', header: 'Comments', width: '40%',editable: true },

    ];
    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ]
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

  onRepresentativeChange(event) {
    if (event.value) {
      console.log(event.value)
      this.table.filter(event.value, 'technology', 'in')
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
        this.submissions = response.timesheet;
      },
      (error) => { console.log(error) }
    );

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
        this.loadSubmissionLazy( this.lastLazyEvent )
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Submision Updated' });
       // this.submissions = response.submissions.data;

      },
      error => {
        this.serverErrors = error.error.errors
      }
    );

  }
  getColor(status: string) {

    if (status == "Placed") {
      return "#d4edda"
    }
  }
}
