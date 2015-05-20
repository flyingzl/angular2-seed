import {
	ComponentAnnotation as Component, 
	ViewAnnotation as View, 
	bootstrap,
  If
} from 'angular2/angular2';

import { FormBuilder, Validators, formDirectives, ControlGroup} from 'angular2/forms';

import { EmailValidator } from 'services/Validators';

@Component({
    selector: 'sample-form',
    injectables: [FormBuilder]
})

@View({
	templateUrl: './templates/sample-form.html',
	directives: [ formDirectives, If]
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

