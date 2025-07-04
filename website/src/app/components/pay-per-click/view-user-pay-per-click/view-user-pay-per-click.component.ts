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
  selector: 'app-view-user-pay-per-click',
  templateUrl: './view-user-pay-per-click.component.html',
  styleUrls: ['./view-user-pay-per-click.component.css']
})
export class ViewUserPayPerClickComponent implements OnInit {

  
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public submitted = false;
  public emailotp;

  public infoText;
  public profile_type='private';
  public selected_date;

  public pay_per_terms_condition;
  public allChocolateData;
  public singleChocolateData;

  public chocolateDataFlag:boolean=false;
  public chocolateData1Flag:boolean=false;

  public profileDataMeImage;
  public profileDataAllImage;
  public pay_per_id;
  public calender_details;
  public viewClanederFlag:boolean=true;
  public laderFlag:boolean=false;

  // public pay_per_id;
  public imagePrice;
  public videoPrice;

  public single_image_price;
  public single_video_price;
  public paymentgetwayForm: FormGroup;
  public submitted1 = false;

  public select_image_id;
  public select_user_id;

  public select_video_id;
  public select_video_user_id;


  public view_image;


  public profileDataApproveImage;
  public profileDataApproveVideo;

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
    // $('#successPriceModal').modal('show');
    $('#preloader').show();
     // if(this.commonServe.pay_per_id){
     //   this.commonServe.pay_per_id = this.commonServe.pay_per_id;
     // }else{
     //   this.commonServe.pay_per_id = atob(this.activatedRoute.snapshot.queryParams["id"]);
     // }
     this.commonServe.pay_per_id = atob(this.activatedRoute.snapshot.queryParams["id"]);

     // alert(this.commonServe.pay_per_id);
    this.getSingleChocolateFactory(this.commonServe.pay_per_id); 


    this.getCountry();

     this.currentYear = new Date().getFullYear();
    const numberOfYears = 20; // Show the next 10 years
    for (let i = 0; i < numberOfYears; i++) {
      this.expiryYears.push(this.currentYear + i);
    }

     
    // this.commonServe.pay_per_id = atob(this.activatedRoute.snapshot.queryParams["id"]);
    // alert(this.commonServe.pay_per_id);
    this.viewPhoto(this.commonServe.pay_per_id);
    this.viewVideo(this.commonServe.pay_per_id);

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
    // this.getAllChocolateFactory();
 
    
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

 public viewVideo(pay_per_id){

   var obj={
      "pay_per_id":pay_per_id
    }

   this.callapi.post('/payperclick/pay_per_user_approve_video',obj).subscribe(data => {
      if(data.status == 200){
        this.profileDataApproveVideo = data.data;
      }else{
        // alert('wrr');
        this.profileDataApproveVideo = '';
      }
    }); 
 }


  public getSingleChocolateFactory(pay_per_id){

   var obj={
     "id":pay_per_id
   }
    this.callapi.post('/payperclick/get_single_chocolate_factory',obj).subscribe(data => {
       $('#preloader').hide();
       if(data.status == 200){
          this.singleChocolateData = data.data[0];
          this.profileDataMeImage = this.singleChocolateData.image[0].profile_image;
          this.laderFlag=true;
          
          
        }else{
           this.laderFlag=true;
          this.singleChocolateData = '';
         
         
        }
    }); 
  }


  public viewCalenderDetails(id){
    this.getCalenderDetails(id);
  }

  public getCalenderDetails(pay_per_id){

   var obj={
     "pay_per_id":pay_per_id
   }
    this.callapi.post('/payperclick/get_user_calender_details',obj).subscribe(data => {
       $('#preloader').hide();
       if(data.status == 200){
          this.calender_details = data.data;
          this.viewClanederFlag=true;
          $('#calenderModal').modal('show');
           
        }else{
          this.calender_details = '';
          this.viewClanederFlag=false;
          $('#calenderModal').modal('show');
         
        }
    }); 
  }

