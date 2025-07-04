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
  selector: 'app-speed-date',
  templateUrl: './speed-date.component.html',
  styleUrls: ['./speed-date.component.css']
})
export class SpeedDateComponent implements OnInit {


  public onlineUserData;
   public total_distance=0;
   public singleOnlineData;
   public bodydata: any = {};
   public singleUserData;
   public login_user_id;

   public selected_date;
   public infoText;
   public loaderFlag :boolean=false;
   public singleDetails;


    public membershipFlag :boolean=false;
    public profileTypeArray=[];
   

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
         this.membershipFlag = false;
       }else{
         this.membershipFlag = true;
         setTimeout(() => {
           this.initMap();
            }, 2000);
          
       }
     
     }, 2000);
 
    

      this.login_user_id = this.tokenSaveService.getUserId();
    
    this.bodydata['user_type']='other';
    this.bodydata['search_keyword'] = '';
    this.bodydata['lat'] = '0';
    this.bodydata['lng'] = '0';
    this.bodydata['profileTypeArray'] = this.profileTypeArray;

    this.getOnlineUser(this.bodydata);
    
 } 

 public myData(type){
   this.bodydata['user_type']=type;
    this.getOnlineUser(this.bodydata);
 }

  public getOnlineUser(bodydata){
     this.callapi.post('/location/get_all_speed_data',this.bodydata).subscribe(data => {
       $('#preloader').hide();
          if(data.status == 200){
            this.loaderFlag = true;
            this.onlineUserData = data.data;
          }else{
            this.loaderFlag = true;
            this.onlineUserData = '';
          }
      }); 
   
  }

  

  public OpenPopup(){
        if($('#new_popup').hasClass('hide_class')){
           $('#new_popup').removeClass('hide_class');
           $('#new_popup').addClass('show_class');
        }else{
         $('#new_popup').removeClass('show_class');
          $('#new_popup').addClass('hide_class');
        }
  }

  public showAllImage(onlineUser){
    this.singleOnlineData = onlineUser;
    $('#allImageModal').modal('show');

  }

  // public showAllvideo(onlineUser){
  //   this.singleOnlineData = onlineUser;
  //   console.log(this.singleOnlineData);
  //   $('#allVideoModal').modal('show');
  // }

  public viewrecord(user_id,profile_type){
    // alert(user_id);
    if(profile_type == 'single'){
     this.router.navigate(['/single-user-profile'], { queryParams: { user_id: btoa(user_id) }}); 
    }
    if(profile_type == 'couple'){
     this.router.navigate(['/couple-user-profile'], { queryParams: { user_id: btoa(user_id) }}); 
    }
    
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


 public selectProfileType(unitObject: string,value){
  
    if(value == true){
      this.profileTypeArray.push(unitObject)
    }else{
      const index: number = this.profileTypeArray.indexOf(unitObject);
      this.profileTypeArray.splice(index, 1);
    }
    console.log('preferencesArray',this.profileTypeArray);
}

  public onSubmitFilter(){
    // $('#preloader').show();
   

    var search_keyword = $('#search_keyword').val();
     this.bodydata['keyword'] = search_keyword;
    var address = $('#address').val();

    if(address == ''){
       this.bodydata['lat'] = '0';
      this.bodydata['lng'] = '0';
      this.bodydata['city'] = '0';
    }else{
      this.bodydata['lat'] = $('#lat').val();
      this.bodydata['lng'] = $('#lng').val();
      this.bodydata['city'] = $('#city').val();
    }
    

    this.bodydata['profileTypeArray'] = this.profileTypeArray;
    
    

   this.getOnlineUser(this.bodydata);
   
  }

  public AddSpeedDate(){
    this.router.navigate(['/add-speed-date']);
  }


  public linkRouter(link){

    $('#preloader').show();
    this.router.navigate([link]);
 }

public viewMembershipInfo(){
    $('#membershipModal').modal('show');
  }

  public showMore(onlineUser){
    this.singleDetails = onlineUser;
    $('#showMoreModal').modal('show');
  }


  public deleteSpeedDate(speed_date_id){

    var result = confirm("Are you sure Want to delete?");
      if (result==true) 
      {
       
       var obj={
           'speed_date_id':speed_date_id
         }
      $('#preloader').show();
       this.callapi.post('/location/delete_my_speed_date',obj).subscribe(result1 => {
          $('#preloader').hide();    
          
          if ((result1.status == 200) || (result1.status === '200')) {
            this.toastr.successToastr(result1.message, 'Success!');
            this.bodydata['user_type']='me';
              this.getOnlineUser(this.bodydata);
          } else {
            this.toastr.errorToastr(result1.message, 'Error!');
            
          }
        },err => {
          $('#preloader').hide();
        });

      } else {
       return false;
      }
  }

 


 

 


}
