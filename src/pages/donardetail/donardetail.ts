import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { DonationProvider } from '../../providers/donation/donation';
import { tokenKey } from '../../../node_modules/@angular/core/src/view';

/**
 * Generated class for the DonardetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donardetail',
  templateUrl: 'donardetail.html',
})
export class DonardetailPage {

  donationId: any
  data: any
  token: any
  donarDetail: any

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController,
    private sharedProvider: SharedProvider, private donationProvider: DonationProvider) {
      this.token = localStorage.getItem('token')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonardetailPage');
  }

  ionViewWillEnter(){
    this.donationId = this.navParams.get('donationId')
    this.data = {
      'donationId': this.donationId
    };
    this.sharedProvider.showLoader()
    this.donationProvider.getDonarDetail(this.token, this.data).then(result=>{
      this.sharedProvider.dismissLoader()
      this.donarDetail = result
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

}
