import { Component } from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {
FormBuilder,
Validators,
Control,
ControlGroup,
FORM_DIRECTIVES
} from "angular2/common";

import { EmailValidator } from './services/validator';

@Component({
    selector: 'sample-form',
    providers: [FormBuilder],
    templateUrl: 'app/templates/sample-form.html',
    directives: [ FORM_DIRECTIVES]
})

class SampleForm {

  form: ControlGroup;
  username: Control;
  email: Control;

  constructor(private builder: FormBuilder) {
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

export function main(){
	bootstrap(SampleForm);
}

