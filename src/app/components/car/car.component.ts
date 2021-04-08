import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImgService } from 'src/app/services/car-img.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  
  carUpdateForm:FormGroup;
  carDeleteForm:FormGroup;
  cars:CarDetail[] = [];
  carImgs:CarImage[]=[];
  selectedCar:Car;

  brands:Brand[];
  colors:Color[];
  
  dataLoaded = false;
  loadImgs = false;

  filterText = "";

  constructor(private carService:CarService, private carImgService:CarImgService ,private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder, private colorService:ColorService, private brandService:BrandService, private router:Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandColor(params["brandId"],params["colorId"]);
      }
      
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }

      else{
        this.getCars();
      }
    })
    this.getBrands();
    this.getColors();
  }

  getCars(){
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data;
      
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrandColor(brandId:number, colorId:number){
    this.carService.getCarsByBrandAndColor(brandId,colorId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded  = true;
    })
  }

  // createColorAddForm(){
  //   this.carAddForm = this.formBuilder.group({
  //     brandId: ["", Validators.required],
  //     colorId: ["", Validators.required],
  //     carName: ["", Validators.required],
  //     modelYear:["", Validators.required],
  //     dailyPrice:["", Validators.required],
  //     description:[""]
  //   });
  // }

  setSelectedCarUpdate(car:Car){
    this.selectedCar = car;    
    this.createCarUpdateForm();
    console.log(this.selectedCar);
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId: [this.selectedCar.carId, Validators.required],
      brandId: [this.selectedCar.brandId, Validators.required],
      colorId: [this.selectedCar.colorId, Validators.required],
      carName: [this.selectedCar.carName, Validators.required],
      modelYear:[this.selectedCar.modelYear, Validators.required],
      dailyPrice:[this.selectedCar.dailyPrice, Validators.required],
      description:[this.selectedCar.description]
    })
    
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({}, this.carUpdateForm.value);
      console.log(Object.assign({}, this.carUpdateForm.value))
      this.crud("update",carModel);
    }
    else{
      this.toastrService.error("Form is invalid");
    }
  }

  setSelectedCarDelete(car:Car){
    this.selectedCar = car;
    this.createCarDeleteForm();
    console.log(this.selectedCar);

  }

  createCarDeleteForm(){
    this.carDeleteForm = this.formBuilder.group({
      carId: [this.selectedCar.carId, Validators.required],
      brandId: [this.selectedCar.brandId, Validators.required],
      colorId: [this.selectedCar.colorId, Validators.required],
      carName: [this.selectedCar.carName, Validators.required],
      modelYear:[this.selectedCar.modelYear, Validators.required],
      dailyPrice:[this.selectedCar.dailyPrice, Validators.required],
      description:[this.selectedCar.description]
    })
  }

  delete(){
    if(this.carDeleteForm.valid){
     let carModel = Object.assign({}, this.carDeleteForm.value);
     console.log(Object.assign({}, this.carDeleteForm.value));
     this.crud("delete", carModel);
     }
     else{
       this.toastrService.error("Form is invalid");
     }

   }

  addCar(){
    this.router.navigate(['/cars/add']);
  }

  crud(operation:string, model:any){
    this.carService.crud(model,operation).subscribe(response=>{
      this.toastrService.success(response.message,"Success");
    }, responseError=>{
      if(responseError.error.ValidationErrors.length>0){
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error");

        }
      }
    })
  }

  

}
