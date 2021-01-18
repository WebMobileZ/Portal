
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonAuthService } from 'app/auth/common-auth.service';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  childMenu: Array<object>;
}

export const ROUTES: RouteInfo[] = [


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
// ];

@Component({

  selector: 'sidebar-cmp',
  styles: ['.pd-top { padding-top: 17px; } .txt-color{ color:#d94c27} .logo img{ width:160px; } .ui-menubar-root-list{ padding-top:9px !important; } .ui-menubar	 {  mouseover: #ff0000; background-color: #A80000;}.ui-state-hover {cursor:hand;}'],

  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  calculatorModal: boolean;
  calculatorModal1: boolean;
  menuexpectedrole: string;
  public menuItems: any[];
  commonmenu: any;
  benchsaleMenu: MenuItem[];
  items: MenuItem[];
  adminMenu: MenuItem[];
  defaultmenu: MenuItem[];
  headHunderMenu: MenuItem[];
  headHunterAdminMenu: MenuItem[];
  jobMenu: MenuItem[];
  num1: number = 52;
  num2: number = 20;
  public AdminmenuItems: any[];
  clock = ""
  clockHandle;
  constructor(private router: Router, private auth: CommonAuthService) {

  }
  showCalculator() {
    this.calculatorModal = true;
  }
  showCalculator1() {
    this.calculatorModal1 = true;
  }
  ConvertToInt(val) {
    return parseFloat(val);
  }
  ngOnInit() {
    this.commonmenu =
    {
      icon: 'pi pi-fw pi-power-off',
      label: 'My Account',
      items: [
        { label: 'Profile', routerLink: "/profile" },
        {
          label: 'logout', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.logout()
          }
        },
      ]
    };
    this.adminMenu = [
      {

        label: 'Submissions',
        // routerLink: "/benchsales/list",
        items: [
          { label: 'Add Submissions', routerLink: "/benchsales/create" },
          { label: 'Schedule Interviews', routerLink: "/commonmodule/interviews" },
          { label: 'All Submissions', routerLink: "/benchsales/list" },
          { label: 'Send Email', routerLink: "/superadmin/email" },

        ]

      },
      {
        label: 'Consultants',
        routerLink: "/headadminconsultants/list",

      },
      {

        label: 'Jobs',
        routerLink: "/jobs/list",

      },
      {
        label: 'Employee Documents',
        items: [
          { label: 'Document List', routerLink: "/superadmin/documents" },
          { label: 'In Active Docs', routerLink: "/superadmin/documentsinactive" },
          { label: 'Placed Docs', routerLink: "/superadmin/documentsplaced" },
          { label: 'Hot List', routerLink: "/commonmodule/hotlist" },
        ]

      },
      {
        label: 'Users',
        routerLink: "/superadmin/userlist",

      },
      this.commonmenu
      // {
      //   label: 'Calculations',
      //   items: [

      //       { label: 'Percentage', command: (event) => {
      //       //event.originalEvent: Browser event
      //       //event.item: menuitem metadata
      //       this.calculatorModal = true;

      //       },

      //       },
      //       // { label: 'Calculator', command: (event) => {
      //       //   //event.originalEvent: Browser event
      //       //   //event.item: menuitem metadata
      //       //   this.calculatorModal1 = true;

      //       //   },

      //         //},

      //   ]
      // },


    ];

    this.benchsaleMenu = [
      {

        label: 'Submissions',
        // routerLink: "/benchsales/list",
        items: [
          { label: 'Add Submissions', routerLink: "/benchsales/create" },
          { label: 'My Submissions', routerLink: "/benchsales/mylist" },
          { label: 'Schedule Interviews', routerLink: "/commonmodule/interviews" },
          { label: 'All Submissions', routerLink: "/benchsales/list" },
          { label: 'All Contacts', routerLink: "/benchsales/contacts" },
        ]

      },

      {
        icon: 'pi pi-fw pi-file-o',
        label: 'Documents',
        routerLink: "/benchsales/documentlist",

      }, {

        label: 'HotList',
        routerLink: "/commonmodule/hotlist",

      }, this.commonmenu

    ];
    this.headHunterAdminMenu = [
      {

        label: 'Consultants',
        items: [
          { label: 'Consultants List', routerLink: "/headadminconsultants/list" },
          { label: 'Add Consultant', routerLink: "/headadminconsultants/create" },
        ]
      }, {

        label: 'HotList',
        routerLink: "/commonmodule/hotlist",

      }, this.commonmenu

    ];
    this.headHunderMenu = [
      {

        label: 'Consultants',
        items: [
          { label: 'Consultants List', routerLink: "/huntersconsultants/list" },
          { label: 'Add Consultant', routerLink: "/huntersconsultants/create" },
        ]
      }


    ];
    this.jobMenu = [
      {

        label: 'Jobs',
        items: [
          { label: 'Jobs', routerLink: "/jobs/list" },

        ]
      }

    ];
    this.clockHandle = setInterval(() => {
      this.clock = new Date().toLocaleString();
    }, 1000);


    this.menuexpectedrole = localStorage.getItem('role');
    console.log(this.menuexpectedrole)
    if (this.menuexpectedrole == 'Admin') {
      // this.menuItems = AdminROUTES.filter(menuItem => menuItem);
      this.items = this.adminMenu;
      console.log(this.adminMenu)
    } else if (this.menuexpectedrole == 'HeadHunters') {
      this.headHunderMenu;
      // this.menuItems = HeadHunterROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'Recruiters') {
      this.benchsaleMenu;
      //  this.menuItems = RecruitersROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'BenchSales') {
      this.items = this.benchsaleMenu;
      //   this.menuItems = BenchSalesROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'HeadHuntersAdmin') {
      this.items = this.headHunterAdminMenu;
      //  this.menuItems = headhuntersAdminROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'Accountmanager') {
      this.jobMenu;
      // this.menuItems = AccountsROUTES.filter(menuItem => menuItem);
    } else {

      this.defaultmenu;
      //  this.menuItems = ROUTES.filter(menuItem => menuItem);
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
