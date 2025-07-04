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
  selector: 'app-couple-profile',
  templateUrl: './couple-profile.component.html',
  styleUrls: ['./couple-profile.component.css']
})
export class CoupleProfileComponent implements OnInit {

  public interests: FormGroup;
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public submitted = false;
  public emailotp;

  public profileData;

  public isLoadedLoginOtp:boolean=true;
  public processingFlagOtp:boolean=true;

 
  public processingFlag:boolean=true;
  public isLoadedLogin:boolean=true;

  public profile_type='couple';
  public profile_image='';

  imgChangeEvt: any = "";
  cropImgPreview: any = "";

  public dobmonth;
  public dobyear;
  public dobday;

  public query_user_id;
  public query_profile_type;
  public query_username;

  public height1_type='';
  public weight1_type='';
  public langulageArray1=[];

  public height2_type='';
  public weight2_type='';
  public langulageArray2=[]; 


 @ViewChild("map", { static: true }) mapElement: any;
  map: any;


   body_hair_id1 = [
    { id: 'Arm Pits', name: "Arm Pits" },
    { id: 'Arm', name: "Arm" },
    { id: 'Bikini', name: "Bikini" },
    { id: 'Buns', name: "Buns" },
    { id: 'Chest', name: "Chest" },
    { id: 'Everywhere', name: "Everywhere" },
    { id: 'Legs', name: "Legs" },
    { id: 'Shave', name: "Shave" },
    { id: 'Smooth', name: "Smooth" },
    { id: 'Tummy', name: "Tummy" },
    { id: 'Treasure', name: "Treasure" },
  ];
  body_hair_source1 = this.body_hair_id1;
  body_hair_dest1 = this.body_hair_id1;

  body_hair_id2 = [
    { id: 'Arm Pits', name: "Arm Pits" },
    { id: 'Arm', name: "Arm" },
    { id: 'Bikini', name: "Bikini" },
    { id: 'Buns', name: "Buns" },
    { id: 'Chest', name: "Chest" },
    { id: 'Everywhere', name: "Everywhere" },
    { id: 'Legs', name: "Legs" },
    { id: 'Shave', name: "Shave" },
    { id: 'Smooth', name: "Smooth" },
    { id: 'Tummy', name: "Tummy" },
    { id: 'Treasure', name: "Treasure" },
  ];
  body_hair_source2 = this.body_hair_id2;
  body_hair_dest2 = this.body_hair_id2;



  language_spoken_id1 = [
    { id: 'Other', name: "Other" },
    { id: 'Arabic', name: "Arabic" },
    { id: 'Deutsch', name: "Deutsch" },
    { id: 'English', name: "English" },
    { id: 'Español', name: "Español" },
    { id: 'Français', name: "Français" },
    { id: 'Hindi', name: "Hindi" },
    { id: 'Italiano', name: "Italiano" },
    { id: 'Japanese', name: "Japanese" },
    { id: 'Mandarin Chinese', name: "Mandarin Chinese" },
    { id: 'Nederlands', name: "Nederlands" },
    { id: 'Português', name: "Português" },
    { id: 'Russian', name: "Russian" },
  ];
  language_spoken_source1 = this.language_spoken_id1;
  language_spoken_dest1 = this.language_spoken_id1;

