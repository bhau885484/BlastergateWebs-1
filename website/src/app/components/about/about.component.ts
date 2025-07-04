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


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
public selectedCity ='';

  constructor(private formBuilder: FormBuilder,
                private api: service.CallApiService,
                private tokenService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenExpService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,
                private route: ActivatedRoute,) { }

  ngOnInit() {

     this.selectedCity = JSON.parse(localStorage.getItem('cityid'));
    if((this.selectedCity == null)  || (this.selectedCity == '')){
     $('#SchoolModalLong').modal('show');
    }else{
      setTimeout(() => {
        this.commonServe.selectcity =this.selectedCity;
            
      }, 1500);
      
    }   




 
  



}


}
