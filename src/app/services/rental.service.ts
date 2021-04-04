import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44319/api/rentals/";
  rentalData?:Rental;

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetail>>{
    let urlPath = this.apiUrl + "getdetails";
    return this.httpClient.get<ListResponseModel<RentalDetail>>(urlPath);
  }

  getRentalStatus(carId:number):Observable<ListResponseModel<RentalDetail>>{
    let urlPath = this.apiUrl + "checkstatus?carId=" +carId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(urlPath);
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let urlPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(urlPath,rental);
  }
}