  language_spoken_id2 = [
    { id: 'Other', name: "Other" },
    { id: 'Arabic', name: "Arabic" },
    { id: 'Deutsch', name: "Deutsch" },
    { id: 'English', name: "English" },
    { id: 'Español', name: "Español" },
    { id: 'Français', name: "Français" },
    { id: 'Hindi', name: "Hindi" },
    { id: 'Italiano', name: "Italiano" },
    { id: 'Japanese', name: "Japanese" },
    { id: 'Mandarin Chinese', name: "Mandarin Chinese" },
    { id: 'Nederlands', name: "Nederlands" },
    { id: 'Português', name: "Português" },
    { id: 'Russian', name: "Russian" },
  ];
  language_spoken_source2 = this.language_spoken_id2;
  language_spoken_dest2 = this.language_spoken_id2;

 

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,private activatedRoute: ActivatedRoute)
  { 
    this.query_user_id = this.activatedRoute.snapshot.queryParams["token"];
    this.query_profile_type = this.activatedRoute.snapshot.queryParams["profile_type"];
    this.query_username = this.activatedRoute.snapshot.queryParams["user"];
    var obj={
      "user_id":this.query_user_id,
      "profile_type":this.query_profile_type,
      "username":this.query_username,
    }
     this.callapi.post('/auth/get_user_verification',obj).subscribe(data => {
      if(data.status == 200){
          this.tokenSaveService.saveAccessToken(data.data.token, data.data.sign);
          this.tokenSaveService.saveProfileType(data.data.profile_type);
          this.tokenSaveService.saveUserId(data.data.userid);
      }else{
         // this.router.navigateByUrl('/link-expire');
      }
    }); 
  }

  ngOnInit() {

    this.dateFormate();
    this.userProfile();

    this.interests = this.formBuilder.group({
      couple_male_female_swingers: new FormControl(true),
      couple_male_female_hookup_meetup: new FormControl(true),
      couple_female_female_swingers: new FormControl(true),
      couple_female_female_hookup_meetup: new FormControl(true),
      couple_male_male_swingers: new FormControl(true),
      couple_male_male_hookup_meetup: new FormControl(true),
      couple_male_swingers: new FormControl(false),
      couple_male_hookup_meetup: new FormControl(false),
      couple_female_swingers: new FormControl(false),
      couple_female_hookup_meetup: new FormControl(false),
      couple_transgender_swingers: new FormControl(false),
      couple_transgender_hookup_meetup: new FormControl(false),
      text: new FormControl(''),
      comment: new FormControl(''),
      person1_dob: new FormControl(''),
      person1_body_hair: new FormControl(''),
      person1_height: new FormControl(''),
      person1_weight: new FormControl(''),
      person1_body_type: new FormControl('Im not comfortable sharing that'),
      person1_ethnic_background: new FormControl('Im not comfortable sharing that'),
      person1_smoking: new FormControl('Im not comfortable sharing that'),
      person1_drinking:new FormControl('Im not comfortable sharing that'),
      person1_piercings: new FormControl('Im not comfortable sharing that'),
      person1_tattoos: new FormControl('Im not comfortable sharing that'),
      person1_language_spoken: new FormControl(''),
      person1_circumcised: new FormControl('Im not comfortable sharing that'),
      person1_intelligence_importance: new FormControl('Im not comfortable sharing that'),
      person1_sexuality: new FormControl('Im not comfortable sharing that'),
      person1_looks_important: new FormControl('Im not comfortable sharing that'),
      person1_relationship_orientation:new FormControl('Im not comfortable sharing that'),
      person2_dob: new FormControl(''),
      person2_body_hair: new FormControl(''),
      person2_height: new FormControl(''),
      person2_weight: new FormControl(''),
      person2_body_type: new FormControl('Im not comfortable sharing that'),
      person2_ethnic_background: new FormControl('Im not comfortable sharing that'),
      person2_smoking: new FormControl('Im not comfortable sharing that'),
      person2_drinking:new FormControl('Im not comfortable sharing that'),
      person2_piercings: new FormControl('Im not comfortable sharing that'),
      person2_tattoos: new FormControl('Im not comfortable sharing that'),
      person2_language_spoken: new FormControl(''),
      person2_circumcised: new FormControl('Im not comfortable sharing that'),
      person2_intelligence_importance: new FormControl('Im not comfortable sharing that'),
      person2_sexuality: new FormControl('Im not comfortable sharing that'),
      person2_relationship_orientation:new FormControl('Im not comfortable sharing that'),
      person2_looks_important: new FormControl('Im not comfortable sharing that')
  });
   
   
     
}

 public linkRouter(link){
    this.router.navigate([link]);
  }

