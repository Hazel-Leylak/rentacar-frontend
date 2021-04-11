import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands:Brand[]=[];
  brandAddForm:FormGroup;

  constructor(private brandService:BrandService) { }

    ngOnInit(): void {
      this.getBrands();
    }
  
    getBrands(){
      this.brandService.getBrands().subscribe((response) => {
        this.brands = response.data;
      })
    }


  


}
