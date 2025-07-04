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
  selector: 'app-add-speed-date',
  templateUrl: './add-speed-date.component.html',
  styleUrls: ['./add-speed-date.component.css']
})
export class AddSpeedDateComponent implements OnInit {

  public profileData;
  public location_form: FormGroup;
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public submitted = false;
  public emailotp;

  public infoText;
  public profile_type='private';
  public selected_date;

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

    setTimeout(() => {
      if (this.tokenSaveService.getUserMembership() == 'Yes'){
          
          this.router.navigate(['/speed-date']); 
       }
     
     }, 2000);

    var date = new Date();

    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // this.selected_date = new Date('Y-m-d'); 

    $('#datepicker2').datepicker({
        multidate: 3,
     }).on('changeDate', function(e){
        var selectedDate = $('#datepicker2').val();
        // console.log(this.selected_date);
        this.selected_date = selectedDate;
    });

   $( '#datepicker2' ).datepicker( 'setDate', today );

    this.location_form = this.formBuilder.group({
      couple_male_female_swingers: new FormControl(true),
      couple_female_female_swingers: new FormControl(false),
      couple_male_male_swingers: new FormControl(false),
      couple_male_swingers: new FormControl(false),
      couple_female_swingers: new FormControl(false),
      couple_transgender_swingers: new FormControl(false),
      details: new FormControl(''),
      location: new FormControl(''),
      start_time_minuts: new FormControl(''),
      start_time_hours: new FormControl(''),
     
      
    });

    this.getProfileData();
     
  }

  public getProfileData(){
    this.callapi.get('/user/signle_user_profile').subscribe(data => {
      if(data.status == 200){
        this.profileData = data.data;

         setTimeout(() => {
          this.location_form.patchValue({
            distance: this.profileData.distance,
          });

          this.initMap();
          
        }, 1000);
        // alert(this.profileData.person1_body_hair);
        
      }else{
        this.profileData = '';
      }
    }); 
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

  public showInfo(type){

    this.infoText ='';
    // alert(type);
    
    if(type=='private'){
      // alert('1');
      this.infoText= 'You prefer the privacy of meeting your Date in a private environment such as your home or a hotel room.';
    }
    if(type=='public'){
      // alert('2');
      this.infoText= 'You prefer to meet your Date somewhere public like a bar, restaurant or hotel lobby to start your encounter.';
    }
    if(type=='virtual'){
      // alert('3');
      this.infoText= 'Meet new people online quickly and easily. For a one-to-one Date, connect with each other using our Blastergate Message with its video chat function. If you prefer to include more than one member in your Date, we recommend using our Live Stream function.';
    }

    // alert(this.infoText);
    $('#infoModal').modal('show')
  }


public postSpeedData() {
    
    const data = this.location_form.value;
    console.log(data);

    var lat = $('#lat').val();
    var lng = $('#lng').val();
    var city_name = $('#city_name').val();
    var formatted_address = $('#formatted_address').val();

    
    
    if (this.location_form.valid) 
    {
        
        var error = 1;
        this.profile_type = this.profile_type;
        this.selected_date = $('#datepicker2').val();
       
        if(data.couple_male_female_swingers == true){
         data.couple_male_female_swingers = 1;
        }else{
          data.couple_male_female_swingers = 0;
        }

        if(data.couple_female_female_swingers == true){
          data.couple_female_female_swingers = 1;
        }else{
          data.couple_female_female_swingers = 0;
        }

        if(data.couple_male_male_swingers == true){
          data.couple_male_male_swingers = 1;
        }else{
          data.couple_male_male_swingers = 0;
        }
       
        if(data.couple_male_swingers == true){
          data.couple_male_swingers = 1;
        }else{
          data.couple_male_swingers = 0;
        }

        if(data.couple_female_swingers == true){
          data.couple_female_swingers = 1;
        }else{
          data.couple_female_swingers = 0;
        }

        if(data.couple_transgender_swingers == true){
          data.couple_transgender_swingers = 1;
        }else{
          data.couple_transgender_swingers = 0;
        }
       
       if((this.profile_type == 'private') || (this.profile_type == 'public')){
           if((formatted_address == '') ||(this.location_form.value.details == '')){
              this.toastr.errorToastr('All field are required!', 'Error!');
            error = 0;
          }else{
            error = 1;
          }
        }else{
          if((this.location_form.value.details == '') || (data.start_time_hours == '') || (data.start_time_minuts == '')){
              this.toastr.errorToastr('All field are required!', 'Error!');
            error = 0;
          }else{
            error = 1;
          }
        } 

        // alert(error);
       if(error == 1){

         this.regData = {
          'couple_male_female_swingers': data.couple_male_female_swingers,
          'couple_female_female_swingers': data.couple_female_female_swingers,
          'couple_male_male_swingers': data.couple_male_male_swingers,
          'couple_male_swingers': data.couple_male_swingers,
          'couple_female_swingers': data.couple_female_swingers,
          'couple_transgender_swingers': data.couple_transgender_swingers,
          'type': this.profile_type,
          'select_date': this.selected_date,
          'lat': lat,
          'lng': lng,
          'location': formatted_address,
          'details': data.details,
          'start_time_hours': data.start_time_hours,
          'start_time_minuts': data.start_time_minuts,
         
        }

          $('#preloader').show();
          this.callapi.post('/location/save_speed_data', this.regData).subscribe(result => {
           $('#preloader').hide();
            this.data = result;
            if ((this.data.status == 200) || (this.data.status === '200')) {

              this.toastr.successToastr(this.data.message, 'Success!');
             this.router.navigate(['/speed-date']);
             
            } else {
              $('#preloader').hide();
              this.toastr.errorToastr(this.data.message, 'Error!');
              
            }
          },err => {
            $('#preloader').hide();
          });

       }
        
        }else{
          // this.toastr.errorToastr('The username is already used.', 'Error!');
          // // this.tokenSaveService.saveCookie('single');
          this.submitted = true;
         return;
        }
    
    
  }

  public selectProfileType(val){
  // alert(val);
  this.profile_type = val;
  if((val == 'virtual')){
    $("#spped_time").css('display','block');
    $("#spped_location").css('display','none');
    }else{
     $("#spped_time").css('display','none');
    $("#spped_location").css('display','block');
  }

}



}
