import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { LoginPage } from '../login/login';
import { SharedProvider } from '../../providers/shared/shared';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registrationForm: FormGroup
  response: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private sharedProvider: SharedProvider,
  private userProvider: UserProvider) {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  doRegister(){
    this.sharedProvider.showLoader()
    this.userProvider.register(this.registrationForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.navCtrl.setRoot(LoginPage)
      this.sharedProvider.presentToast(this.response.message)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }

  openLoginForm(){
    this.navCtrl.setRoot(LoginPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
