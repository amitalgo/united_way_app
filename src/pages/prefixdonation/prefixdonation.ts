import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { PrefixeddonationformPage } from '../prefixeddonationform/prefixeddonationform';
import { DonationProvider } from '../../providers/donation/donation';
import { SharedProvider } from '../../providers/shared/shared';

/**
 * Generated class for the PrefixdonationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prefixdonation',
  templateUrl: 'prefixdonation.html',
})
export class PrefixdonationPage {

  prefixedDonationList: any
  token: any
  data: any
  response: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private modalCtrl: ModalController,private donationProvider: DonationProvider,private sharedProvider:SharedProvider) {
      this.prefixedDonations()      
  }

  prefixedDonations(){
    this.token = localStorage.getItem('token')
    this.data = {
      'campaignId': 1,
      'projectId': 142
    }
    this.sharedProvider.showLoader()
    this.donationProvider.prefixedDonation(this.token, this.data).then(result=>{
      this.sharedProvider.dismissLoader()
      this.prefixedDonationList = result
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrefixdonationPage');
  }

  ionViewWillEnter(){

  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  delete(prefixedDonationId){
    this.token = localStorage.getItem('token')
    this.data = {
      'pdId': prefixedDonationId,
    }
    this.sharedProvider.showLoader()
    this.donationProvider.deletePrefixedDonation(this.token, this.data).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.viewCtrl.dismiss()
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }
  
  openPrefixedDonationForm(){
    let modal = this.modalCtrl.create(PrefixeddonationformPage)
    modal.present()
  }
}
