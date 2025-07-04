import { Component, EventEmitter, Input, OnInit, Output,ViewChild ,ElementRef, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs'; 
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../../api-service/service/index';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ChatService } from '../../../api-service/service/all-api-service/chat.service';

import { PasswordMatchPattern } from '../../../api-service/all-validation-pattern/password-match-pattern';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';
import { environment } from '../../../../environments/environment';



declare const $: any;
declare const google: any;
// import AOS from 'aos';
// import 'aos/dist/aos.css';

import { ImageCroppedEvent } from 'ngx-image-cropper';



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  public researchFlag:boolean=false;
  public termsConditionFlag:boolean=false;
 
  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,private chatService: ChatService,)
  { 
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {

     $('#preloader').hide();
     
  }

   public checkTermsCondition1(event: any){
      const isChecked = event.target.checked;
       
      if(isChecked == true)
      {
        this.termsConditionFlag =true;
        
        
      }else{
        this.termsConditionFlag =false;
       
      }
  }

   public checkTermsCondition2(event: any){
      const isChecked = event.target.checked;
       
      if(isChecked == true)
      {
        this.researchFlag =true;
        
        
      }else{
        this.researchFlag =false;
       
      }
  }

  public submit(){

    var feedback = $('#feedback').val();
    if(feedback != ''){
           
          var obj = {
          'feedback': feedback,
         }

        $('#preloader').show();
          this.callapi.post('/payperclick/save_feedback', obj).subscribe(result => {
           $('#preloader').hide();
           
            if ((result.status == 200) || (result.status === '200')) {

              this.toastr.successToastr(result.message, 'Success!');
             $('#feedback').val('');
             
            } else {
              $('#preloader').hide();
              this.toastr.errorToastr(result.message, 'Error!');
              
            }
          },err => {
            $('#preloader').hide();
          });

      }else{
         this.toastr.errorToastr("Please enter feedback ",'Error!');
      }



  }



}
