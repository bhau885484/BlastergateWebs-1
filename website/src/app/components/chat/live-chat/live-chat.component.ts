import { Component, EventEmitter, Input, OnInit, Output,ViewChild ,ElementRef, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs'; 
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../../api-service/service/index';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AgoraService } from '../../../api-service/service/all-api-service/agora.service';
import { SocketService } from '../../../api-service/service/all-api-service/socket.service';
// import { WebSocketService } from '../../../api-service/service/all-api-service/websocket.service';
import { PasswordMatchPattern } from '../../../api-service/all-validation-pattern/password-match-pattern';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';
import { environment } from '../../../../environments/environment';
// import { AgoraService } from '../agora.service';

// import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';

declare const $: any;
declare const google: any;
// import AOS from 'aos';
// import 'aos/dist/aos.css';

import { ImageCroppedEvent } from 'ngx-image-cropper';

import AC from 'agora-chat';

// import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';


@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit {

  public userdata:any;
  public live_token;
  public live_appId;
  public live_uid;
  public live_channelName;
  public new_channelName;

  @ViewChild('localVideo') localVideoRef!: ElementRef;
  @ViewChild('remoteVideo') remoteVideoRef!: ElementRef;

  userEmail = ''; 
  targetEmail = '';
  callIncoming = false;
  callerEmail = '';
  callStarted = false;
  channelName = 'text';

  constructor(private socketService: SocketService, private agoraService: AgoraService,private callapi: service.CallApiService) {

    

  }

  ngOnInit(): void {


    this.userdata = JSON.parse(<string>localStorage.getItem("chatapp_user_data"));
    this.userEmail = this.userdata['email'];

    this.new_channelName = 'channel_' + new Date().getTime() + Math.floor(Math.random() * 1000);

    var obj={
      channelName: this.new_channelName,
      uid : this.userEmail
    };

    this.callapi.post('/agora/generateRTCToken',obj).subscribe(result => {
      
        if ((result.status == true) || (result.status === 'true')) {
           
            this.live_token = result.token;
            this.live_channelName = result.channelName;
            this.live_uid = result.uid;
            this.live_appId = result.appId;

            // alert(this.live_token);
        } 
      },err => {
        $('#preloader').hide();
      })



    this.socketService.connect(this.userEmail);

    this.socketService.onEvent("incoming-call", (data) => {

      console.log('incoming-call',data);
      this.callIncoming = true;
      this.callerEmail = data.from;
    });

    this.socketService.onEvent("call-accepted", (data) => {
       console.log('accepted-call',data);
      this.startAgoraCall(data.channel);
    });

    this.socketService.onEvent("call-rejected", () => {
       // console.log('incoming-call',data);
      alert("Call rejected.");
    });
  }

  callUser() {
    if (!this.targetEmail) {
      alert("Enter an email to call");
      return;
    }
    this.channelName = btoa(this.targetEmail);
    this.socketService.sendCallRequest(this.userEmail, this.targetEmail,'','','','');
  }

  acceptCall() {
    this.socketService.acceptCall(this.callerEmail, this.userEmail, this.channelName);
    this.startAgoraCall(this.channelName);
    this.callIncoming = false;
  }

  rejectCall() {
    this.socketService.rejectCall(this.callerEmail);
    this.callIncoming = false;
  }

  async startAgoraCall(channelName: string) {
    this.callStarted = true;
    // alert(this.live_token);
    const { localVideoTrack } = await this.agoraService.joinChannel(this.live_channelName, this.live_uid,this.live_token,this.live_appId);
    localVideoTrack.play(this.localVideoRef.nativeElement);
    this.agoraService.listenForRemoteUsers(this.remoteVideoRef.nativeElement);
  }

  async endCall() {
    await this.agoraService.leaveChannel();
    this.callStarted = false;
  }
}