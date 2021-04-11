import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserUpdateModel } from 'src/app/models/userUpdateModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userInfoForm:FormGroup
  changePasswordForm:FormGroup;
  user?:User
  userJSON?: User | undefined
  constructor(private formBuilder:FormBuilder, private localStorageService:LocalStorageService, private userService:UserService,
    private authService:AuthService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.getUserInformations();
    this.createUserUpdateForm();
    this.createChangePasswordForm();
  }

  createUserUpdateForm(){
    this.userInfoForm = this.formBuilder.group({
      userId: [this.user.userId, Validators.required],
      email: [this.user.email, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
    })
  }

  createChangePasswordForm(){
    this.changePasswordForm = this.formBuilder.group({
      userId: [this.user.userId, Validators.required],
      email: [this.user.email, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      password: ["", Validators.required]
    })
  }

  getUserInformations(){
    console.log("userdata")
    this.user = this.localStorageService.get('user-data')
  }

  updateUser(){
    if(this.userInfoForm.valid){
      let userModel: UserUpdateModel = this.userInfoForm.value;
      this.userService.updateUserDetails(userModel).subscribe(response=>{
        this.toastrService.success(response.message);
      },errorResponse=>{
        this.toastrService.error(errorResponse);
        console.log(errorResponse);
      })
      this.getUser();
      //localStorage.setItem('user-data', JSON.stringify(this.userJSON))
    }
    else{
      this.toastrService.warning("Form is invalid");
    }
  }

  changePassword(){
    if(this.userInfoForm.valid && this.changePasswordForm.valid){
      let userDataModel:UserUpdateModel = this.userInfoForm.value;
      userDataModel.password = this.changePasswordForm.get("userId").value;
     
      this.authService.changePassword(userDataModel).subscribe(response=>{
        this.toastrService.success(response.message);
      },errorResponse=>{
        this.toastrService.error(errorResponse);
        console.log(errorResponse);
      })
      this.getUser();
    }
    else{
      this.toastrService.warning("Form is invalid");
    }
  }

  getUser(){
    this.userService.getByMail(this.userInfoForm.get('email')?.value).subscribe(response=>{
      this.userService.userDetail = response.data
      this.userService.userDetail.email = this.userInfoForm.get("email").value;
      this.userService.userDetail.firstName = this.userInfoForm.get("firstName").value;
      this.userService.userDetail.lastName = this.userInfoForm.get("lastName").value;
      console.log(this.userService.userDetail)
      localStorage.setItem('user-data',JSON.stringify(this.userService.userDetail));
    })
}


}
