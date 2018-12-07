import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CampaignProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CampaignProvider {

  apiUrl= 'http://unitedway.technople.in/index.php?modules=api&'

  constructor(public http: HttpClient) {
    console.log('Hello CampaignProvider Provider');
  }

  getCorporates(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=corporate&action=lists',{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }

  getAppeal(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=campaign&action=myappeal',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    }) 
  }

  saveAppeal(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=campaign&action=updatemyappeal',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    }) 
  }

}
