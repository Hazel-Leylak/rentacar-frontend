import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44319/api/colors/"
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ColorResponseModel>{
    let urlPath = this.apiUrl+"getall";
    return this.httpClient.get<ColorResponseModel>(urlPath);
  }
}
