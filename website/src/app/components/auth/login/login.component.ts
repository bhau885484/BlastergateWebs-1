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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

    passwordFieldType: string = 'password';
     password: string = '';
    

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService) {

                   if (this.tokenSaveService.getAccessToken()) {
                      this.router.navigate(['/feed']); 
                  }

         }

  ngOnInit() {

     this.commonServe.showvideo = '1';

     this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
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
            this.loginCredentials = {
                'username': data.username,
                'password': data.password
            };

            $('#preloader').show();
            this.callapi.post('/auth/login', this.loginCredentials).subscribe(result => {
              $('#preloader').hide();
                this.data = result;
                if ((this.data.status == 200) || (this.data.status === '200')) {
                     this.toastr.successToastr(this.data.message, 'Success!', {
                      positionClass: 'toast-bottom-right',
                    });
                    this.tokenSaveService.saveAccessToken(this.data.data.token, this.data.data.sign);
                    this.tokenSaveService.saveProfileType(this.data.data.profile_type);
                    this.tokenSaveService.saveUserId(this.data.data.userid);

                    localStorage.setItem("chatapp_user_id",this.data.data.userid);
                    localStorage.setItem("Access-Token",this.data.data.token);
                    localStorage.setItem("chatapp_user_data", JSON.stringify(this.data.data));


                     if(this.data.data.profile_type == 'single'){
                       // this.router.navigateByUrl('/view-single-profile');
                       this.router.navigateByUrl('/feed');

                       
                     }

                    if(this.data.data.profile_type == 'couple'){
                      this.router.navigateByUrl('/feed');
                       // this.router.navigateByUrl('/view-couple-profile');
                     }                 
                } else {
                    $('#preloader').hide();
                    this.toastr.errorToastr(this.data.message, 'Error!');
                }
            },
            error => {
                    $('#preloader').hide();
                    this.toastr.errorToastr('Some ERROR occured!Please try again...', 'Error!');
                    
                });
        } else {
            this.submitted = true;
           return;
        }
    }

    public togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

 

}
