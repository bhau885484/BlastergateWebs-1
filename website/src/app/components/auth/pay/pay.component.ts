import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../../api-service/service/index';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { environment } from 'src/environments/environment';

declare const $: any;
import AOS from 'aos';
import 'aos/dist/aos.css';

declare var Accept: any;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  public environment = environment;


  model: any = {};
    public loginForm: FormGroup;
    private loginCredentials;
    // private model: any = {};
    private data;
    myParams: object = {};
    myStyle: object = {};
    public user = '';
    public pass = '';
    public remme = false;
    public submitted = false;
    
    // angular slider
    

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService) { }

  ngOnInit() {

    // alert(environment.autorized.clientKey);
    // alert(environment.autorized.apiLoginID);

     this.loginForm = this.formBuilder.group({
            cardNumber: [''],
            expDate: [''],
            cvv: [''],
        });
   
      setTimeout(() => {
       
      }, 1500);
      
     
}

get f() { return this.loginForm.controls; }

 public linkRouter(link){
   // alert(link);
    this.router.navigate([link]);
  }

   onLogin() {

        const data = this.loginForm.value;
        if (this.loginForm.valid) {
            this.submitted = false;

            // alert();


             //clientKey: '2bCTHk7Ncdbr2FUzG4755STSyp6fh6jWC9vqzSmxJf3dP3S8a38uVAvhXyB8nPs7',
              //apiLoginID: '5Lt4P6wWH'

            const authData = {
                 clientKey: '987X66MsBmvehqFUn74L6WQz2aKA8YKsR25tABW4tyfvFtNdFx96FDwmvc5Wc736',
                 apiLoginID: '5Lt4P6wWH'
              };

              const cardData = {
                cardNumber: this.loginForm.value.cardNumber,
                month: this.loginForm.value.expDate.split('/')[0],
                year: this.loginForm.value.expDate.split('/')[1],
                cardCode: this.loginForm.value.cvv
              };


              // console.log(cardData);
              const secureData = {
                authData,
                cardData
              };
            // console.log(secureData);
              Accept.dispatchData(secureData, this.responseHandler.bind(this));

            //    const cardData = {
            //     cardNumber: this.loginForm.value.cardNumber,
            //     month: this.loginForm.value.expDate.split('/')[0],
            //     year: this.loginForm.value.expDate.split('/')[1],
            //     cardCode: this.loginForm.value.cvv,
            //     amount:"10.00"
            //   };

            // this.callapi.post('/payment/membership_process_payment',cardData).subscribe(result => {
            //  console.log('Payment successful', result);
            //  },error => {
            //      console.log('Payment failed', error);
                  
            //   });
            
        } else {
            this.submitted = true;
           return;
        }
    }

   public responseHandler(response) {

     console.log(response);
    if (response.messages.resultCode === 'Ok') {
      const paymentNonce = response.opaqueData.dataValue;


      this.callapi.post('/payment/membership_process_payment', { paymentNonce, amount: '10.00' }).subscribe(result => {
             console.log('Payment successful', result);
     },error => {
         console.log('Payment failed', error);
          
      });
    }else{
      this.toastr.errorToastr(response.messages.message[0].text,'Error!');
      
    }
  }

 

}
