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


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public register: FormGroup;
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public submitted = false;
  public emailotp;

  public isLoadedLoginOtp:boolean=true;
  public processingFlagOtp:boolean=true;

 
  public processingFlag:boolean=true;
  public isLoadedLogin:boolean=true;

  public profile_type='single';

  public showname;
  public userflag: any;
  public showflag;
  public userid: string;
  public uservalue;
  public terms_condition;
  public privecy_policy;
  public imagetype='female-male.png';
  public gender_profile_type;
  public filter_profile_type;
  public eventTermsConditionFlag:boolean=false;

      passwordFieldType: string = 'password';
     password: string = '';
 
 @ViewChild("map", { static: true }) mapElement: any;
  map: any;

 public passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/;

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService)
  { 
    if (this.tokenSaveService.getAccessToken()) {
        this.router.navigate(['/feed']); 
    }
  }

  ngOnInit() {

     this.commonServe.showvideo = '1';
    // $("#mailModal").modal('show');
    this.register = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]),
      // single_full_name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]*$/)]),
      single_profile_gender_from: new FormControl('', [Validators.required]),

      // couple_full_name_from: new FormControl(''),
      // couple_full_name_to: new FormControl(''),
      couple_profile_gender_from: new FormControl(''),
      couple_profile_gender_to: new FormControl(''),

      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      location: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
      confirm_password: ['', Validators.required]
    }, {
      validator: PasswordMatchPattern('password', 'confirm_password'),
    });
   
    this.initMap();  

    this.callapi.get('/auth/term_policy').subscribe(data => {
      if(data.status == 200){
        this.terms_condition = data.data[0];
      }else{
        this.terms_condition = '';
      }
    }); 

    this.callapi.get('/auth/privecy_policy').subscribe(data => {
      if(data.status == 200){
        this.privecy_policy = data.data[0];
      }else{
        this.privecy_policy = '';
      }
    }); 
     
}

 public linkRouter(link){
   $("#mailModal").modal('hide');
   this.router.navigate([link]);
  }

get reg() {
    return this.register;
  }

  get f() {
    return this.register.controls;
  }


  

 public onRegister() {
    
    // this.submitted = true;
    const data = this.register.value;

    // var single_profile_gender_from = $('#single_profile_gender_from').val();
    // var couple_profile_gender_from = $('#couple_profile_gender_from').val();
    // var couple_profile_gender_to = $('#couple_profile_gender_to').val();
    var lat = $('#lat').val();
    var lng = $('#lng').val();
    var city_name = $('#city_name').val();
    var place_id = $('#place_id').val();
    var map_url = $('#map_url').val();
    var formatted_address = $('#formatted_address').val();

    
    
    if (this.register.valid) 
    {
        
      if(this.eventTermsConditionFlag == true){
         this.submitted = false;

        if(this.profile_type == 'single'){
           if(data.single_profile_gender_from == '1'){
             this.imagetype = 'male.png';
             this.gender_profile_type = 'Male';
             this.filter_profile_type = 'Male';

           }
           if(data.single_profile_gender_from == '2'){
             this.imagetype = 'female.png';
             this.gender_profile_type = 'Female';
             this.filter_profile_type = 'Female';
           }
           if(data.single_profile_gender_from == '3'){
             this.imagetype = 'transgender.png';
             this.gender_profile_type = 'Transgender';
             this.filter_profile_type = 'Transgender';
           }

        }else{

          if((data.couple_profile_gender_from == '1')&&(data.couple_profile_gender_to == '1')){
            this.imagetype = 'male-male.png';
            this.gender_profile_type = 'Male | Male';
            this.filter_profile_type = 'Couple';
          }

          if((data.couple_profile_gender_from == '1')&&(data.couple_profile_gender_to == '2')){
            this.imagetype = 'male-female.png';
            this.gender_profile_type = 'Male | Female';
            this.filter_profile_type = 'Couple';
          }

          if((data.couple_profile_gender_from == '1')&&(data.couple_profile_gender_to == '3')){
            this.imagetype = 'transgender.png';
            this.gender_profile_type = 'Male | Transgender';
            this.filter_profile_type = 'Couple';
          }


          if((data.couple_profile_gender_from == '2')&&(data.couple_profile_gender_to == '1')){
            this.imagetype = 'female-male.png';
            this.gender_profile_type = 'Female | Male';
            this.filter_profile_type = 'Couple';
          }

          if((data.couple_profile_gender_from == '2')&&(data.couple_profile_gender_to == '2')){
            this.imagetype = 'female-female.png';
            this.gender_profile_type = 'Female | Female';
            this.filter_profile_type = 'Couple';
          }

          if((data.couple_profile_gender_from == '2')&&(data.couple_profile_gender_to == '3')){
            this.imagetype = 'transgender.png';
            this.gender_profile_type = 'Female | Transgender';
            this.filter_profile_type = 'Couple';
          }

          if((data.couple_profile_gender_from == '3')&&(data.couple_profile_gender_to == '1')){
            this.imagetype = 'transgender.png';
            this.gender_profile_type = 'Transgender | Male';
            this.filter_profile_type = 'Couple';
          }

          if((data.couple_profile_gender_from == '3')&&(data.couple_profile_gender_to == '2')){
            this.imagetype = 'transgender.png';
            this.gender_profile_type = 'Transgender | Female';
            this.filter_profile_type = 'Couple';
          }

          if((data.couple_profile_gender_from == '3')&&(data.couple_profile_gender_to == '3')){
            this.imagetype = 'transgender.png';
            this.gender_profile_type = 'Transgender | Transgender';
            this.filter_profile_type = 'Couple';
          }

          this.filter_profile_type = 'Couple';

        }

        
        
        if(this.userflag == 1){
              this.regData = {
                'email': data.email,
                'password': data.password,
                'username': data.username,
                'profile_type': this.profile_type,
                'single_profile_gender_from': data.single_profile_gender_from,
                'single_full_name':'',
                
                'couple_profile_gender_from': data.couple_profile_gender_from,
                'couple_profile_gender_to': data.couple_profile_gender_to,
                'couple_full_name_from': '',
                'couple_full_name_to': '',
                
                'lat': lat,
                'lng': lng,
                'city_name': city_name,
                'place_id': place_id,
                'map_url': map_url,
                'formatted_address': formatted_address,
                'image_type':this.imagetype,
                'gender_profile_type':this.gender_profile_type,
                'filter_profile_type':this.filter_profile_type
              }
              
              $('#preloader').show();
              this.callapi.post('/auth/registration', this.regData).subscribe(result => {
               $('#preloader').hide();
                this.data = result;
                if ((this.data.status == 200) || (this.data.status === '200')) {

                   // var obj={
                   //    "username":data.username,
                   //    "password":data.password,
                   //  }
                    
                    // this.toastr.successToastr(this.data.message, 'Success!');
                      // this.tokenSaveService.saveAccessToken(this.data.data.token, this.data.data.sign);
                      // this.tokenSaveService.saveProfileType(this.data.data.profile_type);
                      // this.tokenSaveService.saveUserId(this.data.data.userid);

                      $("#mailModal").modal('show');
                      // if(this.data.data.profile_type == 'single'){
                      //    this.router.navigateByUrl('/single-profile');
                      //  }

                      // if(this.data.data.profile_type == 'couple'){
                      //    this.router.navigateByUrl('/couple-profile');
                      //  }   
                    //  this.submitted = false;
                } else {
                  $('#preloader').hide();
                  this.toastr.errorToastr(this.data.message, 'Error!');
                  
                }
              },err => {
                $('#preloader').hide();
              });
        }else{
          this.toastr.errorToastr('The username is already used.', 'Error!');
          // this.tokenSaveService.saveCookie('single');
        }
      }else{
         this.toastr.errorToastr("Please accept terms and conditions",'Error!');
      }

         
    }else{
        
         this.submitted = true;
         return;
    }
    
  }

