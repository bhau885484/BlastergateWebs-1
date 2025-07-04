import { Component, EventEmitter, Input, OnInit, Output,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs'; 
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../../api-service/service/index';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { PasswordMatchPattern } from '../../../api-service/all-validation-pattern/password-match-pattern';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';

declare const $: any;
declare const google: any;
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-view-user-photo',
  templateUrl: './view-user-photo.component.html',
  styleUrls: ['./view-user-photo.component.css']
})
export class ViewUserPhotoComponent implements OnInit {

  

  public pay_per_id;
  public imagePrice;
  public single_image_price;
  public paymentgetwayForm: FormGroup;
  public submitted1 = false;
  public select_image_id;
  public select_user_id;
  public view_image;


  public profileDataApproveImage;

  public countryData;
  public stateData;
  public cityData;

public expiryYears: number[] = [];
  public currentYear;
  public transaction_id;

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,private activatedRoute: ActivatedRoute)
  { 
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
    
     this.getCountry();

     this.currentYear = new Date().getFullYear();
    const numberOfYears = 20; // Show the next 10 years
    for (let i = 0; i < numberOfYears; i++) {
      this.expiryYears.push(this.currentYear + i);
    }

     
    this.pay_per_id = atob(this.activatedRoute.snapshot.queryParams["id"]);
    // alert(this.pay_per_id);
    this.viewPhoto(this.pay_per_id);

     this.paymentgetwayForm = this.formBuilder.group({
            cardNumber: ['', Validators.required],
            month: ['', Validators.required],
            year: ['', Validators.required],
            cardCode: ['', Validators.required],
             // prefix: [''],
            first_name: ['', Validators.required],
            middle_name: [''],
            last_name: ['', Validators.required],
            address1: ['', Validators.required],
            address2: [''],
            city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
            state: ['', Validators.required],
            country: ['', Validators.required],
            pin_code: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
            phone: ['', Validators.required],
            // fax: [''],
        });
 
    
 }

get f1() { return this.paymentgetwayForm.controls; }

 public viewPhoto(pay_per_id){

   var obj={
      "pay_per_id":pay_per_id
    }

   this.callapi.post('/payperclick/pay_per_user_approve_image',obj).subscribe(data => {
      if(data.status == 200){
        this.profileDataApproveImage = data.data;
      }else{
        // alert('wrr');
        this.profileDataApproveImage = '';
      }
    }); 
 }

 public backPaperView(){
   this.router.navigate(['/view-user-pay-per-click'], { queryParams: { id: btoa(this.pay_per_id) }}); 
 }

public getCountry(){
   
        this.callapi.get('/auth/getCountry').subscribe(data => {
           if(data.status == 200)
           {
             this.countryData = data.data;
           }else{
             this.countryData = '';
             this.toastr.errorToastr(data.message,'Error!');
           }
        }); 
      
  }

  public getState(country_id){
    var obj={
      "country_id":country_id
    }

    this.callapi.post('/auth/getState',obj).subscribe(data => {
       if(data.status == 200)
       {
         this.stateData = data.data;
       }else{
         this.stateData = '';
         this.toastr.errorToastr(data.message,'Error!');
       }
    }); 

  }

  public getCity(state_id){
    var obj={
      "state_id":state_id
    }

    this.callapi.post('/auth/getCity',obj).subscribe(data => {
       if(data.status == 200)
       {
         this.cityData = data.data;
       }else{
         this.cityData = '';
         this.toastr.errorToastr(data.message,'Error!');
       }
    }); 

  }  
  

 public getPrice(image_data){

   this.select_user_id = image_data.user_id;
   this.select_image_id = image_data.id;
   console.log('this.select_image_id',this.select_image_id);
   console.log('this.select_user_id',this.select_user_id);


    var obj={
      "type":"image"
    }

   this.callapi.post('/payperclick/get_all_pay_per_price',obj).subscribe(data => {
      if(data.status == 200){
        this.imagePrice = data.data;
        $('#photoPriceModal').modal('show');
      }else{
        // alert('wrr');
        this.imagePrice = '';
        $('#photoPriceModal').modal('show');
      }
    }); 
   
   
 }

 public buyImage(image_price){
    
    this.single_image_price  = image_price;
   $('#authorizedPaymentModal').modal('show');
   
    
  }

  public savePayment() {

        const data = this.paymentgetwayForm.value;
        if (this.paymentgetwayForm.valid) {
      
          var newobj={
              
              'pay_per_id':this.pay_per_id,
              'user_id':this.select_user_id,
              'image_id': this.select_image_id,
              'image_title':this.single_image_price.title,
              "image_price":this.single_image_price.price,
              "image_day":this.single_image_price.day,
              "cardNumber":this.paymentgetwayForm.value.cardNumber,
              "cardCode":this.paymentgetwayForm.value.cardCode,
              "month":this.paymentgetwayForm.value.month,
              "year":this.paymentgetwayForm.value.year,
              "amount":this.single_image_price.price,
              "prefix":'',
              "first_name":this.paymentgetwayForm.value.first_name,
              "middle_name":this.paymentgetwayForm.value.middle_name,
              "last_name":this.paymentgetwayForm.value.last_name,
              "address1":this.paymentgetwayForm.value.address1,
              "address2":this.paymentgetwayForm.value.address2,
              "city":this.paymentgetwayForm.value.city,
              "state":this.paymentgetwayForm.value.state,
              "country":this.paymentgetwayForm.value.country,
              "pin_code":this.paymentgetwayForm.value.pin_code,
              "phone":this.paymentgetwayForm.value.phone,
              "fax":'',
          }

          $('#preloader').show();
          this.callapi.post('/payperclick/save_pay_per_image_payment', newobj).subscribe(result => {
           $('#preloader').hide();
            
            if ((result.status == 200) || (result.status === '200')) {
              $('#authorizedPaymentModal').modal('hide');
              this.transaction_id = result.transaction_id;
              $('#preloader').hide();
              $('#paymentSuccessModal').modal('hide');
              $('#photoPriceModal').modal('hide');
              $('#successPriceModal').modal('show');
              this.viewPhoto(this.pay_per_id);
             
            } else if ((result.status == 4041) || (result.status === '4041')){
              setTimeout(()=>{                          
                  $('#preloader').hide();
                  this.router.navigate(['/event-payment-failed'], { queryParams: { transaction_id: btoa(result.transaction_id) }}); 
              }, 1000);
              
            }else{
              this.toastr.errorToastr(result.message, 'Error!');
            }
          },err => {
            $('#preloader').hide();
            this.toastr.errorToastr('Something Wrong!', 'Error!');
          });


        }else{
          this.submitted1 = true;
           return;
        }
   }

  public viewImage(view_image){

    this.view_image = view_image;
    $('#viewImageModal').modal('show');

  }

  public closePopup(name){
    $('#'+name).modal('hide');
  }


 
}
