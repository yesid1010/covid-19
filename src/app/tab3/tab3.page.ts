import { Component } from '@angular/core';
import { CovidService } from '../services/covid.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {
  public pais:string='';
  public datos:any;
  private latitud:number;
  private longitud:number;



  constructor(private service:CovidService,private geo:Geolocation,private natgeo:NativeGeocoder) {
    
     this.geo.getCurrentPosition().then((data=>{
       console.log(data.coords.latitude,+'=>',data.coords.longitude);
       this.latitud = data.coords.latitude;
       this.longitud = data.coords.longitude;
       this.obtenerPais()
     }))

    
    
  }


  obtenerPais(){
    let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
    this.natgeo.reverseGeocode(this.latitud, this.longitud, options)
    .then((data:NativeGeocoderResult[])=>{
      console.log((data[0].countryName));
      this.pais = data[0].countryName
      this.getCountrie()
    })
    .catch(err => console.log('ha ocurrido un error',err))

  }

  ionViewWillEnter() {
  //  this.getCountrie()
  }
  

  async getCountrie(){
    this.datos = await this.service.getCountrie(this.pais).toPromise() || []
  }
}