public selectProfileType(val){
  // alert(val);
  this.profile_type = val;
  // if((val == 'business')){
  //   $("#regBtn").css('display','none');
  //   }else{
  //    $("#regBtn").css('display','block');
  // }

  this.uservalue='';

  if((val == 'single')){



    this.register = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]),
      // single_full_name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]*$/)]),
      single_profile_gender_from: new FormControl('', [Validators.required]),

      // couple_full_name_from: new FormControl(''),
      // couple_full_name_to: new FormControl(''),
      couple_profile_gender_from: new FormControl(''),
      couple_profile_gender_to: new FormControl(''),

      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      location: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
     
     confirm_password: ['', Validators.required]
    }, {
      validator: PasswordMatchPattern('password', 'confirm_password'),
    });
    
  }

  if((val == 'couple')){

    this.register = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]),
     
      // single_full_name: new FormControl(''),
      single_profile_gender_from: new FormControl(''),

      // couple_full_name_from: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]*$/)]),
      // couple_full_name_to: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]*$/)]),
      couple_profile_gender_from: new FormControl('',[Validators.required]),
      couple_profile_gender_to: new FormControl('',[Validators.required]),

      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      location: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
     
     confirm_password: ['', Validators.required]
    }, {
      validator: PasswordMatchPattern('password', 'confirm_password'),
    });
    
  }



}
public initMap()
{
   var input = document.getElementById("address");
  // alert(input);
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
        $('#submit_button').prop('disabled', false);
    });
}


getUserName(obj) {
    if (obj != '') {
      this.callapi.get('/user/getusername/' + obj).subscribe(result => {
        this.data = result;
        
          if ((this.data.status === '404') || (this.data.status === 0)) {
            this.uservalue = this.data.message;
            this.userflag = 1;
          } else {
            this.uservalue = this.data.message;
            this.userflag = 0;
          }

        
      }, err => {
        
      });
    }


  }

  setUserNameOnFocus(obj) {
    obj = '';
    this.showname = '';
    this.showflag = 0;
    this.uservalue = '';
  }
  public showInfo(){
    $('#infoModal').modal('show');
  }


  public togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  public checkTermsCondition(event: any){
      const isChecked = event.target.checked;
       
      if(isChecked == true)
      {
        this.eventTermsConditionFlag =true;
        
        
      }else{
        this.eventTermsConditionFlag =false;
       
      }
  }

  public closeModal(name){
    // alert(name);
    $('#'+name).modal('hide');

  }

  public showModal(name){
    // alert(name);
    $('#'+name).modal('show');

  }

}
