import { Component, EventEmitter, Input, OnInit, Output,ViewChild ,ElementRef, AfterViewInit ,AfterViewChecked} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs'; 
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../../api-service/service/index';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ChatService } from '../../../api-service/service/all-api-service/chat.service';

import { PasswordMatchPattern } from '../../../api-service/all-validation-pattern/password-match-pattern';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';
import { environment } from '../../../../environments/environment';
import { AgoraService } from '../../../api-service/service/all-api-service/agora.service';
import { SocketService } from '../../../api-service/service/all-api-service/socket.service';



declare const $: any;
declare const google: any;
// import AOS from 'aos';
// import 'aos/dist/aos.css';

import { ImageCroppedEvent } from 'ngx-image-cropper';

import AC from 'agora-chat';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  public imageUrl = environment.chat_image_url;

  public roomId: string;
  public messageText: string;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray = [];

  public showScreen = true;
  public phone: string;
  public pswd: string;
  public currentUser:any;
  public selectedUser:any;
  public userdata:any;
  public user_id_config:any = {};
  public userList:any = [];
  public userListAll:any = [];
  public totalMessages = 0;
  public base64Image1;
  public chatImage;
  public membershipFlag :boolean=false;
  public login_user_id;

  public loaderFlag :boolean=false;
  public loaderDataFlag:boolean=false;

  public selected_useremail;
  public orderlist = 'desc';
  public seletedUserEmail;
  public sendButtonFlag:boolean=false;

  public videoCallingSelectedUser;

  // public userdata:any;
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

   public caller_target_mail;
   public caller_live_token;
   public caller_live_channelName;
   public caller_live_uid;
   public caller_live_appId;
   public unique_uid;

  public callUserFlag:boolean=true;

