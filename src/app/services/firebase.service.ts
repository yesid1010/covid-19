import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public token:string="";

  constructor( private fcm: FCM) { 
    
  }

  ObtenerToken(){
    this.fcm.getToken()
    .then((token)=>{
      this.token = token;
    })
  }
}
