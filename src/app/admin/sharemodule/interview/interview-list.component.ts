import { Component, TemplateRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ShareRestService } from '../share-rest.service';
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
  selector: 'share-interview-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService],

  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  interviewschedules: Array<object> = [];
  confirmDropDatabaseDialogVisible = false;
  frozenCols: any[];
  statuses: any[];
  loading: boolean = true;
  scrollableCols: any[];
  clonedProducts: { [s: string]: any; } = {};
  constructor(private confirmation: ConfirmationService, private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: ShareRestService,
    private router: Router) { }

  ngOnInit() {

    this.userRest.getInterviewConsultants().subscribe(
      (response) => { console.log(this.interviewschedules = response.submissions); this.loading = false; },
      (error) => { console.log(error) }
    );

    this.scrollableCols = [
      // { field: 'user_details.name', header: 'Created By', width: '20%',editable: false},
      // { field: 'consultant.consultatName', header: 'Consultant Name', width: '20%',editable: false},
      // { field: 'scheduleDate', header: 'Shedule Date', width: '20%',editable: false},
      { field: 'vendorStatus', header: 'Status', width: '40%', editable: true },
      { field: 'vendorCompanyName', header: 'Company Name', width: '20%', editable: false },
      { field: 'endClientName', header: 'End Client', width: '20%', editable: false },
      { field: 'consultant.technology', header: 'Technology', width: '20%', editable: false },
      { field: 'endClientLocation', header: 'Client Location', width: '20%', editable: false },
      { field: 'submissionRate', header: 'Submissio Rate', width: '20%', editable: true },
      { field: 'actualRate', header: 'Actual Rate', width: '20%', editable: true },


    ];

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

  createPortal(event: Event,index:number) {
    if (event.defaultPrevented) return;
    event.preventDefault();

    this.confirmation.confirm({
      key: 'confirm-drop-database',
      message: 'Are you sure to Create Employee Login',
      accept: () => { this._createPortal(index); },
    });
  }
  private _createPortal(index) {
    const formData = new FormData();
    formData.append("index",index );
    console.log(formData);
    this.userRest.createEmployeePortal(formData).subscribe(
      (response) => { console.log(response); this.loading = false;
        this.interviewschedules = response.submissions;
      },
      (error) => { console.log(error) }
    );

  }
  getColor(status: string, adminStatus: string) {

    if (status == "Placed") {
      return "#d4edda"
    }
  }
}
