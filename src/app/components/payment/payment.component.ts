import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CustomerService } from 'src/app/services/customer.service';

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
  fullName:string;

  constructor(private carDetailService:CarDetailService,
    private customerService:CustomerService) { }

  ngOnInit(): void {
    this.rentalData = JSON.parse(sessionStorage.getItem('rental-data'));
    this.getCarDetails(this.rentalData.carId);
    this.getCustomerDetails(this.rentalData.customerId);
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

}
