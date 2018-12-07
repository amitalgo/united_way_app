import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { SharedProvider } from '../../providers/shared/shared';
import { NgoProvider } from '../../providers/ngo/ngo';
import { DonationProvider } from '../../providers/donation/donation';



@IonicPage()
@Component({
  selector: 'page-offlinedonation',
  templateUrl: 'offlinedonation.html',
})
export class OfflinedonationPage {

  offlineDonationForm: FormGroup
  token: any
  ngoLists: any
  response: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private sharedProvider:SharedProvider,private ngoProvider: NgoProvider, private donationProvider: DonationProvider) {
    this.offlineDonationForm = this.formBuilder.group({
      donationFor: ['', Validators.required],
      productId: ['142'],
      campaignId: ['1'],
      ngoId: ['', Validators.required],
      amount: ['', Validators.required],
      anonymous: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: [''],
      pincode: ['', Validators.required],
      telephone: [''],
      panNumber: [''],
      chequeNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      chequeDate: ['', Validators.required],
      branchName: ['', Validators.required]
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
    console.log(this.offlineDonationForm.value)
    this.token = localStorage.getItem('token')
    this.sharedProvider.showLoader()
    this.donationProvider.saveOfflineDonation(this.token, this.offlineDonationForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.offlineDonationForm.reset()
      this.sharedProvider.presentToast(this.response.message)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong")
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflinedonationPage');
  }

}
