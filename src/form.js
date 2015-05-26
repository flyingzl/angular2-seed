import {
	ComponentAnnotation as Component, 
	ViewAnnotation as View, 
	bootstrap,
  NgIf
} from 'angular2/angular2';

import { FormBuilder, Validators, formDirectives, ControlGroup} from 'angular2/forms';

import { EmailValidator } from 'services/Validators';

@Component({
    selector: 'sample-form',
    appInjector: [FormBuilder]
})

@View({
	templateUrl: './templates/sample-form.html',
	directives: [ formDirectives, NgIf]
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

