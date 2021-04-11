
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { DatePipe } from '@angular/common';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { Findeks } from 'src/app/models/findeks';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  providers:[DatePipe]
})
export class RentalAddComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef
  @Input() car:CarDetail[];
  customers: Customer[];
  customerId:number;    
  rentalAddForm: FormGroup;
  closeAddExpenseModal: any;
  minDate:string | null; 
  rentDate:Date | null;
  endDate:Date | null;
  date:Date;
  totalPrice:number=0;
  totalDay:number=1;
  formCompleted = false;
  selectedCar:Car;
  customerFindeks:Findeks;


  constructor(private customerService: CustomerService,
    private formBuilder: FormBuilder,             
    private router: Router,
    private toastrService: ToastrService,
    private datePipe:DatePipe,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
    private findeksService:FindeksService,
    private carService:CarService) { }

  ngOnInit(): void {
    this.getCustomers();
    this.createRentalAddForm();
    
    
  }

  createRentalAddForm() {
     this.rentalAddForm = this.formBuilder.group({
    //   carId:this.activatedRoute.params.subscribe(params=>{
    //     params["carId"]
    //   }),
      carId: [this.car[0].carId, Validators.required],
      rentDate: [this.minDate, Validators.required],
      endDate: [this.minDate, Validators.required],
      customerId: ['', Validators.required],
      dailyPrice: [this.car[0].dailyPrice, Validators.required],
      totalPrice: [this.car[0].dailyPrice, Validators.required],
      totalDay: [1, Validators.required],
    });
  }



  rentalDateChangeEvent(event: any) {
    this.minDate = event.target.value;    
    this.rentDate=event.target.value;
  }
  endDateChangeEvent(event: any) {
    this.endDate = event.target.value;
    this.totalDay = this.calculatePrice();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe((response)=>{
      this.customers = response.data;
    })
  }

  calculatePrice(){
    if(this.rentDate != null && this.endDate != null){
      var date1:any = new Date(this.rentDate);
      var date2:any = new Date(this.endDate);
      var diffDays:any = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
      this.totalPrice = diffDays * this.car[0].dailyPrice;
      return diffDays;
    }
    else{
      this.toastrService.error("Dates were not chosen correctly.");
      return 0;
    }
  }

  isFindeksScoreEnough(carId:number, customerId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.selectedCar = response.data;
    })
    this.findeksService.getFindeksByCustomer(customerId).subscribe(response=>{
      this.customerFindeks = response.data;
    })
    // if(this.selectedCar.minFindeksScore <= this.customerFindeks.score){
    //   return true;
    // }
    // else{
    //   return false;
    // }
  }

 

  payment(){
    if (this.rentalAddForm.valid) {
      //sessionStorage.setItem('rental-data',JSON.stringify(this.rentalAddForm.value));
      this.closeModal.nativeElement.click();
      //this.toastrService.warning("Routing the payment page.");
      //this.router.navigate(['/payment']);
      let rental:Rental = {
        carId: this.car[0].carId,
        customerId: this.customers[0].id,
        rentDate: this.rentDate,
        endDate: this.endDate,
        returnDate: undefined
      };

      //if(this.isFindeksScoreEnough(rental.carId, rental.customerId)){
  
      this.rentalService.getRentalStatus(rental.carId).subscribe(()=>{
        
        this.rentalService.rentalData = rental;
        sessionStorage.setItem('rental-data',JSON.stringify(this.rentalAddForm.value));
        this.toastrService.warning("Routing the payment page.");
        this.router.navigate(['/payment']);
      },responseError=>{
        this.toastrService.warning("Problem has occured.");
      })
      }
      else{
        this.toastrService.error("Findeks Score is not enough");
      
    }
      // else {
      //   this.toastrService.error("Form is incorrect.");
      // }   
  }
}
