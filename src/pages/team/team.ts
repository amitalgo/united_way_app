import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedProvider } from '../../providers/shared/shared';
import { TeamProvider } from '../../providers/team/team';
import { TeamformPage } from '../teamform/teamform';

/**
 * Generated class for the TeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  teamMembers: any
  response: any
  token: any
  data: any
  keys: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedProvider: SharedProvider,
  private teamProvider: TeamProvider) {
    this.token = localStorage.getItem('token')    
  }

  getAllTeamMembers(){
    this.sharedProvider.showLoader()
    this.teamProvider.allTeamMembers(this.token).then(result=>{
      this.sharedProvider.dismissLoader()
      if(result){
        this.teamMembers = result
        this.keys = Object.keys(this.teamMembers)
      }
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
    })
  }

  teamMemberDetail(key){
    this.navCtrl.push(TeamformPage,{
      'teamMemberDetail': this.teamMembers[key]
    })
  }

  openForm(){
    this.navCtrl.push(TeamformPage)
  }

  ionViewWillEnter(){
    this.getAllTeamMembers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
  }

}
