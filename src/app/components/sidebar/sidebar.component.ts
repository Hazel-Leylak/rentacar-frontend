import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  colors: Color[];
  currentColor!:Color;
  brands: Brand[];
  currentBrand!:Brand;
  constructor(private brandService:BrandService, private colorService:ColorService, private router:Router, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data;
    })
  }

  // setCurrentBrand(brand:Brand){
  //   return(this.currentBrand == brand?true: false);
  // }

  // setCurrentColor(color:Color){
  //   return (this.currentColor == color? true: false);
  // }

  filter(){
    if (this.currentBrand !== null && this.currentBrand !== undefined && this.currentColor !== null && this.currentColor !== undefined) {
      let routePath =
        'cars/sidebar/' +
        this.currentBrand.brandId +
        '/' +
        this.currentColor.colorId;

        this.router.navigateByUrl(routePath);
    } 
    else if(this.currentBrand !== null && this.currentBrand !== undefined) {
      let routePath =
      'cars/brand/' + this.currentBrand.brandId;

      this.router.navigateByUrl(routePath);
    }
    else if(this.currentColor !== null && this.currentColor !== undefined) {
      let routePath =
      'cars/color/' + this.currentColor.colorId;

      this.router.navigateByUrl(routePath);
    }
     else{
       this.toastrService.warning('Please select filter parameter.');
     }
  }
  }


