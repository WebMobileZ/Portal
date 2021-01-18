import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-share-index',
  templateUrl: './share-index.component.html',
  styleUrls: ['./share-index.component.scss']
})
export class ShareIndexComponent implements OnInit {
  userList: Array<object> = [];
  timeSheets: Array<object> = [];
    statuses: any[];
    loading: boolean = true;
  constructor(private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {


  }

}
