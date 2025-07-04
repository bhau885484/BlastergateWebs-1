import { Component, EventEmitter, Input, OnInit, Output,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../../api-service/service/index';
import { Router,ActivatedRoute } from '@angular/router'; 
import { ToastrManager } from 'ng6-toastr-notifications';

import { PasswordMatchPattern } from '../../../api-service/all-validation-pattern/password-match-pattern';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';

declare const $: any;
declare const google: any;
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-single-user-profile',
  templateUrl: './single-user-profile.component.html',
  styleUrls: ['./single-user-profile.component.css']
})
export class SingleUserProfileComponent implements OnInit {

  public interests: FormGroup;
  public profile_details: FormGroup;
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public submitted = false;
  public emailotp;

  public isLoadedLoginOtp:boolean=true;
  public processingFlagOtp:boolean=true;

 
  public processingFlag:boolean=true;
  public isLoadedLogin:boolean=true;

  public profile_type='single';
  public profile_image='';

  imgChangeEvtProfile: any = "";
  cropImgPreviewProfile: any = "";

  imgChangeEvtProfileEdit: any = "";
  cropImgPreviewProfileEdit: any = "";

  public profileData;
  public profileDataImage;

  public dobmonth;
  public dobyear;
  public dobday;

  public profileDataPendingImage;
  public profileDataApproveImage;
  public profileDataPendingVideo;
  public profileDataApproveVideo;

  public edit_image_id;
  public videouUrl;

  public uploaded_video_name;
  public allAlbumData;
  public allAlbumImageData
  public upload_album_id;

  // album Image 

  public ulpoadedFilesAlbumImage: any = [];
  public imgIdAlbumImage: any=0;
  public imageChangedEventAlbumImage: any = '';
  public croppedImageAlbumImage: any = '';
  public currentProcessingImgAlbumImage: any = 0;
  public finalImageListAlbumImage: any = [];
  public multiple_image_data;
  public allPendingAlbumData;
  public allApproveAlbumData;
  public album_details;
  public total_distance=0;

  public user_id;
  public login_user_id;
  public friend_count=0;
  public frient_request_bg_color;
  public friend_request_status;

  public like_count=0;
  public like_request_bg_color;
  public like_request_status;

  public validate_count=0;
  public validate_request_bg_color;
  public validate_request_status;
  
  public remember_count=0;
  public remember_request_bg_color;
  public remember_request_status;

  public notes_count=0;
  public notes_request_bg_color;
  public notes_request_status;
  public validate_message;
  public notes_message;
  public send_notes_message;

  
 
