import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { NgoProvider } from '../../providers/ngo/ngo';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the NgoformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ngoform',
  templateUrl: 'ngoform.html',
})
export class NgoformPage {

  ngoForm: FormGroup
  ngoLists: any
  token: any
  response: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private viewCtrl: ViewController,private ngoProvider: NgoProvider, private sharedProvider: SharedProvider) {
    this.ngoForm = this.formBuilder.group({
      ngoId: ['', Validators.required],
      campaignId: [''],
      projectId: ['']
    })
    this.allNgoLists()
  }

  allNgoLists(){
    this.sharedProvider.showLoader()
    this.token = localStorage.getItem('token')
    this.ngoProvider.getAllNgo(this.token).then(result=>{
      this.sharedProvider.dismissLoader()
      this.ngoLists = result
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }

  doSave(){
    this.token = localStorage.getItem('token')
    this.sharedProvider.showLoader()
    this.ngoProvider.addNgo(this.token, this.ngoForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.viewCtrl.dismiss()
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad NgoformPage');
  }

}
