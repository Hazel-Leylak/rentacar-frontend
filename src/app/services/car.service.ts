import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailResponseModel } from '../models/carDetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  
  apiUrl = "https://localhost:44319/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<CarDetailResponseModel>{
    let path = this.apiUrl+"cars/getallcarsdetail";
    return this.httpClient.get<CarDetailResponseModel>(path);
  }
  
}
