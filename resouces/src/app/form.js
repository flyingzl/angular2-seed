import { Component } from "@angular/core";
import {bootstrap} from '@angular/platform-browser-dynamic';
import {
FormBuilder,
Validators,
Control,
ControlGroup,
FORM_DIRECTIVES
} from "@angular/common";

import { EmailValidator } from './services/validator';

@Component({
    selector: 'sample-form',
    providers: [FormBuilder],
    template: require('raw!./templates/sample-form.html'),
    directives: [ FORM_DIRECTIVES]
})

class SampleForm {

  form: ControlGroup;
  username: Control;
  email: Control;

  constructor(builder: FormBuilder) {
    this.username = new Control("larry", Validators.required);
    this.email = new Control("", EmailValidator.email);
    this.form = builder.group( {
       username:  this.username,
       email:  this.email
    });
   }

   collectData(){
     alert(JSON.stringify(this.form.value))
   }
 }

bootstrap(SampleForm);
