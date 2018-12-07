import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { SharedProvider } from '../../providers/shared/shared';
import { NgoProvider } from '../../providers/ngo/ngo';
import { DonationProvider } from '../../providers/donation/donation';

/**
 * Generated class for the PrefixeddonationformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prefixeddonationform',
  templateUrl: 'prefixeddonationform.html',
})
export class PrefixeddonationformPage {

  prefixedDonationForm: FormGroup
  ngoLists: any
  token: any
  response: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private viewCtrl: ViewController,private sharedProvider: SharedProvider, private ngoProvider: NgoProvider,
    private donationProvider: DonationProvider) {
    this.prefixedDonationForm = this.formBuilder.group({
      ngoId: ['', Validators.required],
      donationFor: ['', Validators.required],
      amount: ['', Validators.required] ,
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

  dismiss(){
    this.viewCtrl.dismiss()
  }

  doSave(){
    this.sharedProvider.showLoader()
    this.token = localStorage.getItem('token')
    this.donationProvider.addPrefixedDonation(this.token, this.prefixedDonationForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.viewCtrl.dismiss()
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrefixeddonationformPage');
  }

}
