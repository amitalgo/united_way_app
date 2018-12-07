import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { PrefixdonationPage } from '../prefixdonation/prefixdonation';
import { SharedProvider } from '../../providers/shared/shared';
import { CampaignProvider } from '../../providers/campaign/campaign';

@IonicPage()
@Component({
  selector: 'page-appeal',
  templateUrl: 'appeal.html',
})
export class AppealPage {

  appealForm: FormGroup
  corporates: any
  token: any
  data: any
  response: any
  appealResp: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private modalCtrl: ModalController, private sharedProvider: SharedProvider, private campaignProvider: CampaignProvider) {
    this.appealForm = this.formBuilder.group({
      intro: ['', Validators.required],
      appeal: ['', Validators.required],
      target: ['', Validators.required],
      corporateId: [''],
      id: ['']
    })
    this.token = localStorage.getItem('token')
    this.data = {
      'campaignId': 1,
      'projectId': 110
    }
    this.getAllCorporates()
  }

  getAllCorporates(){
    this.sharedProvider.showLoader()
    this.campaignProvider.getCorporates(this.token).then(result=>{
      this.sharedProvider.dismissLoader()
      this.corporates = result
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      console.log(err)
    })
  }

  openFundraiserSegment(){

  }

  doSave(){
    this.sharedProvider.showLoader()
    this.campaignProvider.saveAppeal(this.token, this.appealForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.setRoot(this.navCtrl.getActive().component)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
    })
  }

  openPrefixedDonation(){
    let modal = this.modalCtrl.create(PrefixdonationPage)
    modal.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppealPage');
  }

  ionViewWillEnter(){
    this.campaignProvider.getAppeal(this.token, this.data).then(result=>{
      this.appealResp = result
      console.log(this.appealResp)
      this.appealForm.controls['id'].setValue(this.appealResp.id)
      this.appealForm.controls['intro'].setValue(this.appealResp.intro)
      this.appealForm.controls['appeal'].setValue(this.appealResp.appeal)
      this.appealForm.controls['target'].setValue(this.appealResp.target)
      if(this.appealResp.corp_id !== 0){
        this.appealForm.controls['corporateId'].setValue(this.appealResp.corp_id)
      }
    }).catch(err=>{
      console.log(err)
    })
  }

}
