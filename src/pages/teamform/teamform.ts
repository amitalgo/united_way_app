import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedProvider } from '../../providers/shared/shared';
import { TeamProvider } from '../../providers/team/team';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';

/**
 * Generated class for the TeamformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teamform',
  templateUrl: 'teamform.html',
})
export class TeamformPage {

  teamMemberDetail: any = {
    name: ''
  }
  teamForm: FormGroup
  teamMemberImage: any = null
  token: any
  response: any
  teamMemberId: any = ''
  data: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
  private sharedProvider: SharedProvider, private teamProvider: TeamProvider, private actionSheetCtrl: ActionSheetController,
  private camera: Camera, private file: File) {
    this.teamMemberDetail = navParams.get('teamMemberDetail')
    this.token = localStorage.getItem('token')

    if(this.teamMemberDetail != null){
      this.teamMemberImage = this.teamMemberDetail.imagefile
      this.teamMemberId = this.teamMemberDetail.sr_no
      this.teamForm = this.formBuilder.group({
        teamId: [this.teamMemberDetail.sr_no],
        name: [this.teamMemberDetail.name, Validators.required]
      })
    }else{
      this.teamForm = this.formBuilder.group({
        teamId: [''],
        name: ['', Validators.required]
      })  
    }
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
          text: 'Photo Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    var options:CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData.substr(0, imageData.lastIndexOf('/') + 1))
      console.log(imageData);
      this.uploadFile(imageData)
    }, (err) => {
      console.log(err);
      this.sharedProvider.presentToast(err);
    });
  }

  uploadFile(imageData){
    this.sharedProvider.showLoader()
    this.file.resolveLocalFilesystemUrl(imageData).then(entry=>(<FileEntry>entry).file(file=>this.readFile(file))).catch(err=>console.log(err))
  }

  readFile(file){
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('image', imgBlob, file.name);
      formData.append('teamId', this.teamForm.controls['teamId'].value)
      console.log(JSON.stringify(formData))
      this.teamProvider.uploadTeamMemberImage(this.token,formData).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response = result
        this.sharedProvider.presentToast(this.response.message)
        this.navCtrl.pop()
      },(err)=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!");
        console.log(err)
      })
    };
    reader.readAsArrayBuffer(file);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamformPage');
  }

  doSave(){
    this.sharedProvider.showLoader()
    let teamId = this.teamForm.controls['teamId'].value
    if(teamId != ''){
      console.log(this.teamForm.value)
      this.teamProvider.updateTeamMember(this.token, this.teamForm.value).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response = result
        this.sharedProvider.presentToast(this.response.message)
        this.navCtrl.pop()
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
      })
    }else{
      this.teamProvider.addTeamMember(this.token, this.teamForm.value).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response = result
        this.sharedProvider.presentToast(this.response.message)
        this.navCtrl.pop()
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went wrong!")
      }) 
    }
  }

  delete(teamMemberId){
    this.sharedProvider.showLoader()
    this.data = {
      'teamId': teamMemberId
    }
    this.teamProvider.deleteTeamMember(this.token, this.data).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.pop()
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
    })
  }
}
