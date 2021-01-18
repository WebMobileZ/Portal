import { Component, TemplateRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobRestService } from '../job-rest.service';
import { Representative } from '../../../customer';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';


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
  selector: 'job-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService],

  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  timeSheets: Array<object> = [];
  representatives: Representative[];
  confirmDropDatabaseDialogVisible = false;
  statusOptions = [
    // {label: "Dot net Developer",value: 'Dot net Developer'},
    { label: "Java Developer", value: 'Java Developer' },
    { label: "QA Tester/QA Analyst", value: 'QA Tester/QA Analyst' },
    //  {label: "Devops Engineer",value: 'Devops Engineer'}
  ];;
  frozenCols: any[];
  statuses: any[];
  jobTitle: string;
  jobDescription: any;
  jobLocation: string;
  client: string;
  workType: string;
  jobResponsibility: any;
  duration: any;
  loading: boolean = true;
  scrollableCols: any[];
  displayModal: boolean;
  clonedProducts: { [s: string]: any; } = {};
  constructor(private confirmation: ConfirmationService, private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: JobRestService,
    private router: Router) { }

  showModalDialog(data: any) {
    this.jobTitle = data.jobTitle;
    this.jobLocation = data.jobLocation;
    this.client = data.client;
    this.workType = data.workType;
    this.jobResponsibility = data.jobResponsibility;
    this.jobDescription = data.jobDescription;
    this.duration = data.duration;
    this.displayModal = true;
  }
  ngOnInit() {

    this.userRest.getConsultants().subscribe(
      (response) => { console.log(this.timeSheets = response.jobs); this.loading = false; },
      (error) => { console.log(error) }
    );
    this.frozenCols = [
      { field: 'consultatName', header: 'Name' },
    ];
    this.scrollableCols = [
      { field: 'user_details.name', header: 'Created By', width: '20%', editable: false },
      { field: 'jobTitle', header: 'Job Title', width: '20%', editable: true },
      //  { field: 'jobDescription', header: 'DESC', width: '40%',editable: true },
      { field: 'jobTechnology', header: 'Technology', width: '20%', editable: true },
      { field: 'jobExperience', header: 'Exp', width: '20%', editable: true },
      { field: 'jobLocation', header: 'Location', width: '20%', editable: false },
      { field: 'jobVisaType', header: 'Visa Type', width: '20%', editable: false },
      { field: 'jobStatus', header: 'Status', width: '20%', editable: false },

    ];

    this.representatives = [
      { name: "Dot net Developer" },
      { name: "Java Developer" },
      { name: "QA Tester/QA Analyst" },
      { name: "Devops Engineer" }

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
  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }
  onRowEditInit(product: any) {
    console.log(product)
    this.clonedProducts[product.reportId] = { ...product };
  }
  onRowEditSave(product: any, index: number) {
    //alert(product.timeSheetId)
    /*this.loading = true;
    if (product.duration < 16) {
      let updateUser: FormGroup;
      updateUser = new FormGroup({
        'duration': new FormControl(product.duration),
        'fromDate': new FormControl(product.fromDate),
        'assignment': new FormControl(product.assignment),
        'serviceCode': new FormControl(product.serviceCode),
      });
      this.userRest.updateTimeSheet(updateUser, product.timeSheetId).subscribe(
        (response) => {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet is updated' });
        },
        (error) => {
          console.log(error)
          this.loading = false;
          this.timeSheets[index] = this.clonedProducts[product.timeSheetId];
          delete this.timeSheets[product.timeSheetId];
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        },
        () => console.log('completed')
      );

    }
    else {
      this.loading = false;
      this.timeSheets[index] = this.clonedProducts[product.timeSheetId];
      delete this.timeSheets[product.timeSheetId];
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Duration only 15 hours accepted' });
    } */
  }

  onRowEditCancel(product: any, index: number) {
    this.timeSheets[index] = this.clonedProducts[product.reportId];
    delete this.timeSheets[product.reportId];
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
        this.timeSheets = response.timesheet;
      },
      (error) => { console.log(error) }
    );

  }
  download(event: Event, url: any) {

    window.open('https://portal.webmobilez.com/public/storage/' + url);

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
  viewUser(id: number) {
    alert()
  }
}
