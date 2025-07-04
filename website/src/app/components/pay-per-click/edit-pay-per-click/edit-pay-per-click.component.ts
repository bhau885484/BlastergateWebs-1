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

import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { environment } from '../../../../environments/environment';


declare const $: any;
declare const google: any;
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-edit-pay-per-click',
  templateUrl: './edit-pay-per-click.component.html',
  styleUrls: ['./edit-pay-per-click.component.css']
})
export class EditPayPerClickComponent implements OnInit {

  public profileData;
 
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public factory_form: FormGroup;
  public submitted = false;
  public calender_form: FormGroup;
  public submitted1 = false;
 

  public emailotp;

  public infoText;
  public profile_type='private';
  public selected_date;

  public pay_per_terms_condition;
  public bbc_type ='yes';
  public preferencesValue='';
  public profileControlValue='';
  public preferencesArray=[];
  public profileControlArray=[];

  public addFormFlag:boolean=false;
  public pay_per_id;

  public singleChocolateData;
  public profileDataMeImage;

  public show_face_picture;
  public show_shirtless_picture;
  public show_full_body_picture;
  public show_validation_picture;
  public pay_per_type;
  public calender_details;

  imgChangeEvtProfile: any = "";
  cropImgPreviewProfile: any = "";
  public profile_image='';

  public profileDataPendingImage;
  public profileDataApproveImage;
  public profileDataPendingVideo;
  public profileDataApproveVideo;

  imgChangeEvtProfileEdit: any = "";
  cropImgPreviewProfileEdit: any = "";

  public edit_image_id;
  public videouUrl;

  public uploaded_video_name;
  public allAlbumData;
  public allAlbumImageData
  public upload_album_id;

