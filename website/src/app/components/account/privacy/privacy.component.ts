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
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  public privacyData;
  public everyone_or_friend;
  public profile_chat_message;
  public interests: FormGroup;

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

     this.getAllPrivecy();

     this.interests = this.formBuilder.group({
        profile_show_everyone_or_friend: new FormControl(),
        profile_show_countries: new FormControl(),
        profile_show_countries_lat: new FormControl(),
        profile_show_countries_lng: new FormControl(),
        show_age: new FormControl(),
        show_gender: new FormControl(),
        show_location: new FormControl(),
        show_relationship: new FormControl(),
        show_interests_preferences: new FormControl(),
        show_language_preferences: new FormControl(),
        show_profile_image: new FormControl(),
        show_search_result: new FormControl(),
        show_online_status: new FormControl(),
        show_activity_visit_comments_like: new FormControl(),
        show_appear_in_search_results: new FormControl(),
        show_profile_chat_message: new FormControl(),
        // profile_chat_message: new FormControl(),
        // profile_chat_message: new FormControl(),
        show_notification_new_message: new FormControl(),
        show_notification_like: new FormControl(),
        show_notification_validation: new FormControl(),
        show_notification_friend_request: new FormControl(),

       
    });
     
 } 

 get f() {
    return this.interests.controls;
}

 
  public getAllPrivecy(){

    this.callapi.get('/user/privacy_details').subscribe(data => {
      $('#preloader').hide();
        if(data.status == 200){
          this.privacyData = data.data;

          console.log('this.privacyData',this.privacyData);
          
          setTimeout(() => {

            if(this.privacyData['profile_show_everyone_or_friend'] == 1){
              this.everyone_or_friend = 1;
              this.interests.get('profile_show_everyone_or_friend').setValue(true);
            }else{
              this.everyone_or_friend = 0;
              this.interests.get('profile_show_everyone_or_friend').setValue(false);
            }

            this.profile_chat_message = this.privacyData['show_profile_chat_message'];


            if(this.privacyData['profile_show_countries'] == 1){
              this.interests.get('profile_show_countries').setValue(true);
            }else{
              this.interests.get('profile_show_countries').setValue(false);
            }

            this.interests.get('profile_show_countries_lat').setValue(this.privacyData['profile_show_countries_lat']);
            this.interests.get('profile_show_countries_lng').setValue(this.privacyData['profile_show_countries_lng']);

            if(this.privacyData['show_age'] == 1){
              this.interests.get('show_age').setValue(true);
            }else{
              this.interests.get('show_age').setValue(false);
            }

            if(this.privacyData['show_gender'] == 1){
              this.interests.get('show_gender').setValue(true);
            }else{
              this.interests.get('show_gender').setValue(false);
            }

            if(this.privacyData['show_location'] == 1){
              this.interests.get('show_location').setValue(true);
            }else{
              this.interests.get('show_location').setValue(false);
            }
            if(this.privacyData['show_relationship'] == 1){
              this.interests.get('show_relationship').setValue(true);
            }else{
              this.interests.get('show_relationship').setValue(false);
            }

            if(this.privacyData['show_interests_preferences'] == 1){
              this.interests.get('show_interests_preferences').setValue(true);
            }else{
              this.interests.get('show_interests_preferences').setValue(false);
            }

            if(this.privacyData['show_language_preferences'] == 1){
              this.interests.get('show_language_preferences').setValue(true);
            }else{
              this.interests.get('show_language_preferences').setValue(false);
            }

            if(this.privacyData['show_profile_image'] == 1){
              this.interests.get('show_profile_image').setValue(true);
            }else{
              this.interests.get('show_profile_image').setValue(false);
            }

            if(this.privacyData['show_search_result'] == 1){
              this.interests.get('show_search_result').setValue(true);
            }else{
              this.interests.get('show_search_result').setValue(false);
            }

            if(this.privacyData['show_online_status'] == 1){
              this.interests.get('show_online_status').setValue(true);
            }else{
              this.interests.get('show_online_status').setValue(false);
            }

            if(this.privacyData['show_activity_visit_comments_like'] == 1){
              this.interests.get('show_activity_visit_comments_like').setValue(true);
            }else{
              this.interests.get('show_activity_visit_comments_like').setValue(false);
            }

            if(this.privacyData['show_appear_in_search_results'] == 1){
              this.interests.get('show_appear_in_search_results').setValue(true);
            }else{
              this.interests.get('show_appear_in_search_results').setValue(false);
            }

            // if(this.privacyData['show_chat_message_everyone'] == 1){
            //   this.interests.get('show_chat_message_everyone').setValue(true);
            // }else{
            //   this.interests.get('show_chat_message_everyone').setValue(false);
            // }

            // if(this.privacyData['show_chat_message_friend_connections'] == 1){
            //   this.interests.get('show_chat_message_friend_connections').setValue(true);
            // }else{
            //   this.interests.get('show_chat_message_friend_connections').setValue(false);
            // }

            // if(this.privacyData['show_chat_message_friend_od_friend'] == 1){
            //   this.interests.get('show_chat_message_friend_od_friend').setValue(true);
            // }else{
            //   this.interests.get('show_chat_message_friend_od_friend').setValue(false);
            // }
            if(this.privacyData['show_notification_new_message'] == 1){
              this.interests.get('show_notification_new_message').setValue(true);
            }else{
              this.interests.get('show_notification_new_message').setValue(false);
            }
            if(this.privacyData['show_notification_like'] == 1){
              this.interests.get('show_notification_like').setValue(true);
            }else{
              this.interests.get('show_notification_like').setValue(false);
            }
            if(this.privacyData['show_notification_validation'] == 1){
              this.interests.get('show_notification_validation').setValue(true);
            }else{
              this.interests.get('show_notification_validation').setValue(false);
            }
            if(this.privacyData['show_notification_friend_request'] == 1){
              this.interests.get('show_notification_friend_request').setValue(true);
            }else{
              this.interests.get('show_notification_friend_request').setValue(false);
            }



          }, 1000);
        }else{
          this.privacyData = '';
        }
    }); 
  }


  public selectBBC(val){
      this.everyone_or_friend = val;
   
 }

 public selectProfileChatMsg(val){
    this.profile_chat_message = val;
 }
 
  public updatePrivacy() {
    
    // this.submitted = true;
    const data = this.interests.value;

    console.log(this.interests.value);
    
       
      

      if(data.profile_show_countries == true){
        data.profile_show_countries = 1;
      }else{
        data.profile_show_countries = 0;
      }

      
      if(data.show_age == true){
        data.show_age = 1;
      }else{
        data.show_age = 0;
      }

      if(data.show_gender == true){
        data.show_gender = 1;
      }else{
        data.show_gender = 0;
      }

      if(data.show_location == true){
        data.show_location = 1;
      }else{
        data.show_location = 0;
      }

      if(data.show_relationship == true){
        data.show_relationship = 1;
      }else{
        data.show_relationship = 0;
      }

      if(data.show_interests_preferences == true){
        data.show_interests_preferences = 1;
      }else{
        data.show_interests_preferences = 0;
      }

      if(data.show_language_preferences == true){
        data.show_language_preferences = 1;
      }else{
        data.show_language_preferences = 0;
      }
      
      if(data.show_profile_image == true){
        data.show_profile_image = 1;
      }else{
        data.show_profile_image = 0;
      }
      
      if(data.show_search_result == true){
        data.show_search_result = 1;
      }else{
        data.show_search_result = 0;
      }

       if(data.show_online_status == true){
        data.show_online_status = 1;
      }else{
        data.show_online_status = 0;
      }

      if(data.show_activity_visit_comments_like == true){
        data.show_activity_visit_comments_like = 1;
      }else{
        data.show_activity_visit_comments_like = 0;
      }

      if(data.show_appear_in_search_results == true){
        data.show_appear_in_search_results = 1;
      }else{
        data.show_appear_in_search_results = 0;
      }

      if(data.show_chat_message_everyone == true){
        data.show_chat_message_everyone = 1;
      }else{
        data.show_chat_message_everyone = 0;
      }
      
      if(data.show_chat_message_friend_connections == true){
        data.show_chat_message_friend_connections = 1;
      }else{
        data.show_chat_message_friend_connections = 0;
      }
      
      if(data.show_chat_message_friend_od_friend == true){
        data.show_chat_message_friend_od_friend = 1;
      }else{
        data.show_chat_message_friend_od_friend = 0;
      }

      if(data.show_notification_new_message == true){
        data.show_notification_new_message = 1;
      }else{
        data.show_notification_new_message = 0;
      }

      if(data.show_notification_like == true){
        data.show_notification_like = 1;
      }else{
        data.show_notification_like = 0;
      }

      if(data.show_notification_validation == true){
        data.show_notification_validation = 1;
      }else{
        data.show_notification_validation = 0;
      }

      if(data.show_notification_friend_request == true){
        data.show_notification_friend_request = 1;
      }else{
        data.show_notification_friend_request = 0;
      }
        
        console.log(this.interests.value);

          var obj = {
              'profile_show_everyone_or_friend': this.everyone_or_friend,
              'profile_show_countries': data.profile_show_countries,
              'profile_show_countries_lat': data.profile_show_countries_lat,
              'profile_show_countries_lng': data.profile_show_countries_lng,
              'show_age': data.show_age,
              'show_gender': data.show_gender,
              'show_location': data.show_location,
              'show_relationship': data.show_relationship,
              'show_interests_preferences': data.show_interests_preferences,
              'show_language_preferences': data.show_language_preferences,
              'show_profile_image': data.show_profile_image,
              'show_search_result': data.show_search_result,

              'show_online_status': data.show_online_status,
              'show_activity_visit_comments_like': data.show_activity_visit_comments_like,
              'show_appear_in_search_results': data.show_appear_in_search_results,
              'show_chat_message_everyone': data.show_chat_message_everyone,
              'show_chat_message_friend_connections': data.show_chat_message_friend_connections,
              'show_chat_message_friend_od_friend': data.show_chat_message_friend_od_friend,
              'show_notification_new_message': data.show_notification_new_message,
              'show_notification_like': data.show_notification_like,
              'show_notification_validation': data.show_notification_validation,
              'show_notification_friend_request': data.show_notification_friend_request,
              'show_profile_chat_message': this.profile_chat_message,
             
           }
            
            $('#preloader').show();
            this.callapi.post('/user/update_privacy', obj).subscribe(result => {
             $('#preloader').hide();
              
              if ((result.status == 200) || (result.status === '200')) {
                this.toastr.successToastr(result.message, 'Success!');
                this.getAllPrivecy();
              } else {
                $('#preloader').hide();
                this.toastr.errorToastr(result.message, 'Error!');
                
              }
            },err => {
              $('#preloader').hide();
            });
        
       
        
   
 }

 

}
