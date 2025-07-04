import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';
import * as service from '../../../api-service/service/index';
declare const $: any;
import { EmailPatternValidator } from '../../../api-service/all-validation-pattern/email-pattern-validator';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';
// import { AuthService } from '../shared/service';


@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {
  public start = 0;
  public save_profile_type;
  currentRoute: string = '';

  constructor(private formBuilder: FormBuilder,
                private api: service.CallApiService,
                private tokenService: service.CanTokenSaveService,
                private toastr: ToastrManager,
                private tokenExpService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,public router: Router,
                private authService: service.CommonAuthService) {

                this.router.events.subscribe(() => {
                    this.currentRoute = this.router.url;
                    console.log(this.currentRoute);
                  });
                
                 }

  ngOnInit() {

     if (!this.tokenService.getAccessToken()){
       this.authService.onLogout(); 
    }

    this.save_profile_type = this.tokenService.getProfileType();
    // alert(this.save_profile_type);
     // this.allCount();
      
}

// public allCount(){
//     this.api.get('/notification/all_count').subscribe(data => {
//       if(data.status == 200){
//         this.commonServe.all_friend_count = data.data.all_friend_count;
//         this.commonServe.all_who_i_viewed_count = data.data.all_who_i_viewed_count;
//         this.commonServe.all_likes_count = data.data.all_likes_count;
//         this.commonServe.all_block_count = data.data.all_block_count;
//         this.commonServe.all_notes_count = data.data.all_notes_count;
//         this.commonServe.all_remember_count = data.data.all_remember_count;
       
//       }else{
//         this.commonServe.all_friend_count =0;
//         this.commonServe.all_who_i_viewed_count =0;
//         this.commonServe.all_likes_count=0;
//         this.commonServe.all_block_count=0;
//         this.commonServe.all_notes_count=0;
//         this.commonServe.all_remember_count=0; 
//         // alert('wrr');
//         // this.profileDataApproveVideo = '';
//       }
//     }); 
//  }

public linkRouter(link){

  if (window.matchMedia("(max-width: 767px)").matches)  
    { 
        $('#left_menu').addClass('hide_toggle');
        $('#left_menu').removeClass('show_toggle');

        $('#right_menu').addClass('hide_toggle');
        $('#right_menu').removeClass('show_toggle');
       
        // document.write("This is a mobile device."); 
    } else { 
       $('#left_menu').addClass('show_toggle');
       $('#left_menu').removeClass('hide_toggle');

       $('#right_menu').addClass('show_toggle');
       $('#right_menu').removeClass('hide_toggle');
        
       
        // document.write("This is a tablet or desktop."); 
    }

  $('#preloader').show();
  setTimeout(() => {
        // alert(this.commonServe.timeoutId);
      clearTimeout(this.commonServe.timeoutId);
     this.router.navigate([link]);
     if(this.currentRoute == link){
           $('#preloader').hide();
      }

     
   }, 2500);

  
    
  }

onLogout() {
       
       this.api.get('/user/logout').subscribe(data => {
          this.authService.onLogout();
       });
        
      }

}