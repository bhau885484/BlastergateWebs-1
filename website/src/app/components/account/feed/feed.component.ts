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
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public onlineUserData;
   public total_distance=0;
   public singleOnlineData;
   public pendingFriendRequestData;
   public userNotificationData; 
   public eventNotificationData;
   public pendingValidateRequestData;
   public pendingValidateRequestDataFlag:boolean=false;
   public singleuserNotification;



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

      // this.getAllEventNotification();
      this.getAllUserNotification();
      this.getPendingFriendRequest();
      
 } 




 public blaster_notification(){
   
   $('#showFriendRequests').removeClass('active');
   $('#friendRequests').removeClass('active');
   $('#friendRequests').css('display','none');

   $('#websiteNotifications').addClass('active');
    $('#websiteNotifications').css('display','block');
   $('#showWebsiteNotifications').addClass('active');


 }

 public frind_request(){
   $('#websiteNotifications').removeClass('active');
   $('#showWebsiteNotifications').removeClass('active');
    $('#websiteNotifications').css('display','none');

   $('#showFriendRequests').addClass('active');
   $('#friendRequests').addClass('active');
   $('#friendRequests').css('display','block');
 }

 // public getAllEventNotification(){

 //    this.callapi.get('/events/get_user_event_notification').subscribe(data => {
 //        if(data.status == 200){
 //          this.eventNotificationData = data.data;
 //        }else{
 //          this.eventNotificationData = '';
 //        }
 //    }); 
 //  }


  public getAllUserNotification(){

    this.callapi.get('/events/get_all_notification').subscribe(data => {
      $('#preloader').hide();
        if(data.status == 200){
          this.userNotificationData = data.data;
        }else{
          this.userNotificationData = '';
        }
    }); 
  }

  public getPendingFriendRequest(){

    this.callapi.get('/feed/get_all_pending_friend_request').subscribe(data => {
      $('#preloader').hide();
        if(data.status == 200){
          this.pendingFriendRequestData = data.data;
        }else{
          this.pendingFriendRequestData = '';
        }
    }); 

    this.callapi.get('/feed/get_all_pending_validate_request').subscribe(data => {
      $('#preloader').hide();
        if(data.status == 200){
          this.pendingValidateRequestData = data.data;
          this.pendingValidateRequestDataFlag = true;
        }else{
          this.pendingValidateRequestData = '';
          this.pendingValidateRequestDataFlag = false;
        }
    }); 


  }

  public acceptRequest(user_id,status){
    var obj={
      'id':user_id,
      'status':status
    }
    this.callapi.post('/feed/accept_friend_request',obj).subscribe(data => {
        if(data.status == 200){
          this.getPendingFriendRequest();
          this.toastr.successToastr(data.message, 'Success!');
          window.location.reload();
        }else{
          this.toastr.errorToastr(data.message, 'Error!');
          
        }
    });

  }

  public acceptValidationRequest(id,status){
    var obj={
      'id':id,
      'status':status
    }
    this.callapi.post('/feed/accept_validate_request',obj).subscribe(data => {
        if(data.status == 200){
          this.getPendingFriendRequest();
          this.toastr.successToastr(data.message, 'Success!');
          window.location.reload();
        }else{
          this.toastr.errorToastr(data.message, 'Error!');
          
        }
    });

  }


  public notificationTab(){
    this.callapi.get('/notification/update_event_count').subscribe(data => {
      this.allCount();
    }); 

    
  }

   public allCount(){
    this.callapi.get('/notification/all_count').subscribe(data => {
      if(data.status == 200){
        this.commonServe.all_viewedme_count = data.data.all_viewedme_count;
        this.commonServe.all_online_user_count = data.data.all_online_user_count;
        this.commonServe.all_event_notification_count = data.data.all_event_notification_count;

        this.commonServe.all_friend_count = data.data.all_friend_count;
        this.commonServe.all_who_i_viewed_count = data.data.all_who_i_viewed_count;
        this.commonServe.all_likes_count = data.data.all_likes_count;
        this.commonServe.all_block_count = data.data.all_block_count;
        this.commonServe.all_notes_count = data.data.all_notes_count;
        this.commonServe.all_remember_count = data.data.all_remember_count;

        // alert(this.all_event_notification_count);
      }else{
        this.commonServe.all_viewedme_count =0;
        this.commonServe.all_event_notification_count =0;

        this.commonServe.all_friend_count = 0;
        this.commonServe.all_who_i_viewed_count = 0;
        this.commonServe.all_likes_count = 0;
        this.commonServe.all_block_count = 0;
        this.commonServe.all_notes_count = 0;
        this.commonServe.all_remember_count = 0;
        // alert('wrr');
        // this.profileDataApproveVideo = '';
      }
    }); 
 }

 public viewNotification(userNotification){

   this.singleuserNotification = userNotification;

   $('#singleuserNotificationModal').modal('show');

 }

  // public deleteRequest(user_id){
  //   var obj={
  //     'sendor_id':user_id
  //   }
  //   this.callapi.post('/feed/delete_friend_request',obj).subscribe(data => {
  //       if(data.status == 200){
  //         this.getPendingFriendRequest();
  //         this.toastr.successToastr(data.message, 'Success!');
  //       }else{
  //         this.toastr.errorToastr(data.message, 'Error!');
          
  //       }
  //   });
  // }

  

 



 


}
