import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UpdateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UpdateProvider {

  apiUrl= 'http://unitedway.technople.in/index.php?modules=api&'

  constructor(public http: HttpClient) {
    console.log('Hello UpdateProvider Provider');
  }

  allUpdates(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=updates&action=myupdates',{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }

  deleteUpdate(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=updates&action=delete',JSON.stringify(data),{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token).set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }

  saveUpdate(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=updates&action=add',JSON.stringify(data),{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token).set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }

  latestUpdates(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=updates&action=recentupdates',{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }
}
