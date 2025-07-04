import { Component, EventEmitter, Input, OnInit, Output,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl ,FormArray} from '@angular/forms';
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
  selector: 'app-event-payment-success',
  templateUrl: './event-payment-success.component.html',
  styleUrls: ['./event-payment-success.component.css']
})
export class EventPaymentSuccessComponent implements OnInit {

  public trans_id;
  public trans_details;
  public payment_type;
  
  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,private activatedRoute: ActivatedRoute)
  { 
    
  }

  ngOnInit() {
    $('#preloader').hide();
    $('#authorizedPaymentModal').modal('hide');
     this.trans_id = atob(this.activatedRoute.snapshot.queryParams["transaction_id"]);
     this.payment_type = atob(this.activatedRoute.snapshot.queryParams["payment_type"]);
     // alert(this.payment_type);
     this.getTransDetails(this.trans_id);
    
  }


public getTransDetails(trans_id){

    var obj={
      "transactionId":trans_id
    }
      this.callapi.post('/payment/getTransactionDetails', obj).subscribe(result => {
         $('#preloader').hide();
          // this.data = result;
          if ((result.status == 200) || (result.status === '200')) {
            this.trans_details = result;
            
          } else {
            $('#preloader').hide();
            this.trans_details ='';
            this.toastr.errorToastr(result.message, 'Error!');
            
          }
        },err => {
          $('#preloader').hide();
          this.toastr.errorToastr('Something Wrong!', 'Error!');
        });
    
}

public linkRouter(link){
 
   clearTimeout(this.commonServe.timeoutId);
        this.router.navigate([link]);
 }
  

  
 


}
