import { Component, OnInit,ViewChild, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailRestService } from '../email-rest.service';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';

import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-user-create',
  templateUrl: './consultant-create.component.html',
  providers: [MessageService],
  styleUrls: ['./consultant-create.component.scss']
})
export class EmailCreateComponent implements OnInit {

  values: string[];
  cars: SelectItem[];
  formData: FormGroup;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '350px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
  serverErrors = [];
  imageFile: {link: string, file: any, name: string};
  registerForm: FormGroup;
  registerForm1: FormGroup;
  constructor(private route: ActivatedRoute,private messageService: MessageService, private userRest: EmailRestService, private router: Router) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      'message': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'subject': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'cc': new FormControl(null, [Validators.required]),

    })
  }

  get cc() { return this.registerForm.get('cc'); }
  get message() { return this.registerForm.get('message'); }
  get subject() { return this.registerForm.get('subject'); }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ",") {
      event.preventDefault();
      const element = event.target as HTMLElement;
      element.blur();
      element.focus();
    }
  }
  registerUser(){
     console.log(this.registerForm);
      this.userRest.emailsent(this.registerForm).subscribe(
        response => {
          console.log(response),
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Email Sent' });
          this.router.navigate(['superadmin/email']);
          this.registerForm.reset();
        },
        error =>{
          this.serverErrors = error.error.errors
        }
      );
  }

}
