import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';
import * as service from '../../../api-service/service/index';
declare const $: any;
import { EmailPatternValidator } from '../../../api-service/all-validation-pattern/email-pattern-validator';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';



@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

   currentRoute: string = '';


  constructor(private formBuilder: FormBuilder,
                private api: service.CallApiService,
                private tokenService: service.CanTokenSaveService,
                private toastr: ToastrManager,
                private tokenExpService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,public router: Router) { 

      this.router.events.subscribe(() => {
        this.currentRoute = this.router.url;
        console.log(this.currentRoute);
      });

  }

  ngOnInit() {

     
     setTimeout(() => {
       if (window.matchMedia("(max-width: 767px)").matches)  
        { 
            
            $('#left_menu').removeClass('show_toggle');
            $('#left_menu').addClass('hide_toggle');
            
            $('#right_menu').removeClass('show_toggle');
            $('#right_menu').addClass('hide_toggle');
            $('#preloader').hide();
           
        } else { 
          
           $('#left_menu').addClass('show_toggle');
           $('#left_menu').removeClass('hide_toggle');

           $('#right_menu').addClass('show_toggle');
           $('#right_menu').removeClass('hide_toggle');
           $('#preloader').hide();
            
            // The viewport is at least 768 pixels wide 
            // document.write("This is a tablet or desktop."); 
        } 
        
     }, 1000);

     
   
 }



 // public allCount(){
 //    this.api.get('/notification/all_count').subscribe(data => {
 //      if(data.status == 200){
 //        this.commonServe.all_viewedme_count = data.data.all_viewedme_count;
 //        this.commonServe.all_online_user_count = data.data.all_online_user_count;
 //        this.commonServe.all_event_notification_count = data.data.all_event_notification_count;
 //        // alert(this.all_event_notification_count);
 //      }else{
 //        this.commonServe.all_viewedme_count =0;
 //        this.commonServe.all_online_user_count =0;
 //        this.commonServe.all_event_notification_count =0;
 //        // alert('wrr');
 //        // this.profileDataApproveVideo = '';
 //      }
 //    }); 
 // }

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
        clearTimeout(this.commonServe.timeoutId);
        this.router.navigate([link]);

        if(this.currentRoute == link){
           $('#preloader').hide();
        }
       
      }, 2500);
 }


      
}
