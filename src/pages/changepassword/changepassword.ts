import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { SharedProvider } from '../../providers/shared/shared';
import { UserProvider } from '../../providers/user/user';
import { PasswordValidationProvider } from '../../providers/password-validation/password-validation';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  changePasswordForm: FormGroup
  token: any
  response: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
  private sharedProvider: SharedProvider, private userProvider: UserProvider) {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.compose([Validators.required])]
    },{
      validator: PasswordValidationProvider.MatchPassword
    })
    this.token = localStorage.getItem('token')
  }

  doUpdatePassword(){
    this.sharedProvider.showLoader()
    this.userProvider.updatePassword(this.token, this.changePasswordForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.changePasswordForm.reset()
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

}
