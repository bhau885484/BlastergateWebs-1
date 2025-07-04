import { Component,OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';
import * as service from '../../../api-service/service/index';
declare const $: any;
import { EmailPatternValidator } from '../../../api-service/all-validation-pattern/email-pattern-validator';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';



@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent implements OnInit {
 public userData;
 public profileDataImage;
 public save_profile_type;
 public short_notification;
 public notification_count = '0';
 public all_notification_count = '0';
 public bodydata: any = {};
 
 public currentRoute;
 public short_notification_flag:boolean=true;
 public new_link;
 public profile_img = 'assets/img/lock.png';
  constructor(
        private formBuilder: FormBuilder,
        private api: service.CallApiService,
        private tokenService: service.CanTokenSaveService,
        private toastr: ToastrManager,
        private tokenSaveService: service.CanTokenSaveService,
        private tokenExpService: service.CanTokenRemoveService,
        
        public commonServe: service.CommonService,public router: Router,private authService: service.CommonAuthService) 
        { 

           if (!this.tokenService.getAccessToken()){
               this.authService.onLogout(); 
            }

            this.router.events.subscribe(() => {
              this.currentRoute = this.router.url;
              // console.log(this.currentRoute);
            });

        }

  ngOnInit() {



    setTimeout(() => {
       if ($(window).width() < 768) {  // Mobile screen (common breakpoint)
        
         $('#sidebar').addClass('hide');
         $('#sidebar').removeClass('show');

          $('#mobile_right_menu').removeClass('show');
          $('#mobile_right_menu').addClass('hide');
         
      } else {
          $('#sidebar').addClass('show');
          $('#sidebar').removeClass('hide');
          // $('#mobile_right_menu').removeClass('hide');
          // $('#mobile_right_menu').addClass('show');
      }
     }, 2000);


    

    this.save_profile_type = this.tokenService.getProfileType();
    
    // $('#preloader').show();
    

     if (!this.tokenService.getAccessToken()){
         this.api.get('/user/logout').subscribe(data => {
          this.authService.onLogout();
       });
    }

    this.api.post('/user/check_login_user_membership').subscribe(data1 => {
          if(data1.status=='200'){
           this.tokenSaveService.saveUserMembership(data1.membership_expire);
          }else{
            this.tokenSaveService.saveUserMembership(data1.membership_expire);
          }
       });


     this.api.get('/user/me').subscribe(data => {
          if(data.status=='200'){
            this.userData = data.data;
            this.commonServe.username = data.data.username;
            this.bodydata['notification_type']='short';
            this.allCount();
            this.allNotification(this.bodydata);

          }else{
            if(data.message == 'Invalid Token'){
              this.authService.onLogout();
            }else{
              this.userData = '';
            }
            
          }
       });



     this.api.get('/user/signle_user_profile_image').subscribe(data => {
      if(data.status == 200){
        this.profileDataImage = data.data;
        this.profile_img = this.profileDataImage[0].profile_image;
        // console.log('this.profileDataImage>>>>>',this.profileDataImage);
      }else{
        this.profileDataImage = '';
      }
    }); 

   
   
     
 }

 public hideShow(){

  if($('#sidebar').hasClass('hide')){
     $('#sidebar').removeClass('hide');
     $('#sidebar').addClass('show');
   }else{
     $('#sidebar').addClass('hide');
      $('#sidebar').removeClass('show');
   }
  
 }

 public rightToggle(){

   if($('#mobile_right_menu').hasClass('hide')){
     $('#mobile_right_menu').removeClass('hide');
     $('#mobile_right_menu').addClass('show');
   }else{
     $('#mobile_right_menu').addClass('hide');
      $('#mobile_right_menu').removeClass('show');
   }
 }


 public allNotification(bodydata){


    this.api.post('/notification/get_all_short_notification',bodydata).subscribe(data => {
      $('#preloader').hide();
      if(data.status == 200){
        this.short_notification_flag= true; 
       this.short_notification = data.data;
       this.notification_count = data.notification_count;
       this.all_notification_count = data.all_notification_count;

       setTimeout(() => {
         $(".noti_title").html(function(){
          var text= $(this).text().trim().split(" ");
          var first = text.shift();
          // console.log('first',first);
          return (text.length > 0 ? "<span class='noti_title_red'>"+ first + "</span> " : first) + text.join(" ");
        });
       }, 2000);

      


      }else{

       this.short_notification_flag= false; 
       this.short_notification = '';
      }
    }); 

     // setTimeout(() => {
     //    this.allNotification();
     // }, 5000);
} 


public allCount(){
    this.api.get('/notification/all_count').subscribe(data => {
      if(data.status == 200){
        this.commonServe.all_friend_count = data.data.all_friend_count;
        this.commonServe.all_validation_request_count = data.data.all_validation_request_count;
        this.commonServe.all_friend_request_count = data.data.all_friend_request_count;
        this.commonServe.all_who_i_viewed_count = data.data.all_who_i_viewed_count;
        this.commonServe.all_likes_count = data.data.all_likes_count;
        this.commonServe.all_block_count = data.data.all_block_count;
        this.commonServe.all_notes_count = data.data.all_notes_count;
        this.commonServe.all_remember_count = data.data.all_remember_count;

        this.commonServe.all_viewedme_count = data.data.all_viewedme_count;
        this.commonServe.all_online_user_count = data.data.all_online_user_count;
        this.commonServe.all_event_notification_count = data.data.all_event_notification_count;
        this.commonServe.all_blaster_notification_count = data.data.all_blaster_notification_count;
        this.commonServe.all_speed_date_count = data.data.all_speed_date_count;

        this.commonServe.all_video_count = data.data.all_video_count;

       
      }else{
        this.commonServe.all_friend_count =0;
        this.commonServe.all_validation_request_count = 0;
        this.commonServe.all_friend_request_count = 0;
        this.commonServe.all_who_i_viewed_count =0;
        this.commonServe.all_likes_count=0;
        this.commonServe.all_block_count=0;
        this.commonServe.all_notes_count=0;
        this.commonServe.all_remember_count=0; 
        this.commonServe.all_viewedme_count = 0;
        this.commonServe.all_online_user_count = 0;
        this.commonServe.all_event_notification_count = 0;
        this.commonServe.all_blaster_notification_count = 0;
        this.commonServe.all_speed_date_count = 0;
        this.commonServe.all_video_count = 0;
       
      }
    }); 

     // setTimeout(() => {
     //    this.allCount();
     // }, 4000);
} 


public seeAllNotification(){

  this.bodydata['notification_type']='all';
  $('#preloader').show();
  $('#see_all').hide();

  this.allNotification(this.bodydata);

}




public viewNotification(){
  this.router.navigateByUrl('/feed');
}


onLogout() {
  // alert();
 $('#preloader').show();
  this.authService.onLogout();
  this.api.get('/user/logout').subscribe(data => {
   $('#preloader').hide();
    this.authService.onLogout();
 });
  
}


public linkRouter(link){

    $('#preloader').show();
     setTimeout(() => {
        clearTimeout(this.commonServe.timeoutId);
        this.router.navigate([link]);

        if(this.currentRoute == link){
           $('#preloader').hide();
        }
       
      }, 2500);
 }

 public linkRouter_new(link,chocolate_factory_id,chocolate_factory_paid_image_id,chocolate_factory_paid_video_id){

   // alert(chocolate_factory_id);

   if(link == 'chocolate_factory_image_payment'){
     this.router.navigate(['/edit-pay-per-click'], { queryParams: { id: btoa(chocolate_factory_id),type: btoa('photo'),selected: btoa('notification'),chocolate_factory_paid_image_id: btoa(chocolate_factory_paid_image_id) }});

   }else if(link == 'chocolate_factory_video_payment'){
     this.router.navigate(['/edit-pay-per-click'], { queryParams: { id: btoa(chocolate_factory_id),type: btoa('video'),selected: btoa('notification'),chocolate_factory_paid_video_id: btoa(chocolate_factory_paid_video_id) }});
   }else{
     if(link == 'pay_per_click'){
       this.new_link = '/feed';
     }
     if(link == 'friend_request'){
       this.new_link = '/friend-request';
     }
     if(link == 'validation_request'){
       this.new_link = '/validation-request';
     }
     if(link == 'view_profile'){
       this.new_link = '/viewed-me';
     }
     if(link == 'Dislike_profile'){
       this.new_link = '/likes';
     }
     if(link == 'Like_profile'){
       this.new_link = '/likes';
     }
     if(link == 'chocolate_factory'){
       this.new_link = '/feed';
     }
     if(link == 'event'){
       this.new_link = '/feed';
     }
     if(link == 'user'){
       this.new_link = '/feed';
     }
    

      $('#preloader').show();
       setTimeout(() => {
          clearTimeout(this.commonServe.timeoutId);
          this.router.navigate([this.new_link]);

          if(this.currentRoute == this.new_link){
             $('#preloader').hide();
          }
         
        }, 2500);
   }

   
 }

  public toggleNotifications() {
        const panel = document.getElementById('notificationPanel');
        panel.classList.toggle('active');
    }


  public onSearch(){

      var search_value = $('#search_value').val();

      this.commonServe.search_value = search_value;

      if(search_value == ''){
        this.toastr.errorToastr('Please search data...!', 'Error!');
      }else{
         $('#preloader').show();
         setTimeout(() => {
           var obj={
             "search_keyword":search_value
           }
           this.api.post('/online/get_all_search_user',obj).subscribe(data => {
            $('#preloader').hide();
            if(data.status == 200){
              this.commonServe.searchUserData = data.data;
             this.router.navigate(['/search-result'], { queryParams: { keyword: btoa(search_value)}});
            }else{
              this.router.navigate(['/search-result'], { queryParams: { keyword: btoa(search_value)}});
              this.commonServe.searchUserData = '';
            }
         }); 

           // $('#preloader').hide();
           
         }, 2000);
          
      }


  }

}
