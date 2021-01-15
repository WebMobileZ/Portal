import { Component, TemplateRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { Representative } from '../../../customer';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormControlName, Validators } from '@angular/forms';
import { FilterUtils } from 'primeng/components/utils/filterutils';
import { LazyLoadEvent } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';
@Component({
  selector: 'app-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],

})
export class UserListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  @ViewChild('myTable', { static: true }) private _table: Table;
  cities: any[];
  selectedCities: any[];
  totalRecords: number;

  timeSheets: any[];
  dateFilters: any;
  confirmDropDatabaseDialogVisible = false;
  products: any[];
  registerForm: FormGroup;
  _selectedColumns: any[];
  loading: boolean = true;
  scrollableCols: any[];
  constructor(private confirmation: ConfirmationService, private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
    private router: Router) { }

  ngOnInit() {

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];



    this.scrollableCols = [
      //    { field: 'created_at', header: 'Date', width: '20%', editable: true },
      { field: 'consultatName', header: 'Consultant Name', width: '20%', editable: true },
      { field: 'consultantEmail', header: 'Email', width: '40%', editable: true },
      { field: 'consultatMobileNumber', header: 'Phone number', width: '20%', editable: true },
      { field: 'experience', header: 'Exp', width: '20%', editable: true },

    ];

    this._selectedColumns = this.scrollableCols;


  }
  onDateSelect(value) {
    this._table.filter(this.formatDate(value), 'date', 'equals')
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.scrollableCols.filter(col => val.includes(col));
  }
  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
console.log(event)
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
      this.userRest.getProductsSmallpagination(event.first/20).subscribe(
        (response) => { console.log(this.timeSheets = response.timesheet.data);
          this.totalRecords = response.timesheet.total;
          this.loading = false;

        },
        (error) => { console.log(error) }
      );

    }, 1000);
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

  getColor(status: string, adminStatus: string) {
    if (adminStatus == "A") {
      return "#d4edda"
    } else if (status == "not interested") {
      return "#f8d7da"
    }
  }
}
