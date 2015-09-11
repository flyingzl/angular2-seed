import {
    Component,
	View,
	bootstrap,
    NgIf
} from 'angular2/angular2';

import { FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup} from 'angular2/forms';

import { EmailValidator } from 'services/Validators';

@Component({
    selector: 'sample-form',
    viewBindings: [FormBuilder]
})

@View({
	templateUrl: './templates/sample-form.html',
	directives: [ FORM_DIRECTIVES, NgIf]
})


class SampleForm {

  form: ControlGroup;

   constructor(builder: FormBuilder) {
     this.form = builder.group({
       username: ["larry", Validators.required],
       email: ["",  EmailValidator.email  ]
     });
   }
 }

export function main(){
	bootstrap(SampleForm);
}

