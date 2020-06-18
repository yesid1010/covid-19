import { Component } from '@angular/core';
import { CovidService } from '../services/covid.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoadingController,ToastController } from '@ionic/angular';

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



  constructor(private service:CovidService,
              private geo:Geolocation,
              private natgeo:NativeGeocoder,
              private loading:LoadingController,
              public toastController: ToastController) {
    
     this.geo.getCurrentPosition().then((data=>{
       this.latitud = data.coords.latitude;
       this.longitud = data.coords.longitude;
       this.obtenerPais()
     }))
     .catch(err => console.log('ha ocurrido un error',err))

  }

  async refresh(){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Espere un momento...',
      duration: 2000
    });

    await loading.present();
    this.getCountrie()
    .then(() => console.log('datos actualizados'))

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    const toast = await this.toastController.create({
      message: 'Datos Actualizados',
      duration: 2000,
      position: 'top'
    });
    toast.present();
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
