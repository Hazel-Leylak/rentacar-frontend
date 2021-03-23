import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImgService {

  apiUrl = "https://localhost:44319/api/";
  constructor(private httpClient:HttpClient) { }

  getCarImages():Observable<ListResponseModel<CarImage>>{
    let path = this.apiUrl + "carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(path);
  }

  getCarImagesById(carId:number):Observable<ListResponseModel<CarImage>>{
    let path = this.apiUrl+"carimages/getimgsbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(path);
  }
}
