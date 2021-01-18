import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'benchsales-user-index',
  templateUrl: './benchsales-index.component.html',
  styleUrls: ['./benchsales-index.component.scss']
})
export class BenchsalesIndexComponent implements OnInit {
  userList: Array<object> = [];
  timeSheets: Array<object> = [];
    statuses: any[];
    loading: boolean = true;
  constructor(private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {


  }

}
