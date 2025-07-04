

  import { Component, OnInit, ElementRef, ViewEncapsulation, ViewContainerRef } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
  import { Router } from '@angular/router';

  import { CallApiService } from './api-service/service/all-api-service/callapi.service';
  import { CanTokenSaveService } from './api-service/service/all-api-service/cantokensave.service';
  import { Observable } from 'rxjs';
  import { ToastrManager } from 'ng6-toastr-notifications';
  declare const Snackbar: any;
  import { CommonService } from './api-service/service/common-service/common.service';
  import { ActivatedRoute } from '@angular/router';
  declare const $: any;
  import { ChatService } from './api-service/service/all-api-service/chat.service';
// import { StreamChat, ChannelData, Message, User } from 'stream-chat';
// import axios from 'axios';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,

      public common: CommonService,
      private token: CanTokenSaveService,
      private api: CallApiService,
      private chatService: ChatService
      

    ) {  }

  ngOnInit() {
      // this.isLoadingResult = true;

      if (this.token.getAccessToken() && this.token.getAccessSign()) {
        // $('body').addClass("user");
        // $('body').removeClass("website");
        // this.common.checklogin = true;
        //this.cartGetPreview();
        // alert('yes');
       
      } else {
         // alert('no');
      }

  }
}
