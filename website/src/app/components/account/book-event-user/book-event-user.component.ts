import { Component, EventEmitter, Input, OnInit, Output,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs'; 
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../../api-service/service/index';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { PasswordMatchPattern } from '../../../api-service/all-validation-pattern/password-match-pattern';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';

declare const $: any;
declare const google: any;
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({ 
  selector: 'app-book-event-user',
  templateUrl: './book-event-user.component.html',
  styleUrls: ['./book-event-user.component.css']
})
export class BookEventUserComponent implements OnInit {

  public onlineUserData;
   public total_distance=0;
   public singleOnlineData;
   public bodydata: any = {};
   public singleUserData;
   public login_user_id;

   public event_id;

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,private activatedRoute: ActivatedRoute)
  { 
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {

    this.event_id = atob(this.activatedRoute.snapshot.queryParams["event_id"]);
    // alert(this.login_user_id);

      setTimeout(() => {
        $('#right_side_togle').removeClass('show_toggle');
        $('#right_side_togle').addClass('hide_toggle');

        $('#big_tab').removeClass('col-lg-8');
        $('#big_tab').addClass('col-lg-10');
     }, 1000);
      
    this.bodydata['event_id'] = this.event_id;
   

    this.getOnlineUser(this.bodydata);
    
 } 

  public getOnlineUser(bodydata){
   
        
         this.callapi.post('/events/get_all_event_book_user',this.bodydata).subscribe(data => {
              if(data.status == 200){
                this.onlineUserData = data.data;
               }else{
                this.onlineUserData = '';
              }
          }); 
     

    // this.commonServe.timeoutId = setTimeout(() => {
    //     this.getOnlineUser(this.bodydata);
    //  }, 10000);


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

  public onSubmitFilter(){
    if($("#profile_type_couple").prop('checked') == true){
      var profile_type_couple = '1';
    }else{
      var profile_type_couple = '0';
    }

    if($("#profile_type_male").prop('checked') == true){
      var profile_type_male = '1';
    }else{
      var profile_type_male = '0';
    }

     if($("#profile_type_female").prop('checked') == true){
      var profile_type_female = '1';
    }else{
      var profile_type_female = '0';
    }

    if($("#profile_type_transgender").prop('checked') == true){
      var profile_type_transgender = '1';
    }else{
      var profile_type_transgender = '0';
    }

    if($("#profile_type_birthday").prop('checked') == true){
      var profile_type_birthday = '1';
    }else{
      var profile_type_birthday = '0';
    }
    

    this.bodydata['profile_type_couple'] = profile_type_couple;
    this.bodydata['profile_type_male'] = profile_type_male;
    this.bodydata['profile_type_female'] = profile_type_female;
    this.bodydata['profile_type_transgender'] = profile_type_transgender; 
    this.bodydata['profile_type_birthday'] = profile_type_birthday; 

   this.getOnlineUser(this.bodydata);
   
  }


  public onChat(singleUserData){
    this.singleUserData = singleUserData;
    $('#chatModal').modal('show');
    // alert();

  }



 


}
