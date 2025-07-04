import { Component, EventEmitter, Input, OnInit, Output,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs'; 
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../../api-service/service/index';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { PasswordMatchPattern } from '../../../api-service/all-validation-pattern/password-match-pattern';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';

declare const $: any;
declare const google: any;
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({ 
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  public menbershipData;
  public login_user_id;
  public userMenbershipData;
  public membership_expire;
  public membership_id;
  public requestData:any;

  public paymentgetwayForm: FormGroup;
  public submitted = false;
  public transaction_id;


  public countryData;
  public stateData;
  public cityData;
  public expiryYears: number[] = [];
  public currentYear;

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService)
  { 
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {

    this.getCountry();
    $('#preloader').hide();

    // $('#paymentFailedModal').modal('show');

    this.currentYear = new Date().getFullYear();
    const numberOfYears = 20; // Show the next 10 years
    for (let i = 0; i < numberOfYears; i++) {
      this.expiryYears.push(this.currentYear + i);
    }
  

    // $('#paymentSuccessModal').modal('show');

    this.paymentgetwayForm = this.formBuilder.group({
            cardNumber: ['', Validators.required],
            month: ['', Validators.required],
            year: ['', Validators.required],
            cardCode: ['', Validators.required],
             // prefix: [''],
            first_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
            middle_name: [''],
            last_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
            address1: ['', Validators.required],
            address2: [''],
            city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
            state: ['', Validators.required],
            country: ['', Validators.required],
            pin_code: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
            phone: ['', Validators.required],
            // fax: [''],
        });

    this.login_user_id = this.tokenSaveService.getUserId();
    setTimeout(() => {
        $('#right_side_togle').removeClass('show_toggle');
        $('#right_side_togle').addClass('hide_toggle');

        $('#big_tab').removeClass('col-lg-8');
        $('#big_tab').addClass('col-lg-10');
     }, 1000);
      
    this.getOnlineUser();
    this.getUserMembership();
    
 } 

 get f() { return this.paymentgetwayForm.controls; }

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

  public getOnlineUser(){
    this.callapi.get('/membership/get_all_membership').subscribe(data => {
          if(data.status == 200){
            this.menbershipData = data.data;
          }else{
            this.menbershipData = '';
          }
      }); 
  }

  public getUserMembership(){
    this.callapi.get('/membership/get_user_membership_plan').subscribe(data => {
          if(data.status == '200'){
            this.userMenbershipData = data.data;
            this.membership_expire = data.membership_expire;
            // alert(this.membership_expire);
            this.membership_id = data.membership_id;
         }else{
            this.userMenbershipData = '';
            this.membership_expire = '';
            this.membership_id = 0;
          }
      }); 
  }

  public purchasePlan(selectData){

   this.requestData={
      "membership_id":selectData.id,
      "user_id":this.login_user_id,
      "order_id":this.generateOrderId(),
      "plan_name":selectData.heading_title_name,
      "plan_price":selectData.heading_title_price,
      "plan_year":selectData.heading_title_plan,
    }

    $('#authorizedPaymentModal').modal('show');

    



    // $('#preloader').show();
    // this.callapi.post('/membership/save_membership_plan', obj).subscribe(result => {
    //  $('#preloader').hide();
    //   // this.data = result;
    //   if ((result.status == 200) || (result.status === '200')) {

    //     this.toastr.successToastr(result.message, 'Success!');
    //     this.router.navigate(['/my-account']);
       
    //   } else {
    //     $('#preloader').hide();
    //     this.toastr.errorToastr(result.message, 'Error!');
        
    //   }
    // },err => {
    //   $('#preloader').hide();
    // });

  }

  public paymentBuy() {


        const data = this.paymentgetwayForm.value;
        if (this.paymentgetwayForm.valid) {

          console.log(this.requestData);
          console.log(this.paymentgetwayForm.value);

          var newobj={
              
              "membership_id":this.requestData.membership_id,
              "user_id":this.requestData.user_id,
              "order_id":this.requestData.order_id,
              "plan_name":this.requestData.plan_name,
              "plan_price":this.requestData.plan_price,
              "plan_year":this.requestData.plan_year,

              "cardNumber":this.paymentgetwayForm.value.cardNumber,
              "cardCode":this.paymentgetwayForm.value.cardCode,
              "month":this.paymentgetwayForm.value.month,
              "year":this.paymentgetwayForm.value.year,
              "amount":this.requestData.plan_price,
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
              "fax":''
          }

          $('#preloader').show();
          this.callapi.post('/payment/membership_process_payment', newobj).subscribe(result => {
           $('#preloader').hide();
            // this.data = result;
            if ((result.status == 200) || (result.status === '200')) {
              $('#preloader').hide();
              $('#authorizedPaymentModal').modal('hide');
              $('#paymentSuccessModal').modal('show');
              this.transaction_id = result.transaction_id;
              this.getOnlineUser();
              this.getUserMembership();
  
            } else if ((result.status == 4041) || (result.status === '4041')){
              $('#preloader').hide();
              $('#authorizedPaymentModal').modal('hide');
              $('#paymentFailedModal').modal('show');
              
            }else{
              this.toastr.errorToastr(result.message, 'Error!');
            }
          },err => {
            $('#preloader').hide();
            this.toastr.errorToastr('Something Wrong!', 'Error!');
          });


        }else{
          this.submitted = true;
           return;
        }
   }
  generateOrderId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 10; // Define the length of the order ID
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  

  public linkRouter(link){
        window.location.reload();
  }
 
  public closePopup(){
    $('#paymentFailedModal').modal('hide');
  }

}
