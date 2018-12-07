import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { SharedProvider } from '../../providers/shared/shared';
import { UpdateProvider } from '../../providers/update/update';

/**
 * Generated class for the UpdateformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updateform',
  templateUrl: 'updateform.html',
})
export class UpdateformPage {

  updateForm: FormGroup
  response: any
  token: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, 
  private sharedProvider: SharedProvider, private updateProvider: UpdateProvider, private viewCtrl: ViewController) {
    this.updateForm = this.formBuilder.group({
      update: ['', Validators.required],
      campaignId: ['1'],
      projectId: ['142']
    })
    this.token = localStorage.getItem('token')

  }

  // dismiss(){
  //   this.viewCtrl.dismiss()
  // }

  doSave(){
    this.sharedProvider.showLoader()
    console.log(this.updateForm.value)
    this.updateProvider.saveUpdate(this.token, this.updateForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      // this.viewCtrl.dismiss()
      this.navCtrl.pop()
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateformPage');
  }

}