 @ViewChild("map", { static: true }) mapElement: any;
  map: any;

 

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,private activatedRoute: ActivatedRoute)
  { 
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {

    setTimeout(() => {
      if (this.tokenSaveService.getUserMembership() == 'Yes'){
          this.router.navigate(['/online']); 
       }
     
     }, 2000); 
    
    this.user_id = atob(this.activatedRoute.snapshot.queryParams["user_id"]);
    this.login_user_id = this.tokenSaveService.getUserId();

    var user_like_obj={
      'profile_user_id':this.user_id,
      'login_user_id':this.login_user_id,
    }

    this.callapi.post('/profile/check_user_blocked',user_like_obj).subscribe(result3 => {
        if(result3.status == 200){
            if(result3.data == '1'){
              // alert();
              $('#userBlocekedScreenModal').modal('show');
            }
        }
    });

    
    this.getProfileData(this.user_id);
    
    if(this.user_id !=this.login_user_id){
      this.who_i_viewed();
    }
    
    
    

    this.interests = this.formBuilder.group({
      couple_male_female_swingers: new FormControl(),
      couple_male_female_hookup_meetup: new FormControl(),
      couple_female_female_swingers: new FormControl(),
      couple_female_female_hookup_meetup: new FormControl(),
      couple_male_male_swingers: new FormControl(),
      couple_male_male_hookup_meetup: new FormControl(),
      couple_male_swingers: new FormControl(),
      couple_male_hookup_meetup: new FormControl(),
      couple_female_swingers: new FormControl(),
      couple_female_hookup_meetup: new FormControl(),
      couple_transgender_swingers: new FormControl(),
      couple_transgender_hookup_meetup: new FormControl()
     
  });

  this.profile_details = this.formBuilder.group({
      
      person1_dob: new FormControl(''),
      text: new FormControl(''),
      comment: new FormControl(''),
      person1_name:new FormControl(''),
      person1_body_hair: new FormControl(''),
      person1_height: new FormControl(''),
      person1_weight: new FormControl(''),
      person1_body_type: new FormControl(''),
      person1_ethnic_background: new FormControl(''),
      person1_smoking: new FormControl(''),
      person1_drinking:new FormControl(''),
      person1_piercings: new FormControl(''),
      person1_tattoos: new FormControl(''),
      person1_language_spoken: new FormControl(''),
      person1_circumcised: new FormControl(''),
      person1_intelligence_importance: new FormControl(''),
      person1_sexuality: new FormControl(''),
      person1_relationship_orientation:new FormControl('')
  });
}

public who_i_viewed(){

    var user_obj={
      'login_user_id':this.login_user_id,
      'profile_user_id':this.user_id
    }

    this.callapi.post('/profile/who_i_viewed_insert',user_obj).subscribe(result1 => {
       
    });


    var user_new_obj={
      'recieved_id':this.user_id,
      'login_user_id':this.login_user_id,
    }



    this.callapi.post('/profile/view_friend_request',user_new_obj).subscribe(result2 => {
      // alert();
       if(result2.status == 200){

          this.friend_count = result2.data.all_request_count;
          this.friend_request_status = result2.data.request_status;
          if(this.friend_request_status == 'pending'){
            this.frient_request_bg_color = 'bg-blue';
          }else if(this.friend_request_status == 'accepted'){
            this.frient_request_bg_color = 'bg-maroon';
          }else{
            this.frient_request_bg_color = 'bg-maroon';
          }
          
        }
    });


     var user_like_obj={
      'recieved_id':this.user_id,
      'login_user_id':this.login_user_id,
    }

    this.callapi.post('/profile/view_like_request',user_like_obj).subscribe(result3 => {


       if(result3.status == 200){
        
          this.like_count = result3.data.all_request_count;
          this.like_request_status = result3.data.request_status;
          
          if(this.like_request_status == 'Dislike'){
            this.like_request_bg_color = 'bg-blue';
          }else if(this.like_request_status == 'Like'){
            this.like_request_bg_color = 'bg-maroon';
          }else{
            this.like_request_bg_color = 'bg-maroon';
          }
          
        }
    });



    var user_validate_obj={
      'recieved_id':this.user_id,
      'login_user_id':this.login_user_id,
    }

    this.callapi.post('/profile/view_validate_request',user_validate_obj).subscribe(result3 => {

       if(result3.status == 200){
        
          this.validate_count = result3.data.all_request_count;
          this.validate_request_status = result3.data.request_status;
          
          if(this.validate_request_status == 'accepted'){
            this.validate_request_bg_color = 'bg-blue';
          }else if(this.validate_request_status == 'pending'){
            this.validate_request_bg_color = 'bg-maroon';
          }else{
            this.validate_request_bg_color = 'bg-maroon';
          }
          
        }
    });

    var user_remember_obj={
      'recieved_id':this.user_id,
      'login_user_id':this.login_user_id,
    }

    this.callapi.post('/profile/view_remember_request',user_remember_obj).subscribe(result3 => {

       if(result3.status == 200){
        
          this.remember_count = result3.data.all_request_count;
          this.remember_request_status = result3.data.request_status;
          
          if(this.remember_request_status == 'pending'){
            this.remember_request_bg_color = 'bg-blue';
          }else if(this.remember_request_status == 'accepted'){
            this.remember_request_bg_color = 'bg-maroon';
          }else{
            this.remember_request_bg_color = 'bg-maroon';
          }
          
        }
    });


    var user_notes_obj={
      'recieved_id':this.user_id,
      'login_user_id':this.login_user_id,
    }

    this.callapi.post('/profile/view_notes_request',user_notes_obj).subscribe(result3 => {

       if(result3.status == 200){
        
          this.notes_count = result3.data.all_request_count;
          this.notes_request_status = result3.data.request_status;
          
          if(this.notes_request_status == 'pending'){
            this.notes_request_bg_color = 'bg-blue';
          }else if(this.notes_request_status == 'accepted'){
            this.notes_request_bg_color = 'bg-maroon';
          }else{
            this.notes_request_bg_color = 'bg-maroon';
          }
          
        }
    });


}

public linkRouter(link){
    this.router.navigate([link]);
}
get f() {
    return this.interests.controls;
}

get f1() {
    return this.profile_details.controls;
}

public getProfileData(user_id){

    var obj={
      'user_id':user_id
    }
    this.callapi.post('/profile/signle_user_profile',obj).subscribe(data => {
      if(data.status == 200){
        this.profileData = data.data;

        if((this.profileData.lat_1) && (this.profileData.distance)){
           var distance = this.distance(this.profileData.lat,this.profileData.lng,this.profileData.lat_1,this.profileData.lng_1,this.profileData.distance);
          this.total_distance = Math.trunc(distance);
        }

        setTimeout(() => {
          this.profile_details.controls['text'].setValue(this.profileData.text);
          this.profile_details.controls['comment'].setValue(this.profileData.comment);
          this.profile_details.controls['person1_dob'].setValue(this.profileData.person1_dob);
          this.profile_details.controls['person1_name'].setValue(this.profileData.person1_name);
          this.profile_details.controls['person1_body_hair'].setValue(this.profileData.person1_body_hair);
          this.profile_details.controls['person1_height'].setValue(this.profileData.person1_height);
          this.profile_details.controls['person1_weight'].setValue(this.profileData.person1_weight);
          this.profile_details.controls['person1_body_type'].setValue(this.profileData.person1_body_type);
          this.profile_details.controls['person1_ethnic_background'].setValue(this.profileData.person1_ethnic_background);
          this.profile_details.controls['person1_smoking'].setValue(this.profileData.person1_smoking);
          this.profile_details.controls['person1_drinking'].setValue(this.profileData.person1_drinking);
          this.profile_details.controls['person1_piercings'].setValue(this.profileData.person1_piercings);
          this.profile_details.controls['person1_tattoos'].setValue(this.profileData.person1_tattoos);
          this.profile_details.controls['person1_language_spoken'].setValue(this.profileData.person1_language_spoken);
          this.profile_details.controls['person1_circumcised'].setValue(this.profileData.person1_circumcised);
          this.profile_details.controls['person1_intelligence_importance'].setValue(this.profileData.person1_intelligence_importance);
          this.profile_details.controls['person1_sexuality'].setValue(this.profileData.person1_sexuality);
          this.profile_details.controls['person1_relationship_orientation'].setValue(this.profileData.person1_relationship_orientation);
          
          if(this.profileData['couple_male_female_swingers'] == 1){
            this.interests.get('couple_male_female_swingers').setValue(true);
          }else{
            this.interests.get('couple_male_female_swingers').setValue(false);
          }

          if(this.profileData['couple_male_female_hookup_meetup'] == 1){
            this.interests.get('couple_male_female_hookup_meetup').setValue(true);
          }else{
            this.interests.get('couple_male_female_hookup_meetup').setValue(false);
          }

          if(this.profileData['couple_female_female_swingers'] == 1){
            this.interests.get('couple_female_female_swingers').setValue(true);
          }else{
            this.interests.get('couple_female_female_swingers').setValue(false);
          }

          if(this.profileData['couple_female_female_hookup_meetup'] == 1){
            this.interests.get('couple_female_female_hookup_meetup').setValue(true);
          }else{
            this.interests.get('couple_female_female_hookup_meetup').setValue(false);
          }

          if(this.profileData['couple_male_male_swingers'] == 1){
            this.interests.get('couple_male_male_swingers').setValue(true);
          }else{
            this.interests.get('couple_male_male_swingers').setValue(false);
          }

          if(this.profileData['couple_male_male_hookup_meetup'] == 1){
            this.interests.get('couple_male_male_hookup_meetup').setValue(true);
          }else{
            this.interests.get('couple_male_male_hookup_meetup').setValue(false);
          }

          if(this.profileData['couple_male_swingers'] == 1){
            this.interests.get('couple_male_swingers').setValue(true);
          }else{
            this.interests.get('couple_male_swingers').setValue(false);
          }
          if(this.profileData['couple_male_hookup_meetup'] == 1){
            this.interests.get('couple_male_hookup_meetup').setValue(true);
          }else{
            this.interests.get('couple_male_hookup_meetup').setValue(false);
          }

          if(this.profileData['couple_female_swingers'] == 1){
            this.interests.get('couple_female_swingers').setValue(true);
          }else{
            this.interests.get('couple_female_swingers').setValue(false);
          }

          if(this.profileData['couple_female_hookup_meetup'] == 1){
            this.interests.get('couple_female_hookup_meetup').setValue(true);
          }else{
            this.interests.get('couple_female_hookup_meetup').setValue(false);
          }

          if(this.profileData['couple_transgender_swingers'] == 1){
            this.interests.get('couple_transgender_swingers').setValue(true);
          }else{
            this.interests.get('couple_transgender_swingers').setValue(false);
          }

          if(this.profileData['couple_transgender_hookup_meetup'] == 1){
            this.interests.get('couple_transgender_hookup_meetup').setValue(true);
          }else{
            this.interests.get('couple_transgender_hookup_meetup').setValue(false);
          }
        }, 1000);
       
        
      }else{
        this.profileData = '';
      }
    }); 


    var obj1={
      'user_id':user_id
    }

    this.callapi.post('/profile/signle_user_profile_image',obj1).subscribe(data => {
      if(data.status == 200){
        this.profileDataImage = data.data;
      }else{
        this.profileDataImage = '';
      }
    }); 

    var obj2={
      'user_id':user_id
    }

    this.callapi.post('/profile/get_all_album',obj2).subscribe(result1 => {
       if ((result1.status == 200) || (result1.status === '200')) {
          this.allAlbumData = result1.data;
        } else {
           this.allAlbumData = '';
        }
    });

    var obj3={
      'user_id':user_id
    }

    this.callapi.post('/profile/signle_user_profile_approve_video',obj3).subscribe(data => {
      if(data.status == 200){
        this.profileDataApproveVideo = data.data;
      }else{
        // alert('wrr');
        this.profileDataApproveVideo = '';
      }
    }); 

    // 


}

  
public distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="km") { dist = dist * 1.609344 }
    if (unit=="mi") { dist = dist * 0.8684 }
    return dist;
  }
}



