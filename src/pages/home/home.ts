import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Slides } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { DonationProvider } from '../../providers/donation/donation';
import { UpdateProvider } from '../../providers/update/update';
import { UserProvider } from '../../providers/user/user';
import { SocialSharing } from '../../../node_modules/@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  
  public workoutProgress: string = '0' + '%';
  token: any
  latestUpdates: any
  recentDonations: any
  leaderBoardResp: any
  data: any
  userName: any
  userImage: any
  userId: any
  keys: any

  public achievement: any = {
    achieved: '',
    target: '',
    total: ''
  }

  constructor(public navCtrl: NavController, private menu:MenuController, private sharedProvider: SharedProvider,
    private donationProvider: DonationProvider, private updateProvider: UpdateProvider, private userProvider: UserProvider,
    private socialSharing: SocialSharing) {
    this.menu.enable(true)
    this.data = {
      'campaignId': 1,
      'projectId': 110
    };
    this.userName = localStorage.getItem('fullName')
    this.userImage = localStorage.getItem('image')
    this.userId = localStorage.getItem('userId')
    this.token = localStorage.getItem('token')
    this.dashboard()
  }

  dashboard(){
    this.sharedProvider.showLoader()
    this.updateProvider.latestUpdates(this.token).then(result=>{this.latestUpdates = result})
    this.donationProvider.recentDonation(this.token, this.data).then(res=>{this.recentDonations=res})
    this.userProvider.leaderBoardPosition(this.token).then(res=>{
      this.leaderBoardResp=res
      this.keys = Object.keys(this.leaderBoardResp)
    })
    this.donationProvider.achievements(this.token, this.data).then(res=>{
      console.log(res)
      this.achievement=res
      this.workoutProgress = this.achievement.percentage + '%'
    })
    this.sharedProvider.dismissLoader()
  }

  share(){
    let message = 'Donate to the cause'
    let subject = ''
    let file = 'https://www.unitedwaymumbai.org/images/tmm2017/logos2.png'
    let url = 'http://www.unitedwaymumbai.org/tmm-fundraiser-'+this.userId
    this.socialSharing.share(message, subject, file, url)
  }

  convertToInt(val){
    return parseInt(val)
  }

  
}
