import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  public paises :any[]=[]
  public URL:string = 'https://disease.sh/v2/';

  constructor(private http:HttpClient) {
    this.getAllCountries()
   }

  getAll(){
    return this.http.get(this.URL+'all');
  }

  getAllCountries(){
    return this.http.get(this.URL+'countries?sort=cases').subscribe((data:any)=>{
      this.paises = data
    })
  }

  getCountrie(pais:string){
    return this.http.get(this.URL+'countries/'+pais)
  }

}
