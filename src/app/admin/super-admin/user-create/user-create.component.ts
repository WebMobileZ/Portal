import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperAdminRestService } from '../superadmin-rest.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  serverErrors = [];
  registerForm: FormGroup
  constructor(private route: ActivatedRoute, private userRest: SuperAdminRestService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'role': new FormControl("", [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'confirm_password': new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirm_password() { return this.registerForm.get('confirm_password'); }
  get role() { return this.registerForm.get('role'); }
  registerUser(){
     console.log(this.registerForm);
      this.userRest.storeUser(this.registerForm).subscribe(
        response => {
          console.log(response),
          this.router.navigate(['users/list'])
        },
        error =>{
          this.serverErrors = error.error.errors
        }
      );
  }

}