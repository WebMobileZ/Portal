import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BenchSalesService } from '../benchsales-rest.service';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { Calendar } from 'primeng/primeng';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

export class Profile {
  constructor(public prId: string, public prName: string) {
  }
}
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  providers: [MessageService],
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  @ViewChild('dd', { static: true }) dropdown: any;
  num1: number = 52;
  num2: number = 20;
  countries: any[];
  selectedCountry: string;
  tech: SelectItem[];
  states: SelectItem[];
  vendors: SelectItem[];
  contacts: SelectItem[];
  clients: SelectItem[];
  selectedCar: SelectItem;
  selectedStates: SelectItem;
  selectedVendors: SelectItem;
  selectedContacts: SelectItem;
  selectedClients: SelectItem;
  str: string;
  counter = 0;
  totalNumberOfCars: number;
  formData: FormGroup;
  crate: any;
  cemail: any;
  cmobile: any;
  ctechnology: any;
  vmobile: any;
  vcname: any;
  serverErrors = [];
  imageFile: { link: string, file: any, name: string };
  registerForm: FormGroup;
  registerVendor: FormGroup;
  registerContact: FormGroup;
  registerForm1: FormGroup;
  displayModal: boolean;
  displayModal1: boolean;
  calculatorModal: boolean;
  registerClient: FormGroup;
  calculatorModal1: boolean;
  displayModalClient: boolean;
  constructor(private route: ActivatedRoute, private messageService: MessageService, private restService: BenchSalesService, private router: Router) { }

  ngOnInit() {

    this.restService.getConsultantsList().subscribe(
      (response) => {
        console.log(this.states = response.submissions);
        console.log(this.vendors = response.vendorslist);
        console.log(this.clients = response.clients);
      },
      (error) => { console.log(error) }
    );
    this.tech = [
      { label: "Choose Technology", value: "" },
      { label: "AEM(Adobe Experience manger)", value: "AEM(Adobe Experience manger)" },
      { label: 'Android Developer', value: 'Android Developer' },
      { label: 'Business Analyst', value: 'Business Analyst' },
      { label: 'Business Intelligence', value: 'Business Intelligence' },
      { label: 'Data Analyst', value: 'Data Analyst' },
      { label: 'Database Administrator', value: 'Database Administrator' },
      { label: 'Devops Engineer', value: 'Devops Engineer' },
      { label: 'Dot net Developer', value: 'Dot net Developer' },
      { label: 'ETL Developer', value: "ETL Developer" },
      { label: 'Hadoop', value: "Hadoop" },
      { label: 'Hadoop Developer/Hadoop Admin', value: "Hadoop Developer/Hadoop Admin" },
      { label: 'IOS Developer', value: "IOS Developer" },
      { label: 'Java Developer', value: "Java Developer" },
      { label: 'Linux Admin', value: "Linux Admin" },
      { label: 'Mainframe Developer', value: "Mainframe Developer" },
      { label: 'Network Engineer', value: "Network Engineer" },
      { label: 'Oracle fusion developer', value: "Oracle fusion developer" },
      { label: 'PEGA', value: "PEGA" },
      { label: 'QA Tester/QA Analyst', value: "QA Tester/QA Analyst" },
      { label: 'SAP Hana', value: "SAP Hana" },
      { label: 'Salesforce', value: "Salesforce" },
      { label: 'Salesforce Admin', value: "Salesforce Admin" },
      { label: 'Salesforce Developer', value: "Salesforce Developer" },
      { label: 'Service now developer', value: "Service now developer" },
      { label: 'Tableau Developer', value: "Tableau Developer" },
      { label: 'UI Developer / Frontend Developer', value: "UI Developer / Frontend Developer" },
      { label: 'VOIP Engineer', value: "VOIP Engineer" },
      { label: 'others', value: "others" },
    ];
    this.totalNumberOfCars = this.tech.length;
    this.str = '';

    this.registerForm = new FormGroup({
      'actualRate': new FormControl('', [Validators.required]),
      'state': new FormControl('', [Validators.required]),
      'vendorStatus': new FormControl('', [Validators.required]),
      'vendorComments': new FormControl(''),
      'submissionRate': new FormControl('', [Validators.required]),
      'vid': new FormControl('', [Validators.required]),
      'vendorDetailId': new FormControl('', [Validators.required]),
      'endClientLocation': new FormControl('', [Validators.required]),
      'clientId': new FormControl('', [Validators.required]),
      'scheduleDate': new FormControl(''),
      'timezone': new FormControl(''),
    })

    this.registerContact = new FormGroup({
      'vendorcontactName': new FormControl('', [Validators.required]),
      'vendorcontactMobile': new FormControl('', [Validators.required]),
      'vendorcontactEmail': new FormControl('', [Validators.required]),
      'vendorext': new FormControl('', [Validators.required]),
    });
    this.registerVendor = new FormGroup({
      'vendorCompanyName': new FormControl('', [Validators.required]),
      'contactName': new FormControl('', [Validators.required]),
      'contactMobile': new FormControl('', [Validators.required]),
      'contactEmail': new FormControl('', [Validators.required]),
      'ext': new FormControl('', [Validators.required]),

    });
    this.registerClient = new FormGroup({
      'clientName': new FormControl('', [Validators.required]),
    });
  }
  ConvertToInt(val) {
    return parseFloat(val);
  }
  showModalDialog() {
    this.displayModal = true;
  }
  showModalDialogClient() {
    this.displayModalClient = true;
  }
  showCalculator() {
    this.calculatorModal = true;
  }
  showCalculator1() {
    this.calculatorModal1 = true;
  }
  showModalDialog1() {
    this.registerContact.addControl('cvid', new FormControl(this.registerForm.value.vid, Validators.required));
    this.displayModal1 = true;
  }

  OnFocus() {
    if (this.tech.length > this.totalNumberOfCars) {
      this.tech.shift();

    }
  }

  OnBlur() {
    console.log("OnBlur");
  }

  test(event) {
    const charCode = event.keyCode;
    if (event.key === 'Enter') {
      this.selectedCar = this.tech.find(car => {
        return car.label.toLowerCase().includes(this.str.toLowerCase());
      });
      this.tech.unshift(this.selectedCar)
      this.str = '';
    } else if (event.key === 'Backspace') {
      this.str = this.str.replace(/.$/, "");
    } else if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8) {
      this.str += event.key;
    }

  }

  onChange(event) {
    this.crate = '';
    this.cemail = '';
    this.cmobile = '';
    this.ctechnology = '';

    console.log(event.value);
    this.restService.editConsultant(event.value).subscribe(
      (response) => {
        this.crate = response.user.rate;
        this.cemail = response.user.consultantEmail;
        this.cmobile = response.user.consultatMobileNumber;
        this.ctechnology = response.user.technology;

      },
      (error) => console.log(error)
    );
  }
  ChangeClients(event) {

    //   this.clients=[];
    /* this.restService.editVenodr(event.value).subscribe(
       (response) => {
         this.contacts =  response.contacts;
       },
       (error) => console.log(error)
     ); */

  }
  ChangeVendor(event) {
    this.vmobile = '';
    this.vcname = '';
    this.contacts = [];
    this.restService.editVenodr(event.value).subscribe(
      (response) => {
        this.contacts = response.contacts

      },
      (error) => console.log(error)
    );

  }
  ChangeContactsInner(value) {
    this.vmobile = '';
    this.vcname = '';
    const formData = new FormData();
    formData.append("index", value);
    this.restService.getContactDetails(formData).subscribe(
      (response) => {
        console.log(response);
        this.vmobile = response.contactDetails.contactMobile
        this.vcname = response.contactDetails.contactName
      },
      (error) => console.log(error)
    );

  }
  ChangeContacts(event) {
    this.vmobile = '';
    this.vcname = '';
    const formData = new FormData();
    formData.append("index", event.value);
    this.restService.getContactDetails(formData).subscribe(
      (response) => {
        console.log(response);
        this.vmobile = response.contactDetails.contactMobile
        this.vcname = response.contactDetails.contactName
      },
      (error) => console.log(error)
    );

  }
  vendorsUi(event) {
  }
  statesUi(event) {
    const charCode = event.keyCode;
    if (event.key === 'Enter') {
      this.selectedStates = this.states.find(car => {
        return car.label.toLowerCase().includes(this.str.toLowerCase());
      });
      this.states.unshift(this.selectedStates)
      this.str = '';
    } else if (event.key === 'Backspace') {
      this.str = this.str.replace(/.$/, "");
    } else if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8) {
      this.str += event.key;
    }

  }
  get clientName() { return this.registerClient.get('clientName'); }
  get actualRate() { return this.registerForm.get('actualRate'); }
  get vendorStatus() { return this.registerForm.get('vendorStatus'); }
  get vendorComments() { return this.registerForm.get('vendorComments'); }
  get submissionRate() { return this.registerForm.get('submissionRate'); }
  get state() { return this.registerForm.get('state'); }
  get vendorDetailId() { return this.registerForm.get('vendorDetailId'); }
  get vid() { return this.registerForm.get('vid'); }
  get clientId() { return this.registerForm.get('clientId'); }
  get endClientLocation() { return this.registerForm.get('vid'); }
  get vendorCompanyName() { return this.registerVendor.get('vendorCompanyName'); }
  get contactName() { return this.registerVendor.get('contactName'); }
  get contactMobile() { return this.registerVendor.get('contactMobile'); }
  get contactEmail() { return this.registerVendor.get('contactEmail'); }
  get ext() { return this.registerVendor.get('ext'); }
  get vendorcontactName() { return this.registerContact.get('vendorcontactName'); }
  get vendorcontactMobile() { return this.registerContact.get('vendorcontactMobile'); }
  get vendorcontactEmail() { return this.registerContact.get('vendorcontactEmail'); }
  get vendorext() { return this.registerContact.get('vendorext'); }
  get scheduleDate() { return this.registerContact.get('scheduleDate'); }
  get timezone() { return this.registerContact.get('timezone'); }
  registerClientForm() {
    this.restService.storeClient(this.registerClient).subscribe(
      response => {
        this.displayModalClient = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client Added' });
        this.clients = response.clients;
        this.selectedClients = response.clientId;
        // this.ChangeContactsInner(response.contactId)
        // this.router.navigate(['benchsales/list'])
      },
      error => {
        this.serverErrors = error.error.errors
      }
    );
  }
  registerContactForm() {

    this.restService.storeContact(this.registerContact).subscribe(
      response => {
        this.displayModal1 = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor Contact Details Added' });
        // this.selectedContacts = response.contactId;
        this.restService.editVenodr(this.registerForm.value.vid).subscribe(
          (response2) => {
            this.contacts = response2.contacts;
            this.selectedContacts = response.contactId;
            this.ChangeContactsInner(response.contactId)
          },
          (error) => console.log(error)
        );
        // this.ChangeContactsInner(response.contactId)
        // this.router.navigate(['benchsales/list'])
      },
      error => {
        this.serverErrors = error.error.errors
      }
    );
  }
  registerVendorCompany() {
    console.log(this.registerVendor);

    this.restService.storeVendor(this.registerVendor).subscribe(
      response => {
        console.log(response),
          console.log(response.vendorId);
        this.displayModal = false;
        this.selectedVendors = response.vendorId;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor Company Details Added' });

        this.restService.getConsultantsList().subscribe(
          (response1) => {
            // console.log(this.states = response.submissions);
            console.log(this.vendors = response1.vendorslist);
            // console.log( this.clients =  response1.clients);
          },
          (error) => { console.log(error) }
        );
        this.restService.editVenodr(response.vendorId).subscribe(
          (response2) => {
            this.contacts = response2.contacts;
            this.selectedContacts = response.contactId;
            this.ChangeContactsInner(response.contactId)
          },
          (error) => console.log(error)
        );


        // this.router.navigate(['benchsales/list'])
      },
      error => {
        this.serverErrors = error.error.errors
      }
    );
  }
  registerUser() {
    console.log(this.registerForm);


    //formData.append('myImageToSend', this.imageFile.file);


    this.restService.storeUser(this.registerForm).subscribe(
      response => {
        console.log(response),
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Submission Completed' });
        this.router.navigate(['benchsales/list'])
      },
      error => {
        this.serverErrors = error.error.errors
      }
    );
  }

}
