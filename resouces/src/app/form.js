import { Component, NgModule } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { CheckboxGroup } from "ng2-select-controls";

import { EmailValidator } from './services/validator';


@Component({
    selector: 'sample-form',
    template: require('raw!./templates/sample-form.html')
})

class SampleForm {

    constructor(fb: FormBuilder) {

        this.user = fb.group({
            username: ['larry', Validators.required, ],
            email: [null, Validators.required],
            gender: 'male',
            hobbies: [ ['shopping'] ]
        }); 

        this.user.valueChanges.subscribe(form => {
            console.log('form changed to:', form);
        });

    }

    checkHobbyState(value){
        return this.user.get('hobbies').value.indexOf(value) >= 0
    }


    changeHobby($event){
        const $target = $event.target;
        const value = $target.value;
        const checked = $target.checked;
        const currentHobbies = this.user.get('hobbies');

        if( checked ){
            currentHobbies.setValue(currentHobbies.value.concat(value))
        }else{
            currentHobbies.setValue( currentHobbies.value.filter( item => item !== value))    
        }
    }

    submitForm(value: any) {
        alert(JSON.stringify(value))
    }
}


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule],
    declarations: [SampleForm, EmailValidator, CheckboxGroup],
    bootstrap: [SampleForm]
})
export class AppModule {}


platformBrowserDynamic().bootstrapModule(AppModule);
