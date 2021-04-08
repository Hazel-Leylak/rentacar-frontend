import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];
  colorAddForm:FormGroup;
  selectedColor:Color;
  colorUpdateForm:FormGroup;
  colorDeleteForm:FormGroup;
  constructor(private colorService:ColorService, private toastrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getColors();
    this.createColorAddForm();
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data;
    })
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.crud("add",colorModel);
    //   this.colorService.add(colorModel).subscribe(response=>{
    //     this.toastrService.success(response.message,"Success");
    //   }, responseError=>{
    //     if(responseError.error.ValidationErrors.length>0){
    //       for(let i=0; i<responseError.error.ValidationErrors.length; i++){
    //         this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error");
    //       }
    //     }
    //   })
     }
     else{
       this.toastrService.error("Form is invalid");
     }
  }

  setSelectedColorUpdate(color:Color){
    this.selectedColor = color;
    console.log(color);
    this.createColorUpdateForm();
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:[this.selectedColor.colorId, Validators.required],
      colorName: [this.selectedColor.colorName, Validators.required]
    })
    console.log(Object.assign({}, this.colorUpdateForm.value))
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.crud("update",colorModel);
    }
    else{
      this.toastrService.error("Form is invalid");
    }
  }

  setSelectedColorDelete(color:Color){
    this.selectedColor = color;
    this.createColorDeleteForm();
  }

  createColorDeleteForm(){
    this.colorDeleteForm = this.formBuilder.group({
      colorId: [this.selectedColor.colorId, Validators.required],
      colorName: [this.selectedColor.colorName, Validators.required]
    })
  }

  delete(){
   if(this.colorDeleteForm.valid){
    let colorModel = Object.assign({}, this.colorDeleteForm.value);
    this.crud("delete", colorModel);
    }
    else{
      this.toastrService.error("Form is invalid");
    }
  }

  crud(operation:string, model:any){
    this.colorService.crud(model,operation).subscribe(response=>{
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
