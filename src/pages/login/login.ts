import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomePage } from '../home/home';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { RegisterPage } from '../register/register';
import { UserProvider } from '../../providers/user/user';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginResponse: any;
  token: any;
  userResponse:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private userProvider: UserProvider,private sharedProvider: SharedProvider,private event: Events,private menu: MenuController) {
      this.menu.enable(false)
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      }) 
  }

  doLogin(){
    this.sharedProvider.showLoader()
    this.userProvider.authenticate(this.loginForm.value).then(result=>{
      this.loginResponse = result
      localStorage.setItem('token', this.loginResponse.token)
      this.fetchUserProfile(this.loginResponse.token)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(JSON.stringify(err))
    })
  }

  fetchUserProfile(token){
    this.token = token
    console.log(this.token)
    this.userProvider.detail(this.token).then(result=>{
      this.sharedProvider.dismissLoader()
      this.userResponse = result
      localStorage.setItem('userId',this.userResponse.user_id)
      localStorage.setItem('fullName', this.userResponse.name)
      localStorage.setItem('email', this.userResponse.email)
      localStorage.setItem('image', this.userResponse.img_file)
      this.event.publish('user:updated',[])
      this.navCtrl.setRoot(HomePage)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }

  openRegistrationForm(){
    this.navCtrl.push(RegisterPage)
  }

  openForgotPasswordForm(){
    this.navCtrl.push(ForgotpasswordPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
