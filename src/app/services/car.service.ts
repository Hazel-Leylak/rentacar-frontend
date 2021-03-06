import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  getCarById(carId:number){
    return this.httpClient.get<SingleResponseModel<Car>>(this.apiUrl + "getbyid");
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let path = this.apiUrl + "getdetailsbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let path = this.apiUrl + "getdetailsbycolor?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  getCarsByBrandAndColor(brandId:number, colorId:number):Observable<ListResponseModel<CarDetail>>{
    let path = this.apiUrl + "getbybrandcolor?brandId=" + brandId +"&colorId=" + colorId;
    console.log(path)
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", car);
  }

  crud(car:Car, operation:string):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + operation, car);
  }



  
}
