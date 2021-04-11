import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private userService:UserService, private toastrService:ToastrService,
    private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success(response.message);
        let loginModel = {email: this.registerForm.get('email').value, password: this.registerForm.get('password').value}
        console.log(loginModel);
        
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

        // this.authService.login(loginModel).subscribe(response=>{
        //   this.toastrService.info("Redirecting...")
        // });
      }, responseError=>{
        console.log(responseError)
        this.toastrService.error(responseError.error.message)
      })
    }
  }

  getUser(){

    this.userService.getByMail(this.registerForm.get('email')?.value).subscribe(response=>{
      this.userService.userDetail = response.data
      console.log(this.userService.userDetail)
      localStorage.setItem('user-data',JSON.stringify(this.userService.userDetail));
    })
    
  }

}
