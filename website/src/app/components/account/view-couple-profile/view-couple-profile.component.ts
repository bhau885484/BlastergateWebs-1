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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-view-couple-profile',
  templateUrl: './view-couple-profile.component.html',
  styleUrls: ['./view-couple-profile.component.css']
})
export class ViewCoupleProfileComponent implements OnInit {

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

  public person_1_input_color;
  public person_1_text_color;

 public person_2_input_color;
 public person_2_text_color;


 // album Image 

 public allAlbumData;
  public allAlbumImageData
  public upload_album_id;

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

  public maxDate1:string;
  public maxDate2:string;


  public selectedFile: File = null;
  public selectedFileAlbumVideo: File = null;
  public serverUrl;

  public height1_type='';
  public weight1_type='';
  public langulageArray1=[];

  public height2_type='';
  public weight2_type='';
  public langulageArray2=[];

   public location_form: FormGroup;
   public locationData;
 
 
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
                public commonServe: service.CommonService,private http: HttpClient)
  { 
    this.serverUrl = environment.api_url;
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {


    this.location_form = this.formBuilder.group({
      location: new FormControl(''),
      location_1: new FormControl(''),
      distance: new FormControl('')
      
    });

     setTimeout(() => {
          this.initMap();  
          this.initMap1();
        }, 3000);
       

   // this.getProfileDataLocation();
   

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
      text: new FormControl(''),
      comment: new FormControl(''),
      
      person1_dob: new FormControl(''),
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
      person1_relationship_orientation:new FormControl(''),
      person1_looks_important:new FormControl(''),
      person2_dob: new FormControl(''),
      person2_name:new FormControl(''),
      person2_body_hair: new FormControl(''),
      person2_height: new FormControl(''),
      person2_weight: new FormControl(''),
      person2_body_type: new FormControl(''),
      person2_ethnic_background: new FormControl(''),
      person2_smoking: new FormControl(''),
      person2_drinking:new FormControl(''),
      person2_piercings: new FormControl(''),
      person2_tattoos: new FormControl(''),
      person2_language_spoken: new FormControl(''),
      person2_circumcised: new FormControl(''),
      person2_intelligence_importance: new FormControl(''),
      person2_sexuality: new FormControl(''),
      person2_relationship_orientation:new FormControl(''),
      person2_looks_important:new FormControl('')
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
       $('#preloader').hide();
      if(data.status == 200){
        this.profileData = data.data;

        this.langulageArray1 = this.profileData.person1_language_spoken;
        this.langulageArray2 = this.profileData.person2_language_spoken;
        this.height1_type = this.profileData.height1_type;
        this.weight1_type = this.profileData.weight1_type;
        this.height2_type = this.profileData.height2_type;
        this.weight2_type = this.profileData.weight2_type;

         if((this.profileData.lat_1) && (this.profileData.distance)){
           var distance = this.distance(this.profileData.lat,this.profileData.lng,this.profileData.lat_1,this.profileData.lng_1,this.profileData.distance);
          // alert(Math.trunc(distance));
          this.total_distance = Math.trunc(distance);
        }

        if(this.profileData.couple_profile_gender_from == '1'){
          this.person_1_input_color = 'input-orange-bg';
          this.person_1_text_color ='text-orange';
        }
        if(this.profileData.couple_profile_gender_from == '2'){
          this.person_1_input_color = 'input-maroon-bg';
          this.person_1_text_color ='text-maroon';
        }
        if(this.profileData.couple_profile_gender_from == '3'){
          this.person_1_input_color = 'input-orange-maroon-bg';
          this.person_1_text_color ='text-orange-maroon';
        }

        if(this.profileData.couple_profile_gender_to == '1'){
          this.person_2_input_color = 'input-orange-bg';
          this.person_2_text_color ='text-orange';
        }
        if(this.profileData.couple_profile_gender_to == '2'){
          this.person_2_input_color = 'input-maroon-bg';
          this.person_2_text_color ='text-maroon';
        }
        if(this.profileData.couple_profile_gender_to == '3'){
          this.person_2_input_color = 'input-orange-maroon-bg';
          this.person_2_text_color ='text-orange-maroon';
        }


        // alert(this.profileData.person1_body_hair);
        setTimeout(() => {

          const apiResponseLanguage1 = { selectedValues: this.profileData.person1_language_spoken };
          const selectedIdsLangualge1 = apiResponseLanguage1.selectedValues.split(',');
          console.log('selectedIdsLangualge1',selectedIdsLangualge1);
          this.profile_details.controls['person1_language_spoken'].setValue(selectedIdsLangualge1);

          const apiResponseLanguage2 = { selectedValues: this.profileData.person2_language_spoken };
          const selectedIdsLangualge2 = apiResponseLanguage2.selectedValues.split(',');
          this.profile_details.controls['person2_language_spoken'].setValue(selectedIdsLangualge2);


          const apiResponseBodyHair1 = { selectedValues: this.profileData.person1_body_hair };
          const selectedIdsBodyHair1 = apiResponseBodyHair1.selectedValues.split(',');
          this.profile_details.controls['person1_body_hair'].setValue(selectedIdsBodyHair1);

           const apiResponseBodyHair2 = { selectedValues: this.profileData.person2_body_hair };
          const selectedIdsBodyHair2 = apiResponseBodyHair2.selectedValues.split(',');
          this.profile_details.controls['person2_body_hair'].setValue(selectedIdsBodyHair2);



          this.profile_details.controls['text'].setValue(this.profileData.text);
          this.profile_details.controls['comment'].setValue(this.profileData.comment);
          this.profile_details.controls['person1_dob'].setValue(this.profileData.person1_dob);
          this.profile_details.controls['person1_name'].setValue(this.profileData.person1_name);
          // this.profile_details.controls['person1_body_hair'].setValue(this.profileData.person1_body_hair);
          this.profile_details.controls['person1_height'].setValue(this.profileData.person1_height);
          this.profile_details.controls['person1_weight'].setValue(this.profileData.person1_weight);
          this.profile_details.controls['person1_body_type'].setValue(this.profileData.person1_body_type);
          this.profile_details.controls['person1_ethnic_background'].setValue(this.profileData.person1_ethnic_background);
          this.profile_details.controls['person1_smoking'].setValue(this.profileData.person1_smoking);
          this.profile_details.controls['person1_drinking'].setValue(this.profileData.person1_drinking);
          this.profile_details.controls['person1_piercings'].setValue(this.profileData.person1_piercings);
          this.profile_details.controls['person1_tattoos'].setValue(this.profileData.person1_tattoos);
          // this.profile_details.controls['person1_language_spoken'].setValue(this.profileData.person1_language_spoken);
          this.profile_details.controls['person1_circumcised'].setValue(this.profileData.person1_circumcised);
          this.profile_details.controls['person1_intelligence_importance'].setValue(this.profileData.person1_intelligence_importance);
          this.profile_details.controls['person1_sexuality'].setValue(this.profileData.person1_sexuality);
          this.profile_details.controls['person1_relationship_orientation'].setValue(this.profileData.person1_relationship_orientation);
          
          this.profile_details.controls['person2_dob'].setValue(this.profileData.person2_dob);
          this.profile_details.controls['person2_name'].setValue(this.profileData.person2_name);
          // this.profile_details.controls['person2_body_hair'].setValue(this.profileData.person2_body_hair);
          this.profile_details.controls['person2_height'].setValue(this.profileData.person2_height);
          this.profile_details.controls['person2_weight'].setValue(this.profileData.person2_weight);
          this.profile_details.controls['person2_body_type'].setValue(this.profileData.person2_body_type);
          this.profile_details.controls['person2_ethnic_background'].setValue(this.profileData.person2_ethnic_background);
          this.profile_details.controls['person2_smoking'].setValue(this.profileData.person2_smoking);
          this.profile_details.controls['person2_drinking'].setValue(this.profileData.person2_drinking);
          this.profile_details.controls['person2_piercings'].setValue(this.profileData.person2_piercings);
          this.profile_details.controls['person2_tattoos'].setValue(this.profileData.person2_tattoos);
          // this.profile_details.controls['person2_language_spoken'].setValue(this.profileData.person2_language_spoken);
          this.profile_details.controls['person2_circumcised'].setValue(this.profileData.person2_circumcised);
          this.profile_details.controls['person2_intelligence_importance'].setValue(this.profileData.person2_intelligence_importance);
          this.profile_details.controls['person2_sexuality'].setValue(this.profileData.person2_sexuality);
          this.profile_details.controls['person2_relationship_orientation'].setValue(this.profileData.person2_relationship_orientation);
          

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

    this.callapi.get('/user/get_all_album').subscribe(result1 => {
       if ((result1.status == 200) || (result1.status === '200')) {
          this.allAlbumData = result1.data;
        } else {
           this.allAlbumData = '';
        }
    });

    this.callapi.get('/user/get_all_pending_album_image').subscribe(result1 => {
       if ((result1.status == 200) || (result1.status === '200')) {
          this.allPendingAlbumData = result1.data;
        } else {
           this.allPendingAlbumData = '';
        }
    });

    this.callapi.get('/user/get_all_approve_album_image').subscribe(result1 => {
       if ((result1.status == 200) || (result1.status === '200')) {
          this.allApproveAlbumData = result1.data;
        } else {
           this.allApproveAlbumData = '';
        }
    });
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
              'text': data.text,
              'comment': data.comment,
              
              'person1_name':data.person1_name,
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
              'person1_language_spoken': data.person1_language_spoken,
              'person1_circumcised': data.person1_circumcised,
              'person1_smoking':data.person1_smoking,
              'person1_drinking':data.person1_drinking,
              'person1_intelligence_importance': data.person1_intelligence_importance,
              'person1_sexuality': data.person1_sexuality,
              'person1_relationship_orientation': data.person1_relationship_orientation,
              'person1_looks_important': data.person1_looks_important,
              'person2_name':data.person2_name,
              'person2_dob': data.person2_dob,
              'person2_body_hair': data.person2_body_hair,
              'person2_height': data.person2_height,
              'person2_weight': data.person2_weight,
              'person2_body_type': data.person2_body_type,
              'person2_ethnic_background': data.person2_ethnic_background,
              'person2_piercings': data.person2_piercings,
              'person2_tattoos': data.person2_tattoos,
              'person2_language_spoken': data.person1_language_spoken,
              'person2_circumcised': data.person2_circumcised,
              'person2_smoking':data.person2_smoking,
              'person2_drinking':data.person2_drinking,
              'person2_intelligence_importance': data.person2_intelligence_importance,
              'person2_sexuality': data.person2_sexuality,
              'person2_relationship_orientation': data.person2_relationship_orientation,
              'person2_looks_important': data.person2_looks_important,
              
           }
            
            $('#preloader').show();
            this.callapi.post('/user/edit_couple_profile_details', this.regData).subscribe(result => {
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
    $('#preloader').show();
    this.callapi.post('/upload/imageupload', obj).subscribe(result => {
       
        this.data = result;
        if ((this.data.status == 200) || (this.data.status === '200')) {

          this.profile_image =this.data.data;
          var obj1={
            'image':this.profile_image
          }

           this.callapi.post('/user/upload_profile_image', obj1).subscribe(result1 => {
            $('#preloader').hide();
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
        // alert(maxDate);
      // $('#person1_dob_new').attr('max', maxDate);
      this.maxDate1 = maxDate;
      this.maxDate2 = maxDate;
  }

  openDatePicker(event: any) {
    event.target.showPicker();
  }

  public showPersonName(){
    if($('#person_name').hasClass('read_only')){
      $('#person_name').removeClass('read_only');
    }else{
      $('#person_name').addClass('read_only');
    }
  }
   public showPersonName2(){
    if($('#person_name2').hasClass('read_only')){
      $('#person_name2').removeClass('read_only');
    }else{
      $('#person_name2').addClass('read_only');
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
      $('#preloader').show();
       this.callapi.post('/user/delete_profile_image',obj).subscribe(result1 => {
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
    $('#preloader').show();
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
              $('#preloader').hide();
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
    this.selectedFile = event.target.files[0];
    if(this.selectedFile){
       this.videoupload();
    }
  }

  public videoupload(){

    const formData = new FormData();
    formData.append('video', this.selectedFile, this.selectedFile.name);
    
    $('#preloader').show();
    
      this.http.post(this.serverUrl+'/upload/video_upload', formData).subscribe((result:any) =>{

        if ((result.status == 200) || (result.status === '200')) {
           this.uploaded_video_name = result.data.file_name;
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
        }else{
          $('#preloader').hide();
          this.toastr.errorToastr(result.message, 'Error!');
        }
        // console.log('Video uploaded successfully!', result);
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


   public createAlbum(){
    $('#addAlbumPopup').modal('show');
  }

  public editAlbum(album_id){

    $('#preloader').show();
    this.upload_album_id = album_id;

    var newobj={
      'album_id':this.upload_album_id
    }
    $('#preloader').show();
    this.callapi.post('/user/get_album_details',newobj).subscribe(result1 => {
          $('#preloader').hide();
          if ((result1.status == 200) || (result1.status === '200')) {
            $('#editAlbumPopup').modal('show');
              this.album_details = result1.data;
          } else {
           this.album_details = '';
          }
        },err => {
          $('#preloader').hide();
        });


    
  }  

  public cancelPopup(popupname){
    $('#'+popupname).modal('hide');
  }

  public saveAlbum(){
    var album_name =$('#album_name').val();
    var album_password =$('#album_password').val();
    if(album_name == ''){
      this.toastr.errorToastr('Enter album name', 'Error!');
    }else if(album_password ==''){
      this.toastr.errorToastr('Enter album password', 'Error!');
    }else{

        var albumobj={
          'album_name':album_name,
          'album_password':album_password
        };
        $('#preloader').show();
        this.callapi.post('/user/create_profile_album',albumobj).subscribe(result1 => {
          $('#preloader').hide();
          this.data = result1;
          if ((result1.status == 200) || (result1.status === '200')) {
            this.toastr.successToastr(this.data.message, 'Success!');
            $('#addAlbumPopup').modal('hide');
            this.getProfileData();
          } else {
            this.toastr.errorToastr(this.data.message, 'Error!');
          }
        },err => {
          $('#preloader').hide();
        });
    }
  }

  public updateAlbum(){
    var album_name_edit =$('#album_name_edit').val();
    var album_password_edit =$('#album_password_edit').val();
    if(album_name_edit == ''){
      this.toastr.errorToastr('Enter album name', 'Error!');
    }else if(album_password_edit ==''){
      this.toastr.errorToastr('Enter album password', 'Error!');
    }else{
      $('#preloader').show();
        var albumobj={
          'album_name':album_name_edit,
          'album_password':album_password_edit,
          'album_id':this.upload_album_id
        };
        this.callapi.post('/user/update_profile_album',albumobj).subscribe(result1 => {
          $('#preloader').hide();
          this.data = result1;
          if ((result1.status == 200) || (result1.status === '200')) {
            this.toastr.successToastr(this.data.message, 'Success!');
            $('#editAlbumPopup').modal('hide');
            this.getProfileData();
          } else {
            this.toastr.errorToastr(this.data.message, 'Error!');
          }
        },err => {
          $('#preloader').hide();
        });
    }
  }

 public viewAlbum(id){
   // alert(id);
   var obe={
     'album_id':id
   }
   $('#add_album').hide();
   $('#list_album').hide();
   $('#view_album').show();
   $('#preloader').show();
    this.callapi.post('/user/get_album_image',obe).subscribe(result1 => {
          $('#preloader').hide();
          if ((result1.status == 200) || (result1.status === '200')) {
              this.allAlbumImageData = result1.data;
          } else {
           this.allAlbumImageData = '';
          }
        },err => {
          $('#preloader').hide();
        });

 }

 public deleteAlbum(id){

   var result = confirm("Are you sure Want to delete?");
      if (result==true) 
      {
       
         var obe={
          'album_id':id
         }
         $('#preloader').show();
         this.callapi.post('/user/delete_album',obe).subscribe(result1 => {
              $('#preloader').hide();
              if ((result1.status == 200) || (result1.status === '200')) {
                this.getProfileData();  
              } else {
                this.getProfileData();
              }
            },err => {
              $('#preloader').hide();
            });

      } else {
       return false;
      }

   

 }

 public backAlbumAll(){
   $('#view_album').hide();
   $('#add_album').show();
   $('#list_album').show();
   
 }

 public uploadAlbumImage(album_id){
   this.upload_album_id = album_id;
   
   $('#album_image').show();
   $('#add_album').hide();
   $('#list_album').hide();

 }

 public uploadAlbumVideo(album_id){
   this.upload_album_id = album_id;
   
   $('#album_video').show();
   $('#add_album').hide();
   $('#list_album').hide();

 }

public backAlbumUploadImage(){
   $('#album_image').hide();
   $('#add_album').show();
   $('#list_album').show();
 }

public backAlbumUploadVideo(){
   $('#album_video').hide();
   $('#add_album').show();
   $('#list_album').show();
 }


// Album multiple image upload

 fileChangeEventAlbumImage(event: any): void {
  if (event.target.files.length > 6) {
       this.toastr.errorToastr('Maximum 5 images accepted', 'Error!');
    }else{
      $('#profileModalAlbumImage').modal('show');
        for (var i = 0; i < event.target.files.length; i++) {
          this.imageProcessAlbumImage(event, event.target.files[i]);
        }
    }
}

 imageProcessAlbumImage(event: any, file: any) {
  //Setting images in our required format
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    this.imgIdAlbumImage = this.imgIdAlbumImage + 1;
    var event = {
      target: {
        files: [file]
      }
    };
    this.imageChangedEventAlbumImage = event;
    this.currentProcessingImgAlbumImage = this.imgIdAlbumImage;

    this.ulpoadedFilesAlbumImage.push({ imgId: this.imgIdAlbumImage, imgBase64: reader.result, imgFile: file });
  };
}

cropImageAlbumImage(imgId) {

  this.currentProcessingImgAlbumImage = imgId;
  var imgObj = this.ulpoadedFilesAlbumImage.find(x => x.imgId === imgId);
  //created dummy event Object and set as imageChangedEvent so it will set cropper on this image 
  var event = {
    target: {
      files: [imgObj.imgFile]
    }
  };
  this.imageChangedEventAlbumImage = event;
}

//Save Cropped Image locally
SaveCropedImageAlbumImage() {
  console.log(this.ulpoadedFilesAlbumImage);
  console.log(this.currentProcessingImgAlbumImage);
  var imgObj = this.ulpoadedFilesAlbumImage.find(x => x.imgId === this.currentProcessingImgAlbumImage);
  imgObj.imgBase64 = this.croppedImageAlbumImage;
  
}

SaveAllImagesAlbumImage() {
  $('#preloader').show();
  this.finalImageListAlbumImage =[];
 this.ulpoadedFilesAlbumImage.forEach(imgObject => {
    this.finalImageListAlbumImage.push({
    image: imgObject.imgBase64,
   });

})

 var obj ={
      'image':this.finalImageListAlbumImage
    }
    $('#preloader').show();
    this.callapi.post('/upload/imageuploadMultiple', obj).subscribe(result => {
       $('#preloader').hide();
        this.data = result;
        if ((this.data.status == 200) || (this.data.status === '200')) {

            this.multiple_image_data = result.data;
             for (let image of this.multiple_image_data) {
                  var obj ={
                  'image':image.image_name,
                  'album_id':this.upload_album_id
                }
                this.callapi.post('/user/single_user_mutiple_album_image', obj).subscribe(result => {
                   $('#preloader').hide();
                    this.data = result;
                    if ((this.data.status == 200) || (this.data.status === '200')) {
                      this.toastr.successToastr(this.data.message, 'Success!');
                      this.getProfileData();
                      $('#profileModalAlbumImage').modal('hide') ;
                       $('#album_image').hide();
                       $('#add_album').show();
                       $('#list_album').show(); 
                     
                   } else {
                      $('#preloader').hide();
                      this.toastr.errorToastr(this.data.message, 'Error!');
                      
                    }
                  },err => {
                    $('#preloader').hide();
                  });
             }//this is causing error
         
       } else {
          $('#preloader').hide();
          this.toastr.errorToastr(this.data.message, 'Error!');
          
        }
      },err => {
        $('#preloader').hide();
      });

// alert(this.finalImageList[0].image);
  console.log('final_image',this.finalImageListAlbumImage);
}

imageCroppedAlbumImage(event: ImageCroppedEvent) {
  this.croppedImageAlbumImage = event.base64;
}


// album vide

 public onSelectAlbumVideo(event) {
   // alert();
    this.selectedFileAlbumVideo = event.target.files[0];
      if(this.selectedFileAlbumVideo){
         this.videouploadalbum();
      }
  }

  public videouploadalbum(){

    const formData = new FormData();
    formData.append('video', this.selectedFileAlbumVideo, this.selectedFileAlbumVideo.name);
    // alert('1');
    $('#preloader').show();
    
      this.http.post(this.serverUrl+'/upload/video_upload', formData).subscribe((result:any) =>{

        if ((result.status == 200) || (result.status === '200')) {
           this.uploaded_video_name = result.data.file_name;
            var obj1 ={
                'video':this.uploaded_video_name,
                'album_id':this.upload_album_id
              }
            this.callapi.post('/user/upload_profile_album_video', obj1).subscribe(result => {
                $('#preloader').hide();
                this.data = result;
                if ((this.data.status == 200) || (this.data.status === '200')) {

                  this.toastr.successToastr(this.data.message, 'Success!');
                   this.getProfileData();
                    $('#album_video').hide();
                   $('#add_album').show();
                   $('#list_album').show();
                } else {
                  $('#preloader').hide();
                  this.toastr.errorToastr(this.data.message, 'Error!');
                  
                }
              },err => {
                $('#preloader').hide();
              });
        }else{
          $('#preloader').hide();
          this.toastr.errorToastr(result.message, 'Error!');
        }
        // console.log('Video uploaded successfully!', result);
      },err => {
       $('#preloader').hide();
     });
   
  }

    public selectHeight1(val){
    this.height1_type = val;
   //  if(this.height1_type == 'FT'){
   //    $('#person1_height_ft').css('display','block');
   //   $('#person1_height_cm').css('display','none');
     
   // }else{
   //   $('#person1_height_ft').css('display','none');
   //   $('#person1_height_cm').css('display','block');
    
   //  }

  }

  public selectHeight2(val){
    this.height2_type = val;
   //  if(this.height2_type == 'FT'){
   //    $('#person2_height_ft').css('display','block');
   //   $('#person2_height_cm').css('display','none');
     
   // }else{
   //   $('#person2_height_ft').css('display','none');
   //   $('#person2_height_cm').css('display','block');
    
   //  }
  }

  public selectWeight1(val){
    this.weight1_type = val;
   //  if(this.weight1_type == 'LBS'){
   //    $('#person1_weight_lbs').css('display','block');
   //    $('#person1_weight_kg').css('display','none');
     
   // }else{
   //   $('#person1_weight_lbs').css('display','none');
   //   $('#person1_weight_kg').css('display','block');
    
   //  }
  }

  public selectWeight2(val){
    this.weight2_type = val;
   //  if(this.weight2_type == 'LBS'){
   //    $('#person2_weight_lbs').css('display','block');
   //   $('#person2_weight_kg').css('display','none');
     
   // }else{
   //   $('#person2_weight_lbs').css('display','none');
   //   $('#person2_weight_kg').css('display','block');
    
   //  }
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

  public initMap()
  {
     var input = document.getElementById("address");
    
      var autocomplete = new google.maps.places.Autocomplete(input);
      var autocompleteListener = google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        console.log(place);
          
         var lat = place.geometry.location.lat();
         var lng = place.geometry.location.lng();

         var city_name = place.name;
         var place_id = place.place_id;
         var map_url = place.url;
         var formatted_address = place.formatted_address;
          
          $('#lat').val(lat);
          $('#lng').val(lng);
          $('#city_name').val(city_name);
          $('#place_id').val(place_id);
          $('#map_url').val(map_url);
          $('#formatted_address').val(formatted_address);
          // $('#submit_button').prop('disabled', false);
      });
  }

  public initMap1()
  {
     var input = document.getElementById("address_1");
    
      var autocomplete = new google.maps.places.Autocomplete(input);
      var autocompleteListener = google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        console.log(place);
          
         var lat = place.geometry.location.lat();
         var lng = place.geometry.location.lng();

         var city_name = place.name;
         var place_id = place.place_id;
         var map_url = place.url;
         var formatted_address = place.formatted_address;
          
          $('#lat_1').val(lat);
          $('#lng_1').val(lng);
          $('#city_name_1').val(city_name);
          $('#place_id_1').val(place_id);
          $('#map_url_1').val(map_url);
          $('#formatted_address_1').val(formatted_address);
          // $('#submit_button').prop('disabled', false);
      });
  }

  public setLocation() {
    
    // this.submitted = true;
    const data = this.location_form.value;

    console.log(data);

    var lat = $('#lat').val();
    var lng = $('#lng').val();
    var city_name = $('#city_name').val();
    var place_id = $('#place_id').val();
    var map_url = $('#map_url').val();
    var formatted_address = $('#formatted_address').val();

    var lat_1 = $('#lat_1').val();
    var lng_1 = $('#lng_1').val();
    var city_name_1 = $('#city_name_1').val();
    var place_id_1 = $('#place_id_1').val();
    var map_url_1 = $('#map_url_1').val();
    var formatted_address_1 = $('#formatted_address_1').val();
    
    if (this.location_form.valid) 
    {
        
        this.submitted = false;
        
          this.regData = {
            'distance': data.distance,
            'lat': lat,
            'lng': lng,
            'city_name': city_name,
            'place_id': place_id,
            'map_url': map_url,
            'formatted_address': formatted_address,
            'lat_1': lat_1,
            'lng_1': lng_1,
            'city_name_1': city_name_1,
            'place_id_1': place_id_1,
            'map_url_1': map_url_1,
            'formatted_address_1': formatted_address_1,
          }
                
                $('#preloader').show();
                this.callapi.post('/location/update_location', this.regData).subscribe(result => {
                 $('#preloader').hide();
                  this.data = result;
                  if ((this.data.status == 200) || (this.data.status === '200')) {

                    this.toastr.successToastr(this.data.message, 'Success!');
                    this.getProfileData();
                    // this.tokenSaveService.saveAccessToken(this.data.data.token, this.data.data.sign);
                    // this.tokenSaveService.saveProfileType(this.data.data.profile_type);
                    //  if(this.data.data.profile_type == 'single'){
                    //    this.router.navigateByUrl('/single-profile');
                    //  }

                    // if(this.data.data.profile_type == 'couple'){
                    //    this.router.navigateByUrl('/couple-profile');
                    //  }                 

                   //  this.submitted = false;
                  } else {
                    $('#preloader').hide();
                    this.toastr.errorToastr(this.data.message, 'Error!');
                    
                  }
                },err => {
                  $('#preloader').hide();
                });
          }else{
            this.toastr.errorToastr('The username is already used.', 'Error!');
            // this.tokenSaveService.saveCookie('single');
          }
    
    
  }

   public setProfilePicture(image_id){
    // alert(image_id);
    var obj={
      "image_id": image_id
    }

     $('#preloader').show();
      this.callapi.post('/user/update_set_profile_image', obj).subscribe(result => {
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

  }

  
}
