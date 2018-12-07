import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/*
  Generated class for the PasswordValidationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PasswordValidationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PasswordValidationProvider Provider');
  }

  static MatchPassword(AC: AbstractControl){
    let password = AC.get('password').value; 
    let confirmPassword = AC.get('confirmPassword').value; 
    if(password != confirmPassword) {
        console.log('false');
        AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
        console.log('true');
        return null
    }
  }
}
