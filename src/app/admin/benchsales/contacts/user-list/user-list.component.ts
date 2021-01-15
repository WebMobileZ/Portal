import { Component,  TemplateRef, OnInit, ViewChild, Output, EventEmitter,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import { Table } from 'primeng/table';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService,ConfirmationService],

  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class ContactListComponent implements OnInit {

  products: any[];

  selectedProducts: any[];

  constructor( private confirmation: ConfirmationService,private fb: FormBuilder,private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
    private router: Router) { }

  cols: any[];

  loading: boolean = true;
  exportColumns: any[];

  ngOnInit() {
    this.userRest.getVendorContacts().subscribe(
      (response) => { console.log(this.products = response.contacts); this.loading=false;  },
      (error) => { console.log(error) }
    );


      this.cols = [

          { field: 'contactName', header: 'Name' },
          { field: 'contactMobile', header: 'Mobile Number' },
       //   { field: 'consultatMobileNumber', header: 'MobileNumber' },
        //  { field: 'consultantEmail', header: 'Email' },
          { field: 'contactEmail', header: 'Email' },


      ];

      this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }


/*
  exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.products);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Consultants");
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      import("file-saver").then(FileSaver => {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data: Blob = new Blob([buffer], {
              type: EXCEL_TYPE
          });
          FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }); */



}
