import {  Control, Validators } from 'angular2/angular2';

interface ValidationResult{
   [key:string]:boolean;
}

export class EmailValidator{
   // custom email validator

   static email(control: Control): ValidationResult  { 
      var requireResult:ValidationResult  = Validators.required( control );

      if( requireResult != null ){
      	 return requireResult;
      }

   	var mailRegExp =  /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
   	  if( control.value !="" && !mailRegExp.test( control.value ) ){
   	  	 return { "email": true};
   	  }
   	return null;
   }

}
