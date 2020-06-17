import { Component } from '@angular/core';
import { CovidService } from '../services/covid.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public datos:any;
  constructor(private service:CovidService) {
    this.getAll()
  }

  ionViewWillEnter() {
    this.getAll()
  }

  async getAll(){
    this.datos = await this.service.getAll().toPromise() || [];
  }

}
