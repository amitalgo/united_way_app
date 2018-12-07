import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NgoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NgoProvider {

  apiUrl= 'http://unitedway.technople.in/index.php?modules=api&'

  constructor(public http: HttpClient) {
    console.log('Hello NgoProvider Provider');
  }

  getAllNgo(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=ngo&action=lists',{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }

  getUserNgo(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=ngo&action=myngo',{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }

  addNgo(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=ngo&action=add',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  deleteNgo(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=ngo&action=delete',JSON.stringify(data),{
        headers: new HttpHeaders().set('Token',token).set('Accept','application/json').set('Content-Type','application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }
}
