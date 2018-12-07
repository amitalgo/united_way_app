import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {

  loading: any;
  user:any;
  token: any;

  constructor(public http: HttpClient, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    console.log('Hello SharedProvider Provider');
  }
  
  getUserInfo(){
    this.user = {
      "userId": localStorage.getItem('userId'),
      "fullName": localStorage.getItem('fullName'),
      "email": localStorage.getItem('email'),
      "image": localStorage.getItem('image')
    }
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Processing..'
    });
    this.loading.present()
  }

  dismissLoader(){
    this.loading.dismiss();
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    })

    toast.present();
  }

  public isLoggedIn(){
    this.token = localStorage.getItem('token')
    if(this.token){
      return true;
    }else{
      return false;
    }
  }

  public clearLocalStorage(){
    localStorage.clear()
    return true
  }
}
