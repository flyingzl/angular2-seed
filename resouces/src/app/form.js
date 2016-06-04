import { Component } from "@angular/core";
import { bootstrap } from '@angular/platform-browser-dynamic';
import {
    FormBuilder,
    Validators,
    Control,
    ControlGroup,
    FORM_DIRECTIVES
} from "@angular/common";

import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";


import { EmailValidator } from './services/validator';


@Component({
    selector: 'sample-form',
    providers: [FormBuilder],
    template: require('raw!./templates/sample-form.html'),
    directives: [FORM_DIRECTIVES,RADIO_GROUP_DIRECTIVES]
})

class SampleForm {

    constructor(builder: FormBuilder) {

        this.userInfo = {
            username: 'larry',
            email: '',
            gender: 'female',
            hobbies: ['shopping']
      
        }

        this.username = new Control(this.userInfo.username, Validators.required);
        this.email = new Control(this.userInfo.email, EmailValidator.email);
        this.form = builder.group({
            username: this.username,
            email: this.email        
        });
    }

    collectData() {
        alert(JSON.stringify(this.userInfo))
    }
}

bootstrap(SampleForm);