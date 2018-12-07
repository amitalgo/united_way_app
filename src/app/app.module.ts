import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { ContactPage } from '../pages/contact/contact';
import { AppealPage } from '../pages/appeal/appeal';
import { FundraisersegmentPage } from '../pages/fundraisersegment/fundraisersegment';
import { PrefixdonationPage } from '../pages/prefixdonation/prefixdonation';
import { PrefixeddonationformPage } from '../pages/prefixeddonationform/prefixeddonationform';
import { NgoPage } from '../pages/ngo/ngo';
import { NgoformPage } from '../pages/ngoform/ngoform';
import { DonationPage } from '../pages/donation/donation';
import { DonardetailPage } from '../pages/donardetail/donardetail';
import { OfflinedonationPage } from '../pages/offlinedonation/offlinedonation';
import { ProfilePage } from '../pages/profile/profile';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { UpdatesPage } from '../pages/updates/updates';
import { UpdateformPage } from '../pages/updateform/updateform';
import { TeamPage } from '../pages/team/team';
import { TeamformPage } from '../pages/teamform/teamform';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { SharedProvider } from '../providers/shared/shared';
import { NgoProvider } from '../providers/ngo/ngo';
import { DonationProvider } from '../providers/donation/donation';
import { UpdateProvider } from '../providers/update/update';
import { CampaignProvider } from '../providers/campaign/campaign';
import { TeamProvider } from '../providers/team/team';
import { PasswordValidationProvider } from '../providers/password-validation/password-validation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ForgotpasswordPage,
    ContactPage,
    AppealPage,
    FundraisersegmentPage,
    PrefixdonationPage,
    PrefixeddonationformPage,
    NgoPage,
    NgoformPage,
    DonationPage,
    DonardetailPage,
    OfflinedonationPage,
    ProfilePage,
    ChangepasswordPage,
    UpdatesPage,
    UpdateformPage,
    TeamPage,
    TeamformPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ForgotpasswordPage,
    ContactPage,
    AppealPage,
    FundraisersegmentPage,
    PrefixdonationPage,
    PrefixeddonationformPage,
    NgoPage,
    NgoformPage,
    DonationPage,
    DonardetailPage,
    OfflinedonationPage,
    ProfilePage,
    ChangepasswordPage,
    UpdatesPage,
    UpdateformPage,
    TeamPage,
    TeamformPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    SharedProvider,
    NgoProvider,
    DonationProvider,
    UpdateProvider,
    CampaignProvider,
    TeamProvider,
    PasswordValidationProvider
  ]
})
export class AppModule {}
