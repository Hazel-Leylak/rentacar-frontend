import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userData$ : Observable<User>;
  user:User | undefined = this.userService.userDetail;
  //userx : Observable<User> = this.authService.getUser();
  firstName:string =".";

  constructor(private authService:AuthService, private router:Router, private userService:UserService, private localStorage:LocalStorageService) { }

  ngOnInit() {
    //console.log(this.userService.getByMail(this.localStorage.get("currentUser")))
    this.getCurrentUser();
    //this.user = this.userService.userDetail;
    
    this.userData$ = this.authService.CurrentUser;
    
  }


  isAuthenticated(){
    
    return this.authService.isAuthenticated();
  }

   getCurrentUser(){  
     if(this.authService.isAuthenticated()){
        this.userService.getByMail(this.localStorage.get("currentUser")).subscribe(response=>{
           this.user = response.data;
           
         })
        console.log("run")
       // this.user = this.userService.userDetail;
       // this.firstName = this.user.firstName
       //  console.log(this.authService.getUser())
       
     // console.log("userService")
     // this.user = this.userService.userDetail;
     // this.user = JSON.parse(sessionStorage.getItem('user-data'));
     // this.firstName = this.user.firstName;
     // console.log(this.firstName)
   }
   console.log("dont run")
   }

  onLogout(){
    this.authService.logout();
  }


}