@ViewChild('chatContainer') private chatContainer: ElementRef;

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,private chatService: ChatService,private activatedRoute: ActivatedRoute,private socketService: SocketService, private agoraService: AgoraService)
  { 
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {


//     window.addEventListener("offline", () => {
//     console.error("❌ No Internet Connection!");
//     alert("You are offline! Please check your internet connection.");
// });

// window.addEventListener("online", () => {
//     console.log("✅ Internet Restored!");
//     alert("You are back online!");
// });


    setTimeout(() => {
      if (this.tokenSaveService.getUserMembership() == 'Yes'){
         this.membershipFlag = false;
         $('#membershipModal').modal('show');
       }else{
         $('#membershipModal').modal('hide');
         this.membershipFlag = true;
         // setTimeout(() => {
         //   this.initMap();
         //    }, 2000);
          
       }
     
     }, 2000);

     
      setTimeout(() => {
        $('#right_side_togle').removeClass('show_toggle');
        $('#right_side_togle').addClass('hide_toggle');

        $('#big_tab').removeClass('col-lg-8');
        $('#big_tab').addClass('col-lg-10');
         this.initial();
     }, 500);

     // this.scrollToBottom();
     this.login_user_id = this.tokenSaveService.getUserId();  
   

    this.chatService.getMessage().subscribe((data: any) => {

      console.log("new message 456", data);
      if(this.roomId == data.room){
        this.messageArray.push(data);
        setTimeout(() => {
           this.scrollToBottom();
         }, 2000);
        console.log('messageArray',this.messageArray);
      }
    });
    
 }

 private scrollToBottom() {

   

     try {
      this.chatContainer.nativeElement.scrollTo({
        top: this.chatContainer.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch (err) {
      console.error('Scroll error:', err);
    }

   
  }


initial(){
    this.userdata = JSON.parse(<string>localStorage.getItem("chatapp_user_data"));
    console.log('this userdata', this.userdata['userid']);

    this.currentUser = this.userdata;

    this.userEmail = this.userdata['email'];
    this.unique_uid = this.userdata['userid'];

    this.commonServe.getAllUsers(this.userdata['userid']).then(resp => {
      $('#preloader').hide();
      // console.log("User getAllUsers", resp);
      if(resp.result == "success"){

            this.socketService.connect(this.userEmail);

            this.socketService.onEvent("incoming-call", (data) => {

              console.log('incoming-call',data);
              
              this.callIncoming = true;
              this.callerEmail = data.from;
              this.caller_target_mail = data.targetEmail;
              this.caller_live_token = data.live_token;
              this.caller_live_channelName = data.live_channelName;
              this.caller_live_uid = data.live_uid;
              this.caller_live_appId = data.live_appId;
              
              $('#acceptVideoCallingPopup').modal('show');
            });

            this.socketService.onEvent("call-accepted", (data) => {
               console.log('accepted-call',data);
              this.startAgoraCall(data.channel);
            });

            this.socketService.onEvent("call-rejected", () => {
               // console.log('incoming-call',data);
              alert("Call rejected.");
            });

        this.loaderFlag = true;
        this.loaderDataFlag = true;
        if('room_ids' in resp) this.currentUser['roomId'] = resp['room_ids'];


        this.userList = resp['data'];

        // this.orderlist = 'asc';

        this.userList.sort((a, b) => 
              this.orderlist === 'asc' 
                ? new Date(a.message_date_time).getTime() - new Date(b.message_date_time).getTime() 
                : new Date(b.message_date_time).getTime() - new Date(a.message_date_time).getTime()
            );
          

        this.userListAll = resp['data'];
        // console.log(this.currentUser, this.userList);
        for (let index = 0; index < this.userList.length; index++) {
          const element = this.userList[index];
          this.user_id_config[element.id] = element;
        }
        this.user_id_config[this.currentUser.userid] = this.userdata;

        setTimeout(() => {
          if(this.activatedRoute.snapshot.queryParams["userid"]){
            this.selected_useremail = atob(this.activatedRoute.snapshot.queryParams["userid"]);
              if(this.selected_useremail){
                this.selectUserHandler(this.selected_useremail);
                
              }
            }else{
              this.selectUserHandler(this.seletedUserEmail);
              
            }
          
        }, 2000);
        console.log('this.user_id_config',this.user_id_config);
      }else{
        // alert("Users not found.");
        this.loaderFlag = true;
        this.loaderDataFlag = false;
        this.userList = [];
      }
    }).catch(err => {
      this.loaderDataFlag = false;
      this.loaderFlag = true;
      // alert("no user found 123.");
      console.log("Error", err);
    })

     
  }

selectUserHandler(email: string): void {

    console.log('this.userList', this.userList);
    console.log('email',email);

    this.sendButtonFlag = false;

    this.seletedUserEmail = email;
    this.selectedUser = this.userList.find(user => user.email === email);
    console.log('this.selectedUser', this.selectedUser);

    this.roomId = this.currentUser.roomId[this.selectedUser.id];
    this.messageArray = [];

     // console.log("User getAllMessages one",this.user_id_config);

    this.commonServe.getAllMessages(this.currentUser.userid, this.selectedUser.id).then(resp => {
      // console.log("User getAllMessages",this.user_id_config);
      if(resp.result == "success"){
        let msgsConversation = resp['data'];

        for (let index = 0; index < msgsConversation.length; index++) {


          const element = msgsConversation[index];
           // console.log('mahendra',this.user_id_config[element['from_user']]);
          msgsConversation[index]['user'] = this.user_id_config[element['from_user']].username;
          msgsConversation[index]['profile_image'] = this.user_id_config[element['from_user']].profile_image;
          msgsConversation[index]['message'] = element['text'];
        }
        msgsConversation.sort((a:any, b:any) => new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf());
       
        this.messageArray = msgsConversation;
        console.log('new messageArray',this.messageArray);
      }else{
        // alert("Users not found.");
        this.userList = [];
      }
    }).catch(err => {
      // alert("Got error while processing the request. Please try again.");
      console.log("Error", err);
    })

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray.findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }


    setTimeout(() => {
       this.scrollToBottom();
     }, 5000);


    this.join(this.currentUser.username, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  sendMessage(): void { 


    this.chatService.sendMessage({
      user: this.currentUser.username,
      profile_image: this.currentUser.profile_image,
      image: 'undefined',
      room: this.roomId,
      message: this.messageText,
      from_user: this.currentUser.userid,
      to_user: this.selectedUser.id,
      created_at:new Date(),
    });
    console.log('this.currentUser.username',this.currentUser.username);
    console.log('this.roomId',this.roomId);
    console.log('this.messageText',this.messageText);
    console.log('this.currentUser.id',this.currentUser.userid);
    console.log('this.selectedUser.id',this.selectedUser.id);
    console.log('this.image',this.chatImage);
    this.messageText = '';
  }

  sendMessageImage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.username,
      profile_image: this.currentUser.profile_image,
      image: this.chatImage,
      room: this.roomId,
      message: 'undefined',
      from_user: this.currentUser.userid,
      to_user: this.selectedUser.id,
      created_at:new Date(),
    });
    console.log('this.currentUser',this.currentUser);
    console.log('this.roomId',this.roomId);
    console.log('this.messageText',this.messageText);
    console.log('this.currentUser.id',this.currentUser.userid);
    console.log('this.selectedUser.id',this.selectedUser.id);
    console.log('this.image',this.chatImage);
    this.messageText = '';
  }

   public searchUser(value) {
     var searchVal = value.toLowerCase();
     console.log(this.userListAll);
     if(searchVal == ''){
       this.userList = this.userListAll;
     }else{
      this.userList = this.userListAll.filter(item =>
        Object.keys(item).some(key => 
          item[key].toString().toLowerCase().indexOf(searchVal.toLowerCase()) !== -1
        )
      );
     }

    //  var searchVal = value.toLowerCase();
    
  }


  onFileChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
       const file = input.files[0];
       const reader = new FileReader();
       reader.onload = () => {
        this.base64Image1 = reader.result;
        // console.log(reader.result);

        var obj ={
          'image':reader.result
        }
      $('#preloader').show();
      this.callapi.post('/upload/imageupload', obj).subscribe(result => {
      
        if ((result.status == 200) || (result.status === '200')) {
           $('#preloader').hide();
          // this.toastr.successToastr(result.message, 'Success!');
            this.chatImage = result.data;
            this.sendMessageImage();
        } else {
          $('#preloader').hide();
          this.toastr.errorToastr(result.message, 'Error!');
       }
      },err => {
        $('#preloader').hide();
      });
        
      };

      reader.readAsDataURL(file);
    }
  }

  public linkRouter(link){
    $('#membershipModal').modal('hide');
    $('#preloader').show();
    this.router.navigate([link]);
  }


  public onChatBlock(recieved_id,status){
   var validate_obj={
      'sendor_id':this.login_user_id,
      'recieved_id':recieved_id,
      'status':status
    }

   
    $('#preloader').show();
    this.callapi.post('/user/send_chat_block',validate_obj).subscribe(result1 =>
      { 
        // $('#preloader').hide();
        if(result1.status == 200){ 
          this.toastr.successToastr(result1.message,'Success!');
          this.initial();
      }
    });
  }

  public onKeyPress(event: KeyboardEvent) {

    console.log('event.key',event.key);
   
    if(event.key != ''){
       this.sendButtonFlag = true;
    }else{
      this.sendButtonFlag = false;
    }
  }

  public startVideoCalling(selectedUser){

    this.new_channelName = 'channel_' + new Date().getTime() + Math.floor(Math.random() * 1000);

        var obj={
          channelName: this.new_channelName,
          uid : 0
        };

        this.callapi.post('/agora/generateRTCToken',obj).subscribe(result => {
        if ((result.status == true) || (result.status === 'true')) {
           
            this.live_token = result.token;
            this.live_channelName = result.channelName;
            this.live_uid = result.uid;
            this.live_appId = result.appId;


            // this.callerEmail = data.from;
            // this.caller_target_mail = data.targetEmail;
            this.caller_live_token = result.token;
            this.caller_live_channelName = result.channelName;
            this.caller_live_uid = result.uid;
            this.caller_live_appId = result.appId;

            this.videoCallingSelectedUser = selectedUser;
            $('#startVideoCallingPopup').modal('show');

            this.userdata = JSON.parse(<string>localStorage.getItem("chatapp_user_data"));
            this.userEmail = this.userdata['email'];
            this.targetEmail = selectedUser.email;   

            // this.checkVideoCallingRequest();
        } 
      },err => {
        $('#preloader').hide();
      })


    
 }


  public closePopup(name){
    $('#'+name).modal('hide');
    this.endCall();
  }

  callUser() {
    if (!this.targetEmail) {
      alert("Enter an email to call");
      return;
    }

    this.callUserFlag = false;
    this.channelName = btoa(this.targetEmail);
    this.socketService.sendCallRequest(this.userEmail, this.targetEmail, this.live_token, this.live_channelName, this.live_uid,this.live_appId);
  }

  acceptCall() {
    this.socketService.acceptCall(this.callerEmail, this.userEmail, this.caller_live_channelName);
    this.startAgoraCall(this.caller_live_channelName);
    this.callIncoming = false;
  }

  rejectCall() {
    this.socketService.rejectCall(this.callerEmail);
    this.callIncoming = false;
  }

  async startAgoraCall(channelName: string) {
    this.callStarted = true;
    // alert(this.caller_live_channelName);
    // alert(this.caller_live_uid);
    // alert(this.caller_live_token);
    // alert(this.caller_live_appId);
    const newuid = Math.floor(Math.random() * 100000);

    const { localVideoTrack } = await this.agoraService.joinChannel(this.caller_live_channelName,newuid,this.caller_live_token,this.caller_live_appId);

    console.log('this.localVideoRef.nativeElement',this.localVideoRef.nativeElement);
    localVideoTrack.play(this.localVideoRef.nativeElement);

    // alert('hjj');
    console.log('this.remoteVideoRef.nativeElement',this.remoteVideoRef.nativeElement);
    this.agoraService.listenForRemoteUsers(this.remoteVideoRef.nativeElement);
  }

  async endCall() {
    await this.agoraService.leaveChannel();
    this.callStarted = false;
    this.callUserFlag = true;
    $('#startVideoCallingPopup').modal('hide');
    $('#acceptVideoCallingPopup').modal('hide');
  }




}
