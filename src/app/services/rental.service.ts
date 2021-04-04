import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44319/api/rentals/";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetail>>{
    let urlPath = this.apiUrl + "getdetails";
    return this.httpClient.get<ListResponseModel<RentalDetail>>(urlPath);
  }

  getRentalStatus(carId:number):Observable<ListResponseModel<RentalDetail>>{
    let urlPath = this.apiUrl + "checkstatus?carId=" +carId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(urlPath);
  }
}
