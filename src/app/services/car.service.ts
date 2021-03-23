import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  
  apiUrl = "https://localhost:44319/api/cars/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let path = this.apiUrl+"getallcarsdetail";
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let path = this.apiUrl + "getdetailsbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let path = this.apiUrl + "getdetailsbycolor?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }



  
}