  // public viewPhoto(id){
  //   this.router.navigate(['/view-user-photo'], { queryParams: { id: btoa(id) }}); 
  // }

  // public viewVideo(id){
  //   this.router.navigate(['/view-user-video'], { queryParams: { id: btoa(id) }}); 
  // }

  public addReview(id){
    this.router.navigate(['/add-pay-per-review'], { queryParams: { id: btoa(id) }}); 
  }

  public showPhoto(){

    $('#showWebsiteNotifications').addClass('active');
    $('#showFriendRequests').removeClass('active');


    $('#photo_section').addClass('show');
    $('#video_section').addClass('hide');
    $('#photo_section').removeClass('hide');
    $('#video_section').removeClass('show');

  }
  public showVideo(){
    
    $('#showFriendRequests').addClass('active');
    $('#showWebsiteNotifications').removeClass('active');


    $('#video_section').addClass('show');
    $('#photo_section').addClass('hide');
    $('#video_section').removeClass('hide');
    $('#photo_section').removeClass('show');
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

   $('#preloader').show();
   this.select_user_id = image_data.user_id;
   this.select_image_id = image_data.id;
   
    var obj={
      "type":"image"
    }

   this.callapi.post('/payperclick/get_all_pay_per_price',obj).subscribe(data => {
     $('#preloader').hide();
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
   $('#authorizedPaymentModal1').modal('show');
   
    
  }

  public savePaymentImage() {

        const data = this.paymentgetwayForm.value;
        if (this.paymentgetwayForm.valid) {
      
          var newobj={
              
              'pay_per_id':this.commonServe.pay_per_id,
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
              $('#authorizedPaymentModal1').modal('hide');
              this.transaction_id = result.transaction_id;
              $('#preloader').hide();
              $('#paymentSuccessModal').modal('hide');
              $('#photoPriceModal').modal('hide');
              $('#successPriceModal').modal('show');
              this.viewPhoto(this.commonServe.pay_per_id);
             
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


  public getVideoPrice(image_data){

    $('#preloader').show();
   this.select_video_user_id = image_data.user_id;
   this.select_video_id = image_data.id;
  
    var obj={
      "type":"video"
    }

   this.callapi.post('/payperclick/get_all_pay_per_price',obj).subscribe(data => {
     $('#preloader').hide();
      if(data.status == 200){
        this.videoPrice = data.data;
        $('#videoPriceModal').modal('show');
      }else{
        // alert('wrr');
        this.videoPrice = '';
        $('#videoPriceModal').modal('show');
      }
    }); 
   
   
 }

 public buyVideo(image_price){
    
    this.single_video_price  = image_price;
   $('#authorizedPaymentModal2').modal('show');
   
    
  }

  public savePaymentVideo() {

        const data = this.paymentgetwayForm.value;
        if (this.paymentgetwayForm.valid) {
      
          var newobj={
              
              'pay_per_id':this.commonServe.pay_per_id,
              'user_id':this.select_video_user_id,
              'video_id': this.select_video_id,
              'video_title':this.single_video_price.title,
              "video_price":this.single_video_price.price,
              "video_day":this.single_video_price.day,
              "cardNumber":this.paymentgetwayForm.value.cardNumber,
              "cardCode":this.paymentgetwayForm.value.cardCode,
              "month":this.paymentgetwayForm.value.month,
              "year":this.paymentgetwayForm.value.year,
              "amount":this.single_video_price.price,
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
          this.callapi.post('/payperclick/save_pay_per_video_payment', newobj).subscribe(result => {
           $('#preloader').hide();
            
            if ((result.status == 200) || (result.status === '200')) {
              $('#authorizedPaymentModal2').modal('hide');
              
              $('#preloader').hide();
              $('#paymentSuccessModal').modal('hide');
              $('#videoPriceModal').modal('hide');
              $('#successVideoModal').modal('show');
              this.viewVideo(this.commonServe.pay_per_id);
             
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



  // this.router.navigate(['/book-event-user'], { queryParams: { event_id: btoa(event_id) }}); 

}
