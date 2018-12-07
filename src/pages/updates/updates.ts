import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { UpdateProvider } from '../../providers/update/update';
import { UpdateformPage } from '../updateform/updateform';

/**
 * Generated class for the UpdatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updates',
  templateUrl: 'updates.html',
})
export class UpdatesPage {

  token: any
  updates: any
  data: any
  response: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedProvider: SharedProvider,
  private updateProvider: UpdateProvider, private modalCtrl:ModalController) {
    this.token = localStorage.getItem('token')
  }

  getAllUpdates(){
    this.sharedProvider.showLoader()
    this.updateProvider.allUpdates(this.token).then(result=>{
      this.sharedProvider.dismissLoader()
      this.updates = result
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }

  ionViewWillEnter(){
    this.getAllUpdates();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatesPage');
  }

  delete(update){
    this.data = {
      'update':update
    };
    this.sharedProvider.showLoader()
    this.updateProvider.deleteUpdate(this.token, this.data).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.setRoot(this.navCtrl.getActive().component)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
      this.sharedProvider.presentToast("Something went wrong!")
    })
  }

  openUpdateForm(){
    // let modal = this.modalCtrl.create(UpdateformPage)
    // modal.onDidDismiss(()=>{
    //   this.getAllUpdates()
    // })
    // modal.present()
    this.navCtrl.push(UpdateformPage)
  }

}
