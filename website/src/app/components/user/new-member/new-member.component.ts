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
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.css']
})
export class NewMemberComponent implements OnInit {

  public onlineUserData;
   public total_distance=0;
   public singleOnlineData;
   public bodydata: any = {};
   public singleUserData;
   public login_user_id;
   public loaderFlag :boolean=false;
    public membershipFlag :boolean=false;

   
   public from_user;
   public to_user;

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
    this.bodydata['type']='all';
    this.bodydata['search_keyword'] = '';
    this.bodydata['lat'] = '0';
    this.bodydata['lng'] = '0';
    this.bodydata['profileTypeArray'] = this.profileTypeArray; 
    this.getOnlineUser(this.bodydata);
    
 } 

  public getOnlineUser(bodydata){
   
        
         this.callapi.post('/online/get_all_new_user',this.bodydata).subscribe(data => {
            $('#preloader').hide();
              if(data.status == 200){
                this.onlineUserData = data.data;
               this.loaderFlag = true;
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

  public showAllvideo(onlineUser){
    this.singleOnlineData = onlineUser;
    console.log(this.singleOnlineData);
    $('#allVideoModal').modal('show');
  }

  public viewrecord(user_id,profile_type){
    // alert(user_id);
    if(profile_type == 'single'){
     this.router.navigate(['/single-user-profile'], { queryParams: { user_id: btoa(user_id) }}); 
    }
    if(profile_type == 'couple'){
     this.router.navigate(['/couple-user-profile'], { queryParams: { user_id: btoa(user_id) }}); 
    }
    
  }

 


  public onChat(singleUserData){
    this.singleUserData = singleUserData;
    this.from_user = sessionStorage.getItem("user-id");
    this.to_user = this.singleUserData.id;

    var obj={
      "from_user":this.from_user,
      "to_user":this.to_user,
      "last_login":this.singleUserData.last_login
    }

    // // Add contact User
    $('#preloader').show();
    this.callapi.post('/user/create_chat_room',obj).subscribe(data => {
       $('#preloader').hide();
       this.router.navigate(['/messenger'], { queryParams: { userid: btoa(this.singleUserData.email) }});
    },err => {
        $('#preloader').hide();
        this.toastr.errorToastr('Something Wrong!', 'Error!');
      }); 
  }




   public viewMembershipInfo(){
    $('#membershipModal').modal('show');
  }

  public linkRouter(link){

    $('#preloader').show();
     $('#membershipModal').modal('hide');
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

    console.log(this.bodydata);
   
   this.getOnlineUser(this.bodydata);
   
  }

  public sendRequest(type){

     this.bodydata['type'] = type;
   
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



 






 


}
