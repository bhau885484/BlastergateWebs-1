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
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public profileData;
  public location_form: FormGroup;
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public submitted = false;
  public emailotp;

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

    this.location_form = this.formBuilder.group({
      location: new FormControl(''),
      location_1: new FormControl(''),
      distance: new FormControl('')
      
    });

   this.getProfileData();
   this.initMap();  
   this.initMap1();  
  }

  public getProfileData(){
    this.callapi.get('/user/signle_user_profile').subscribe(data => {
      if(data.status == 200){
        this.profileData = data.data;

         setTimeout(() => {
          this.location_form.patchValue({
            distance: this.profileData.distance,
          });
          
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

  public initMap1()
  {
     var input = document.getElementById("address_1");
    
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
          
          $('#lat_1').val(lat);
          $('#lng_1').val(lng);
          $('#city_name_1').val(city_name);
          $('#place_id_1').val(place_id);
          $('#map_url_1').val(map_url);
          $('#formatted_address_1').val(formatted_address);
          // $('#submit_button').prop('disabled', false);
      });
  }

  public setLocation() {
    
    // this.submitted = true;
    const data = this.location_form.value;

    console.log(data);

    var lat = $('#lat').val();
    var lng = $('#lng').val();
    var city_name = $('#city_name').val();
    var place_id = $('#place_id').val();
    var map_url = $('#map_url').val();
    var formatted_address = $('#formatted_address').val();

    var lat_1 = $('#lat_1').val();
    var lng_1 = $('#lng_1').val();
    var city_name_1 = $('#city_name_1').val();
    var place_id_1 = $('#place_id_1').val();
    var map_url_1 = $('#map_url_1').val();
    var formatted_address_1 = $('#formatted_address_1').val();
    
    if (this.location_form.valid) 
    {
        
        this.submitted = false;
        
          this.regData = {
            'distance': data.distance,
            'lat': lat,
            'lng': lng,
            'city_name': city_name,
            'place_id': place_id,
            'map_url': map_url,
            'formatted_address': formatted_address,
            'lat_1': lat_1,
            'lng_1': lng_1,
            'city_name_1': city_name_1,
            'place_id_1': place_id_1,
            'map_url_1': map_url_1,
            'formatted_address_1': formatted_address_1,
          }
                
                $('#preloader').show();
                this.callapi.post('/location/update_location', this.regData).subscribe(result => {
                 $('#preloader').hide();
                  this.data = result;
                  if ((this.data.status == 200) || (this.data.status === '200')) {

                    this.toastr.successToastr(this.data.message, 'Success!');
                    this.getProfileData();
                    // this.tokenSaveService.saveAccessToken(this.data.data.token, this.data.data.sign);
                    // this.tokenSaveService.saveProfileType(this.data.data.profile_type);
                    //  if(this.data.data.profile_type == 'single'){
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
    
    
  }



}