get reg() {
    return this.interests;
  }

  get f() {
    return this.interests.controls;
  }

  public userProfile(){
     this.callapi.get('/user/me').subscribe(data => {
      if(data.status == 200){
        this.profileData = data.data;
      }else{
        this.profileData = '';
      }
    }); 
 } 

 public onRegister() {
    
    // this.submitted = true;
    const data = this.interests.value;

    
    if (this.interests.valid) 
    {
        
        this.submitted = false;

        if((data.person1_dob == '') || (data.person1_dob == undefined)){
          this.toastr.errorToastr('Please Select DOB', 'Error!');
          
        }else if((this.profile_image == '') || (this.profile_image == undefined))
        {
          this.toastr.errorToastr('Please upload profile image', 'Error!');
        }else{

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
                'profile_type': this.profile_type,
                'text': data.text,
                'comment': data.comment,
                'person1_dob': data.person1_dob,
                'person1_body_hair': data.person1_body_hair,
                'height1_type': this.height1_type,
                'weight1_type': this.weight1_type,
                'height2_type': this.height2_type,
                'weight2_type': this.weight2_type,

                'person1_height': data.person1_height,
                'person1_weight': data.person1_weight,
                'person1_body_type': data.person1_body_type,
                'person1_ethnic_background': data.person1_ethnic_background,
                'person1_piercings': data.person1_piercings,
                'person1_tattoos': data.person1_tattoos,
                'person1_language_spoken': this.langulageArray1,
                'person1_circumcised': data.person1_circumcised,
                'person1_smoking':data.person1_smoking,
                'person1_drinking':data.person1_drinking,
                'person1_looks_important':data.person1_looks_important,
                'person1_intelligence_importance': data.person1_intelligence_importance,
                'person1_sexuality': data.person1_sexuality,
                'person1_relationship_orientation': data.person1_relationship_orientation,
                'person2_dob': data.person2_dob,
                'person2_body_hair': data.person2_body_hair,
                'person2_height': data.person2_height,
                'person2_weight': data.person2_weight,
                'person2_body_type': data.person2_body_type,
                'person2_ethnic_background': data.person2_ethnic_background,
                'person2_piercings': data.person2_piercings,
                'person2_tattoos': data.person2_tattoos,
                'person2_language_spoken': this.langulageArray2,
                'person2_circumcised': data.person2_circumcised,
                'person2_smoking':data.person2_smoking,
                'person2_drinking':data.person2_drinking,
                'person2_intelligence_importance': data.person2_intelligence_importance,
                'person2_sexuality': data.person2_sexuality,
                'person2_relationship_orientation': data.person2_relationship_orientation,
                'person2_looks_important':data.person2_looks_important,
                'profile_image': this.profile_image,
             }
              
              $('#preloader').show();
              this.callapi.post('/user/update_couple_profile_interest', this.regData).subscribe(result => {
               $('#preloader').hide();
                this.data = result;
                if ((this.data.status == 200) || (this.data.status === '200')) {

                  this.toastr.successToastr(this.data.message, 'Success!');
                  
                  this.router.navigateByUrl('/view-couple-profile');
                  
                 //  this.submitted = false;
                } else {
                  $('#preloader').hide();
                  this.toastr.errorToastr(this.data.message, 'Error!');
                  
                }
              },err => {
                $('#preloader').hide();
              });
        }
 
        
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

  
  onFileChange(event: any): void {

    $('#myModal').modal('show');
    this.imgChangeEvt = event;
    // alert(this.imgChangeEvt);
  }

  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
  }

  crop(){

    this.imageupload(this.cropImgPreview);
    // alert(this.cropImgPreview);
  }

  cancelCrop(){
    $('#myModal').modal('hide');
  }

  public imageupload(base64){

    var obj ={
      'image':base64
    }
    this.callapi.post('/upload/imageupload', obj).subscribe(result => {
       $('#preloader').hide();
        this.data = result;
        if ((this.data.status == 200) || (this.data.status === '200')) {

          this.toastr.successToastr(this.data.message, 'Success!');
          this.profile_image =this.data.data;   
          $('#myModal').modal('hide');

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
      $('#person2_dob').attr('max', maxDate);

  }


  public selectHeight1(val){
    this.height1_type = val;
    if(this.height1_type == 'FT'){
      $('#person1_height_ft').css('display','block');
     $('#person1_height_cm').css('display','none');
     
   }else{
     $('#person1_height_ft').css('display','none');
     $('#person1_height_cm').css('display','block');
    
    }

  }

  public selectHeight2(val){
    this.height2_type = val;
    if(this.height2_type == 'FT'){
      $('#person2_height_ft').css('display','block');
     $('#person2_height_cm').css('display','none');
     
   }else{
     $('#person2_height_ft').css('display','none');
     $('#person2_height_cm').css('display','block');
    
    }
  }

  public selectWeight1(val){
    this.weight1_type = val;
    if(this.weight1_type == 'LBS'){
      $('#person1_weight_lbs').css('display','block');
      $('#person1_weight_kg').css('display','none');
     
   }else{
     $('#person1_weight_lbs').css('display','none');
     $('#person1_weight_kg').css('display','block');
    
    }
  }

  public selectWeight2(val){
    this.weight2_type = val;
    if(this.weight2_type == 'LBS'){
      $('#person2_weight_lbs').css('display','block');
     $('#person2_weight_kg').css('display','none');
     
   }else{
     $('#person2_weight_lbs').css('display','none');
     $('#person2_weight_kg').css('display','block');
    
    }
  }


  public selectLangulage1(unitObject,value){
      if(value == true){
        this.langulageArray1.push(unitObject)
      }else{
        const index: number = this.langulageArray1.indexOf(unitObject);
        this.langulageArray1.splice(index, 1);
      }
      console.log('langulageArray',this.langulageArray1);
  }
  public selectLangulage2(unitObject,value){
      if(value == true){
        this.langulageArray2.push(unitObject)
      }else{
        const index: number = this.langulageArray2.indexOf(unitObject);
        this.langulageArray2.splice(index, 1);
      }
      console.log('langulageArray',this.langulageArray2);
  }

}
