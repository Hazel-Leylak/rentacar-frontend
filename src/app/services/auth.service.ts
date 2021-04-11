import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { UserUpdateModel } from '../models/userUpdateModel';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user-data')));
  
  apiUrl = "https://localhost:44319/api/auth/";
  //user:User;
  constructor(private httpClient:HttpClient, private userService:UserService, private localStorageService:LocalStorageService) {}

  login(loginModel:LoginModel){
    
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){ 
      this.user.next(JSON.parse(localStorage.getItem('user-data')));
      return true;
    }
    else{
      return false;
    }
  }

  getUser(){ 
  //    let userModel
  //    this.userService.getByMail(this.localStorage.get("currentUser")).subscribe(response=>{
  //      userModel =  response.data;
  //      console.log(userModel)
  //    })
  //  return userModel
  return this.userService.userDetail
   }

   logout(){
    
     localStorage.removeItem("user-data");
     localStorage.removeItem("token");
   }

   register(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "register",user)
  }

  updateUserDetail(user: User){
    this.localStorageService.set("user-data", user);
  }

  changePassword(userUpdateModel:UserUpdateModel):Observable<SingleResponseModel<User>>{
    return this.httpClient.post<SingleResponseModel<User>>(this.apiUrl + "changepassword",userUpdateModel);
  }
 

  get CurrentUser(){
     return this.user.asObservable();
   }

  

  
}