  public selectedFile: File = null;
  public selectedFileAlbumVideo: File = null;
  public serverUrl;
  public view_image;
  public chocolate_factory_paid_image_id;
  public chocolate_factory_paid_video_id;
  public paymentAllData;
  public paymentData;

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,private activatedRoute: ActivatedRoute,private http: HttpClient)
  { 
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {

    this.serverUrl = environment.api_url;

    $('#preloader').hide();
    this.pay_per_id = atob(this.activatedRoute.snapshot.queryParams["id"]);
    this.pay_per_type = atob(this.activatedRoute.snapshot.queryParams["type"]);

    if(this.activatedRoute.snapshot.queryParams["chocolate_factory_paid_image_id"]){
      this.chocolate_factory_paid_image_id = atob(this.activatedRoute.snapshot.queryParams["chocolate_factory_paid_image_id"]);
    }else{
      this.chocolate_factory_paid_image_id = 0;
    }

    if(this.activatedRoute.snapshot.queryParams["chocolate_factory_paid_video_id"]){
      this.chocolate_factory_paid_video_id = atob(this.activatedRoute.snapshot.queryParams["chocolate_factory_paid_video_id"]);
    }else{
      this.chocolate_factory_paid_video_id = 0;
    }

    // alert(this.chocolate_factory_paid_video_id);
    
    this.getSingleChocolateFactory(this.pay_per_id);
    this.getCalenderDetails(this.pay_per_id);
    this.getProfileData(this.pay_per_id);

      setTimeout(() => {
           this.initMap();
       }, 5000);

     this.factory_form = this.formBuilder.group({
       state_of_residence: new FormControl('', [Validators.required]),
       contact_number: new FormControl('', [Validators.required, MobilePatternValidator(/^(?=.*[0-9]).{8,15}$/), Validators.minLength(8), Validators.maxLength(15)]),
       updated_email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
       screen_name: new FormControl('', [Validators.required]),
       life_style_nickname: new FormControl('', [Validators.required]),
       life_style_website: new FormControl('', [Validators.required]),
       age: new FormControl('', [Validators.required]),
       height_feet: new FormControl('', [Validators.required]),
       height_inch: new FormControl(''),
       weight: new FormControl('', [Validators.required]),
       self_description: new FormControl(''),
       face_picture: new FormControl('', [Validators.required]),
       shirtless_picture: new FormControl('', [Validators.required]),
       full_body_picture: new FormControl('', [Validators.required]),
       validation_picture: new FormControl('', [Validators.required]),
        
    });


    this.calender_form = this.formBuilder.group({
       username: new FormControl('', [Validators.required]),
       calender_date: new FormControl('', [Validators.required]),
       start_time: new FormControl('', [Validators.required]),
       end_time: new FormControl('', [Validators.required]),
      
    }); 

    
    
 }

 
  get f() {
    return this.factory_form.controls;
  }

  get f1() {
    return this.calender_form.controls;
  }

  

  public getCalenderDetails(pay_per_id){

   var obj={
     "pay_per_id":pay_per_id
   }
    this.callapi.post('/payperclick/get_calender_details',obj).subscribe(data => {
       $('#preloader').hide();
       if(data.status == 200){
          this.calender_details = data.data;
           
        }else{
          this.calender_details = '';
          
         
        }
    }); 
  }

  public getSingleChocolateFactory(pay_per_id){

   var obj={
     "id":pay_per_id
   }
    this.callapi.post('/payperclick/get_single_chocolate_factory',obj).subscribe(data => {
       $('#preloader').hide();
       if(data.status == 200){
          this.singleChocolateData = data.data[0];
          this.profileDataMeImage = this.singleChocolateData.image[0].profile_image;

          setTimeout(() => {


            if(this.pay_per_type == 'profile'){
                $('.nav-link-tab').removeClass('active');
                $('#pills-profile-tab').addClass('active');

                $('.nav-link-del').removeClass('active');
                $('.nav-link-del').removeClass('show');
                $('#pills-profile').addClass('active');
                $('#pills-profile').addClass('show');
                
              }



              if(this.pay_per_type == 'calender'){
               
                $('.nav-link-tab').removeClass('active');
                $('#pills-cal-tab').addClass('active');

                $('.nav-link-del').removeClass('active');
                $('.nav-link-del').removeClass('show');

                $('#pills-cal').addClass('active');
                $('#pills-cal').addClass('show');
                
              }

              if(this.pay_per_type == 'photo'){
                $('.nav-link-tab').removeClass('active');
                $('#pills-photos-tab').addClass('active');

                $('.nav-link-del').removeClass('active');
                $('.nav-link-del').removeClass('show');
                $('#pills-photos').addClass('active');
                $('#pills-photos').addClass('show');
                
              }

              if(this.pay_per_type == 'video'){
                $('.nav-link-tab').removeClass('active');
                $('#pills-videos-tab').addClass('active');

                $('.nav-link-del').removeClass('active');
                $('.nav-link-del').removeClass('show');
                // alert();

                $('#pills-videos').addClass('active');
                $('#pills-videos').addClass('show');
                
              }
    
          this.factory_form.controls['state_of_residence'].setValue(this.singleChocolateData.state_of_residence);
          this.factory_form.controls['contact_number'].setValue(this.singleChocolateData.contact_number);
          this.factory_form.controls['updated_email'].setValue(this.singleChocolateData.updated_email);
          this.factory_form.controls['screen_name'].setValue(this.singleChocolateData.screen_name);
          this.factory_form.controls['life_style_nickname'].setValue(this.singleChocolateData.life_style_nickname);
          this.factory_form.controls['life_style_website'].setValue(this.singleChocolateData.life_style_website);
          this.factory_form.controls['age'].setValue(this.singleChocolateData.age);
          this.factory_form.controls['height_feet'].setValue(this.singleChocolateData.height_feet);
          this.factory_form.controls['height_inch'].setValue(this.singleChocolateData.height_inch);
          this.factory_form.controls['weight'].setValue(this.singleChocolateData.weight);
          this.factory_form.controls['self_description'].setValue(this.singleChocolateData.self_description);
         
          this.factory_form.controls['face_picture'].setValue(this.singleChocolateData.face_picture_img);
          this.factory_form.controls['shirtless_picture'].setValue(this.singleChocolateData.shirtless_picture_img);
          this.factory_form.controls['full_body_picture'].setValue(this.singleChocolateData.full_body_picture_img);
          this.factory_form.controls['validation_picture'].setValue(this.singleChocolateData.validation_picture_img);
          

          this.profileControlArray = this.singleChocolateData.profile_control;
          this.preferencesArray = this.singleChocolateData.preferences;

          this.show_face_picture = this.singleChocolateData.face_picture;
          this.show_shirtless_picture = this.singleChocolateData.shirtless_picture;
          this.show_full_body_picture = this.singleChocolateData.full_body_picture;
          this.show_validation_picture = this.singleChocolateData.validation_picture;


          $('#lat').val(this.singleChocolateData.lat);
          $('#lng').val(this.singleChocolateData.lng);
          $('#city_name').val(this.singleChocolateData.city_name);
          $('#formatted_address').val(this.singleChocolateData.state_of_residence);

        }, 500);


          
          // $('#viewSubmittionMessageModal').modal('hide');
          
        }else{
          this.singleChocolateData = '';
         
         
        }
    }); 
  }

 

 public selectBBC(val){

    this.bbc_type = val;
   
   if(this.bbc_type == 'yes'){
     this.bbc_type = val;
   }else{
     
     this.bbc_type = 'yes';
     $('#addChocolateFormModal').modal('hide');
    }
  
 }



public selectPreferences(unitObject,value){
  
    if(value == true){
      this.preferencesArray.push(unitObject)
    }else{
      const index: number = this.preferencesArray.indexOf(unitObject);
      this.preferencesArray.splice(index, 1);
    }
    console.log('preferencesArray',this.preferencesArray);
}

public selectProfileControl(unitObject,value){
    if(value == true){
      this.profileControlArray.push(unitObject)
    }else{
      const index: number = this.profileControlArray.indexOf(unitObject);
      this.profileControlArray.splice(index, 1);
    }
    console.log('profileControlArray',this.profileControlArray);
}



public onUpdateProfile() {
    
    const data = this.factory_form.value;
    console.log(data);

  
    if (this.factory_form.valid) 
    {
        
        var error = 1;

        var lat = $('#lat').val();
        var lng = $('#lng').val();
        var city_name = $('#city_name').val();
        var formatted_address = $('#formatted_address').val();

          
        if(this.preferencesArray.length == 0){
          error = 0;
          this.toastr.errorToastr('Please select preferences', 'Error!');

        }else{
          error = 1;
        }
        if(this.profileControlArray.length == 0){
          error = 0;
          this.toastr.errorToastr('Please select profile control', 'Error!');
        }else{
          error = 1;
        }

        if(data.age <= 18){
          error = 0;
          this.toastr.errorToastr('Age 18+ reqiuired', 'Error!');
        }else{
          error = 1;
        }

            // alert(error);
           if(error == 1){

             this.regData = {
              'bbc_type': this.bbc_type,
              'preferences': this.preferencesArray,
              'profile_control': this.profileControlArray,
              'state_of_residence': formatted_address,
              'contact_number': data.contact_number,
              'updated_email': data.updated_email,
              'screen_name': data.screen_name,
              'life_style_nickname': data.life_style_nickname,
              'life_style_website': data.life_style_website,
              'age': data.age,
              'height_inch': data.height_inch,
              'height_feet': data.height_feet,
              'weight': data.weight,
              'self_description': data.self_description,
              'face_picture': data.face_picture,
              'shirtless_picture': data.shirtless_picture,
              'full_body_picture': data.full_body_picture,
              'validation_picture': data.validation_picture,
              'lat': lat,
              'lng': lng,
              'city_name': city_name,
              'id':this.pay_per_id
              
             
            }

              $('#preloader').show();
              this.callapi.post('/payperclick/update_chocolate_data', this.regData).subscribe(result => {
               $('#preloader').hide();
                this.data = result;
                if ((this.data.status == 200) || (this.data.status === '200')) {

                  this.toastr.successToastr(this.data.message, 'Success!');
                 this.router.navigate(['/view-pay-per-click']);
                 
                } else {
                  $('#preloader').hide();
                  this.toastr.errorToastr(this.data.message, 'Error!');
                  
                }
              },err => {
                $('#preloader').hide();
              });

           }
        
        }else{
          // this.toastr.errorToastr('The username is already used.', 'Error!');
          // // this.tokenSaveService.saveCookie('single');
          this.submitted = true;
         return;
        }
}


public addCalander() {
    
    const data = this.calender_form.value;
    console.log(data);
    if (this.calender_form.valid) 
    {
      
        this.regData = {
            'pay_per_id': this.pay_per_id,
            'username': data.username,
            'calender_date': data.calender_date,
            'start_time': data.start_time,
            'end_time': data.end_time,
            'start_time_12_formate': this.time12_start_time,
            'end_time_12_formate': this.time12_end_time,
          }

          $('#preloader').show();
          this.callapi.post('/payperclick/add_calender_data', this.regData).subscribe(result => {
           $('#preloader').hide();
            this.data = result;
            if ((this.data.status == 200) || (this.data.status === '200')) {
                this.toastr.successToastr(this.data.message, 'Success!');
               this.getCalenderDetails(this.pay_per_id);
             
            } else {
              $('#preloader').hide();
              this.toastr.errorToastr(this.data.message, 'Error!');
              
            }
          },err => {
            $('#preloader').hide();
          });

           
        
        }else{
          this.submitted1 = true;
         return;
        }
    
    
  }



  


  onFileChange(event: Event,type): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        
        var obj ={
          'image':reader.result
        }
      $('#preloader').show();
      this.callapi.post('/upload/imageupload', obj).subscribe(result => {
      
        if ((result.status == 200) || (result.status === '200')) {
           $('#preloader').hide();
          this.toastr.successToastr(result.message, 'Success!');
          if(type=='1'){
             this.factory_form.controls["face_picture"].setValue(result.data);
          }
          if(type=='2'){
             this.factory_form.controls["shirtless_picture"].setValue(result.data);
         }
          if(type=='3'){
            this.factory_form.controls["full_body_picture"].setValue(result.data);
          }
          if(type=='4'){
            this.factory_form.controls["validation_picture"].setValue(result.data);
          }
        
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


 public initMap()
  {
     var input = document.getElementById("state_of_residence");
     
    
      var autocomplete = new google.maps.places.Autocomplete(input);
      console.log(autocomplete);
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
          $('#formatted_address').val(formatted_address);
          // $('#submit_button').prop('disabled', false);
      });
  }


   public checkUserName(obj) {
      $('#preloader').show();
      this.callapi.get('/membership/check_username_membership/' + obj).subscribe(result => {
        
        $('#preloader').hide();
        if((result.status === '200')) 
        {
          this.toastr.successToastr("You are a member of Blaster Gate",'Success!');
        }else{
          this.toastr.errorToastr("You are not a member of Blaster Gate",'Error!');
          this.calender_form.controls['username'].setValue('');
        } 

      }, err => {
        
      });
    
  }

  
  time12_start_time: string = '';
  time12_end_time: string = '';

  convertStartTimeTo12HourFormat() {
    const time24_start_time = this.calender_form.get('start_time')?.value;
    if (!time24_start_time) return;

    // Split the 24-hour time into hours and minutes
    const [hours, minutes] = time24_start_time.split(':');
    let hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hour = hour % 12 || 12; // Convert '0' hour to '12' for 12-hour format

    // Format hours and minutes with AM/PM
    this.time12_start_time = `${hour}:${minutes} ${suffix}`;
    console.log(this.time12_start_time);
  }

  convertEndTimeTo12HourFormat() {
    const time24_end_time = this.calender_form.get('end_time')?.value;
    if (!time24_end_time) return;

    // Split the 24-hour time into hours and minutes
    const [hours, minutes] = time24_end_time.split(':');
    let hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hour = hour % 12 || 12; // Convert '0' hour to '12' for 12-hour format

    // Format hours and minutes with AM/PM
    this.time12_end_time = `${hour}:${minutes} ${suffix}`;
    console.log(this.time12_end_time);
  }


 public removeCalenderItem(id){

   var obj={
     "calender_id":id
   }
    this.callapi.post('/payperclick/remove_calender_details',obj).subscribe(data => {
       $('#preloader').hide();
       // alert(data.status);
       if(data.status == 200){
          this.toastr.successToastr(data.message, 'Success!');
          this.getCalenderDetails(this.pay_per_id);
           
        }else{
         this.toastr.errorToastr(data.message, 'Error!');
          
         
        }
    }); 
}

 onFileChangeProfile(event: any): void {
   // alert();
    $('#profileModal').modal('show');
    this.imgChangeEvtProfile = event;
    
  }

  cropImgProfile(e: ImageCroppedEvent) {
    this.cropImgPreviewProfile = e.base64;
  }

  cropProfile(){

    this.imageuploadProfile(this.cropImgPreviewProfile);
   
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
            'image':this.profile_image,
            'pay_per_id':this.pay_per_id
          }

           this.callapi.post('/payperclick/upload_profile_image', obj1).subscribe(result1 => {
              $('#preloader').hide();
              this.data = result;
              if ((result1.status == 200) || (result1.status === '200')) {

                this.toastr.successToastr(this.data.message, 'Success!');
                $('#profileModal').modal('hide');
                this.getProfileData(this.pay_per_id);

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

  public getProfileData(pay_per_id){
    
    var obj={
      "pay_per_id":pay_per_id
    }

    this.callapi.post('/payperclick/signle_user_profile_approve_image',obj).subscribe(data => {
      if(data.status == 200){
        this.profileDataApproveImage = data.data;
      }else{
        // alert('wrr');
        this.profileDataApproveImage = '';
      }
    }); 

    this.callapi.post('/payperclick/signle_user_profile_pending_image',obj).subscribe(data => {
      if(data.status == 200){
        this.profileDataPendingImage = data.data;
      }else{
        this.profileDataPendingImage = '';
      }
    }); 

    this.callapi.post('/payperclick/signle_user_profile_approve_video',obj).subscribe(data => {
      if(data.status == 200){
        this.profileDataApproveVideo = data.data;
      }else{
        // alert('wrr');
        this.profileDataApproveVideo = '';
      }
    }); 

    this.callapi.post('/payperclick/signle_user_profile_pending_video',obj).subscribe(data => {
      if(data.status == 200){
        this.profileDataPendingVideo = data.data;
      }else{
        this.profileDataPendingVideo = '';
      }
    }); 

}


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

           this.callapi.post('/payperclick/edit_profile_image', obj1).subscribe(result1 => {
            $('#preloader').hide();
              this.data = result;
              if ((result1.status == 200) || (result1.status === '200')) {

                this.toastr.successToastr(this.data.message, 'Success!');
                $('#profileModalEdit').modal('hide');
                this.getProfileData(this.pay_per_id);

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

  public deleteProfileImage(id){

    // alert(id);
     var result = confirm("Are you sure Want to delete?");
      if (result==true) 
      {
       
       var obj={
           'image_id':id
         }
        $('#preloader').show();
       this.callapi.post('/payperclick/delete_profile_image',obj).subscribe(result1 => {
        $('#preloader').hide();
          this.data = result;
          if ((result1.status == 200) || (result1.status === '200')) {
            this.toastr.successToastr(this.data.message, 'Success!');
            this.getProfileData(this.pay_per_id);
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
                'pay_per_id':this.pay_per_id,
              }
            this.callapi.post('/payperclick/upload_profile_video', obj1).subscribe(result => {
                $('#preloader').hide();
                this.data = result;
                if ((this.data.status == 200) || (this.data.status === '200')) {

                  this.toastr.successToastr(this.data.message, 'Success!');
                   this.getProfileData(this.pay_per_id);
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
       $('#preloader').show();
       this.callapi.post('/payperclick/delete_profile_video',obj).subscribe(result1 => {
              $('#preloader').hide();
              this.data = result1;
              if ((result1.status == 200) || (result1.status === '200')) {
                this.toastr.successToastr(this.data.message, 'Success!');
                this.getProfileData(this.pay_per_id);
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

  public viewImage(view_image){

    this.view_image = view_image;
    $('#viewImageModal').modal('show');

  }

  public viewImagePaymentDetils(image_id){

       $('#preloader').show();
       var obj={
           'image_id':image_id
         }
       $('#preloader').show();
       this.callapi.post('/payperclick/show_image_all_payment',obj).subscribe(result1 => {
          $('#preloader').hide();
          this.data = result1;
          if ((result1.status == 200) || (result1.status === '200')) {
            this.paymentData = result1.data;
            this.paymentAllData = result1;
             $('#paymentModal').modal('show');
          } else {
            this.paymentData = '';
            this.paymentAllData = '';
            $('#paymentModal').modal('hide');
           }
        },err => {
          $('#preloader').hide();
        });

      

  }

  public viewVideoPaymentDetils(video_id){

       $('#preloader').show();
       var obj={
           'video_id':video_id
         }
       $('#preloader').show();
       this.callapi.post('/payperclick/show_video_all_payment',obj).subscribe(result1 => {
          $('#preloader').hide();
          this.data = result1;
          if ((result1.status == 200) || (result1.status === '200')) {
            this.paymentData = result1.data;
            this.paymentAllData = result1;
             $('#paymentModal').modal('show');
          } else {
            this.paymentData = '';
            this.paymentAllData = '';
            $('#paymentModal').modal('hide');
           }
        },err => {
          $('#preloader').hide();
        });

      

  }




}
