import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImgService } from 'src/app/services/car-img.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetail:Car;
  cars:CarDetail[] = [];
  carImgs:CarImage[]=[];
  rentalStatus = false;
  rentalStatusMsg = "";
  carImgPath = "https://localhost:44319"
  constructor(private carDetailService:CarDetailService, private carImgService:CarImgService, private rentalService:RentalService,
    private activatedRoute:ActivatedRoute, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
         this.getCarDetails(params["carId"]);
         this.getCarImagesById(params["carId"]);
         this.getCarRentalStatus(params["carId"]);
       }
    })
  }

  getCarDetails(carId:number){
    this.carDetailService.getCarDetails(carId).subscribe(response=>{
      this.cars = response.data;
    })
  }

  getCarImagesById(carId:number){
    this.carImgService.getCarImagesById(carId).subscribe(response=>{
      this.carImgs = response.data;
      console.log("imgs display")
    })
  }

  sliderItemActive(index: number){
    if(index === 0){
      return "carousel-item active";
    }
    else{
      return "carousel-item";
    }
  } 

  getCarRentalStatus(carId:number){
    this.rentalService.getRentalStatus(carId).subscribe(response=>{
      this.rentalStatus = response.success;
    },responseError=>{
      if(responseError.error){
        console.log(responseError.error.message)
        this.toastrService.error(responseError.error.message,"Rental Error")          
        this.rentalStatusMsg = responseError.error.message;
        
      }
      })
  }


}
