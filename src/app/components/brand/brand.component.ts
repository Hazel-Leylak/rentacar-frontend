import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
  currentBrand:Brand;
  brandAddForm:FormGroup;
  brandUpdateForm:FormGroup
  brandDeleteForm:FormGroup;
  selectedBrand:Brand;

  constructor(private brandService:BrandService, private toastrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getBrands();
    this.createBrandAddForm()
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    })
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }

  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.crud("add",brandModel);
     }
     else{
       this.toastrService.error("Form is invalid");
     }
  }

  setSelectedBrandUpdate(brand:Brand){
    this.selectedBrand = brand;
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId:[this.selectedBrand.brandId, Validators.required],
      brandName: [this.selectedBrand.brandName, Validators.required]
    })
    console.log(Object.assign({}, this.brandUpdateForm.value))
  }

  update(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.crud("update",brandModel);
    }
    else{
      this.toastrService.error("Form is invalid");
    }
  }

  setSelectedBrandDelete(brand:Brand){
    this.selectedBrand = brand;
    this.createBrandDeleteForm();
  }

  createBrandDeleteForm(){
    this.brandDeleteForm = this.formBuilder.group({
      brandId: [this.selectedBrand.brandId, Validators.required],
      brandName: [this.selectedBrand.brandName, Validators.required]
    })
  }

  delete(){
   if(this.brandDeleteForm.valid){
    let brandModel = Object.assign({}, this.brandDeleteForm.value);
    this.crud("delete", brandModel);
    }
    else{
      this.toastrService.error("Form is invalid");
    }
  }

  crud(operation:string, model:any){
    this.brandService.crud(model,operation).subscribe(response=>{
      this.toastrService.success(response.message,"Success");
    }, responseError=>{
      if(responseError.error.ValidationErrors.length>0){
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error");

        }
      }
    })
  }

  // getAllBrandClass(){
  //   if(!this.currentBrand){
  //     return "list-group-item active"
  //   }
  //   else{
  //     return "list-group-item"
  //   }
  // }

  // getCurrentBrandClass(brand:Brand){
  //   if( brand == this.currentBrand){
  //     return "list-group-item active"
  //   }
  //   else{
  //     return "list-group-item"
  //   }
  // }

  // setCurrentBrand(brand:Brand){
  //   this.currentBrand = brand;
  // }


}
