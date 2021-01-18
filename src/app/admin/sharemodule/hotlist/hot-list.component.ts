import { Component, TemplateRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareRestService } from '../share-rest.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { jsPDF } from 'jspdf';
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
  selector: 'share-hotlist-list',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService],

  templateUrl: './hot-list.component.html',
  styleUrls: ['./hot-list.component.scss']
})
export class HotListBenchComponent implements OnInit {

  products: any[];

  selectedProducts: any[];
  loading: boolean = true;
  constructor(private confirmation: ConfirmationService, private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private userRest: ShareRestService,
    private router: Router) { }

  cols: any[];
  colsex: any[];
  exportColumns: any[];

  ngOnInit() {
    this.userRest.getConsultants().subscribe(
      (response) => { console.log(this.products = response.timesheet); this.loading = false; },
      (error) => { console.log(error) }
    );

    this.colsex = [

      { field: 'consultatName', header: 'Name' },
      { field: 'technology', header: 'Technology' },
      //   { field: 'consultatMobileNumber', header: 'MobileNumber' },
      //  { field: 'consultantEmail', header: 'Email' },
      { field: 'experience', header: 'Experience' },
      { field: 'state', header: 'State' },
      { field: 'willingLocation', header: 'Relocate', width: '20%', editable: false },
      { field: 'visaType', header: 'Visa Type', width: '20%', editable: false },

    ];
    this.cols = [

      { field: 'consultatName', header: 'Name' },
      { field: 'technology', header: 'Technology' },
      //   { field: 'consultatMobileNumber', header: 'MobileNumber' },
      //  { field: 'consultantEmail', header: 'Email' },
      { field: 'experience', header: 'Experience' },
      { field: 'state', header: 'State' },
      { field: 'willingLocation', header: 'Relocate', width: '20%', editable: false },
      { field: 'visaType', header: 'Visa Type', width: '20%', editable: false },

    ];

    this.exportColumns = this.colsex.map(


      col => (

        { title: col.header, dataKey: col.field }

      )

    );
  }

  exportPdf() {

    //const doc = new jsPDF();
    const doc = new jsPDF('p', 'pt');
    doc['autoTable'](this.exportColumns, this.products);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("webmobilezhotlist.pdf");
  }


}
