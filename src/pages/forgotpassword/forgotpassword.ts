import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { LoginPage } from '../login/login';
import { SharedProvider } from '../../providers/shared/shared';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  forgotForm: FormGroup
  response: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private sharedProvider: SharedProvider,
  private userProvider: UserProvider) {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  doSendMail(){
    this.sharedProvider.showLoader()
    this.userProvider.forgotPassword(this.forgotForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.forgotForm.reset()
      this.sharedProvider.presentToast(this.response.message)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

}
