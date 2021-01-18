import { Component, TemplateRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperAdminRestService } from '../superadmin-rest.service';
import { Representative } from '../../../customer';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ScrollableView } from 'primeng/table';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService],

  templateUrl: './documents-placed.component.html',
  styleUrls: ['./documents-placed.component.scss']
})
export class DocumentsPlacedComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  timeSheets: Array<object> = [];
  displayModal: boolean;
  displayModal1: boolean;
  displayModalVendor: boolean;
  representatives: Representative[];
  confirmDropDatabaseDialogVisible = false;
  registerVendor: FormGroup;
  statusOptions = [
    // {label: "Dot net Developer",value: 'Dot net Developer'},
    { label: "Java Developer", value: 'Java Developer' },
    { label: "QA Tester/QA Analyst", value: 'QA Tester/QA Analyst' },
    //  {label: "Devops Engineer",value: 'Devops Engineer'}
  ];;
  frozenCols: any[];
  statuses: any[];
  loading: boolean = true;
  scrollableCols: any[];
  valuenote: any;
  submissionId: number;
  clonedProducts: { [s: string]: any; } = {};
  public showDialog: boolean

  public data = [];
  constructor(private confirmation: ConfirmationService, private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: SuperAdminRestService,
    private router: Router) { }
  showModalDialog(data) {
    this.displayModal = true;
    this.submissionId = data.reportId;
    this.registerVendor.patchValue({
      priority: data.priority,
      wStatus: data.wStatus,
      note: data.note,
    });

  }
  showModalDialog1(value: any) {
    console.log(value)
    this.displayModal1 = true;
    this.valuenote = value
  }
  showModalDialogVendor(data: any) {
    this.showDialog = true;
    this.userRest.EditDocument(data.reportId).subscribe(
      (response) => { console.log(this.data = response.submissions); this.loading = false; },
      (error) => { console.log(error) }
    );

    //  this.displayModalVendor = true;
  }
  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
  getIntervIew(index) {
    let count = 0;
    const formData = new FormData();
    formData.append("index", index);
    console.log(formData);
    this.userRest.getTotalInterviewShecdules(formData).subscribe(
      (response) => {
        console.log(response); this.loading = false;
        count = response.interviews;
      },
      (error) => { console.log(error) }
    );
    return count;
  }
  ngOnInit() {
    this.registerVendor = new FormGroup({
      'note': new FormControl(''),
      'wStatus': new FormControl(''),
      'priority': new FormControl(''),


    });
    this.userRest.getConsultantsPlaced().subscribe(
      (response) => { console.log(this.timeSheets = response.timesheet); this.loading = false; },
      (error) => { console.log(error) }
    );
    this.frozenCols = [
      { field: 'consultatName', header: 'Name' },
    ];

    this.scrollableCols = [
      // { field: 'consultatName', header: 'Consultant Name', width: '20%',editable: true},
      // { field: 'user_details.name', header: 'Created By', width: '20%',editable: false},
      // { field: 'created_at', header: 'Created At' , width: '20%',editable: false},
      { field: 'consultantEmail', header: 'Email', width: '40%', editable: true },
      { field: 'consultatMobileNumber', header: 'Phone number', width: '20%', editable: true },
      { field: 'experience', header: 'Exp', width: '20%', editable: true },
      { field: 'rate', header: 'Rate', width: '20%', editable: false },
      { field: 'technology', header: 'Technology', width: '20%', editable: false },
      { field: 'visaType', header: 'visa Type', width: '20%', editable: false },
      { field: 'city', header: 'City', width: '20%', editable: false },
      { field: 'state', header: 'State', width: '20%', editable: false },
      { field: 'willingLocation', header: 'Relocate', width: '20%', editable: false },
      { field: 'documentsCollected', header: 'Documents Collected', width: '20%', editable: false },
      //   { field: 'resource', header: 'Resource', width: '20%' ,editable: false},
      { field: 'ssn', header: 'Last 4 SSN', width: '20%', editable: false },
      //  { field: 'bestContactNumber', header: 'Best Contact Number', width: '20%',editable: false},
      //   { field: 'linkedInUrl', header: 'LinkedIn', width: '20%' ,editable: false},
      // { field: 'skypeId', header: 'skypeId', width: '20%',editable: false },
      //  { field: 'priority', header: 'priority', width: '20%' ,editable: false},
      //   { field: 'reportStatus', header: 'Status', width: '20%',editable: false }
    ];




  }
  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }




  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'created_at', 'equals')
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event) {
    if (event.value) {
      console.log(event.value)
      this.table.filter(event.value, 'technology', 'in')
    }

  }






  registerUser(submissionId: number) {
    this.userRest.updateConsultantStatus(this.registerVendor, submissionId).subscribe(
      response => {
        this.displayModal = false;
        console.log(response),
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Submision Updated' });
        this.timeSheets = response.timesheet;
      },
      error => {
        //  this.serverErrors = error.error.errors
      }
    );
  }

}
