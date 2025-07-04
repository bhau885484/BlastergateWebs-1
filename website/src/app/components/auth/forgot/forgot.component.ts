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
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

 

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
        username: username,
        username_boat: btoa(username),

      };
      // $('#preloader').show();
      this.callapi.post('/auth/forgot_password', obj).subscribe(data => {
       $('#preloader').hide();
       
        if (data.status === "200") {
          this.toastr.successToastr(data.message, 'Success!');
         
        } else {
          this.toastr.errorToastr(data.message, 'Error!');
           
        }
      });
    }else{
       this.toastr.errorToastr('This field is required', 'Error!');
     }
  }


  public linkRouter(link){
   // alert(link);
    this.router.navigate([link]);
  }

 

}
