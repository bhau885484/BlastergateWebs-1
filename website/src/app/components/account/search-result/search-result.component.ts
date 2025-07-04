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
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  public onlineUserData;
   public total_distance=0;
   public singleOnlineData;
   public bodydata: any = {};
   public singleUserData;
   public login_user_id;
   public from_user;
   public to_user;
   public loaderFlag :boolean=false;
   public membershipFlag :boolean=false; 
   public profileTypeArray=[];
   public keyword;
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

    // this.keyword = atob(this.activatedRoute.snapshot.queryParams["keyword"]);
    // alert(this.keyword);

    setTimeout(() => {
      $('#preloader').hide();
      if(this.commonServe.search_value){
        this.commonServe.search_value = this.commonServe.search_value;
      }else{
        this.commonServe.search_value = atob(this.activatedRoute.snapshot.queryParams["keyword"]);
      }

       this.commonServe.searchUserData = this.commonServe.searchUserData;
       
       this.bodydata['search_keyword'] = this.commonServe.search_value;
        this.getOnlineUser(this.bodydata);
       this.login_user_id = this.tokenSaveService.getUserId();

      if (this.tokenSaveService.getUserMembership() == 'Yes'){
         this.membershipFlag = false;
       }else{
         this.membershipFlag = true;
        
       }
     
     }, 2000);

 } 

  public getOnlineUser(bodydata){
   
         this.callapi.post('/online/get_all_search_user',this.bodydata).subscribe(data => {
            $('#preloader').hide();
            if(data.status == 200){
              this.commonServe.searchUserData = data.data;
             this.loaderFlag = true;
            }else{
              this.loaderFlag = true;
              this.commonServe.searchUserData = '';
            }
         }); 
   
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

     $('#membershipModal').modal('hide');
    $('#preloader').show();
    this.router.navigate([link]);
 }

}
