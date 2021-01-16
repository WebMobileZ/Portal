
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
  {
    path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '',
    childMenu: null
  },
  { path: '/profile', title: 'Your Profile', icon: 'nc-single-02', class: '', childMenu: null },

];

export const RecruitersROUTES: RouteInfo[] = [

  { path: '/recruiters/list', title: 'Submissions ', icon: 'nc-single-02', class: '', childMenu: null },

  { path: '/consultantdocuments/list', title: 'Employee Documents', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/hotlist/list', title: 'Hot List', icon: 'nc-single-02', class: '', childMenu: null },
  { path: '/profile', title: 'Your Profile', icon: 'nc-single-02', class: '', childMenu: null },
];


export const headhuntersAdminROUTES: RouteInfo[] = [
  { path: '/headadminconsultants/list', title: 'Consultant List', icon: 'nc-calendar-60', class: '', childMenu: null },
  { path: '/headadminconsultants/hotlist', title: 'Hot List', icon: 'nc-single-02', class: '', childMenu: null },
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
  styles: ['.pd-top { padding-top: 17px; } .txt-color{ color:#d94c27} .logo img{ width:160px; } .ui-menubar-root-list{ padding-top:9px !important; } .ui-menubar	 {  mouseover: #ff0000; background-color: #A80000;}.ui-state-hover {cursor:hand;}'],

  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  calculatorModal: boolean;
  calculatorModal1: boolean;
  menuexpectedrole: string;
  public menuItems: any[];
  items: MenuItem[];
  benchsaleMenu : MenuItem[];
  adminMenu : MenuItem[];
  headHunderMenu : MenuItem[];

  headHunterAdminMenu : MenuItem[];
  jobMenu : MenuItem[];
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
    this.items = [
      {
        icon: 'pi pi-fw pi-power-off',
        label: 'My Account',
        items: [
          { label: 'Profile', routerLink: "/profile" },
          { label: 'logout', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.logout()
        }},
        ]
      },

    ];
    this.adminMenu = [
      {

        label: 'Submissions',
       // routerLink: "/benchsales/list",
        items: [
          { label: 'Add Submissions', routerLink: "/superadmin/sumissioncreate" },
          { label: 'Schedule Interviews',  routerLink: "/superadmin/interviews" },
          { label: 'All Submissions',  routerLink: "/superadmin/sumissionlist" },
          { label: 'Send Email',  routerLink: "/superadmin/email" },

        ]

      },
      {
        label: 'Consultants',
        routerLink: "/superadmin/consultantlist",

      },
      {

        label: 'Jobs',
        routerLink: "/jobs/list",

      },
      {
        label: 'Employee Documents',
        items: [
          { label: 'Document List', routerLink: "/superadmin/documents" },
          { label: 'In Active Docs',  routerLink: "/superadmin/documentsinactive" },
          { label: 'Placed Docs',  routerLink: "/superadmin/documentsplaced" },
          { label: 'Hot List',  routerLink: "/superadmin/hotlist" },
        ]

      },
      {
        label: 'Users',
        routerLink: "/superadmin/userlist",

      },
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
      {
        icon: 'pi pi-fw pi-power-off',
        label: 'My Account',
        items: [
          { label: 'Profile', routerLink: "/profile" },
          { label: 'logout', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.logout()
        }},
        ]
      },

    ];
    this.benchsaleMenu = [
      {

        label: 'Submissions',
       // routerLink: "/benchsales/list",
        items: [
          { label: 'Add Submissions', routerLink: "/benchsales/create" },
          { label: 'My Submissions', routerLink: "/benchsales/mylist" },
          { label: 'Schedule Interviews',  routerLink: "/benchsales/interviews" },
          { label: 'All Submissions',  routerLink: "/benchsales/list" },
          { label: 'All Contacts',  routerLink: "/benchsales/contacts" },
        ]

      },

      {
        icon: 'pi pi-fw pi-file-o',
        label: 'Documents',
        routerLink: "/benchsales/documentlist",

      },

      {
        icon: 'pi pi-fw pi-dollar',
        label: 'Calculations',
        items: [

            { label: 'Percentage Off', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.calculatorModal = true;

            },

            },
            { label: 'Calculator', command: (event) => {
              //event.originalEvent: Browser event
              //event.item: menuitem metadata
              this.calculatorModal1 = true;

              },

              },

        ]
      },
      {
        icon: 'pi pi-fw pi-cloud',
        label: 'Hotlist',
        routerLink: "/benchsales/hotlist",

      },
      {
        icon: 'pi pi-fw pi-power-off',
        label: 'My Account',
        items: [
          { label: 'Profile', routerLink: "/profile" },
          { label: 'logout', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.logout()
        }},
        ]
      },

    ];
    this.headHunterAdminMenu = [
      {

        label: 'Consultants',
        items: [
          { label: 'Consultants List', routerLink: "/headadminconsultants/list" },
          { label: 'Add Consultant', routerLink: "/headadminconsultants/create" },
        ]
      },
      {
        icon: 'pi pi-fw pi-file-o',
        label: 'HotList',
        routerLink: "/headadminconsultants/hotlist",

      },
      {
        icon: 'pi pi-fw pi-dollar',
        label: 'Calculations',
        items: [

            { label: 'Percentage Off', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.calculatorModal = true;

            },

            },
            { label: 'Calculator', command: (event) => {
              //event.originalEvent: Browser event
              //event.item: menuitem metadata
              this.calculatorModal1 = true;

              },

              },

        ]
      },
      {
        icon: 'pi pi-fw pi-power-off',
        label: 'My Account',
        items: [
          { label: 'Profile', routerLink: "/profile" },
          { label: 'logout', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.logout()
        }},
        ]
      },

    ];
    this.headHunderMenu = [
      {

        label: 'Consultants',
        items: [
          { label: 'Consultants List', routerLink: "/huntersconsultants/list" },
          { label: 'Add Consultant', routerLink: "/huntersconsultants/create" },
        ]
      },
      {
        icon: 'pi pi-fw pi-file-o',
        label: 'HotList',
        routerLink: "/huntersconsultants/hotlist",

      },
      {
        icon: 'pi pi-fw pi-dollar',
        label: 'Calculations',
        items: [

            { label: 'Percentage Off', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.calculatorModal = true;

            },

            },
            { label: 'Calculator', command: (event) => {
              //event.originalEvent: Browser event
              //event.item: menuitem metadata
              this.calculatorModal1 = true;

              },

              },

        ]
      },
      {
        icon: 'pi pi-fw pi-power-off',
        label: 'My Account',
        items: [
          { label: 'Profile', routerLink: "/profile" },
          { label: 'logout', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.logout()
        }},
        ]
      },

    ];
    this.jobMenu = [
      {

        label: 'Jobs',
        items: [
          { label: 'Jobs', routerLink: "/jobs/list" },

        ]
      },

      {
        icon: 'pi pi-fw pi-dollar',
        label: 'Calculations',
        items: [

            { label: 'Percentage Off', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.calculatorModal = true;

            },

            },
            { label: 'Calculator', command: (event) => {
              //event.originalEvent: Browser event
              //event.item: menuitem metadata
              this.calculatorModal1 = true;

              },

              },

        ]
      },
      {
        icon: 'pi pi-fw pi-power-off',
        label: 'My Account',
        items: [
          { label: 'Profile', routerLink: "/profile" },
          { label: 'logout', command: (event) => {
            //event.originalEvent: Browser event
            //event.item: menuitem metadata
            this.logout()
        }},
        ]
      },

    ];
    this.clockHandle = setInterval(() => {
      this.clock = new Date().toLocaleString();
    }, 1000);
    this.menuexpectedrole = localStorage.getItem('role');
    console.log(this.menuexpectedrole)
    if (this.menuexpectedrole == 'Admin') {
     // this.menuItems = AdminROUTES.filter(menuItem => menuItem);
     this.items =this.adminMenu;
    } else if (this.menuexpectedrole == 'HeadHunters') {
      this.items =this.headHunderMenu;
     // this.menuItems = HeadHunterROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'Recruiters') {
      this.items =this.benchsaleMenu;
    //  this.menuItems = RecruitersROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'BenchSales') {
      this.items =this.benchsaleMenu;
   //   this.menuItems = BenchSalesROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'HeadHuntersAdmin') {
      this.items =this.headHunterAdminMenu;
    //  this.menuItems = headhuntersAdminROUTES.filter(menuItem => menuItem);
    } else if (this.menuexpectedrole == 'Accountmanager') {
      this.items =this.jobMenu;
     // this.menuItems = AccountsROUTES.filter(menuItem => menuItem);
    } else {


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
