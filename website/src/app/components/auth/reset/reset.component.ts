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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { PasswordMatchPattern } from '../../../api-service/all-validation-pattern/password-match-pattern';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';

declare const $: any;
declare const google: any;
import AOS from 'aos';
import 'aos/dist/aos.css';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  public register: FormGroup;
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public submitted = false;
  public username;



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

     this.username = atob(this.activatedRoute.snapshot.queryParams["key"]);
     console.log(this.username);

    this.register = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      confirm_password: ['', Validators.required]
    }, {
      validator: PasswordMatchPattern('password', 'confirm_password'),
    });
   
    
}

 public linkRouter(link){
   this.router.navigate([link]);
  }

get reg() {
    return this.register;
  }

get f() {
    return this.register.controls;
}

  

 public onRegister() {
    
    // this.submitted = true;
    const data = this.register.value;

   
    
    if (this.register.valid) 
    {
        
        this.submitted = false;

              this.regData = {
                'password': data.password,
                'username': this.username,
                
              }
              
              $('#preloader').show();
              this.callapi.post('/auth/reset_password', this.regData).subscribe(result => {
               $('#preloader').hide();
                this.data = result;
                if ((this.data.status == 200) || (this.data.status === '200')) {

                  this.toastr.successToastr(this.data.message, 'Success!');
                  this.router.navigateByUrl('/login');               

                 //  this.submitted = false;
                } else {
                  $('#preloader').hide();
                  this.toastr.errorToastr(this.data.message, 'Error!');
                  
                }
              },err => {
                $('#preloader').hide();
              });
       
    }else{
        
         this.submitted = true;
         return;
    }
    
  }



}
