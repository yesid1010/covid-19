
import { CovidService } from '../services/covid.service';
import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private paises: any[];
  public post: number = 10;
  public datos = true;

  items:any

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public service:CovidService,
              private loading:LoadingController,
              public toastController: ToastController) {
    //this.getContries()
  }

  ionViewWillEnter() {
    this.paises = []
    this.getContries()
  }

  
  BuscarPais(event){
    // console.log(event.target.value);
    // let pais = event.target.value;
    // console.log(event);
    // if(pais && pais.trim() != ''){
    //   this.paises = this.paises.filter((item)=>{
    //     return (item.country.toLowerCase().indexOf(pais.toLowerCase())>-1)
    //   })
    // }

  }

  getContries(){
    for (let i = 0; i < this.post; i++) {
          this.paises.push(this.service.paises[i])
    }
    this.post = this.paises.length;
    console.log(this.post);
  }

 async refresh(){
    this.post = 10;
    this.paises = []

    this.service.getAllCountries()

    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Espere un momento...',
      
      duration: 3000,
      
    });

    await loading.present();

    this.getContries()

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

    const toast = await this.toastController.create({
      message: 'Datos Actualizados',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  cargarmas(){

    for (let i = this.post; i < this.post+10; i++) {
      if( i < this.service.paises.length){
         this.paises.push(this.service.paises[i])
      }else{
        this.datos = false;
        break;
      }
  
    }
    this.post = this.paises.length;
    console.log(this.post);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      this.cargarmas()
      let data:any = this.paises
      if (data.length == 5) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
