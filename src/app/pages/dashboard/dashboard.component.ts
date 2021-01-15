import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  menuexpectedrole:string;

  ngOnInit() {

    this.menuexpectedrole = localStorage.getItem('role');
    console.log(this.menuexpectedrole)

  }

}
