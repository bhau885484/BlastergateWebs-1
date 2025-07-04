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
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {

 public pay_per_id;
 public star_rating ='';
 public reviewData;
 public profileImage;
 public reviewFlag:boolean=false;

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
   this.pay_per_id = atob(this.activatedRoute.snapshot.queryParams["id"]);
   this.getAllReview(this.pay_per_id);
 }

  public getAllReview(pay_per_id){

   var obj={
     "pay_per_id":pay_per_id
   }
    this.callapi.post('/payperclick/get_all_review',obj).subscribe(data => {
       if(data.status == 200){
          this.reviewData = data.data;
          
          this.reviewFlag =true;
          // // $('#viewSubmittionMessageModal').modal('hide');
          
        }else{
          this.reviewData = '';
          this.reviewFlag =false;
          // // $('#viewSubmittionMessageModal').modal('show');
        }
    }); 
  }




public selectRating(unitObject,value){
  console.log('unitObject',unitObject);
    this.star_rating = unitObject;
 }


 public onSubmit() {
      
        var error = 1;
        var review = $('#review').val();

        
        
        if(this.star_rating == ''){
         this.toastr.errorToastr('Please select rating', 'Error!');
        }else{
          
          if(review == ''){
            this.toastr.errorToastr('Please enter review', 'Error!');
          }else{
             var obj = {
                'pay_per_id': this.pay_per_id,
                'star_count': this.star_rating,
                'message': review,
              }

              $('#preloader').show();
              this.callapi.post('/payperclick/save_review',obj).subscribe(result => {
                 $('#preloader').hide();
                  if ((result.status == 200) || (result.status === '200')) {
                   this.toastr.successToastr(result.message, 'Success!');
                   this.router.navigate(['/view-user-pay-per-click'], { queryParams: { id: btoa(this.pay_per_id) }}); 
                   
                  } else {
                    $('#preloader').hide();
                    this.toastr.errorToastr(result.message, 'Error!');
                    
                  }
                },err => {
                  $('#preloader').hide();
                });
          }
        }
        
   }



 public backPaperView(){
   this.router.navigate(['/view-pay-per-click'], { queryParams: { id: btoa(this.pay_per_id) }}); 
 }


  
}
