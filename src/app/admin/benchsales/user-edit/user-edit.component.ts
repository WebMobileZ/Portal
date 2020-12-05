import { Component, OnInit,ViewChild, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BenchSalesService } from '../benchsales-rest.service';
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
  constructor(private route: ActivatedRoute,private messageService: MessageService, private restService: BenchSalesService, private router: Router) { }

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
      'jobTitle': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'jobVisaType': new FormControl(null, [Validators.required]),
      'jobLocation': new FormControl(null, [Validators.required]),
      'jobExperience': new FormControl(null),
      'jobTechnology': new FormControl(null),
      'jobDescription': new FormControl(null),
      'jobStatus': new FormControl(null),

    });
    let id = this.route.snapshot.params.id;
    this.restService.editUser(id).subscribe(
     (response) => {
       this.registerForm.patchValue({

        'jobTitle': response.user.jobTitle,
      'jobVisaType':  response.user.jobVisaType,
      'jobLocation':  response.user.jobLocation,
      'jobExperience': response.user.jobExperience,
      'jobTechnology':  response.user.jobTechnology,
      'jobDescription':  response.user.jobDescription,
      'jobStatus':  response.user.jobStatus,

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

        this.restService.storeDocument(formData).subscribe(
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

      this.restService.storeDocument(formData).subscribe(
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

      this.restService.storeDocument(formData).subscribe(
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

  get jobTitle() { return this.registerForm.get('jobTitle'); }
  get jobDescription() { return this.registerForm.get('jobDescription'); }
  get jobTechnology() { return this.registerForm.get('jobTechnology'); }
  get jobExperience() { return this.registerForm.get('jobExperience'); }
  get jobLocation() { return this.registerForm.get('jobLocation'); }
  get jobVisaType() { return this.registerForm.get('jobVisaType'); }
  get jobStatus() { return this.registerForm.get('jobStatus'); }


  registerUser(){
     console.log(this.registerForm);


 //formData.append('myImageToSend', this.imageFile.file);


      this.restService.storeUser(this.registerForm).subscribe(
        response => {
          console.log(response),
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Consultant is added' });
          this.router.navigate(['jobs/list'])
        },
        error =>{
          this.serverErrors = error.error.errors
        }
      );
  }

  updateUserDetails(){
    let id = this.route.snapshot.params.id;
    this.restService.updateUser(this.registerForm,id).subscribe(
      (response) => {
        console.log(response),
        this.router.navigate(['jobs/list'])
      },
      error =>{
        this.serverErrors = error.error.errors
      },
      () => console.log('completed')
    );
  }

}
