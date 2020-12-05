import { Component, TemplateRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { Representative } from '../../../customer';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Product } from '../../consultants/product';


@Component({
  selector: 'app-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],

})
export class UserListComponent implements OnInit {
  @ViewChild('dt', { static: true }) table: Table;
  timeSheets: Product[];
  confirmDropDatabaseDialogVisible = false;
  products: Product[];
  _selectedColumns: any[];
  loading: boolean = true;
  scrollableCols: any[];
  constructor(private confirmation: ConfirmationService, private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
    private router: Router) { }

  ngOnInit() {
    this.userRest.getProductsSmall().then(data => {
       this.timeSheets = data; console.log("data");
       this.loading =false;
        console.log(data)
       });

    this.scrollableCols = [
      { field: 'name', header: 'Consultant Name', width: '20%', editable: true },
      { field: 'consultantEmail', header: 'Email', width: '40%', editable: true },
      { field: 'consultatMobileNumber', header: 'Phone number', width: '20%', editable: true },
      { field: 'experience', header: 'Exp', width: '20%', editable: true },

    ];

    this._selectedColumns = this.scrollableCols;

  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.scrollableCols.filter(col => val.includes(col));
  }

  getColor(status: string, adminStatus: string) {
    if (adminStatus == "A") {
      return "#d4edda"
    } else if (status == "not interested") {
      return "#f8d7da"
    }
  }
}
