import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService,
    private toastrService:ToastrService,private router:Router, private localStorageService:LocalStorageService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message);
        localStorage.setItem("token", response.data.token);
        //this.localStorageService.set("currentUser",this.loginForm.get('email')?.value);
        this.getUser();
        this.router.navigate(["cars"]);
      },responseError=>{
        //console.log(responseError.error); --refactor
        this.toastrService.error(responseError.error)
      })
    }
    else{
      
      console.log("başarısız");
    }
  }

  getUser(){
    // this.userService.getByMail(this.loginForm.get('email')?.value).subscribe(response=>{
    //   this.userService.userDetail = response.data;
    // })
    this.userService.getByMail(this.loginForm.get('email')?.value).subscribe(response=>{
      this.userService.userDetail = response.data
      console.log(this.userService.userDetail)
      localStorage.setItem('user-data',JSON.stringify(this.userService.userDetail));
    })
    
  }

}
