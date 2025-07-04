import { EventEmitter } from '@angular/core';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../api-service/service/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare const $: any;
import { EmailPatternValidator } from '../../api-service/all-validation-pattern/email-pattern-validator';
import { MobilePatternValidator } from '../../api-service/all-validation-pattern/mobile-pattern-validator';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
public contact: FormGroup;
public submitted = false;
public regData: any;
  constructor(private formBuilder: FormBuilder,
                private api: service.CallApiService,
                private tokenService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenExpService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,
                private route: ActivatedRoute,) { }

  ngOnInit() {


      // this.route.queryParams.subscribe(params => {
      //      this.loadData(params['catId'],params['keyword']);
      //     this.cityname(params['catId']);
      //     this.loadDataCity();

 this.contact = this.formBuilder.group({
        email: new FormControl('', [Validators.required,EmailPatternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        name: new FormControl('', [Validators.required]),
        mobile: new FormControl('', [Validators.required, MobilePatternValidator(/^(?=.*[0-9]).{8,12}$/)]),
        website: [''],
        message: [''],
       
    });
   
  }
  get f() { return this.contact.controls; }
   
  public  onSubmit() {
    this.submitted = true;
    let data = this.contact.value;
  
      if (this.contact.invalid ) {
        return;
      } else
      {

          $('#hellopreloader').show();
          this.regData = {    
              'EmailId': data.email,
              'Name': data.name,
              'Website': data.website,
              'Mobile': data.mobile.toString(),
              'Details': data.message,
          }
            this.api.post('/ContactUs', this.regData).subscribe(result => {
               $('#hellopreloader').hide();
                this.toastr.successToastr(result.result, 'Success!');
                this.contact.reset();
                
            }, error => {
                $('#hellopreloader').hide();
                this.toastr.errorToastr('Internal Earror', 'Error!');
              });
          }
      }
    


}
