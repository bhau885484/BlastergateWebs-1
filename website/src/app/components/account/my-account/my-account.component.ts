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
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public profileData;
  public location_form: FormGroup;
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public submitted = false;
  public emailotp;

  public userMenbershipData;
  public membership_expire;
  public membership_id;

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,private authService: service.CommonAuthService)
  { 
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
    $('#preloader').hide();
    this.location_form = this.formBuilder.group({
      location: new FormControl(''),
      location_1: new FormControl(''),
      distance: new FormControl('')
      
    });

   this.getProfileData();
   this.getUserMembership();
   
  }

  public getUserMembership(){
    this.callapi.get('/membership/get_user_membership_plan').subscribe(data => {
      $('#preloader').hide();
          if(data.status == '200'){
            this.userMenbershipData = data.data;
            this.membership_expire = data.membership_expire;
            // alert(this.membership_expire);
            this.membership_id = data.membership_id;
         }else{
            this.userMenbershipData = '';
            this.membership_expire = '';
            this.membership_id = 0;
          }
      }); 
  }

  public getProfileData(){
    this.callapi.get('/user/signle_user_profile').subscribe(data => {
      if(data.status == 200){
        this.profileData = data.data;

         setTimeout(() => {
          this.location_form.patchValue({
            distance: this.profileData.distance,
          });
          
        }, 1000);
        // alert(this.profileData.person1_body_hair);
        
      }else{
        this.profileData = '';
      }
    }); 

  }

  
  public onUpdatePassword() {
    
    const account_password = $('#account_password').val();
    const account_confirm_password = $('#account_confirm_password').val();
    const account_old_password = $('#account_old_password').val();

    if(account_password == ''){
      this.toastr.errorToastr('Enter Password', 'Error!');
    }else if(account_old_password ==''){
      this.toastr.errorToastr('Enter Old Password', 'Error!');
    }else if(account_old_password ==account_password){
      this.toastr.errorToastr('Old password and new password should be different', 'Error!');
    }else if(account_confirm_password ==''){
      this.toastr.errorToastr('Enter Confirm Password', 'Error!');
    }else if(account_password != account_confirm_password){
      this.toastr.errorToastr('Password And Confirm Password does not match', 'Error!');
    }else{
        this.regData = {
            'old_password': account_old_password,
            'password': account_password,
        }
        $('#preloader').show();
        this.callapi.post('/user/update_password', this.regData).subscribe(result => {
          
         $('#preloader').hide();
          this.data = result;
          if ((this.data.status == 200) || (this.data.status === '200')) {
            this.toastr.successToastr(this.data.message, 'Success!');
            $('#account_password').val('');
            $('#account_confirm_password').val('');
            } else {
            $('#preloader').hide();
            this.toastr.errorToastr(this.data.message, 'Error!');
            
          }
        },err => {
          $('#preloader').hide();
        });
    }
  }

  public confirmDeletePopup(){
    $('#deleteAcountModal').modal('show');
  }
  public closeModal(name){
    $('#'+name).modal('hide');
  }

   public deleteAccount() {
         $('#preloader').show();
          this.callapi.get('/user/delete_account').subscribe(result => {
             $('#preloader').hide();
              this.data = result;
              if ((this.data.status == 200) || (this.data.status === '200')) {
                $('#deleteAcountModal').modal('hide');
                this.toastr.successToastr(this.data.message, 'Success!');
                this.authService.onLogout();
              } else {
                $('#preloader').hide();
                this.toastr.errorToastr(this.data.message, 'Error!');
                
              }
            },err => {
              $('#preloader').hide();
            });
       
  }

  public linkRouter(link){

    $('#preloader').show();
     setTimeout(() => {
          clearTimeout(this.commonServe.timeoutId);
          $('#preloader').hide();
          this.router.navigate([link]);

     }, 2500);
   }



}
