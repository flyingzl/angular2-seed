import {  Control, Validators } from 'angular2/forms';

export let EmailValidator  = {
   // custom email validator
   email(c: Contorl){
      
      var requireResult = Validators.required( c );

      if( requireResult != null ){
      	 return requireResult;
      }

   	  var mailRegExp =  /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
   	  if( c.value !="" && !mailRegExp.test( c.value ) ){
   	  	 return {email: true};
   	  }
   	  return null;
   }

}
