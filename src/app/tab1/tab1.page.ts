import { Component } from '@angular/core';
import { CovidService } from '../services/covid.service';
import { LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public datos:any;
  constructor(private service:CovidService,
              private loading:LoadingController,
              public toastController: ToastController) {
    this.getAll()
  }

 async refresh(){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Espere un momento...',
      duration: 2000
    });

    await loading.present();

    this.getAll()
    .then(()=>{
      console.log('datos actualizados')
    })

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

    const toast = await this.toastController.create({
      message: 'Datos Actualizados',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


  async getAll(){
    this.datos = await this.service.getAll().toPromise() || [];
  }


}
