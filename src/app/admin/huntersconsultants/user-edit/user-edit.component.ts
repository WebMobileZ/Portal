import { Component, OnInit,ViewChild, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';

import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
export class Profile {
  constructor(public prId:string, public prName:string) {
  }
}
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  providers: [MessageService],
  styleUrls: ['./user-create.component.scss']
})
export class UserEditComponent implements OnInit {
  @ViewChild('dd', { static: true }) dropdown: any;
  countries: any[];
  selectedCountry: string;
  cars: SelectItem[];
  states: SelectItem[];
  selectedCar: SelectItem;
  selectedStates: SelectItem;
  str: string;
  counter = 0;
  totalNumberOfCars : number;
  formData: FormGroup;

  serverErrors = [];
  imageFile: {link: string, file: any, name: string};
  registerForm: FormGroup;
  registerForm1: FormGroup;
  constructor(private route: ActivatedRoute,private messageService: MessageService, private userRest: UserRestService, private router: Router) { }

  ngOnInit() {
    this.states = [
      {label: "Choose State", value: ""},
      {label: "Alabama", value: "Alabama"},
      {label: 'Alaska', value: 'Alaska'},
      {label: 'Alabama', value: 'Alabama'},
      {label: 'Arizona', value: 'Arizona'},
      {label: 'Arkansas', value: 'Arkansas'},
      {label: 'California', value: 'California'},
      {label: 'Colorado', value: 'Colorado'},
      {label: 'Connecticut', value: 'Connecticut'},
      {label: 'Delaware', value:"Delaware"},
      {label: 'District of Columbia', value:"District of Columbia"},
      {label: 'Florida', value:"Florida"},
      {label: 'Georgia', value:"Georgia"},
      {label: 'Hawaii', value:"Hawaii"},
      {label: 'Idaho', value:"Idaho"},
      {label: 'Illinois', value:"Illinois"},
      {label: 'Indiana', value:"Indiana"},
      {label: 'Iowa', value:"Iowa"},
      {label: 'Kansas', value:"Kansas"},
      {label: 'Kentucky', value:"Kentucky"},
      {label: 'Louisiana', value:"Louisiana"},
      {label: 'Maine', value:"Maine"},
      {label: 'Maryland', value:"Maryland"},
      {label: 'Michigan', value:"Michigan"},
      {label: 'Minnesota', value:"Minnesota"},
      {label: 'Mississippi', value:"Mississippi"},
      {label: 'Missouri', value:"Missouri"},
      {label: 'Montana', value:"Montana"},
      {label: 'Nebraska', value:"Nebraska"},
  ];
    this.cars = [
      {label: "Choose Technology", value: ""},
      {label: "AEM(Adobe Experience manger)", value: "AEM(Adobe Experience manger)"},
      {label: 'Android Developer', value: 'Android Developer'},
      {label: 'Business Analyst', value: 'Business Analyst'},
      {label: 'Business Intelligence', value: 'Business Intelligence'},
      {label: 'Data Analyst', value: 'Data Analyst'},
      {label: 'Database Administrator', value: 'Database Administrator'},
      {label: 'Devops Engineer', value: 'Devops Engineer'},
      {label: 'Dot net Developer', value: 'Dot net Developer'},
      {label: 'ETL Developer', value:"ETL Developer"},
      {label: 'Hadoop', value:"Hadoop"},
      {label: 'Hadoop Developer/Hadoop Admin', value:"Hadoop Developer/Hadoop Admin"},
      {label: 'IOS Developer', value:"IOS Developer"},
      {label: 'Java Developer', value:"Java Developer"},
      {label: 'Linux Admin', value:"Linux Admin"},
      {label: 'Mainframe Developer', value:"Mainframe Developer"},
      {label: 'Network Engineer', value:"Network Engineer"},
      {label: 'Oracle fusion developer', value:"Oracle fusion developer"},
      {label: 'PEGA', value:"PEGA"},
      {label: 'QA Tester/QA Analyst', value:"QA Tester/QA Analyst"},
      {label: 'SAP Hana', value:"SAP Hana"},
      {label: 'Salesforce', value:"Salesforce"},
      {label: 'Salesforce Admin', value:"Salesforce Admin"},
      {label: 'Salesforce Developer', value:"Salesforce Developer"},
      {label: 'Service now developer', value:"Service now developer"},
      {label: 'Tableau Developer', value:"Tableau Developer"},
      {label: 'UI Developer / Frontend Developer', value:"UI Developer / Frontend Developer"},
      {label: 'VOIP Engineer', value:"VOIP Engineer"},
      {label: 'others', value:"others"},
  ];
  this.totalNumberOfCars = this.cars.length;
  this.str ='';

    this.registerForm = new FormGroup({
      'consultatName': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'consultantLastName': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'consultantEmail': new FormControl(null, [Validators.required, Validators.email]),
      'consultatMobileNumber': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'technology': new FormControl(null, [Validators.required]),
      'otherTechnologies': new FormControl(null),
      'rate': new FormControl(null, [Validators.required]),
      'visaType': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'state': new FormControl(null, [Validators.required]),
      'willingLocation': new FormControl(null, [Validators.required]),
      'documentsCollected': new FormControl(null, [Validators.required]),
      'resource': new FormControl(null, [Validators.required]),
      'ssn': new FormControl(null, [Validators.required]),
      'bestContactNumber': new FormControl(null),
      'linkedInUrl': new FormControl(null),
      'skypeId': new FormControl(null),
      'comments': new FormControl(null),
      'note': new FormControl(null),
      'reportStatus': new FormControl(null, [Validators.required]),
      'experience': new FormControl(null, [Validators.required]),
      'availability': new FormControl(null, [Validators.required]),
      'priority': new FormControl(null, [Validators.required]),
      'resume': new FormControl(null),
      'otherDocument': new FormControl(null),
      'workAuthorization': new FormControl(null),
      'technology1': new FormControl(null),
      'rating1': new FormControl(null),
      'technology2': new FormControl(null),
      'rating2': new FormControl(null),
      'technology3': new FormControl(null),
      'rating3': new FormControl(null),
      'technology4': new FormControl(null),
      'rating4': new FormControl(null),


    });
    let id = this.route.snapshot.params.id;
    this.userRest.editUser(id).subscribe(
     (response) => {
       this.registerForm.patchValue({
        'consultatName': response.user.consultatName,
        'consultantLastName': response.user.consultantLastName,
        'consultantEmail': response.user.consultantEmail,
        'consultatMobileNumber': response.user.consultatMobileNumber,
        'technology': response.user.technology,
        'otherTechnologies': response.user.otherTechnologies,
        'rate': response.user.rate,
        'visaType': response.user.visaType,
        'city': response.user.city,
        'state': response.user.state,
        'willingLocation': response.user.willingLocation,
        'documentsCollected': response.user.documentsCollected,
        'resource': response.user.resource,
        'ssn': response.user.ssn,
        'bestContactNumber': response.user.bestContactNumber,
        'linkedInUrl': response.user.linkedInUrl,
        'skypeId': response.user.skypeId,
        'comments': response.user.comments,
        'note': response.user.note,
        'reportStatus': response.user.reportStatus,
        'experience': response.user.experience,
        'availability': response.user.availability,
        'priority': response.user.priority,
        'resume': response.user.resume,
        'otherDocument': response.user.otherDocument,
        'workAuthorization': response.user.workAuthorization,
        'technology1': response.user.technology1,
        'rating1': response.user.rating1,
        'technology2': response.user.technology2,
        'rating2': response.user.rating2,
        'technology3': response.user.technology3,
        'rating3': response.user.rating3,
        'technology4': response.user.technology4,
        'rating4': response.user.rating4,

       })
     },
     (error) => console.log(error)
   );
  }
  imagesPreviewResume(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (_event: any) => {
            this.imageFile = {
                link: _event.target.result,
                file: event.srcElement.files[0],
                name: event.srcElement.files[0].name
            };
        };
        reader.readAsDataURL(event.target.files[0]);
        const formData = new FormData();
        formData.append("resume", event.target.files[0]);

        this.userRest.storeDocument(formData).subscribe(
          (response) => { console.log(response)
            this.registerForm.patchValue({
              resume: response.path,
              // formControlName2: myValue2 (can be omitted)
            });
          },
          (error) => { console.log(error) }
        );
    }
}
imagesPreviewOtherDoc(event) {
  if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
          this.imageFile = {
              link: _event.target.result,
              file: event.srcElement.files[0],
              name: event.srcElement.files[0].name
          };
      };
      reader.readAsDataURL(event.target.files[0]);
      const formData = new FormData();
      formData.append("otherDocument", event.target.files[0]);

      this.userRest.storeDocument(formData).subscribe(
        (response) => { console.log(response)
          this.registerForm.patchValue({
            otherDocument: response.path,
            // formControlName2: myValue2 (can be omitted)
          });
        },
        (error) => { console.log(error) }
      );
  }
}
imagesPreviewWorkAuth(event) {
  if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
          this.imageFile = {
              link: _event.target.result,
              file: event.srcElement.files[0],
              name: event.srcElement.files[0].name
          };
      };
      reader.readAsDataURL(event.target.files[0]);
      const formData = new FormData();
      formData.append("workAuthorization", event.target.files[0]);

      this.userRest.storeDocument(formData).subscribe(
        (response) => { console.log(response)
          this.registerForm.patchValue({
            workAuthorization: response.path,
            // formControlName2: myValue2 (can be omitted)
          });
        },
        (error) => { console.log(error) }
      );
  }
}
  OnFocus() {
    if(this.cars.length > this.totalNumberOfCars) {
      this.cars.shift();
    }
  }

  OnBlur() {
    console.log("OnBlur");
  }

  test(event) {
    const charCode = event.keyCode;
    if(event.key === 'Enter') {
      this.selectedCar = this.cars.find(car => {
       return car.label.toLowerCase().includes(this.str.toLowerCase());
      });
      this.cars.unshift(this.selectedCar)
      this.str = '';
    } else if (event.key === 'Backspace') {
        this.str = this.str.replace(/.$/,"");
    } else if( (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8) {
        this.str+= event.key;
      }

  }


  statesUi(event) {
    const charCode = event.keyCode;
    if(event.key === 'Enter') {
      this.selectedStates = this.states.find(car => {
       return car.label.toLowerCase().includes(this.str.toLowerCase());
      });
      this.states.unshift(this.selectedStates)
      this.str = '';
    } else if (event.key === 'Backspace') {
        this.str = this.str.replace(/.$/,"");
    } else if( (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8) {
        this.str+= event.key;
      }
  }

  get consultatName() { return this.registerForm.get('consultatName'); }
  get consultantEmail() { return this.registerForm.get('consultantEmail'); }
  get visaType() { return this.registerForm.get('visaType'); }
  get consultantLastName() { return this.registerForm.get('consultantLastName'); }
  get consultatMobileNumber() { return this.registerForm.get('consultatMobileNumber'); }
  get technology() { return this.registerForm.get('technology'); }
  get otherTechnologies() { return this.registerForm.get('otherTechnologies'); }
  get rate() { return this.registerForm.get('rate'); }
  get ravisaTypete() { return this.registerForm.get('visaType'); }
  get city() { return this.registerForm.get('city'); }
  get state() { return this.registerForm.get('state'); }
  get willingLocation() { return this.registerForm.get('willingLocation'); }
  get documentsCollected() { return this.registerForm.get('documentsCollected'); }
  get resource() { return this.registerForm.get('resource'); }
  get ssn() { return this.registerForm.get('ssn'); }
  get bestContactNumber() { return this.registerForm.get('bestContactNumber'); }
  get linkedInUrl() { return this.registerForm.get('linkedInUrl'); }
  get skypeId() { return this.registerForm.get('skypeId'); }
  get comments() { return this.registerForm.get('comments'); }
  get note() { return this.registerForm.get('note'); }
  get reportStatus() { return this.registerForm.get('reportStatus'); }
  get experience() { return this.registerForm.get('experience'); }
  get availability() { return this.registerForm.get('availability'); }
  get priority() { return this.registerForm.get('priority'); }
  get resume() { return this.registerForm.get('resume'); }
  get otherDocument() { return this.registerForm.get('otherDocument'); }
  get workAuthorization() { return this.registerForm.get('workAuthorization'); }

  registerUser(){
     console.log(this.registerForm);


 //formData.append('myImageToSend', this.imageFile.file);


      this.userRest.storeUser(this.registerForm).subscribe(
        response => {
          console.log(response),
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Consultant is added' });
          this.router.navigate(['huntersconsultants/list'])
        },
        error =>{
          this.serverErrors = error.error.errors
        }
      );
  }

  updateUserDetails(){
    let id = this.route.snapshot.params.id;
    this.userRest.updateUser(this.registerForm,id).subscribe(
      (response) => {
        console.log(response),
        this.router.navigate(['huntersconsultants/list'])
      },
      error =>{
        this.serverErrors = error.error.errors
      },
      () => console.log('completed')
    );
  }

}
