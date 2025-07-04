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

declare const $: any;
import AOS from 'aos';
import 'aos/dist/aos.css';


@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.css']
})
export class ForgotUsernameComponent implements OnInit {

 

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService) { }

  ngOnInit() {

   
      
     
}


OnForgotPassword() {

    
    var username = $('#username').val();
   
    if (username) {
      var obj = {
        email: username,
       

      };
      $('#preloader').show();
      this.callapi.post('/auth/forgot_username', obj).subscribe(data => {
       $('#preloader').hide();
       
        if (data.status === "200") {
          this.toastr.successToastr(data.message, 'Success!');
         
        } else {
          this.toastr.errorToastr(data.message, 'Error!');
         
        }
      });
    }else{
       this.toastr.errorToastr('Please enter email', 'Error!');
     }
  }


  public linkRouter(link){
   // alert(link);
    this.router.navigate([link]);
  }

 

}
