import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImgService } from 'src/app/services/car-img.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {


  cars:CarDetail[] = [];
  carImgs:CarImage[]=[];
  
  dataLoaded = false;
  loadImgs = false;

  filterText = "";

  constructor(private carService:CarService, private carImgService:CarImgService ,private activatedRoute:ActivatedRoute) { }

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
    
  }

  getCars(){
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
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

  

}
