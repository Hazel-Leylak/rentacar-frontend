import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rentalData:any;
  cars:CarDetail[];
  customers:Customer[];
  companyName:string;
  saveCard:boolean = false;
  paymentForm:FormGroup;
  rentalObj:Rental;
  rental: Rental | undefined;


  constructor(private carDetailService:CarDetailService,
    private customerService:CustomerService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router,
    private creditCardService:CreditCardService,
    private rentalService:RentalService) { }

  ngOnInit(): void {
    this.rentalData = JSON.parse(sessionStorage.getItem('rental-data'));
    this.rental = this.rentalService.rentalData;
    this.getCarDetails(this.rental.carId);
    this.getCustomerDetails(this.rental.customerId);
    this.createPaymentAddForm();
    
  }

  getCarDetails(carId:number){
    this.carDetailService.getCarDetails(carId).subscribe(response=>{
      this.cars = response.data;
    })
  }

  getCustomerDetails(customerId:number){
    this.customerService.getCustomerById(customerId).subscribe(response=>{
      this.customers = response.data;
      console.log(this.customers)
    })
  }

  createPaymentAddForm() {
    this.paymentForm = this.formBuilder.group({
     customerId: [this.rental.customerId, Validators.required],
     fullName:[new FormControl(''), Validators.required],
     cardNumber:[new FormControl(''),Validators.required],
     expMonth:[new FormControl(''), Validators.required],
     expYear:[new FormControl(''), Validators.required],
     cvv: [new FormControl(''), Validators.required]

   });
 }

  addRental(){
    //console.log(JSON.parse(sessionStorage.getItem('rental-data')));
   // let data = JSON.parse(sessionStorage.getItem('rental-data'));
    //console.log(data);
    // let rent:Rental;
    // rent.carId = data.carId;
    // rent.customerId = data.customerId;
    // rent.endDate = data.endDate;
    // rent.rentDate = data.rentDate;
    // rent.returnDate = new Date('01.01.01');
    // this.rentalObj.carId = data.carId;
    // this.rentalObj.customerId = data.customerId;
    // this.rentalObj.endDate = data.endDate;
    // this.rentalObj.rentDate = data.rentDate;
    // this.rentalObj.returnDate = new Date();
    //data.returnDate = new Date();

    

    if(!this.rental){
      this.toastrService.error("Problem has occured. Please try again.");
      return;
    }
    this.rentalService.addRental(this.rental).subscribe(response=>{
      this.toastrService.success("Car rented successfully");
      sessionStorage.removeItem('rental-data');
    });
    
  }

  paymentProcess(){
    if (this.paymentForm.valid) {
      if(this.saveCard == true){
        this.creditCardService.addCard(JSON.parse(this.paymentForm.value));
        this.toastrService.success("Card saved.");
      }
      this.addRental();
      this.toastrService.success("Successfull payment.");
      this.router.navigate(['/cars']);
      }
      else {
        this.toastrService.error("Card information is incorrect.");
      }   
  }

}
