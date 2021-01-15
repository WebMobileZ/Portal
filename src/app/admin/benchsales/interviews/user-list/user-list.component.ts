import { Component,  TemplateRef, OnInit, ViewChild, Output, EventEmitter,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { Table } from 'primeng/table';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
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
  selector: 'app-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService,ConfirmationService],

  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class InterviewBenchComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  timeSheets: Array<object> = [];
  confirmDropDatabaseDialogVisible = false;
statusOptions = [
   // {label: "Dot net Developer",value: 'Dot net Developer'},
    {label: "Java Developer",value: 'Java Developer'},
    {label: "QA Tester/QA Analyst",value: 'QA Tester/QA Analyst'},
  //  {label: "Devops Engineer",value: 'Devops Engineer'}
];;
  frozenCols: any[];
  statuses: any[];
  loading: boolean = true;
  scrollableCols: any[];
  clonedProducts: { [s: string]: any; } = {};
  constructor( private confirmation: ConfirmationService,private fb: FormBuilder,private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
     private router: Router) { }

  ngOnInit() {



    this.userRest.getConsultants().subscribe(
      (response) => { console.log(this.timeSheets = response.submissions); this.loading = false; },
      (error) => { console.log(error) }
    );
    this.frozenCols = [
      { field: 'consultatName', header: 'Name' },
  ];
  this.scrollableCols = [
   // { field: 'user_details.name', header: 'Created By', width: '20%',editable: false},
   // { field: 'consultant.consultatName', header: 'Consultant Name', width: '20%',editable: false},
   // { field: 'scheduleDate', header: 'Shedule Date', width: '20%',editable: false},
   { field: 'vendorCompanyName', header: 'Company Name', width: '20%', editable: false },
   { field: 'endClientName', header: 'End Client', width: '20%', editable: false },
   { field: 'consultant.technology', header: 'Technology', width: '20%', editable: false },
   { field: 'endClientLocation', header: 'End Client', width: '20%', editable: false },
   { field: 'submissionRate', header: 'Submissio Rate', width: '20%', editable: true },
   { field: 'actualRate', header: 'Actual Rate', width: '20%', editable: true },
   { field: 'vendorStatus', header: 'Status', width: '40%', editable: true },


];



  this.statuses = [
      {label: 'Unqualified', value: 'unqualified'},
      {label: 'Qualified', value: 'qualified'},
      {label: 'New', value: 'new'},
      {label: 'Negotiation', value: 'negotiation'},
      {label: 'Renewal', value: 'renewal'},
      {label: 'Proposal', value: 'proposal'}
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


getColor (status:string)
{
  if(status=="Placed")
  {
    return "#d4edda"
  }
}
}
