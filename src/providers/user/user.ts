import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  apiUrl= 'http://unitedway.technople.in/index.php?modules=api&'

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  authenticate(data){
    console.log(this.apiUrl)
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=user&action=login',JSON.stringify(data),{
        headers: new HttpHeaders().set('Access-Control-Allow-Origin','*').set('Content-Type','applicaton/json').set('Accept','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }

  detail(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=user&action=profile',{
        headers: new HttpHeaders().set('Access-Control-Allow-Origin','*').set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    }) 
  }

  leaderBoardPosition(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=user&action=position',{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })   
  }

  register(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=user&action=register',JSON.stringify(data),{
        headers: new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  updateProfile(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=user&action=updateprofile',JSON.stringify(data),{
        headers: new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }

  updateProfilePicture(token, formData){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=user&action=updateimage',formData,{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }

  updatePassword(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=user&action=changepassword',JSON.stringify(data),{
        headers: new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  forgotPassword(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=user&action=forgotpassword',JSON.stringify(data),{
        headers: new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })   
  }

  logout(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=user&action=logout',{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    }) 
  }
}
