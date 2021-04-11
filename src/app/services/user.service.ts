import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserUpdateModel } from '../models/userUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetail?:User | undefined
  apiUrl = "https://localhost:44319/api/users/";
  constructor(private httpClient:HttpClient) { }

  getByMail(email:string):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"getbymail?email="+email);
  }

  updateUserDetails(userDataModel:UserUpdateModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", userDataModel);
  }
}
