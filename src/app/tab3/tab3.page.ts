import { Component } from '@angular/core';
import { CovidService } from '../services/covid.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public pais:string='colombia';
  public datos:any;
  constructor(private service:CovidService) {
    this.getCountrie()
  }

  ionViewWillEnter() {
    this.getCountrie()
  }
  
  async getCountrie(){
    this.datos = await this.service.getCountrie(this.pais).toPromise() || []
  }
}
