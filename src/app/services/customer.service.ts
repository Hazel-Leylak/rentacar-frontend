import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl:string = "https://localhost:44319/api/customers/";

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let urlPath = this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Customer>>(urlPath);
  }

  getCustomerById(customerId:number){
    let urlPath = this.apiUrl + "getbyid?customerId="+customerId;
    return this.httpClient.get<SingleResponseModel<Customer>>(urlPath);
  }
}
