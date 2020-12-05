import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../user-rest.service';
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
export class UserCreateComponent implements OnInit {
  allProfiles = [
    new Profile('dev', 'AEM(Adobe Experience manger)'),
    new Profile('man', 'Manager'),
    new Profile('dir', 'Director')
];
  serverErrors = [];
  registerForm: FormGroup
  constructor(private route: ActivatedRoute,private messageService: MessageService, private userRest: UserRestService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'consultatName': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'consultantLastName': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'consultantEmail': new FormControl(null, [Validators.required, Validators.email]),
      'consultatMobileNumber': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'technology': new FormControl(null, [Validators.required]),
      'otherTechnologies': new FormControl(null, [Validators.required]),
      'rate': new FormControl(null, [Validators.required]),
      'visaType': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'state': new FormControl(null, [Validators.required]),
      'willingLocation': new FormControl(null, [Validators.required]),
      'documentsCollected': new FormControl(null, [Validators.required]),
      'resource': new FormControl(null, [Validators.required]),
      'ssn': new FormControl(null, [Validators.required]),
      'bestContactNumber': new FormControl(null, [Validators.required]),
      'linkedInUrl': new FormControl(null, [Validators.required]),
      'skypeId': new FormControl(null, [Validators.required]),
   //   'comments': new FormControl(null, [Validators.required]),
   //   'note': new FormControl(null, [Validators.required]),
      'reportStatus': new FormControl(null, [Validators.required]),
      'experience': new FormControl(null, [Validators.required]),
      'availability': new FormControl(null, [Validators.required]),
      'priority': new FormControl(null, [Validators.required]),

    })
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

  registerUser(){
     console.log(this.registerForm);
      this.userRest.storeUser(this.registerForm).subscribe(
        response => {
          console.log(response),
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Consultant is added' });
          this.router.navigate(['consultants/list'])
        },
        error =>{
          this.serverErrors = error.error.errors
        }
      );
  }

}
