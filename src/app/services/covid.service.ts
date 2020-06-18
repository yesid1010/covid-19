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

  // obtener todos los datos generales
  getAll(){
    return this.http.get(this.URL+'all');
  }

  // obtener los datos de los paises infectados con covid-19
  getAllCountries(){
    return this.http.get(this.URL+'countries?sort=cases').subscribe((data:any)=>{
      this.paises = data
    })
  }

  // obtener los datos de un pais en especifico
  getCountrie(pais:string){
    return this.http.get(this.URL+'countries/'+pais)
  }

}
