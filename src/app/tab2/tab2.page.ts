
import { CovidService } from '../services/covid.service';
import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public paises: any[] = [];
  public post: number = 10;
  public datos = true;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public service:CovidService) {
   // this.getCountries()
  // this.service.getAllCountries();
    this.getContries()
  }

  ionViewWillEnter() {
   // this.getContries()
  }

  getContries(){
    for (let i = 0; i < this.post; i++) {
          this.paises.push(this.service.paises[i])
    }
    this.post = this.paises.length;
    console.log(this.post);
  }

  cargarmas(){

    for (let i = this.post; i < this.post+70; i++) {
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
      let data:any = this.paises
      if (data.length == 5) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
