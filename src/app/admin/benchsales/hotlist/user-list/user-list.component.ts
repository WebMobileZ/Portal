import { Component,  TemplateRef, OnInit, ViewChild, Output, EventEmitter,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';


import { FormBuilder,FormGroup,FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ConfirmationService } from 'primeng/api';
import  jsPDF from 'jspdf';
import "jspdf-autotable";


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
export class HotListBenchComponent implements OnInit {

  products: any[];

  selectedProducts: any[];
  loading: boolean = true;
  constructor( private confirmation: ConfirmationService,private fb: FormBuilder,private messageService: MessageService, private route: ActivatedRoute, private userRest: UserRestService,
    private router: Router) { }

  cols: any[];
  colsex:any[];
  exportColumns: any[];

  ngOnInit() {
    this.userRest.getConsultants().subscribe(
      (response) => { console.log(this.products = response.timesheet); this.loading=false; },
      (error) => { console.log(error) }
    );

    this.colsex = [

       { field: 'consultatName', header: 'Name' },
       { field: 'technology', header: 'Technology' },
    //   { field: 'consultatMobileNumber', header: 'MobileNumber' },
     //  { field: 'consultantEmail', header: 'Email' },
       { field: 'experience', header: 'Experience' },
       { field: 'state', header: 'State' },
       { field: 'willingLocation', header: 'Relocate', width: '20%',editable: false },
       { field: 'visaType', header: 'Visa Type', width: '20%',editable: false },

   ];
      this.cols = [

        { field: 'consultatName', header: 'Name' },
        { field: 'technology', header: 'Technology' },
       //   { field: 'consultatMobileNumber', header: 'MobileNumber' },
        //  { field: 'consultantEmail', header: 'Email' },
          { field: 'experience', header: 'Experience' },
          { field: 'state', header: 'State' },
          { field: 'willingLocation', header: 'Relocate', width: '20%',editable: false },
          { field: 'visaType', header: 'Visa Type', width: '20%',editable: false },

      ];

      this.exportColumns = this.colsex.map(


        col => (

          {title: col.header, dataKey: col.field}

          )

          );
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
      exportPdf() {

        //const doc = new jsPDF();
       const doc = new jsPDF('p','pt');
       doc['autoTable'](this.exportColumns, this.products);
       // doc.autoTable(this.exportColumns, this.products);
       doc.save("webmobilezhotlist.pdf");
     }


}
