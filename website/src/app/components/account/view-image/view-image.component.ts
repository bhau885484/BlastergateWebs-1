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

import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {

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
 
 @ViewChild("map", { static: true }) mapElement: any;
  map: any;

 

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService)
  { 
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {

    this.getProfileData();
    this.dateFormate();
  

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

public linkRouter(link){
    this.router.navigate([link]);
}
get f() {
    return this.interests.controls;
}

get f1() {
    return this.profile_details.controls;
}

public getProfileData(){
    this.callapi.get('/user/signle_user_profile').subscribe(data => {
      if(data.status == 200){
        this.profileData = data.data;
        // alert(this.profileData.person1_body_hair);
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

    this.callapi.get('/user/signle_user_profile_image').subscribe(data => {
      if(data.status == 200){
        this.profileDataImage = data.data;
      }else{
        this.profileDataImage = '';
      }
    }); 

    this.callapi.get('/user/signle_user_profile_approve_image').subscribe(data => {
      if(data.status == 200){
        this.profileDataApproveImage = data.data;
      }else{
        // alert('wrr');
        this.profileDataApproveImage = '';
      }
    }); 

    this.callapi.get('/user/signle_user_profile_pending_image').subscribe(data => {
      if(data.status == 200){
        this.profileDataPendingImage = data.data;
      }else{
        this.profileDataPendingImage = '';
      }
    }); 

    this.callapi.get('/user/signle_user_profile_approve_video').subscribe(data => {
      if(data.status == 200){
        this.profileDataApproveVideo = data.data;
      }else{
        // alert('wrr');
        this.profileDataApproveVideo = '';
      }
    }); 

    this.callapi.get('/user/signle_user_profile_pending_video').subscribe(data => {
      if(data.status == 200){
        this.profileDataPendingVideo = data.data;
      }else{
        this.profileDataPendingVideo = '';
      }
    }); 
}

  

 public onSaveInterest() {
    
    // this.submitted = true;
    const data = this.interests.value;
    if (this.interests.valid) 
    {
       this.submitted = false;

        if(data.couple_male_female_swingers == true){
         data.couple_male_female_swingers = 1;
        }else{
          data.couple_male_female_swingers = 0;
        }

        if(data.couple_male_female_hookup_meetup == true){
          data.couple_male_female_hookup_meetup = 1;
        }else{
          data.couple_male_female_hookup_meetup = 0;
        }

        if(data.couple_female_female_swingers == true){
          data.couple_female_female_swingers = 1;
        }else{
          data.couple_female_female_swingers = 0;
        }

        if(data.couple_female_female_hookup_meetup == true){
          data.couple_female_female_hookup_meetup = 1;
        }else{
          data.couple_female_female_hookup_meetup = 0;
        }

        if(data.couple_male_male_swingers == true){
          data.couple_male_male_swingers = 1;
        }else{
          data.couple_male_male_swingers = 0;
        }

        if(data.couple_male_male_hookup_meetup == true){
          data.couple_male_male_hookup_meetup = 1;
        }else{
          data.couple_male_male_hookup_meetup = 0;
        }

        if(data.couple_male_swingers == true){
          data.couple_male_swingers = 1;
        }else{
          data.couple_male_swingers = 0;
        }

        if(data.couple_male_hookup_meetup == true){
          data.couple_male_hookup_meetup = 1;
        }else{
          data.couple_male_hookup_meetup = 0;
        }

        if(data.couple_female_swingers == true){
          data.couple_female_swingers = 1;
        }else{
          data.couple_female_swingers = 0;
        }

        if(data.couple_female_hookup_meetup == true){
          data.couple_female_hookup_meetup = 1;
        }else{
          data.couple_female_hookup_meetup = 0;
        }
        
        if(data.couple_transgender_swingers == true){
          data.couple_transgender_swingers = 1;
        }else{
          data.couple_transgender_swingers = 0;
        }
        
        if(data.couple_transgender_hookup_meetup == true){
          data.couple_transgender_hookup_meetup = 1;
        }else{
          data.couple_transgender_hookup_meetup = 0;
        }
        console.log(this.interests.value);

          this.regData = {
              'couple_male_female_swingers': data.couple_male_female_swingers,
              'couple_male_female_hookup_meetup': data.couple_male_female_hookup_meetup,
              'couple_female_female_swingers': data.couple_female_female_swingers,
              'couple_female_female_hookup_meetup': data.couple_female_female_hookup_meetup,
              'couple_male_male_swingers': data.couple_male_male_swingers,
              'couple_male_male_hookup_meetup': data.couple_male_male_hookup_meetup,
              'couple_male_swingers': data.couple_male_swingers,
              'couple_male_hookup_meetup': data.couple_male_hookup_meetup,
              'couple_female_swingers': data.couple_female_swingers,
              'couple_female_hookup_meetup': data.couple_female_hookup_meetup,
              'couple_transgender_swingers': data.couple_transgender_swingers,
              'couple_transgender_hookup_meetup': data.couple_transgender_hookup_meetup,
              
           }
            
            $('#preloader').show();
            this.callapi.post('/user/edit_single_profile_interest', this.regData).subscribe(result => {
             $('#preloader').hide();
              this.data = result;
              if ((this.data.status == 200) || (this.data.status === '200')) {

                this.toastr.successToastr(this.data.message, 'Success!');
                this.getProfileData();
              } else {
                $('#preloader').hide();
                this.toastr.errorToastr(this.data.message, 'Error!');
                
              }
            },err => {
              $('#preloader').hide();
            });
        
       
        
    }else{
        
         this.submitted = true;
         return;
    }
 }


 public saveProfileDetails() {
    
    // this.submitted = true;
    const data = this.profile_details.value;
    if (this.profile_details.valid) 
    {
       this.submitted = false;

        

          this.regData = {
              'person1_name':data.person1_name,
              'person1_dob': data.person1_dob,
              'text': data.text,
              'comment': data.comment,
              'person1_body_hair': data.person1_body_hair,
              'person1_height': data.person1_height,
              'person1_weight': data.person1_weight,
              'person1_body_type': data.person1_body_type,
              'person1_ethnic_background': data.person1_ethnic_background,
              'person1_piercings': data.person1_piercings,
              'person1_tattoos': data.person1_tattoos,
              'person1_language_spoken': data.person1_language_spoken,
              'person1_circumcised': data.person1_circumcised,
              'person1_smoking':data.person1_smoking,
              'person1_drinking':data.person1_drinking,
              'person1_intelligence_importance': data.person1_intelligence_importance,
              'person1_sexuality': data.person1_sexuality,
              'person1_relationship_orientation': data.person1_relationship_orientation,
              
           }
            
            $('#preloader').show();
            this.callapi.post('/user/edit_single_profile_details', this.regData).subscribe(result => {
             $('#preloader').hide();
              this.data = result;
              if ((this.data.status == 200) || (this.data.status === '200')) {

                this.toastr.successToastr(this.data.message, 'Success!');
                this.getProfileData();
              } else {
                $('#preloader').hide();
                this.toastr.errorToastr(this.data.message, 'Error!');
                
              }
            },err => {
              $('#preloader').hide();
            });
        
       
        
    }else{
        
         this.submitted = true;
         return;
    }
    
  }

public selectProfileType(val){
  // alert(val);
  this.profile_type = val;
  if(val == 'business'){
    
     $("#regBtn").css('display','none');
    }else{
     $("#regBtn").css('display','block');
  }

}

 onFileChangeProfile(event: any): void {

    $('#profileModal').modal('show');
    this.imgChangeEvtProfile = event;
    // alert(this.imgChangeEvt);
  }

  cropImgProfile(e: ImageCroppedEvent) {
    this.cropImgPreviewProfile = e.base64;
  }

  cropProfile(){

    this.imageuploadProfile(this.cropImgPreviewProfile);
    // alert(this.cropImgPreview);
  }

  cancelCropProfile(){
    $('#profileModal').modal('hide');
  }

  public imageuploadProfile(base64){

    var obj ={
      'image':base64
    }
    this.callapi.post('/upload/imageupload', obj).subscribe(result => {
       $('#preloader').hide();
        this.data = result;
        if ((this.data.status == 200) || (this.data.status === '200')) {

          this.profile_image =this.data.data;
          var obj1={
            'image':this.profile_image
          }

           this.callapi.post('/user/upload_profile_image', obj1).subscribe(result1 => {
            
              this.data = result;
              if ((result1.status == 200) || (result1.status === '200')) {

                this.toastr.successToastr(this.data.message, 'Success!');
                $('#profileModal').modal('hide');
                this.getProfileData();

              } else {
                this.toastr.errorToastr(this.data.message, 'Error!');
                
              }
            },err => {
              $('#preloader').hide();
            });
       } else {
          $('#preloader').hide();
          this.toastr.errorToastr(this.data.message, 'Error!');
          
        }
      },err => {
        $('#preloader').hide();
      });
  }


  public dateFormate(){
       var dtToday = new Date();
    
        this.dobmonth = dtToday.getMonth() + 1;// jan=0; feb=1 .......
        this.dobday = dtToday.getDate();
        this.dobyear = dtToday.getFullYear() - 18;
        if(this.dobmonth < 10)
           this.dobmonth = '0' + this.dobmonth.toString();
        if(this.dobday < 10)
           this.dobday = '0' + this.dobday.toString();
        var minDate = this.dobyear + '-' + this.dobmonth + '-' + this.dobday;
        var maxDate = this.dobyear + '-' + this.dobmonth + '-' + this.dobday;
      $('#person1_dob').attr('max', maxDate);
  }

  public showPersonName(){
    if($('#person_name').hasClass('read_only')){
      $('#person_name').removeClass('read_only');
    }else{
      $('#person_name').addClass('read_only');
    }
  }

  public deleteProfileImage(id){

    // alert(id);
     var result = confirm("Are you sure Want to delete?");
      if (result==true) 
      {
       
       var obj={
           'image_id':id
         }
       this.callapi.post('/user/delete_profile_image',obj).subscribe(result1 => {
            
              this.data = result;
              if ((result1.status == 200) || (result1.status === '200')) {
                this.toastr.successToastr(this.data.message, 'Success!');
                this.getProfileData();
              } else {
                this.toastr.errorToastr(this.data.message, 'Error!');
                
              }
            },err => {
              $('#preloader').hide();
            });

      } else {
       return false;
      }

  }

  //  Edit Image
  onFileChangeProfileEdit(event: any,image_id): void {

    $('#profileModalEdit').modal('show');
    this.imgChangeEvtProfileEdit = event;
    this.edit_image_id = image_id;
    // alert(this.imgChangeEvt);
  }

  cropImgProfileEdit(e: ImageCroppedEvent) {
    this.cropImgPreviewProfileEdit = e.base64;
  }

  cropProfileEdit(){

    this.imageuploadProfileEdit(this.cropImgPreviewProfileEdit);
    // alert(this.cropImgPreview);
  }

  cancelCropProfileEdit(){
    $('#profileModalEdit').modal('hide');
  }

  public imageuploadProfileEdit(base64){

    var obj ={
      'image':base64
    }
    this.callapi.post('/upload/imageupload', obj).subscribe(result => {
       $('#preloader').hide();
        this.data = result;
        if ((this.data.status == 200) || (this.data.status === '200')) {

          this.profile_image =this.data.data;
          var obj1={
            'image':this.profile_image,
            'id':this.edit_image_id
          }

           this.callapi.post('/user/edit_profile_image', obj1).subscribe(result1 => {
            
              this.data = result;
              if ((result1.status == 200) || (result1.status === '200')) {

                this.toastr.successToastr(this.data.message, 'Success!');
                $('#profileModalEdit').modal('hide');
                this.getProfileData();

              } else {
                this.toastr.errorToastr(this.data.message, 'Error!');
                
              }
            },err => {
              $('#preloader').hide();
            });
       } else {
          $('#preloader').hide();
          this.toastr.errorToastr(this.data.message, 'Error!');
          
        }
      },err => {
        $('#preloader').hide();
      });
  }

  public onSelectVideo(event) {
    const file = event.target.files && event.target.files[0];
    // alert(file);
    if (file) {
      $('#preloader').show();
      var reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        this.videouUrl = (<FileReader>event.target).result;
        console.log(this.videouUrl);

        this.videoupload(this.videouUrl)
      }
    }
  }

   public videoupload(base64){
    
    var obj ={
      'video':base64
    }
    this.callapi.post('/upload/videoupload', obj).subscribe(result => {
       
        this.data = result;
        if ((this.data.status == 200) || (this.data.status === '200')) {

          this.uploaded_video_name = this.data.data;
          var obj1 ={
              'video':this.uploaded_video_name,
            }
          this.callapi.post('/user/upload_profile_video', obj1).subscribe(result => {
              $('#preloader').hide();
              this.data = result;
              if ((this.data.status == 200) || (this.data.status === '200')) {

                this.toastr.successToastr(this.data.message, 'Success!');
                 this.getProfileData();
              } else {
                $('#preloader').hide();
                this.toastr.errorToastr(this.data.message, 'Error!');
                
              }
            },err => {
              $('#preloader').hide();
            });

        } else {
          $('#preloader').hide();
          this.toastr.errorToastr(this.data.message, 'Error!');
          
        }
      },err => {
        $('#preloader').hide();
      });
  }


  public deleteProfileVideo(id){

    // alert(id);
     var result = confirm("Are you sure Want to delete?");
      if (result==true) 
      {
       $('#preloader').show();
       var obj={
           'video_id':id
         }
       this.callapi.post('/user/delete_profile_video',obj).subscribe(result1 => {
              $('#preloader').hide();
              this.data = result;
              if ((result1.status == 200) || (result1.status === '200')) {
                this.toastr.successToastr(this.data.message, 'Success!');
                this.getProfileData();
              } else {
                this.toastr.errorToastr(this.data.message, 'Error!');
                
              }
            },err => {
              $('#preloader').hide();
            });

      } else {
       return false;
      }

  }




display = 'none';
ulpoadedFiles: any = [];
imgId: any=0;
target: any = {};
files: any = {};
event: any = {};
developer: any = {};
frontEndLanguages: any = [];
backEndLanguages: any = [];
selectedBackEndItems: any = [];
selectedFrontEndItems: any = [];
imageChangedEvent: any = '';
croppedImage: any = '';
currentProcessingImg: any = 0;

finalImageList: any = [];




fileChangeEvent(event: any): void {
  //Processing selected Images 
  if (event.target.files.length > 6) {
       this.toastr.errorToastr('Maximum 5 images accepted', 'Error!');
    }else{
      $('#profileModalAlbumImage').modal('show')
        for (var i = 0; i < event.target.files.length; i++) {
          this.imageProcess(event, event.target.files[i]);
        }
    }

 }

imageProcess(event: any, file: any) {
  //Setting images in our required format
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    this.imgId = this.imgId + 1;
    var event = {
      target: {
        files: [file]
      }
    };
  this.imageChangedEvent = event;
    this.ulpoadedFiles.push({ imgId: this.imgId, imgBase64: reader.result, imgFile: file });
  };
}

//get a Image using Image Id to crop
//cropping process done here 
cropImage(imgId) {
  this.currentProcessingImg = imgId;
  var imgObj = this.ulpoadedFiles.find(x => x.imgId === imgId);
  //created dummy event Object and set as imageChangedEvent so it will set cropper on this image 
  var event = {
    target: {
      files: [imgObj.imgFile]
    }
  };
  this.imageChangedEvent = event;
}

//Save Cropped Image locally
SaveCropedImage() {
  var imgObj = this.ulpoadedFiles.find(x => x.imgId === this.currentProcessingImg);
  imgObj.imgBase64 = this.croppedImage;
  
}

SaveAllImages() {
  this.finalImageList =[];
 this.ulpoadedFiles.forEach(imgObject => {
    this.finalImageList.push({
    image: imgObject.imgBase64,
   });

})

 var obj ={
      'image':this.finalImageList
    }
    this.callapi.post('/upload/imageuploadMultiple', obj).subscribe(result => {
       $('#preloader').hide();
        this.data = result;
        if ((this.data.status == 200) || (this.data.status === '200')) {

          // this.profile_image =this.data.data;
         
       } else {
          $('#preloader').hide();
          this.toastr.errorToastr(this.data.message, 'Error!');
          
        }
      },err => {
        $('#preloader').hide();
      });

// alert(this.finalImageList[0].image);
  console.log('final_image',this.finalImageList);
}

imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
}




  
}
