import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TeamProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TeamProvider {

  apiUrl= 'http://unitedway.technople.in/index.php?modules=api&'

  constructor(public http: HttpClient) {
    console.log('Hello TeamProvider Provider');
  }

  allTeamMembers(token){
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+'controller=team&action=myteam',{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }

  addTeamMember(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=team&action=add',JSON.stringify(data),{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token).set('Content-Type', 'application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }

  updateTeamMember(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=team&action=updateteam',JSON.stringify(data),{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token).set('Content-Type', 'application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })  
  }

  deleteTeamMember(token, data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=team&action=deleteteam',JSON.stringify(data),{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token).set('Content-Type', 'application/json')
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })    
  }

  uploadTeamMemberImage(token, formData){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+'controller=team&action=updateimage', formData,{
        headers: new HttpHeaders().set('Accept','application/json').set('Token', token)
      }).subscribe(res=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })     
  }
}
