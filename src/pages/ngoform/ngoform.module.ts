import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgoformPage } from './ngoform';

@NgModule({
  declarations: [
    NgoformPage,
  ],
  imports: [
    IonicPageModule.forChild(NgoformPage),
  ],
})
export class NgoformPageModule {}
