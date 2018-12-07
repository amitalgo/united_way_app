import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgoformPage } from '../ngoform/ngoform';
import { NgoProvider } from '../../providers/ngo/ngo';
import { SharedProvider } from '../../providers/shared/shared';


@IonicPage()
@Component({
  selector: 'page-ngo',
  templateUrl: 'ngo.html',
})
export class NgoPage {

  ngoLists: any;
  token: any;
  data: any
  response: any

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController,
    private ngoProvider: NgoProvider, private sharedProvider: SharedProvider) {
      this.getMyNgo();
  }

  getMyNgo(){
    this.sharedProvider.showLoader()
    this.token = localStorage.getItem('token')
    this.ngoProvider.getUserNgo(this.token).then(result=>{
      this.sharedProvider.dismissLoader()
      this.ngoLists = result
      console.log(this.ngoLists)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NgoPage');
  }

  delete(userNgoId){
    this.token = localStorage.getItem('token')
    this.data = {
      "userNgoId": userNgoId
    };
    this.sharedProvider.showLoader()
    this.ngoProvider.deleteNgo(this.token, this.data).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.setRoot(this.navCtrl.getActive().component)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }

  openNgoForm(){
    let modal = this.modalCtrl.create(NgoformPage)
    modal.onDidDismiss(()=>{
      this.getMyNgo()
    })
    modal.present()
  }

}
