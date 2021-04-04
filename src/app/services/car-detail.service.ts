import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = "https://localhost:44319/api/cars/"
  constructor(private httpClient:HttpClient) { }

    getCarDetails(carId:number):Observable<ListResponseModel<CarDetail>>{
    let path = this.apiUrl+"getdetailsbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getCarDetailsSingle(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let path = this.apiUrl + "getdetailsbyid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(path);
  }
}
