import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];
  currentColor:Color;
  Filters = {brandId: '', colorId: ''};
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data;
    })
  }
  
  getAllColorClass(){
    if(!this.currentColor){
      console.log("get all color active")
      return "list-group-item active"
    }
    else{
      console.log("get all color diasctive")
      return "list-group-item"
    }
  }

  getCurrentColorClass(color:Color){
    if( color == this.currentColor){
      console.log(" get curretn color class: " + this.currentColor.colorName)
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  setCurrentColor(color:Color){
    console.log("set current color: " + color.colorName + color.colorId)
    this.currentColor = color;
  }

  

}
