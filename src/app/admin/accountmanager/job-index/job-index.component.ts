import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'accountmanager-job-index',
  templateUrl: './job-index.component.html',
  styleUrls: ['./job-index.component.scss']
})
export class JobIndexComponent implements OnInit {
  userList: Array<object> = [];
  timeSheets: Array<object> = [];
    statuses: any[];
    loading: boolean = true;
  constructor(private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {


  }

}