public showAllImage(){
  // alert();
    $('#allImageModal').modal('show');
}

public showAllAlbum(){
  $('#allAlbumModal').modal('show');
}

public showAllVideo(){
  $('#allVideoModal').modal('show');
}

public viewAlbum(id){
   // alert(id);
   var obe={
     'album_id':id,
     'user_id':this.user_id
   }
    $('#preloader').show();
    this.callapi.post('/profile/get_album_image',obe).subscribe(result1 => {
          $('#preloader').hide();
          if ((result1.status == 200) || (result1.status === '200')) {
            this.allAlbumImageData = result1.data;
            $('#allAlbumModal').modal('hide');
            $('#allAlbumImageModal').modal('show');

          } else {
            // alert('etwt');
           this.allAlbumImageData = '';
           $('#allAlbumModal').modal('hide');
           $('#allAlbumImageModal').modal('show');
          }
        },err => {
          $('#preloader').hide();
        });

 }


 public sendFriendRequest(){

    var user_obj={
      'sendor_id':this.login_user_id,
      'recieved_id':this.user_id,

    }
    $('#preloader').show();
    this.callapi.post('/profile/send_friend_request',user_obj).subscribe(result1 => {
      $('#preloader').hide();
       if(result1.status == 200){
          this.toastr.successToastr(result1.message, 'Success!');
          this.who_i_viewed();
        }
    });


 }

 public sendLike(status){
   var user_obj={
      'sendor_id':this.login_user_id,
      'recieved_id':this.user_id,
      'status':status
    }
    $('#preloader').show();
    this.callapi.post('/profile/send_like',user_obj).subscribe(result1 => {
      $('#preloader').hide();
       if(result1.status == 200){
          this.toastr.successToastr(result1.message, 'Success!');
          this.who_i_viewed();
        }
    });
 }

 public sendValidate(username){
   this.validate_message = 'I hereby certify that the profile from is '+username+' for real';
   $('#validateMessageModal').modal('show');
 }

 public cancelPopup(name){
   $('#'+name).modal('hide');
 }

 public updateValidate(){
   var message = $('#validate_message').val();
   var validate_obj={
      'sendor_id':this.login_user_id,
      'recieved_id':this.user_id,
      'message':message
    }
    $('#preloader').show();
    this.callapi.post('/profile/send_validate',validate_obj).subscribe(result1 => {
       $('#preloader').hide();
       if(result1.status == 200){
          this.toastr.successToastr(result1.message, 'Success!');
          $('#validateMessageModal').modal('hide');
          this.who_i_viewed();
        }
    });
 }

 public sendValidateDelete(){
   $('#validateMessageDeleteModal').modal('show');
 }

 public deleteValidate(){
   var validate_obj={
      'sendor_id':this.login_user_id,
      'recieved_id':this.user_id,
      
    }
    $('#preloader').show();
    this.callapi.post('/profile/delete_validate',validate_obj).subscribe(result1 => {
      $('#preloader').hide();
       if(result1.status == 200){
          this.toastr.successToastr(result1.message, 'Success!');
          $('#validateMessageDeleteModal').modal('hide');
          this.who_i_viewed();
        }
    });
 }

 public sendRemember(){
   var user_obj={
      'sendor_id':this.login_user_id,
      'recieved_id':this.user_id,
    }
    $('#preloader').show();
    this.callapi.post('/profile/send_remember',user_obj).subscribe(result1 => {
      $('#preloader').hide();
       if(result1.status == 200){
          this.toastr.successToastr(result1.message, 'Success!');
          this.who_i_viewed();
        }
    });
 }


 public sendNotes(username){
   this.notes_message = 'I like you profile HANDSOME';
   $('#notesMessageModal').modal('show');
 }

  public updateNotes(){
   var message = $('#notes_message').val();
   var validate_obj={
      'sendor_id':this.login_user_id,
      'recieved_id':this.user_id,
      'message':message
    }
    $('#preloader').show();
    this.callapi.post('/profile/send_notes',validate_obj).subscribe(result1 =>
      { 
        $('#preloader').hide();
        if(result1.status == 200){ this.toastr.successToastr(result1.message,
        'Success!'); $('#notesMessageModal').modal('hide'); this.who_i_viewed(); 
      }
    });
  }

  public sendViewNotes(){

    var validate_obj={
      'sendor_id':this.login_user_id,
      'recieved_id':this.user_id,
      
    }
    $('#preloader').show();
    this.callapi.post('/profile/view_send_notes',validate_obj).subscribe(result1 =>
      { 
        $('#preloader').hide();
        if(result1.status == 200){ 
         this.notes_message = result1.data.message;
         // this.notes_message = 'I like you profile HANDSOME';
         $('#notesMessageModal').modal('show');

      }
    });

  }

  public blockUser(){
   $('#blockUserModal').modal('show');
 }


 public updateBlock(){
   var validate_obj={
      'sendor_id':this.login_user_id,
      'recieved_id':this.user_id
      
    }
    $('#preloader').show();
    this.callapi.post('/profile/send_block',validate_obj).subscribe(result1 =>
      { 
        $('#preloader').hide();
        if(result1.status == 200){ 
          this.toastr.successToastr(result1.message,'Success!');
           $('#blockUserModal').modal('hide');
            this.router.navigateByUrl('/blocked');
      }
    });
  }


 public blockRedirect(){
    $('#userBlocekedScreenModal').modal('hide');  
    this.router.navigateByUrl('/blocked');
  }


 
}
