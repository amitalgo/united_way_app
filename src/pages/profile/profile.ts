import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedProvider } from '../../providers/shared/shared';
import { UserProvider } from '../../providers/user/user';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileForm: FormGroup
  token: any
  userDetail: any
  response: any
  avatar: any = ''

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
  private sharedProvider: SharedProvider, private userProvider: UserProvider, private actionSheetCtrl: ActionSheetController,
  private camera: Camera, private file: File) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      aboutMe: [''],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      city: [''],
      state: [''],
      country: [''],
      pinCode: [''],
      nationality: ['', Validators.required],
      telephone: ['', Validators.required]
    })
    this.token = localStorage.getItem('token')
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
      this.userProvider.updateProfilePicture(this.token, formData).then(result=>{
        this.sharedProvider.dismissLoader()
        this.response = result
        this.sharedProvider.presentToast(this.response.message)
        this.navCtrl.setRoot(this.navCtrl.getActive().component)
      }).catch(err=>{
        this.sharedProvider.dismissLoader()
        this.sharedProvider.presentToast("Something went Wrong!")
        console.log(err)
      })
    };
    reader.readAsArrayBuffer(file);
  }

  doSave(){
    this.sharedProvider.showLoader()
    this.userProvider.updateProfile(this.token, this.profileForm.value).then(result=>{
      this.sharedProvider.dismissLoader()
      this.response = result
      this.sharedProvider.presentToast(this.response.message)
      this.navCtrl.setRoot(this.navCtrl.getActive().component)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter(){
    this.sharedProvider.showLoader()
    this.userProvider.detail(this.token).then(result=>{
      this.sharedProvider.dismissLoader()
      this.userDetail = result
      this.avatar = this.userDetail.img_file1
      this.profileForm.controls['fullName'].setValue(this.userDetail.name)
      this.profileForm.controls['email'].setValue(this.userDetail.email)
      this.profileForm.controls['aboutMe'].setValue(this.userDetail.about_me)
      this.profileForm.controls['dob'].setValue(this.userDetail.dob)
      this.profileForm.controls['address'].setValue(this.userDetail.address)
      this.profileForm.controls['city'].setValue(this.userDetail.city)
      this.profileForm.controls['state'].setValue(this.userDetail.state)
      this.profileForm.controls['country'].setValue(this.userDetail.country)
      this.profileForm.controls['pinCode'].setValue(this.userDetail.pincode)
      this.profileForm.controls['nationality'].setValue(this.userDetail.nationality)
      this.profileForm.controls['telephone'].setValue(this.userDetail.telephone)
    }).catch(err=>{
      this.sharedProvider.dismissLoader()
      this.sharedProvider.presentToast("Something went wrong!")
      console.log(err)
    })
  }

}
