import { 
    Component,
    bootstrap,
    FormBuilder, 
    Validators, 
    CORE_DIRECTIVES,
    FORM_DIRECTIVES, 
    Control, 
    ControlGroup
  } from 'angular2/angular2';


import { EmailValidator } from 'services/Validators';

@Component({
    selector: 'sample-form',
    viewBindings: [FormBuilder],
    templateUrl: './templates/sample-form.html',
    directives: [ FORM_DIRECTIVES, CORE_DIRECTIVES]
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
 }

export function main(){
	bootstrap(SampleForm);
}

