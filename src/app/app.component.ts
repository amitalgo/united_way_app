import { Component, ViewChild, enableProdMode } from '@angular/core';
import { Nav, Platform, NavController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ContactPage } from '../pages/contact/contact';
import { AppealPage } from '../pages/appeal/appeal';
import { NgoPage } from '../pages/ngo/ngo';
import { DonationPage } from '../pages/donation/donation';
import { OfflinedonationPage } from '../pages/offlinedonation/offlinedonation';
import { ProfilePage } from '../pages/profile/profile';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { SharedProvider } from '../providers/shared/shared';
import { UpdatesPage } from '../pages/updates/updates';
import { TeamPage } from '../pages/team/team';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  user: any = {
    'image': '../assets/imgs/profile-pic.png',
    'fullName': 'Aditya',
    'email': 'aditya@technople.in'
  };
  token: any;
  isLoggedIn: any;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private event: Events, public sharedProvider: SharedProvider,private userProvider: UserProvider) {
    if (platform.is('ios')
      || platform.is('android')
      || platform.is('windows')) {
      enableProdMode();
    }
    this.user = sharedProvider.getUserInfo()
    console.log(this.user)
    this.initializeApp();
    event.subscribe('user:updated',()=>{
      this.user = sharedProvider.getUserInfo()
    })
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: HomePage },
      { title: 'My Appeal/Target', component: AppealPage},
      { title: 'My NGOs', component: NgoPage},
      { title: 'My Updates', component: UpdatesPage},
      { title: 'My Team', component: TeamPage},
      { title: 'Donations', component: DonationPage},
      { title: 'Offline Donation', component: OfflinedonationPage},
      { title: 'My Account', component: ProfilePage},
      { title: 'ChangePassword', component: ChangepasswordPage },
      { title: 'Help', component: ContactPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isLoggedIn = this.sharedProvider.isLoggedIn();
      if(this.isLoggedIn){
        this.nav.setRoot(HomePage);
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  doLogout(){
    this.sharedProvider.showLoader()
    this.token = localStorage.getItem('token')
    this.userProvider.logout(this.token).then(result=>{
      this.sharedProvider.clearLocalStorage()
      this.sharedProvider.dismissLoader()
      this.nav.setRoot(LoginPage)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
    })

  }
}
