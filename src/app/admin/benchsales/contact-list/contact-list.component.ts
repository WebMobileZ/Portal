import { Component, TemplateRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BenchsalesRestService } from '../benchsales-rest.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'contact-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService],

  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  products: any[];

  selectedProducts: any[];

  constructor(private confirmation: ConfirmationService, private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: BenchsalesRestService,
    private router: Router) { }

  cols: any[];

  loading: boolean = true;
  exportColumns: any[];

  ngOnInit() {
    this.userRest.getVendorContacts().subscribe(
      (response) => { console.log(this.products = response.contacts); this.loading = false; },
      (error) => { console.log(error) }
    );


    this.cols = [

      { field: 'contactName', header: 'Name' },
      { field: 'contactMobile', header: 'Mobile Number' },
      //   { field: 'consultatMobileNumber', header: 'MobileNumber' },
      //  { field: 'consultantEmail', header: 'Email' },
      { field: 'contactEmail', header: 'Email' },


    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }






}
