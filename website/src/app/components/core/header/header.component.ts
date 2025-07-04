import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';
import * as service from '../../../api-service/service/index';
declare const $: any;
import { EmailPatternValidator } from '../../../api-service/all-validation-pattern/email-pattern-validator';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 public alreadyLogin:boolean=false;
 public save_profile_type;
 public landingPageDataNew;
  constructor(private formBuilder: FormBuilder,
                private api: service.CallApiService,
                private tokenService: service.CanTokenSaveService,
                private toastr: ToastrManager,
                private tokenExpService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,public router: Router,private tokenSaveService: service.CanTokenSaveService) { }

  ngOnInit() {

    // this.allCount();
     if (this.tokenService.getAccessToken()){
        this.alreadyLogin = true;
        this.save_profile_type = this.tokenService.getProfileType();
    }else{
      this.alreadyLogin = false;
      // this.authService.onLogout();
    }

    this.saveChatToken();
    this.landingData();


  }

  public landingData(){
   this.api.get('/auth/getLandingPageData').subscribe(data => {
      if(data.status=='200'){
        this.landingPageDataNew = data.data[0];
        console.log('this.landingPageDataNew',this.landingPageDataNew);
        
        
      }else{
        this.landingPageDataNew = '';
      }
   }); 
}

  public saveChatToken(){
      this.api.get('/agora/getChatToken').subscribe(data => {
        console.log(data);
           this.tokenSaveService.saveAgoraChatToken(data.data[0].token);
       }); 
  } 


 
  public linkRouter(link){
    this.router.navigate([link]);
  }

  public showHideToggle(){
    
    // alert();
    if($('#navbarsExample02').hasClass('show')){

      $('#navbarsExample02').removeClass('show');
    }else{
     $('#navbarsExample02').addClass('show');
    }
  }
   
}
