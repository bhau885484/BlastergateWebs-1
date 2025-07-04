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
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public onlineUserData;
   public total_distance=0;
   public allEventData;
   public title_heading = 'Private Party';
   public title_url = 'private';
   public pending_data:boolean=false;
   public bodydata: any = {};
   public single_booking_data;
   public loaderFlag:boolean=true;
   public single_booking_data_user_details;
   public pay_now_event;
   public event_booking_details;
   public no_of_partil_payment;
   public partial_total_amount:any=0;
   public partial_pay_amount:any=0;
   public partial_due_amount:any=0;
   public partial_kist_amount:any=0;
   public total_partial_kist_amount:any=0;

  public paymentgetwayForm: FormGroup;
  public submitted1 = false;


  public ticket_bookig_room_list;
  public ticket_bookig_additional_night;
  public ticket_bookig_room_user_list;
  public ticket_bookig_user_list;
  public view_id_proof_img;
  public ticket_booking_partial_payment;


  public total_room_price:any =0;
  public total_additional_night_price:any =0;
  public final_sub_total:any=0;
  public final_total:any=0;
  public total_paid_amount:any=0;
  public final_total1:any=0;

  public countryData;
  public stateData;
  public cityData;


  public month;
  public year;
  public day;
  public minDate;

    public expiryYears: number[] = [];
  public currentYear;
  public fullNameFlag:boolean=true;
  public fullText;
  public transaction_id;
 public event_terms_condition;

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
    this.dateFormate();
     this.initMap();  

     this.currentYear = new Date().getFullYear();
    const numberOfYears = 20; // Show the next 10 years
    for (let i = 0; i < numberOfYears; i++) {
      this.expiryYears.push(this.currentYear + i);
    }

     setTimeout(() => {
        $('#right_side_togle').removeClass('show_toggle');
        $('#right_side_togle').addClass('hide_toggle');

        $('#big_tab').removeClass('col-lg-8');
        $('#big_tab').addClass('col-lg-10');
     }, 1000);

    this.bodydata['event_type'] = 'public';
    this.bodydata['seach_date'] = '';
    this.bodydata['keyword'] = '';
    this.bodydata['lat'] = '0';
    this.bodydata['lng'] = '0';
    this.getallFriendRequest(this.bodydata);

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
        });


 } 

  get f1() { return this.paymentgetwayForm.controls; }

  public getallFriendRequest(bodydata){

    this.callapi.post('/events/get_all_events',bodydata).subscribe(data => {
      $('#preloader').hide();
       if(data.status == 200){
          this.allEventData = data.data;
          this.loaderFlag =false;

        }else{
          this.allEventData = '';
          this.loaderFlag =false;
        }
    }); 
  }

  public onSubmitFilter(){
   
    $('#preloader').show();
    var search_keyword = $('#search_keyword').val();
     this.bodydata['keyword'] = search_keyword;
    var address = $('#address').val();

    if(address == ''){
       this.bodydata['lat'] = '0';
      this.bodydata['lng'] = '0';
     
    }else{
      this.bodydata['lat'] = $('#lat').val();
      this.bodydata['lng'] = $('#lng').val();
      
    }
    
    this.bodydata['seach_date'] = '';
   
   this.getallFriendRequest(this.bodydata);
   
  }


  public onChangeDate(event){
      this.bodydata['seach_date'] = event.target.value;
      this.getallFriendRequest(this.bodydata);
  }

  public changePartyType(party_type){

    $('#preloader').show();
    
    this.bodydata['event_type'] = party_type;
    this.getallFriendRequest(this.bodydata);

    if(party_type == 'public'){
       $('#private').removeClass('active-tab');
       $('#public').addClass('active-tab');
    }else{
       $('#private').addClass('active-tab');
       $('#public').removeClass('active-tab');
    }
     
 }

 public viewTicket(event_id){

   var obj={
     'event_id':event_id
   }
   $('#preloader').show();
   this.callapi.post('/events/get_single_ticket_booking',obj).subscribe(data => {
     $('#preloader').hide();
       if(data.status == 200){
          
          this.single_booking_data = data.data;
          this.event_booking_details = data.data.event_booking_details;

          this.ticket_bookig_room_list = data.data.ticket_bookig_room_list;
          this.ticket_bookig_additional_night = data.data.ticket_bookig_additional_night;
          this.ticket_bookig_room_user_list = data.data.ticket_bookig_room_user_list;
          this.ticket_bookig_user_list = data.data.ticket_bookig_user_list;
          this.ticket_booking_partial_payment = data.data.ticket_booking_partial_payment;

 
          this.ticket_bookig_room_list.forEach((itemroom:any)=>{
             this.total_room_price = parseFloat(this.total_room_price)+parseFloat(itemroom.amount);  
          }) 


          this.ticket_bookig_additional_night.forEach((itemnignt:any)=>{
             this.total_additional_night_price = parseFloat(this.total_additional_night_price)+parseFloat(itemnignt.amount);
          })

          this.final_sub_total = parseFloat(this.total_room_price)+parseFloat(this.total_additional_night_price)+parseFloat(this.single_booking_data.event_price);
          
          
          this.final_total1 = parseFloat(this.event_booking_details.membership_discount)+parseFloat(this.event_booking_details.primo_code_discount);

          console.log('final_total1',this.final_total1);
          this.final_total = parseFloat(this.final_sub_total)-parseFloat(this.final_total1);




          this.no_of_partil_payment = data.data.event_booking_details.payment_type_qty;

          this.partial_total_amount = this.event_booking_details.total_amount;
          this.partial_pay_amount = this.event_booking_details.partial_payment_amount_without_fee;

          this.partial_due_amount = parseFloat(this.partial_total_amount) - parseFloat(this.partial_pay_amount);
         
          this.partial_kist_amount = (this.partial_due_amount)/(this.no_of_partil_payment);

          this.total_partial_kist_amount = parseFloat(this.partial_kist_amount)+parseFloat(this.event_booking_details.partial_payment_fee_fix);
          // alert(this.total_partial_kist_amount);
           $('#viewTicketModal').modal('show');

        }else{
          this.single_booking_data = '';
        }
    }); 
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
  

  public viewRecord(event_id){

    this.callapi.get('/user/me').subscribe(data => {
        if(data.status=='200'){
          this.checkUserName1(data.data.username,event_id);
        }

       });    
  
    
  }

  public viewUser(event_id){
    this.router.navigate(['/book-event-user'], { queryParams: { event_id: btoa(event_id) }}); 
  }


  public checkUserName1(obj,event_id) {
      $('#preloader').show();
      this.callapi.get('/membership/check_username_membership/' + obj).subscribe(result => {
        
          if((result.status === '200')) {
           $('#firstTimeModal').modal('hide');
           // $('#preloader').show();
           this.router.navigate(['/event-details'], { queryParams: { event_id: btoa(event_id) }}); 
           
          } else {
            $('#preloader').hide();
             $('#firstTimeModal').modal('show');
         }

      }, err => {
        
      });
    
  }
  
  public print() {
      // do other stuff...
      // window.print();

      var prtContent = document.getElementById("print_invoice");
      var WinPrint = window.open('', '', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0');
      WinPrint.document.write('<html><head>');
      WinPrint.document.write('<link rel="stylesheet" href="assets/css/ticket.css">');
      WinPrint.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
      WinPrint.document.write('</head><body onload="print();">');
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.write('</body></html>');
      WinPrint.document.close();
      WinPrint.focus();
  
  

  }

public linkRouter(link){
   // alert();
    $('#preloader').show();
    $('#firstTimeModal').modal('hide');
    $('#paymentSuccessModal').modal('hide');
    this.getallFriendRequest(this.bodydata);

     setTimeout(() => {
         $('#preloader').hide();
          this.router.navigate([link]);
    }, 1000);
   }

 public payNow(event_id){
    $('#preloader').show();
   var obj1={
     'event_id':event_id
   }

    this.callapi.post('/events/get_single_ticket_booking',obj1).subscribe(data => {
       if(data.status == 200){
          $('#preloader').hide();
          this.single_booking_data = data.data;
          this.event_booking_details = data.data.event_booking_details;

          this.ticket_bookig_room_list = data.data.ticket_bookig_room_list;
          this.ticket_bookig_additional_night = data.data.ticket_bookig_additional_night;
          this.ticket_bookig_room_user_list = data.data.ticket_bookig_room_user_list;
          this.ticket_bookig_user_list = data.data.ticket_bookig_user_list;

          this.ticket_booking_partial_payment = data.data.ticket_booking_partial_payment;


          this.no_of_partil_payment = data.data.event_booking_details.payment_type_qty;

          

          this.partial_total_amount = this.event_booking_details.total_amount;
          this.partial_pay_amount = this.event_booking_details.partial_payment_amount_without_fee;

          this.partial_due_amount = parseFloat(this.partial_total_amount) - parseFloat(this.partial_pay_amount);
         

          // this.partial_due_amount = parseFloat(this.partial_total_amount) - parseFloat(this.partial_pay_amount);
          
          this.partial_kist_amount = (this.partial_due_amount)/(this.no_of_partil_payment)
           this.total_partial_kist_amount = parseFloat(this.partial_kist_amount)+parseFloat(this.event_booking_details.partial_payment_fee_fix);
          $('#payNowModal').modal('show');

        }else{
           $('#preloader').hide();
          this.single_booking_data = '';
        }
    }); 

   // this.pay_now_event = event;
   // console.log(this.pay_now_event);
   // $('#payNowModal').modal('show');

 }

 public payPartialPayment(){
   // alert(this.partial_kist_amount);
   $('#payNowModal').modal('hide');
   $('#authorizedPaymentModal').modal('show');
 }


 public savePayment() {

        const data = this.paymentgetwayForm.value;
        if (this.paymentgetwayForm.valid) {

          var new_pay_amount = parseFloat(this.event_booking_details.partial_payment_amount_without_fee)+parseFloat(this.partial_kist_amount);
          
          var partial_payment_amount = parseFloat(this.event_booking_details.partial_payment_amount)+parseFloat(this.total_partial_kist_amount);


          var partial_payable_amount = parseFloat(this.event_booking_details.partial_payment_amount_without_fee)+parseFloat(this.partial_kist_amount);
          

          var payment_type_qty = parseFloat(this.no_of_partil_payment)-parseFloat('1')
          var newobj={
              
              'event_id':this.event_booking_details.event_id,
              'user_id': this.event_booking_details.user_id,
              
              "final_partial_amount":new_pay_amount,
              "partial_amount":this.partial_kist_amount,
              "partial_payable_amount":partial_payable_amount,
              "payment_type_qty":payment_type_qty,


              "partial_payment_fee":this.event_booking_details.partial_payment_fee_fix,
              "partial_payment_fee_total":parseFloat(this.event_booking_details.partial_payment_fee)+parseFloat(this.event_booking_details.partial_payment_fee_fix),
              "partial_payment_amount":partial_payment_amount,
              
              
              "cardNumber":this.paymentgetwayForm.value.cardNumber,
              "cardCode":this.paymentgetwayForm.value.cardCode,
              "month":this.paymentgetwayForm.value.month,
              "year":this.paymentgetwayForm.value.year,
              "amount":this.total_partial_kist_amount,
              "prefix":this.paymentgetwayForm.value.prefix,
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
              "fax":this.paymentgetwayForm.value.fax,
           }

          $('#preloader').show();
          this.callapi.post('/payment/remaining_partial_payment', newobj).subscribe(result => {
           $('#preloader').hide();
            
            if ((result.status == 200) || (result.status === '200')) {
              $('#authorizedPaymentModal').modal('hide');
              $('#preloader').hide();
               $('#paymentSuccessModal').modal('show');
              this.transaction_id = result.transaction_id;
              // setTimeout(()=>{                          
              //     this.router.navigate(['/event-payment-success'], { queryParams: { transaction_id: btoa(result.transaction_id) }}); 
              // }, 2000);
  
              
  
            } else if ((result.status == 4041) || (result.status === '4041')){
              $('#preloader').hide();
              setTimeout(()=>{                          
                  
                  this.router.navigate(['/event-payment-failed'], { queryParams: { transaction_id: btoa(result.transaction_id) }}); 
              }, 2000);
              
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

   public viewImage(view_id_proof_img){
       this.view_id_proof_img = view_id_proof_img;
       $('#viewIdProofModal').modal('show');
   }

    public dateFormate(){
     var dtToday = new Date();

    this.month = dtToday.getMonth() + 1;
    this.day = dtToday.getDate();
    this.year = dtToday.getFullYear();
    if(this.month < 10)
        this.month = '0' + this.month.toString();
    if(this.day < 10)
        this.day = '0' + this.day.toString();

    this.minDate= this.year + '-' + this.month + '-' + this.day;  

    console.log(this.minDate);
      $('#dateCalander').attr('min', this.minDate);
  }

  public initMap()
  {
     var input = document.getElementById("address");
    
      var autocomplete = new google.maps.places.Autocomplete(input);
      var autocompleteListener = google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        console.log(place);
          
         var lat = place.geometry.location.lat();
         var lng = place.geometry.location.lng();

         var city_name = place.name;
         var place_id = place.place_id;
         var map_url = place.url;
         var formatted_address = place.formatted_address;
          
          $('#lat').val(lat);
          $('#lng').val(lng);
          $('#city_name').val(city_name);
          $('#place_id').val(place_id);
          $('#map_url').val(map_url);
          $('#formatted_address').val(formatted_address);
          // $('#submit_button').prop('disabled', false);
      });
  }

  public readTerms(){

     this.callapi.get('/auth/event_terms_condition').subscribe(data => {
      if(data.status == 200){
        this.event_terms_condition = data.data[0];
        $('#readTermsModal').modal('show');
      }else{
        this.event_terms_condition = '';
        $('#readTermsModal').modal('hide');
      }
    }); 

   }



}
