import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonationfilterPage } from './donationfilter';

@NgModule({
  declarations: [
    DonationfilterPage,
  ],
  imports: [
    IonicPageModule.forChild(DonationfilterPage),
  ],
})
export class DonationfilterPageModule {}
