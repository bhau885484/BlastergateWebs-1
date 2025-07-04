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
  selector: 'app-add-pay-per-click',
  templateUrl: './add-pay-per-click.component.html',
  styleUrls: ['./add-pay-per-click.component.css']
})
export class AddPayPerClickComponent implements OnInit {

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

  public pay_per_terms_condition;
  public bbc_type ='yes';
  public preferencesValue='';
  public profileControlValue='';
  public preferencesArray=[];
  public profileControlArray=[];

  public addFormFlag:boolean=false;

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

     // setTimeout(() => {
     //  if (this.tokenSaveService.getUserMembership() == 'Yes'){
     //      alert();
     //      this.router.navigate(['/speed-date']); 
     //   }
     
     // }, 2000);

    this.initMap();

     this.factory_form = this.formBuilder.group({
       state_of_residence: new FormControl('', [Validators.required]),
       contact_number: new FormControl('', [Validators.required, MobilePatternValidator(/^(?=.*[0-9]).{8,15}$/), Validators.minLength(8), Validators.maxLength(15)]),
       updated_email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
       screen_name: new FormControl('', [Validators.required]),
       life_style_nickname: new FormControl('', [Validators.required]),
       life_style_website: new FormControl('', [Validators.required]),
       age: new FormControl('', [Validators.required]),
       height_feet: new FormControl('', [Validators.required]),
       height_inch: new FormControl(''),
       weight: new FormControl('', [Validators.required]),
       self_description: new FormControl(''),
       face_picture: new FormControl('', [Validators.required]),
       shirtless_picture: new FormControl('', [Validators.required]),
       full_body_picture: new FormControl('', [Validators.required]),
       validation_picture: new FormControl('', [Validators.required]),
        
    });
    
 }

 
  get f() {
    return this.factory_form.controls;
  }

 

  public selectBBC(val){

    this.bbc_type = val;
   
   if(this.bbc_type == 'yes'){
     this.bbc_type = val;
   }else{
     
     this.bbc_type = 'yes';
     this.router.navigate(['/view-pay-per-click']);
     // $('#addChocolateFormModal').modal('hide');
    }
  
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

public selectProfileControl(unitObject,value){
    if(value == true){
      this.profileControlArray.push(unitObject)
    }else{
      const index: number = this.profileControlArray.indexOf(unitObject);
      this.profileControlArray.splice(index, 1);
    }
    console.log('profileControlArray',this.profileControlArray);
}



 public onSubmit() {
    
    const data = this.factory_form.value;
    console.log(data);

  
    if (this.factory_form.valid) 
    {
        
        var error = 1;

        var lat = $('#lat').val();
        var lng = $('#lng').val();
        var city_name = $('#city_name').val();
        var formatted_address = $('#formatted_address').val();

          
        if(this.preferencesArray.length == 0){
          error = 0;
          this.toastr.errorToastr('Please select preferences', 'Error!');

        }else{
          error = 1;
        }
        if(this.profileControlArray.length == 0){
          error = 0;
          this.toastr.errorToastr('Please select profile control', 'Error!');
        }else{
          error = 1;
        }

        if(data.age <= 18){
          error = 0;
          this.toastr.errorToastr('Age 18+ reqiuired', 'Error!');
        }else{
          error = 1;
        }

            // alert(error);
           if(error == 1){

             this.regData = {
              'bbc_type': this.bbc_type,
              'preferences': this.preferencesArray,
              'profile_control': this.profileControlArray,
              'state_of_residence': formatted_address,
              'contact_number': data.contact_number,
              'updated_email': data.updated_email,
              'screen_name': data.screen_name,
              'life_style_nickname': data.life_style_nickname,
              'life_style_website': data.life_style_website,
              'age': data.age,
              'height_inch': data.height_inch,
              'height_feet': data.height_feet,
              'weight': data.weight,
              'self_description': data.self_description,
              'face_picture': data.face_picture,
              'shirtless_picture': data.shirtless_picture,
              'full_body_picture': data.full_body_picture,
              'validation_picture': data.validation_picture,
              'lat': lat,
              'lng': lng,
              'city_name': city_name,
              
             
            }

              $('#preloader').show();
              this.callapi.post('/payperclick/save_chocolate_data', this.regData).subscribe(result => {
               $('#preloader').hide();
                this.data = result;
                if ((this.data.status == 200) || (this.data.status === '200')) {

                  this.toastr.successToastr(this.data.message, 'Success!');
                 this.router.navigate(['/view-pay-per-click']);
                 
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



  


    onFileChange(event: Event,type): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        
        var obj ={
          'image':reader.result
        }
      $('#preloader').show();
      this.callapi.post('/upload/imageupload', obj).subscribe(result => {
      
        if ((result.status == 200) || (result.status === '200')) {
           $('#preloader').hide();
          this.toastr.successToastr(result.message, 'Success!');
          if(type=='1'){
             this.factory_form.controls["face_picture"].setValue(result.data);
          }
          if(type=='2'){
             this.factory_form.controls["shirtless_picture"].setValue(result.data);
         }
          if(type=='3'){
            this.factory_form.controls["full_body_picture"].setValue(result.data);
          }
          if(type=='4'){
            this.factory_form.controls["validation_picture"].setValue(result.data);
          }
        
        } else {
          $('#preloader').hide();
          this.toastr.errorToastr(result.message, 'Error!');
       }
      },err => {
        $('#preloader').hide();
      });
        
      };

      reader.readAsDataURL(file);
    }
  }


 public initMap()
  {
     var input = document.getElementById("state_of_residence");
     
    
      var autocomplete = new google.maps.places.Autocomplete(input);
      console.log(autocomplete);
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
          $('#formatted_address').val(formatted_address);
          // $('#submit_button').prop('disabled', false);
      });
  }



}
