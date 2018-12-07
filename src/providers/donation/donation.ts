import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DonationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DonationProvider {

  apiUrl= 'http://unitedway.technople.in/index.php?modules=api&'

  constructor(public http: HttpClient) {
    console.log('Hello DonationProvider Provider');
  }

  getDonations(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=donation&action=mydonation',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }

  getDonarDetail(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=donation&action=donationdetail',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    }) 
  }

  recentDonation(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=donation&action=recentdonation',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    }) 
  }

  achievements(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=donation&action=achievement',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })   
  }

  prefixedDonation(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=prefixedDonation&action=lists',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    }) 
  }

  deletePrefixedDonation(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=prefixedDonation&action=delete',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }

  addPrefixedDonation(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=prefixedDonation&action=add',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }


  saveOfflineDonation(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=donation&action=offlineadd',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }
}
