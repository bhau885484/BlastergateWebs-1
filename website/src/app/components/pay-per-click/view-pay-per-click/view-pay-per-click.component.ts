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
import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-view-pay-per-click',
  templateUrl: './view-pay-per-click.component.html',
  styleUrls: ['./view-pay-per-click.component.css']
})
export class ViewPayPerClickComponent implements OnInit {
  age: number = 25;
  public profileData;
  public factory_form: FormGroup;
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public submitted = false;
  public emailotp;

  public infoText;
  public profile_type='private';
  public selected_date;
  public bodydata: any = {};

  public pay_per_terms_condition;
  public allChocolateData;
  public singleChocolateData;

  public chocolateDataFlag:boolean=true;
  public chocolateData1Flag:boolean=false;

  public profileDataMeImage;
  public profileDataAllImage;

   public calender_details;
  public viewClanederFlag:boolean=true;


  public age_minvalue: number = 18;
  public age_maxvalue: number = 80;
  age_options: Options = {
    floor: 18,
    ceil: 100,
  };

  public height_minvalue: number = 3;
  public height_maxvalue: number = 8;
  height_options: Options = {
    floor: 0,
    ceil: 10,
  };

  public weight_minvalue: number = 20;
  public weight_maxvalue: number = 150;
  weight_options: Options = {
    floor: 20,
    ceil: 200,
  };


   public membershipFlag :boolean=false;
   public singleUserData;
   public login_user_id;
   public preferencesArray=[];

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
    $('#preloader').hide();
    setTimeout(() => {
      if (this.tokenSaveService.getUserMembership() == 'Yes'){
         this.membershipFlag = false;
         $('#membershipModal').modal('show');
       }else{
         $('#membershipModal').modal('hide');
         this.membershipFlag = true;
         setTimeout(() => {
           this.initMap();
            }, 2000);
          
       }
     
     }, 2000);
 
    

      this.login_user_id = this.tokenSaveService.getUserId();

    $("#start").range();
    
     

     this.callapi.get('/payperclick/check_chocolate_factory_post').subscribe(data => {
       if(data.status == 200){
         this.chocolateDataFlag =true;
         // $('#viewSubmittionMessageModal').modal('show');
        }else{
          

          this.chocolateDataFlag =false;
           // $('#viewSubmittionMessageModal').modal('hide');
        }
    }); 
 

   this.callapi.get('/payperclick/check_chocolate_factory_popup').subscribe(data => {
       if(data.status == 200){
         $('#viewSubmittionMessageModal').modal('show');
        }else{
        $('#viewSubmittionMessageModal').modal('hide');
        }
    });   

   this.bodydata['age_minvalue'] = this.age_minvalue;
   this.bodydata['age_maxvalue'] = this.age_maxvalue;

   this.bodydata['height_minvalue'] = this.height_minvalue;
   this.bodydata['height_maxvalue'] = this.height_maxvalue;

   this.bodydata['weight_minvalue'] = this.weight_minvalue;
   this.bodydata['weight_maxvalue'] = this.weight_maxvalue;

   
   this.bodydata['preferencesArray'] = this.preferencesArray;

  this.getMeChocolateFactory(); 
  this.getAllChocolateFactory(this.bodydata);
    
 }

 public getMeChocolateFactory(){

   var obj={
     "user_type":"me"
   }
    this.callapi.post('/payperclick/get_chocolate_factory_data',obj).subscribe(data => {
       if(data.status == 200){
          this.singleChocolateData = data.data[0];
          this.profileDataMeImage = this.singleChocolateData.image[0].profile_image;
          this.chocolateData1Flag =true;
          // $('#viewSubmittionMessageModal').modal('hide');
          
        }else{
          this.singleChocolateData = '';
          this.chocolateData1Flag =false;
          // $('#viewSubmittionMessageModal').modal('show');
        }
    }); 
  }

  public getAllChocolateFactory(bodydata){

    
    this.callapi.post('/payperclick/get_all_chocolate_factory_data',bodydata).subscribe(data => {
      $('#preloader').hide();
       if(data.status == 200){
          this.allChocolateData = data.data;
          // this.profileDataAllImage = this.allChocolateData.image[0].profile_image;
         }else{
          this.allChocolateData = '';
        }
    }); 
  }

 public addChocolateForm(){
   
  this.router.navigate(['/add-pay-per-click']);
 }



 

  public viewTermsCondition(){
    $('#preloader').show();
     this.callapi.get('/auth/pay_per_click_terms_condition').subscribe(data => {
      if(data.status == 200){
        $('#preloader').hide();
        this.pay_per_terms_condition = data.data[0];
        $('#viewTermsConditionModal').modal('show');
      }else{
        $('#preloader').hide();
        this.pay_per_terms_condition = '';
        $('#viewTermsConditionModal').modal('hide');
      }
    }); 

   } 
   public editPaperView(id,type){
     this.router.navigate(['/edit-pay-per-click'], { queryParams: { id: btoa(id),type: btoa(type) }});
     
   }

   public viewUserPayPerClick(id){
     $('#preloader').show();
     // alert(id);
     this.router.navigate(['/view-user-pay-per-click'], { queryParams: { id: btoa(id)}});
   }

   public addReview(id){
    this.router.navigate(['/view-pay-per-review'], { queryParams: { id: btoa(id) }}); 
  }

  public changeAge(){
    $('.filter-box').addClass('show');
    console.log(this.age_minvalue);
    console.log(this.age_maxvalue);
  }

  public changeHeight(){
    $('.filter-box').addClass('show');
    console.log(this.height_minvalue);
    console.log(this.height_maxvalue);
  }

  public changeWeight(){
    $('.filter-box').addClass('show');
    console.log(this.weight_minvalue);
    console.log(this.weight_maxvalue);
  }

   public linkRouter(link){
    $('#membershipModal').modal('hide');
    $('#preloader').show();
    this.router.navigate([link]);
 }

  public initMap()
  {
     // alert();
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


 public onSubmitFilter(){
    $('#preloader').show();
   
    this.bodydata['age_minvalue'] = this.age_minvalue;
    this.bodydata['age_maxvalue'] = this.age_maxvalue;

    this.bodydata['height_minvalue'] = this.height_minvalue;
    this.bodydata['height_maxvalue'] = this.height_maxvalue;

    this.bodydata['weight_minvalue'] = this.weight_minvalue;
    this.bodydata['weight_maxvalue'] = this.weight_maxvalue;

    this.bodydata['preferencesArray'] = this.preferencesArray;
    console.log(this.bodydata);

   this.getAllChocolateFactory(this.bodydata);
   
  }

  public selectPreferences(unitObject,value){
  
    if(value == true){
      this.preferencesArray.push(unitObject)
    }else{
      const index: number = this.preferencesArray.indexOf(unitObject);
      this.preferencesArray.splice(index, 1);
    }
    console.log('preferencesArray',this.preferencesArray);
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

  // this.router.navigate(['/book-event-user'], { queryParams: { event_id: btoa(event_id) }}); 

}
