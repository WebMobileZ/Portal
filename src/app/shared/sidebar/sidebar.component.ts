
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonAuthService } from 'app/auth/common-auth.service';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  childMenu: Array<object>;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '',
    childMenu: null
  },
  { path: '/profile', title: 'Your Profile', icon: 'nc-single-02', class: '', childMenu: null },

];
export const HeadHunterROUTES: RouteInfo[] = [
  {
    path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '',
    childMenu: null
  },
  { path: '/huntersconsultants/list', title: 'Consultants', icon: 'nc-calendar-60', class: '', childMenu: null },
  { path: '/hotlist/list', title: 'Hot List', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/profile', title: 'Your Profile', icon: 'nc-single-02', class: '', childMenu: null },

];
export const RecruitersROUTES: RouteInfo[] = [

  { path: '/recruiters/list', title: 'Consultant Submissions ', icon: 'nc-single-02', class: '', childMenu: null },

  { path: '/consultantdocuments/list', title: 'Documents', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/hotlist/list', title: 'Hot List', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/profile', title: 'Your Profile', icon: 'nc-single-02', class: '', childMenu: null },
];
export const BenchSalesROUTES: RouteInfo[] = [

  { path: '/benchsales/list', title: 'Consultant  Submissions', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/interviews/list', title: 'Schedule Interviews', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/consultantdocuments/list', title: 'Documents', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/contacts/list', title: 'Contact List', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/hotlist/list', title: 'Hot List', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/profile', title: 'Your Profile', icon: 'nc-single-02', class: '', childMenu: null },
];
export const AdminROUTES: RouteInfo[] = [
  { path: '/users/list', title: 'Users', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/consultants/list', title: 'Consultants', icon: 'nc-calendar-60', class: '', childMenu: null },

  // { path: '/consultants/inactivelist',        title: 'InActive Consultants', icon:'nc-calendar-60',  class: '' ,childMenu: null},
  { path: '/adminInDocuments/list', title: 'In Active List', icon: 'nc-calendar-60', class: '', childMenu: null },
  { path: '/admindocuments/list', title: 'Documents', icon: 'nc-calendar-60', class: '', childMenu: null },
  { path: '/hotlist/list', title: 'Hot List', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/interviews/list', title: 'Interviews', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/jobs/list', title: 'Jobs', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/profile', title: 'Your Profile', icon: 'nc-single-02', class: '', childMenu: null },
  //{ path: '/recruiters/list', title: 'Submissions', icon: 'nc-single-02', class: '', childMenu: null },


];
export const headhuntersAdminROUTES: RouteInfo[] = [
  { path: '/headadminconsultants/list', title: 'Consultant List', icon: 'nc-calendar-60', class: '', childMenu: null },
  { path: '/hotlist/list', title: 'Hot List', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/profile', title: 'Your Profile', icon: 'nc-single-02', class: '', childMenu: null },

];
export const AccountsROUTES: RouteInfo[] = [

  { path: '/jobs/list', title: 'Jobs', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/hotlist/list', title: 'Hot List', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/profile', title: 'Your Profile', icon: 'nc-single-02', class: '', childMenu: null },
];
// [
//     { path: '/users',         title: 'User List',         icon:'nc-bank',       class: '' },
//     { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
//     { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
//     { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
//     { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
//     { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
//     { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
//     { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' }
// ];HeadHuntersAdmin

@Component({

  selector: 'sidebar-cmp',
  styles: ['.pd-top { padding-top: 17px; } .txt-color{ color:#fff}'],

  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  menuexpectedrole: string;
  public menuItems: any[];
  public AdminmenuItems: any[];
  clock = ""
  clockHandle;
  constructor(private router: Router, private auth: CommonAuthService) {

  }
  ngOnInit() {
    this.clockHandle = setInterval(() => {
      this.clock = new Date().toLocaleString();
    }, 1000);
    this.menuexpectedrole = localStorage.getItem('role');
    console.log(this.menuexpectedrole)
    if (this.menuexpectedrole == 'Admin') {
      this.menuItems = AdminROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'HeadHunters') {
      this.menuItems = HeadHunterROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'Recruiters') {
      this.menuItems = RecruitersROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'BenchSales') {
      this.menuItems = BenchSalesROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'HeadHuntersAdmin') {
      this.menuItems = headhuntersAdminROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'Accountmanager') {
      this.menuItems = AccountsROUTES.filter(menuItem => menuItem);
    } else {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

  }
  logout() {
    let token = localStorage.getItem('token');
    this.auth.logout(token).subscribe(
      (resp) => {
        console.log("Logged Out Success");
        localStorage.clear();
        this.router.navigate(['/home/login']);
        console.log(resp);
      },
      (error) => {
        //this.router.navigate(['/home/login'])
        console.log("Logged Out with error");
      }
    );
  }
}
