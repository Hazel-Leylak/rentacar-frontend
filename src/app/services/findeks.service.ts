import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Findeks } from '../models/findeks';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {

  apiUrl:string = "https://localhost:44319/api/findeks/";

  constructor(private httpClient:HttpClient) { }

  getFindeksByCustomer(customerId:number){
    return this.httpClient.get<SingleResponseModel<Findeks>>(this.apiUrl + "getfindeks?customerId=" + customerId);
  }
}
