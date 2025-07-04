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

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	public all_policy;
	public privecy_policy;
public terms_condition;
  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService) { }

  ngOnInit() {

  	this.callapi.get('/auth/term_policy').subscribe(data => {
      if(data.status == 200){
        this.terms_condition = data.data[0];
      }else{
        this.terms_condition = '';
      }
    }); 

    this.callapi.get('/auth/privecy_policy').subscribe(data => {
      if(data.status == 200){
        this.privecy_policy = data.data[0];
      }else{
        this.privecy_policy = '';
      }
    }); 


  }

  public openModel(name){
    $('#'+name).modal('show');
  }
  public closeModal(name){
    $('#'+name).modal('hide');
  }

  // public showPolicy(policy_data){

  // 	this.select_policy = policy_data;
  // 	$('#select_privacy_modal').modal('show');

  // 	// console.log('policy_data>>>',policy_data);

  // }

}
