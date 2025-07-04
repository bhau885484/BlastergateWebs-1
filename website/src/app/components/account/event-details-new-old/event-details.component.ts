import { Component, EventEmitter, Input, OnInit, Output,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl ,FormArray} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs'; 
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../../api-service/service/index';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications'; 
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { PasswordMatchPattern } from '../../../api-service/all-validation-pattern/password-match-pattern';
import { MobilePatternValidator } from '../../../api-service/all-validation-pattern/mobile-pattern-validator';
 
declare const $: any;
declare const google: any;
import AOS from 'aos';
import 'aos/dist/aos.css';
  
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  public joinMemeberFlag:boolean=false;
  public onlineUserData;
  public total_distance=0;
  public allEventData;
  public title_heading;
  public pending_data:boolean=false;
  public bodydata: any = {};

  public image_url;
  public event_id;
  public roomData;
  public user_id;

  imgChangeEvt: any = "";
  cropImgPreview: any = "";
  public id_proof_1='';

  imgChangeEvtNew: any = "";
  cropImgPreviewNew: any = "";
  public id_proof_2='';
  public addNewMemberFlag:boolean=false;

  public profile_type;

  public eventForm: FormGroup;
  public submitted = false;
  public base64Image1;
  public userData;
  public eventPrice;
  public eventProfileType;


  public showname;
  public userflag: any;
  public showflag;
  public userid: string;
  public uservalue;
  
  public membershipArray=[];
  public eventPopup:boolean=false;
  public membership_discount_price:any=0;

  public paymentgetwayForm: FormGroup;
  public submitted1 = false;
  public finalPaymentArray=[];
  public total_membership_discount=0;

  public checkSingleMemeberFlag:boolean=false;


  public usenameArray=[];
  public usenameArraySingle=[];
  public usenameArrayCouple=[];
  public roomUserArray=[];
  public addRoomUserList=[];
  public addAdditionalNightList=[];

  public totalRoomUserAmount=[];
  public addPartialPaymentArrayList=[];
  public infoRoomArray=[];

  public user_count = 0;
  public paymentTypeData;
  public down_payment_total = 0;


  public step1:boolean=true;
  public step2:boolean=true;
  public step3:boolean=false;
  public step4:boolean=false;

  public additional_night;
  public additional_nignt_total_qty:number=0;
  public partialPaymentFag:boolean=false;
  public partialPaymentFagError:boolean=false;
  public fullPaymentFlag:boolean=false;
  public eventTermsConditionFlag:boolean=false;


  public show_partial_payment_details;
  public down_payment;
  // public usenameArrayCouple2=[];

  public leftDescriptionFlag:boolean=false;
  public rightDescriptionFlag:boolean=true;

  public addRoomFlag:boolean=false;
  public total_room_price:any =0;
  public total_additional_night_price:any =0;
  public final_sub_total:any=0;
  public final_total:any=0;
  public total_paid_amount:any=0;
  public final_total1:any=0;
  public final_total2:any=0;
  public event_terms_condition;
  public partial_payment_fee;


  public countryData;
  public stateData;
  public cityData;
  public partial_payment_name;

  public expiryYears: number[] = [];
  public currentYear;
  public fullNameFlag:boolean=true;
  public fullText;
  
  isExpanded: boolean = false;
  public loaderFlag :boolean=false;

  get displayText(): string {
    if (this.isExpanded) {
      return this.fullText;
    } else {
      return this.fullText.split(' ').slice(0, 50).join(' ') + '...';
    }
  }

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }


  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer)
  { 
    if (!(this.tokenSaveService.getAccessToken())) {
        this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
     // $('#fullNameModal').modal('show', { backdrop: 'static', keyboard: true });
    $('#preloader').hide();
    this.currentYear = new Date().getFullYear();
    const numberOfYears = 20; // Show the next 10 years
    for (let i = 0; i < numberOfYears; i++) {
      this.expiryYears.push(this.currentYear + i);
    }

    // $('#authorizedPaymentModal').modal('show');

    this.leftDescriptionFlag=false;
    this.rightDescriptionFlag=true;
      
    this.getRoom();
    this.getCountry();
    this.getPaymentType();

     setTimeout(() => {
        $('#right_side_togle').removeClass('show_toggle');
        $('#right_side_togle').addClass('hide_toggle');

        $('#big_tab').removeClass('col-lg-8');
        $('#big_tab').addClass('col-lg-10');
        this.profile_type = this.tokenSaveService.getProfileType();

       if(this.profile_type == 'single'){

           this.eventForm = this.formBuilder.group({
              full_name: new FormControl(''),
              username: new FormControl(''),
              email: new FormControl(''),
              mobile: new FormControl(''),
              id_proof: new FormControl(''),

              full_name1: new FormControl(''),
              username1: new FormControl(''),
              email1: new FormControl(''),
              mobile1: new FormControl(''),
              id_proof1: new FormControl(''),

              itemsSingle: this.formBuilder.array([]),
              itemsCouple: this.formBuilder.array([])
              
            });
        }else if(this.profile_type == 'couple'){

           this.eventForm = this.formBuilder.group({
              full_name: new FormControl(''),
              username: new FormControl(''),
              email: new FormControl(''),
              mobile: new FormControl(''),
              id_proof: new FormControl(''),

              full_name1: new FormControl(''),
              username1: new FormControl(''),
              email1: new FormControl(''),
              mobile1: new FormControl(''),
              id_proof1: new FormControl(''),
              

              itemsSingle: this.formBuilder.array([]),
              itemsCouple: this.formBuilder.array([])
              
            });


        }else{
            this.eventForm = this.formBuilder.group({
              full_name: new FormControl(''),
              username: new FormControl(''),
              email: new FormControl(''),
              mobile: new FormControl(''),
              id_proof: new FormControl(''),

              full_name1: new FormControl(''),
              username1: new FormControl(''),
              email1: new FormControl(''),
              mobile1: new FormControl(''),
              id_proof1: new FormControl(''),

              itemsSingle: this.formBuilder.array([]),
              itemsCouple: this.formBuilder.array([])
              
            });
        }
        
        this.event_id = atob(this.activatedRoute.snapshot.queryParams["event_id"]);
        this.getallFriendRequest(this.event_id);
        
     }, 2000);


     this.paymentgetwayForm = this.formBuilder.group({
            cardNumber: ['', Validators.required],
            month: ['', Validators.required],
            year: ['', Validators.required],
            cardCode: ['', Validators.required],
             // prefix: [''],
            first_name: ['', Validators.required],
            middle_name: [''],
            last_name: ['', Validators.required],
            address1: ['', Validators.required],
            address2: [''],
            city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
            state: ['', Validators.required],
            country: ['', Validators.required],
            pin_code: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
            phone: ['', Validators.required],
            // fax: [''],
        });

   
 } 

   get f1() { return this.paymentgetwayForm.controls; }
   get f() {  return this.eventForm.controls; }

  get itemsSingle(): FormArray {
    return this.eventForm.get('itemsSingle') as FormArray;
  }

  get itemsCouple(): FormArray {
    return this.eventForm.get('itemsCouple') as FormArray;
  }

  addItemSingle(): void {
    if (this.itemsSingle.length < 5) {
      this.itemsSingle.push(this.formBuilder.group({
         full_name1: new FormControl('', [Validators.required]),
          username1: new FormControl('', [Validators.required]),
          email1: new FormControl('', [Validators.required]),
          mobile1: new FormControl('', [Validators.required]),
          id_proof1: new FormControl('', [Validators.required]),
      }));

      this.leftDescriptionFlag =true;
      this.rightDescriptionFlag =false;

    
     }else{
       this.toastr.errorToastr("Maximum 5 member add...",'Error!');
     }
  }

  addItemCouple(): void {
    if (this.itemsCouple.length < 5) {
      this.itemsCouple.push(this.formBuilder.group({
          full_name1: new FormControl('', [Validators.required]),
          username1: new FormControl('', [Validators.required]),
          email1: new FormControl('', [Validators.required]),
          mobile1: new FormControl('', [Validators.required]),
          id_proof1: new FormControl('', [Validators.required]),

          full_name2: new FormControl('', [Validators.required]),
          username2: new FormControl('', [Validators.required]),
          email2: new FormControl('', [Validators.required]),
          mobile2: new FormControl('', [Validators.required]),
          id_proof2: new FormControl('', [Validators.required]),
      }));

      this.leftDescriptionFlag =true;
      this.rightDescriptionFlag =false;

     }else{
       this.toastr.errorToastr("Maximum 5 member add...",'Error!');
     }
  }

  removeItemSingle(index: number): void {
    this.itemsSingle.removeAt(index);   
  }

  removeItemCouple(index: number): void {
    this.itemsCouple.removeAt(index);
  }



  public removesecondForm(){
    $('#secondForm').hide();

    this.eventForm = this.formBuilder.group({
      full_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      id_proof: new FormControl('', [Validators.required]),


      full_name1: new FormControl(''),
      username1: new FormControl(''),
      email1: new FormControl(''),
      mobile1: new FormControl(''),
      id_proof1: new FormControl(''),
      

      items: this.formBuilder.array([])
      
    });
    

  }

  public getallFriendRequest(event_id){

    var obj={
      'event_id':event_id
    }
    this.callapi.post('/events/get_single_events',obj).subscribe(data => {
       if(data.status == 200){

         this.loaderFlag = true;
          this.allEventData = data.data;
          this.eventPrice = this.allEventData.event_price;
          this.additional_night = data.additional_night;

          this.fullText = this.allEventData.event_description;
          
           this.callapi.get('/user/me').subscribe(data1 => {
            if(data1.status=='200'){
              this.userData = data1.data;
              this.user_id = this.userData.id;

              this.eventProfileType = this.userData.profile_type;
              this.image_url = this.userData.image_url;

              
              if(this.userData.profile_type == 'single'){
                this.eventForm.controls["full_name"].setValue('');
                this.eventForm.controls["username"].setValue(this.userData.username);
                this.eventForm.controls["email"].setValue(this.userData.email);

              }else if(this.userData.profile_type == 'couple'){

                this.eventForm.controls["full_name"].setValue('');
                this.eventForm.controls["username"].setValue(this.userData.username);
                this.eventForm.controls["email"].setValue(this.userData.email);

                this.eventForm.controls["full_name1"].setValue('');
                this.eventForm.controls["username1"].setValue(this.userData.username);
                this.eventForm.controls["email1"].setValue(this.userData.email);

              }else{
                this.eventForm.controls["full_name"].setValue(this.userData.single_full_name);
                this.eventForm.controls["username"].setValue(this.userData.username);
                this.eventForm.controls["email"].setValue(this.userData.email);
              }
              


            }else{
              this.userData = '';
            }
         }); 
          
        }else{
          this.loaderFlag = true;
          this.allEventData = '';
        }
    }); 

   
  }

  public hideShowPromo(){
    if ($('#promo_text').hasClass('coupon_hide')){
      $('#promo_text').removeClass('coupon_hide');
      $('#promo_text').addClass('coupon_show');
    }else{
      $('#promo_text').addClass('coupon_hide');
      $('#promo_text').removeClass('coupon_show');
    }
  }

  public hideShowRoom(){
     if ($('#room_text').hasClass('room_hide')){
      $('#room_text').removeClass('room_hide');
      $('#room_text').addClass('room_show');
    }else{
      $('#room_text').addClass('room_hide');
      $('#room_text').removeClass('room_show');
    }
  }

  public checkPromo(){
    var promo_code = $('#promo_code').val();
    if(promo_code ==''){
      this.toastr.errorToastr("Please enter a promo code",'Error!');
     }else{
         var obj={
          'promo_code':promo_code,
        }
        $('#preloader').show();
        this.callapi.post('/events/check_promo',obj).subscribe(data => {
          $('#preloader').hide();
           if(data.status == 200)
           {

             this.toastr.successToastr(data.mesaage, 'Success!');
             this.commonServe.promo_code_id = data.data.promo_code_id;
            this.commonServe.discount_price = data.data.discount_price;
             this.commonServe.discount_type = data.data.discount_type;
            
            }else{
              
              this.toastr.errorToastr(data.message,'Error!');
             this.commonServe.promo_code_id = data.data.promo_code_id;
             this.commonServe.discount_price = data.data.discount_price;
             this.commonServe.discount_type = data.data.discount_type;
            }
        },error => {
            $('#preloader').hide();
            this.toastr.errorToastr('Some ERROR occured!Please try again...', 'Error!');
       });
     }
    
  }


  public getRoom(){
     var obj={
          'room_type':'all',
        }
        this.callapi.post('/events/get_all_room',obj).subscribe(data => {
           if(data.status == 200)
           {
             this.roomData = data.data;
           }else{
             this.roomData = '';
             this.toastr.errorToastr(data.message,'Error!');
           }
        }); 
      
  }

  public getCountry(){
   
        this.callapi.get('/auth/getCountry').subscribe(data => {
           if(data.status == 200)
           {
             this.countryData = data.data;
           }else{
             this.countryData = '';
             this.toastr.errorToastr(data.message,'Error!');
           }
        }); 
      
  }

  public getState(country_id){
    var obj={
      "country_id":country_id
    }

    this.callapi.post('/auth/getState',obj).subscribe(data => {
       if(data.status == 200)
       {
         this.stateData = data.data;
       }else{
         this.stateData = '';
         this.toastr.errorToastr(data.message,'Error!');
       }
    }); 

  }

  public getCity(state_id){
    var obj={
      "state_id":state_id
    }

    this.callapi.post('/auth/getCity',obj).subscribe(data => {
       if(data.status == 200)
       {
         this.cityData = data.data;
       }else{
         this.cityData = '';
         this.toastr.errorToastr(data.message,'Error!');
       }
    }); 

  }

   public getPaymentType(){
    
        this.callapi.get('/events/get_payment_type').subscribe(data => {
           if(data.status == 200)
           {
             this.paymentTypeData = data.data;
           }else{
             this.paymentTypeData = '';
             this.toastr.errorToastr(data.message,'Error!');
           }
        }); 
      
  }

  // public selectRoom(room_details){
  //   this.commonServe.sub_total = this.commonServe.sub_total;
    
  //   this.commonServe.discount_price = this.commonServe.discount_price;
  //   this.commonServe.room_price = room_details.price;
  //   this.commonServe.room_name = room_details.room_name;
  //   this.commonServe.room_id = room_details.id;
    
  //  var final_amount1 = Number(this.commonServe.sub_total) + Number(this.commonServe.room_price);

  //   this.commonServe.final_amount = Number(final_amount1) - Number(this.commonServe.discount_price);

  // }

  

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
          this.toastr.successToastr(result.message, 'Success!');
         this.eventForm.controls["id_proof"].setValue(result.data);
         // this.eventForm.controls["id_proof"].setValue(result.data);
         // console.log("v>>>>>>>>>",this.eventForm);
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


  onFileChange1(event: Event): void {

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
          this.toastr.successToastr(result.message, 'Success!');
         this.eventForm.controls["id_proof1"].setValue(result.data);
         // this.eventForm.controls["id_proof"].setValue(result.data);
         // console.log("v>>>>>>>>>",this.eventForm);
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


  onFileChangeAddMoreSingle(event: any, index: number): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {

         var obj ={
          'image':reader.result
        }
         $('#preloader').show();
        this.callapi.post('/upload/imageupload', obj).subscribe(result1 => {
         $('#preloader').hide();
          
          if ((result1.status == 200) || (result1.status === '200')) {

            this.toastr.successToastr(result1.message, 'Success!');
            this.itemsSingle.at(index).get('id_proof1').setValue(result1.data);

          } else {
            $('#preloader').hide();
            this.toastr.errorToastr(result1.message, 'Error!');
            
          }
        },err => {
          $('#preloader').hide();
        });



        
      };
    }
  }

  onFileChangeAddMoreCouple1(event: any, index: number): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {

         var obj ={
          'image':reader.result
        }
         $('#preloader').show();
        this.callapi.post('/upload/imageupload', obj).subscribe(result1 => {
         $('#preloader').hide();
          
          if ((result1.status == 200) || (result1.status === '200')) {

            this.toastr.successToastr(result1.message, 'Success!');
            this.itemsCouple.at(index).get('id_proof1').setValue(result1.data);

          } else {
            $('#preloader').hide();
            this.toastr.errorToastr(result1.message, 'Error!');
            
          }
        },err => {
          $('#preloader').hide();
        });



        
      };
    }
  }

  onFileChangeAddMoreCouple2(event: any, index: number): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {

         var obj ={
          'image':reader.result
        }

        this.callapi.post('/upload/imageupload', obj).subscribe(result1 => {
         $('#preloader').hide();
          
          if ((result1.status == 200) || (result1.status === '200')) {

            this.toastr.successToastr(result1.message, 'Success!');
            this.itemsCouple.at(index).get('id_proof2').setValue(result1.data);

          } else {
            $('#preloader').hide();
            this.toastr.errorToastr(result1.message, 'Error!');
            
          }
        },err => {
          $('#preloader').hide();
        });
 
      };
    }
  }




  public cancelPopup(popupname){
     $('#'+popupname).modal('hide');
  }


  public checkUserName1(obj) {
      $('#preloader').show();
      this.callapi.get('/membership/check_username_membership/' + obj).subscribe(result => {
        $('#fistUserSingleMsg').html('');
        $('#fistUserCoupleMsg').html('');
        $('#preloader').hide();
        if((result.status === '200')) 
        {
          this.membership_discount_price = result.membership_discount_price;
          if(this.profile_type == 'single'){

             $('#fistUserSingleMsg').html('<span class="sus_msg" >You are a member of Blaster Gate, ticket prices will be discount $'+result.membership_discount_price+' . When click buy details</span>');
          }
          
          if(this.profile_type == 'couple'){
           
            $('#fistUserCoupleMsg').html('<span class="sus_msg" >You are a member of Blaster Gate, ticket prices will be discount $'+result.membership_discount_price+'</span>');
          }
          
        } 

      }, err => {
        
      });
    
  }


   public checkUserNameAddMoreSingle(obj:any,index:any) {

     if(obj){
       $('#preloader').show();
         this.callapi.get('/membership/check_single_username_membership/' + obj).subscribe(result => {
          $('#preloader').hide();
            if((result.status === '200')) {
              this.toastr.successToastr("You are a member of Blaster Gate",'Success!');
              
              const faControl = (<FormArray>this.eventForm.controls['itemsSingle']).at(index);

               faControl['controls'].full_name1.setValue('');
               faControl['controls'].email1.setValue(result.email);
                
              
            } else {
              this.toastr.errorToastr("You are not a member of Blaster Gate",'Error!');
                const faControl = (<FormArray>this.eventForm.controls['itemsSingle']).at(index);
               faControl['controls'].full_name1.setValue('');
               faControl['controls'].email1.setValue('');
               faControl['controls'].username1.setValue('');
             
            }

        }, err => {
          
        });
     }else{
       const faControl = (<FormArray>this.eventForm.controls['itemsSingle']).at(index);
             faControl['controls'].full_name1.setValue('');
             faControl['controls'].email1.setValue('');
             faControl['controls'].username1.setValue('');
            // $('#singleUserName'+index).val('');
     }
      
    
  }

  public checkUserNameAddMoreCouple(obj:any,index:any) {
      
      if(obj){
        $('#preloader').show();
         this.callapi.get('/membership/check_couple_username_membership/' + obj).subscribe(result => {
          $('#preloader').hide();
            if((result.status === '200')) {
              this.toastr.successToastr("You are a member of Blaster Gate",'Success!');
              
              const faControl1 = (<FormArray>this.eventForm.controls['itemsCouple']).at(index);

               faControl1['controls'].full_name1.setValue('');
               faControl1['controls'].email1.setValue(result.email);
               faControl1['controls'].username1.setValue(result.username);

               faControl1['controls'].full_name2.setValue('');
               faControl1['controls'].email2.setValue(result.email);
               faControl1['controls'].username2.setValue(result.username);
              
            } else {
              this.toastr.errorToastr("You are not a member of Blaster Gate",'Error!');
                const faControl1 = (<FormArray>this.eventForm.controls['itemsSingle']).at(index);
               faControl1['controls'].full_name1.setValue('');
               faControl1['controls'].email1.setValue('');
               faControl1['controls'].username1.setValue('');

               faControl1['controls'].full_name2.setValue('');
               faControl1['controls'].email2.setValue('');
               faControl1['controls'].username2.setValue('');
             
            }

        }, err => {
          
        });
     }else{
       const faControl1 = (<FormArray>this.eventForm.controls['itemsSingle']).at(index);
             faControl1['controls'].full_name1.setValue('');
             faControl1['controls'].email1.setValue('');
             faControl1['controls'].username1.setValue('');

             faControl1['controls'].full_name2.setValue('');
             faControl1['controls'].email2.setValue('');
             faControl1['controls'].username2.setValue('');
            // $('#singleUserName'+index).val('');
     }
    
  } 

  public linkRouter(link){
   
      $('#preloader').show();
      $('#firstTimeModal').modal('hide');
       setTimeout(() => {
           $('#preloader').hide();
            this.router.navigate([link]);
      }, 1000);
  }


  public viewInfo(){
    $('#viewImageModal').modal('show');
  }

  public checkJoinMember(event: any){
      const isChecked = event.target.checked;
       // $('#preloader').show();
      if(isChecked == true)
      {
        this.leftDescriptionFlag =true;
        this.rightDescriptionFlag =false;
        this.joinMemeberFlag =true;
        this.checkUserName1(this.userData.username);
        this.getallFriendRequest(this.event_id);
        if(this.profile_type == 'single'){

           this.eventForm = this.formBuilder.group({
              full_name: new FormControl('', [Validators.required]),
              username: new FormControl('', [Validators.required]),
              email: new FormControl('', [Validators.required]),
              mobile: new FormControl('', [Validators.required]),
              id_proof: new FormControl('', [Validators.required]),

              full_name1: new FormControl(''),
              username1: new FormControl(''),
              email1: new FormControl(''),
              mobile1: new FormControl(''),
              id_proof1: new FormControl(''),

              itemsSingle: this.formBuilder.array([]),
              itemsCouple: this.formBuilder.array([])
              
            });
        }else if(this.profile_type == 'couple'){

           this.eventForm = this.formBuilder.group({
              full_name: new FormControl('', [Validators.required]),
              username: new FormControl('', [Validators.required]),
              email: new FormControl('', [Validators.required]),
              mobile: new FormControl('', [Validators.required]),
              id_proof: new FormControl('', [Validators.required]),

              full_name1: new FormControl('', [Validators.required]),
              username1: new FormControl('', [Validators.required]),
              email1: new FormControl('', [Validators.required]),
              mobile1: new FormControl('', [Validators.required]),
              id_proof1: new FormControl('', [Validators.required]),
              

              itemsSingle: this.formBuilder.array([]),
              itemsCouple: this.formBuilder.array([])
              
            });


        }else{
            this.eventForm = this.formBuilder.group({
              full_name: new FormControl('', [Validators.required]),
              username: new FormControl('', [Validators.required]),
              email: new FormControl('', [Validators.required]),
              mobile: new FormControl('', [Validators.required]),
              id_proof: new FormControl('', [Validators.required]),

              full_name1: new FormControl('', [Validators.required]),
              username1: new FormControl('', [Validators.required]),
              email1: new FormControl('', [Validators.required]),
              mobile1: new FormControl('', [Validators.required]),
              id_proof1: new FormControl('', [Validators.required]),

              itemsSingle: this.formBuilder.array([]),
              itemsCouple: this.formBuilder.array([])
              
            });
        }
      }else{
        this.leftDescriptionFlag =false;
        this.rightDescriptionFlag =true;
        this.joinMemeberFlag =false;
        this.checkUserName1(this.userData.username);
        if(this.profile_type == 'single'){

           this.eventForm = this.formBuilder.group({
              full_name: new FormControl(''),
              username: new FormControl(''),
              email: new FormControl(''),
              mobile: new FormControl(''),
              id_proof: new FormControl(''),

              full_name1: new FormControl(''),
              username1: new FormControl(''),
              email1: new FormControl(''),
              mobile1: new FormControl(''),
              id_proof1: new FormControl(''),

              itemsSingle: this.formBuilder.array([]),
              itemsCouple: this.formBuilder.array([])
              
            });
        }else if(this.profile_type == 'couple'){

           this.eventForm = this.formBuilder.group({
              full_name: new FormControl(''),
              username: new FormControl(''),
              email: new FormControl(''),
              mobile: new FormControl(''),
              id_proof: new FormControl(''),

              full_name1: new FormControl(''),
              username1: new FormControl(''),
              email1: new FormControl(''),
              mobile1: new FormControl(''),
              id_proof1: new FormControl(''),
              

              itemsSingle: this.formBuilder.array([]),
              itemsCouple: this.formBuilder.array([])
              
            });


        }else{
            this.eventForm = this.formBuilder.group({
              full_name: new FormControl(''),
              username: new FormControl(''),
              email: new FormControl(''),
              mobile: new FormControl(''),
              id_proof: new FormControl(''),

              full_name1: new FormControl(''),
              username1: new FormControl(''),
              email1: new FormControl(''),
              mobile1: new FormControl(''),
              id_proof1: new FormControl(''),

              itemsSingle: this.formBuilder.array([]),
              itemsCouple: this.formBuilder.array([])
              
            });
        }
      }
  }

  public buyNow(){

      const data = this.eventForm.value;
      if (this.eventForm.valid) 
      {
          this.submitted = false;

          this.usenameArraySingle=[];
          this.usenameArrayCouple=[];
          this.usenameArray=[];

          if(this.joinMemeberFlag == true){
            this.usenameArray.push({"full_name":data.full_name,"email":data.email,"id_proof":data.id_proof,"mobile":data.mobile,"username":data.username,"add_new":0,"event_id":this.event_id,"user_id":this.user_id});
          }
          
          data.itemsSingle.forEach((element:any)=>{
            this.usenameArray.push({"full_name":element.full_name1,"email":element.email1,"id_proof":element.id_proof1,"mobile":element.mobile1,"username":element.username1,"add_new":0,"event_id":this.event_id,"user_id":this.user_id})
          })

          data.itemsCouple.forEach((element:any)=>{
            this.usenameArray.push({"full_name":element.full_name1,"email":element.email1,"id_proof":element.id_proof1,"mobile":element.mobile1,"username":element.username1,"add_new":0,"event_id":this.event_id,"user_id":this.user_id})
          })

        

          // console.log('this.usenameArray_old',this.usenameArray);


         const username = this.usenameArray.map(item => item.username);
         const hasDuplicates = new Set(username).size !== username.length;

          if (hasDuplicates) {
            this.toastr.errorToastr('Username already used. Please use unique username ','Error!');
          } else {

            this.membershipArray=[];
            this.roomUserArray =[];
            
            
            // this.usenameArray.forEach((element:any)=>{
            //    this.getUserName(element.username);
            // })

            if(this.joinMemeberFlag == true){
              if(data.username1){
                this.usenameArray.push({"full_name":data.full_name1,"email":data.email1,"id_proof":data.id_proof1,"mobile":data.mobile1,"username":data.username1,"add_new":1,"event_id":this.event_id,"user_id":this.user_id});
              }
            }

          data.itemsCouple.forEach((element:any)=>{
            if(element.username2){
              this.usenameArray.push({"full_name":element.full_name2,"email":element.email2,"id_proof":element.id_proof2,"mobile":element.mobile2,"username":element.username2,"add_new":0,"event_id":this.event_id,"user_id":this.user_id})
            }
          })

          this.usenameArray.forEach((element:any)=>{
            
              this.roomUserArray.push({"full_name":element.full_name,"email":element.email,"id_proof":element.id_proof,"mobile":element.mobile,"username":element.username,"added_room_user":0})
           
          })

       

          if(this.usenameArray.length > 0)
          {
            this.step1=true;
            this.step2=true;
            this.step3=false;
            this.step4=false;

            this.final_total2 = parseFloat(this.membership_discount_price)+parseFloat(this.commonServe.discount_price);

            this.commonServe.event_total_sum_amount = parseFloat(this.eventPrice) - parseFloat(this.final_total2);
            this.toastr.successToastr('Member added successfully. Please add user in room', 'Success!');
            console.log('this.commonServe.event_total_sum_amount',this.commonServe.event_total_sum_amount);
          }else{
            this.toastr.errorToastr('Please add atleast one member', 'Error!');
          }
           
        }
    
      }else{
         
           this.submitted = true;
           return;
      }
  }

  // Room Management Ts

  public backStep1(){
    this.step1=true;
    this.step2=false;
    this.step3=false;
    this.step4=false;
  }

  public showHideFunction(index){
    
    if ($("#full_desc"+index).hasClass('close')){
      $("#full_desc"+index).removeClass('close');
      $("#full_desc"+index).addClass('open');
    } else {
      $("#full_desc"+index).addClass('close');
      $("#full_desc"+index).removeClass('open');
    }
  }


 public showHideFunction1(index){
    
    if ($("#full_desc1"+index).hasClass('close')){
      $("#full_desc1"+index).removeClass('close');
      $("#full_desc1"+index).addClass('open');
    } else {
      $("#full_desc1"+index).addClass('close');
      $("#full_desc1"+index).removeClass('open');
    }
  }



  public changeRoomQty(qty,room_id,room_detials){
   
    if(qty > 0)
    {
      
         for (let i = 0; i < this.addRoomUserList.length; i++) {
          if ((this.addRoomUserList[i].room_id == room_id)) {
             this.addRoomUserList.splice(i);
            }
          }

           this.roomUserArray.forEach((element:any)=>{
             if(element.room_id == room_id){
               element.added_room_user = '0';
             }
          })

          $('.hideRow'+room_id).css('display','revert-layer');



         $('#addRoomUserList'+room_id).css('display','block');
         $('#room_qty'+room_id).val(qty);

          var room_fee = (room_detials.fee*qty);
          var room_price = (room_detials.price*qty);
          var amount = room_fee+room_price;

          $('#amount'+room_id).html(amount);
           this.eventTotalSum(qty,room_detials.id,room_detials.fee,room_detials.price);
     
    

    }else{
      $('#addRoomUserList'+room_id).css('display','none');
      $('#room_qty'+room_id).val(0);
      $('#amount'+room_id).html('');

       for (let i = 0; i < this.addRoomUserList.length; i++) {
          if ((this.addRoomUserList[i].room_id == room_id)) {
             this.addRoomUserList.splice(i);
            }
          }

           this.roomUserArray.forEach((element:any)=>{
             if(element.room_id == room_id){
               element.added_room_user = '0';
             }
          })

         $('.hideRow'+room_id).css('display','revert-layer');

        this.eventTotalSum(qty,room_detials.id,room_detials.fee,room_detials.price);
    }

    
  }

  public addRoomUser(room_id,room_user,room_detials){

   

    if(this.addRoomUserList.length > 0)
    {
      
      const index = this.addRoomUserList.findIndex(user => user.username === room_user.username);
      if (index !== -1) 
      {
        const index1 = this.addRoomUserList.findIndex(user => user.username === room_user.username && user.room_id === room_id);
               if (index1 !== -1) {
                  this.addRoomFlag = true;
               }else{
                 this.toastr.errorToastr("Please add same user in same room",'Error!');

                  this.addRoomFlag = false;
               }
      } else {

         this.addRoomFlag = true;
      } 

    }else{
       this.addRoomFlag = true;
    }

    if(this.addRoomFlag)
    {
       var room_qty = $('#room_qty'+room_id).val();
        var room_fee = (room_detials.fee);
        var room_price = (room_detials.price);

        var room_available  = room_detials.room_available;
        var total_add_member = parseFloat(room_available)*parseFloat(room_qty);

        this.addRoomUserList.push({"full_name":room_user.full_name,"email":room_user.email,"id_proof":room_user.id_proof,"mobile":room_user.mobile,"username":room_user.username,"room_qty":room_qty,"room_id":room_id,"room_fee":room_fee,"room_price":room_price,"event_id":this.event_id,"user_id":this.user_id});

        this.roomUserArray.forEach((element:any)=>{
          const user = this.roomUserArray.find(user => user.username === room_user.username && user.full_name === room_user.full_name);
          if (user) {
             user['added_room_user'] = '1';
              user['room_id'] = room_id;
              
            } else {
              
              user['added_room_user'] = '0';
              user['room_id'] = room_id;
            }
        })

        const matchingUsers = this.addRoomUserList.filter(user1 => user1.room_id === room_id);
        this.user_count = matchingUsers.length;

        
        if(this.user_count == total_add_member){
            $('.hideRow'+room_id).css('display','none');
        }
    }
   

    // console.log('addRoomUserListAdd',this.addRoomUserList);
  
  }

  public removeRoomUser(add_room_user_list,room_id){


    
         this.roomUserArray.forEach((element:any)=>{
             if((element.username == add_room_user_list.username) &&(element.full_name === add_room_user_list.full_name)){
               element.added_room_user = '0';
             }
          })

         for (let i = 0; i < this.addRoomUserList.length; i++) {
            if ((this.addRoomUserList[i].username == add_room_user_list.username) && (this.addRoomUserList[i].full_name == add_room_user_list.full_name)) {
              this.addRoomUserList.splice(i, 1);
            }
          }

          $('.hideRow'+room_id).css('display','revert-layer');

          // console.log('addRoomUserListRemove',this.addRoomUserList);
  
  }

  public changeAdditionalNightQty(qty1,index,additional_night_data,allEventData){
    
    var qty = qty1.value;
    if(this.usenameArray.length >= qty) {

      if(qty > 0)
      {

        var room_fee = (allEventData.additional_room_night_fee*qty);
        var room_price = (allEventData.additional_room_night_price*qty);
        var amount = Math.round(room_fee+room_price);
        
        $('#additionalNightAmount'+index).html(amount);

       if(this.addAdditionalNightList.length > 0)
        {

            const index = this.addAdditionalNightList.findIndex(user => user.date === additional_night_data.date && user.day === additional_night_data.day);
           
            if (index !== -1) {
                this.addAdditionalNightList.splice(index, 1);
                this.addAdditionalNightList.push({"username":this.userData.username,"qty":qty,"date":additional_night_data.date,"day":additional_night_data.day,"price":allEventData.additional_room_night_price,"fee":allEventData.additional_room_night_fee,"amount":amount,"event_id":this.event_id,"user_id":this.user_id});
              } else {
                this.addAdditionalNightList.push({"username":this.userData.username,"qty":qty,"date":additional_night_data.date,"day":additional_night_data.day,"price":allEventData.additional_room_night_price,"fee":allEventData.additional_room_night_fee,"amount":amount,"event_id":this.event_id,"user_id":this.user_id});
              }  
         
        }else{
       
         this.addAdditionalNightList.push({"username":this.userData.username,"qty":qty,"date":additional_night_data.date,"day":additional_night_data.day,"price":allEventData.additional_room_night_price,"fee":allEventData.additional_room_night_fee,"amount":amount,"event_id":this.event_id,"user_id":this.user_id});
        }

        this.eventTotalSum(qty,index,allEventData.additional_room_night_fee,allEventData.additional_room_night_price);

      }else{
         $('#additionalNightAmount'+index).html('');
         if(this.addAdditionalNightList.length > 0){
           for (let i = 0; i < this.addAdditionalNightList.length; i++) {
                if ((this.addAdditionalNightList[i].date == additional_night_data.date) && (this.addAdditionalNightList[i].day == additional_night_data.day)) {
                this.addAdditionalNightList.splice(i, 1);
              }
            }
         }
         this.eventTotalSum('0',index,allEventData.additional_room_night_fee,allEventData.additional_room_night_price);
      }  
    }else{
      const index2 = this.addAdditionalNightList.findIndex(user => user.date === additional_night_data.date && user.day === additional_night_data.day);
       if (index2) {
         // alert(index2['qty']);
           qty1.value = '0';
         } else {
          qty1.value ='0'
        }
      $('#additionalNightAmount'+index).html('');
      this.toastr.errorToastr("You have already added a minimum number of guests. You cannot add more rooms to your booking...",'Error!');

       this.eventTotalSum('0',index,allEventData.additional_room_night_fee,allEventData.additional_room_night_price);


    }
    


    // console.log('this.addAdditionalNightList',this.addAdditionalNightList);
    
    
  }

 public eventTotalSum(qty,id,fee,price){

   

     const index1 = this.totalRoomUserAmount.findIndex(user => user.id === id &&  user.price === price && user.fee === fee);
             
      if (index1 !== -1) {
          this.totalRoomUserAmount.splice(index1, 1);
           this.totalRoomUserAmount.push({"qty":qty,"id":id,"fee":fee,"price":price});
        }else{
           this.totalRoomUserAmount.push({"qty":qty,"id":id,"fee":fee,"price":price});
        }

        this.commonServe.event_total_sum_amount = 0;

         console.log('this.totalRoomUserAmount',this.totalRoomUserAmount);

         var amount =0;

        for (let j = 0; j < this.totalRoomUserAmount.length; j++) {

          var room_fee = (this.totalRoomUserAmount[j].fee*this.totalRoomUserAmount[j].qty);
          var room_price = (this.totalRoomUserAmount[j].price*this.totalRoomUserAmount[j].qty);
          amount = amount+room_fee+room_price;

          console.log('this.commonServe.event_total_sum_amount ',this.commonServe.event_total_sum_amount );
          console.log('this.final_total2',this.final_total2);
          console.log('this.eventPrice',this.eventPrice);
          console.log('amount',amount);
         

          this.commonServe.event_total_sum_amount =  parseFloat(this.eventPrice) - parseFloat(this.final_total2) + amount;

         
        } 



       
 }


  public selectPaymentType(payment_type){
   
   this.changePartialPaymentQty('1',payment_type);

   this.show_partial_payment_details = payment_type;

   this.partial_payment_fee = this.show_partial_payment_details.payment_fee;

   this.partial_payment_name = this.show_partial_payment_details.payment_name;

   if(this.show_partial_payment_details.payment_type == '100')
   {
     this.down_payment = this.commonServe.event_total_sum_amount;
     this.partialPaymentFag = true;
     this.partialPaymentFagError = false;
     this.fullPaymentFlag = true;
      this.down_payment_total = parseFloat(this.show_partial_payment_details.payment_fee) + parseFloat(this.down_payment);

   }else{

     this.fullPaymentFlag = false;
     var one_month_after_date = this.allEventData.one_month_after_date;
     var eventFromDate = this.allEventData.event_from_date;

    if (one_month_after_date > eventFromDate) {
      this.partialPaymentFag = false;
      this.partialPaymentFagError = true;
    } else if (one_month_after_date < eventFromDate) {
      this.partialPaymentFag = true;
      this.partialPaymentFagError = false;
    } else {
      this.partialPaymentFag = false;
      this.partialPaymentFagError = true;
    }

     var partial_down_payment = ((this.commonServe.event_total_sum_amount*25)/100);
     this.down_payment = partial_down_payment;
     this.down_payment_total = parseFloat(this.show_partial_payment_details.payment_fee) + parseFloat(this.down_payment);
   }
  }

  public changePartialPaymentQty(qty,show_partial_payment_details){

    var sub_total = ((qty*show_partial_payment_details.payment_fee) +(this.down_payment));
    this.down_payment_total = sub_total;

    this.partial_payment_fee = (qty*show_partial_payment_details.payment_fee);



    this.addPartialPaymentArrayList = [];
    this.addPartialPaymentArrayList.push({"id":show_partial_payment_details.id,"qty":qty,"payment_fee":show_partial_payment_details.payment_fee,"payment_name":show_partial_payment_details.payment_name,"payment_type":show_partial_payment_details.payment_type});
  }
  

  public paymentBuy() {

    // this.usenameArray (Add User Array In First Form)
    // this.addRoomUserList( Add User in room array)
    // this.addPartialPaymentArrayList( Partial payment array)
    // this.addAdditionalNightList (Additional Night Array)

    // this.down_payment_total(down Payment Total)
    // this.commonServe.event_total_sum_amount(Final Amount)

    //  console.log('this.addRoomUserList',this.addRoomUserList);
    //  console.log('roomData',this.roomData);


    // console.log('this.usenameArray',this.usenameArray);
   
    // console.log('this.addPartialPaymentArrayList',this.addPartialPaymentArrayList);
    // console.log('this.addAdditionalNightList',this.addAdditionalNightList);
    // console.log('this.down_payment_total',this.down_payment_total);
    // console.log('this.commonServe.event_total_sum_amount',this.commonServe.event_total_sum_amount);


    if(this.usenameArray.length > 0)
    {
      if(this.usenameArray.length == this.addRoomUserList.length){

         if(this.addPartialPaymentArrayList.length > 0)
         {

           this.infoRoomArray =[];
           this.roomData.forEach((element1:any)=>{
              this.addRoomUserList.forEach((element2:any)=>{
                 if(element2.room_id == element1.id){

                   const index1 = this.infoRoomArray.findIndex(user => user.room_id === element2.room_id);
                   if (index1 == -1) {

                     var room_fee1 = element1.fee*element2.room_qty;
                      var room_price1 = element1.price*element2.room_qty;
                      var amount1 = room_fee1+room_price1;

                     this.infoRoomArray.push({"room_id":element2.room_id,"room_name":element1.room_name,"full_description":element1.full_description,"price":element1.price,"fee":element1.fee,"qty":element2.room_qty,"amount":amount1,"room_image":element1.room_image,"event_id":this.event_id,"user_id":this.user_id});
                   }
  
                }
              })
          })

           console.log('this.infoRoomArray',this.infoRoomArray);


           this.membership_discount_price
           if(this.joinMemeberFlag == true){
             this.membership_discount_price = this.membership_discount_price;
           }else{
             this.membership_discount_price = '0';
           }



          // Toal Room Price
          this.infoRoomArray.forEach((itemroom:any)=>{
             this.total_room_price = this.total_room_price+itemroom.amount
          }) 

          // Toal Additonal Night Price
          this.addAdditionalNightList.forEach((itemnignt:any)=>{
             this.total_additional_night_price = this.total_additional_night_price+itemnignt.amount
          })

          this.final_sub_total = parseFloat(this.total_room_price)+parseFloat(this.total_additional_night_price)+parseFloat(this.eventPrice);
          
          
            this.final_total1 = parseFloat(this.membership_discount_price)+parseFloat(this.commonServe.discount_price);

          console.log('final_total1',this.final_total1);
          this.final_total = parseFloat(this.final_sub_total)-parseFloat(this.final_total1);
          console.log('final_total',this.final_total);
          if(this.show_partial_payment_details.payment_type == '100')
          {
            this.total_paid_amount = this.final_total;
          }else{
             var info_partial_down_payment = ((this.final_total*25)/100);
             this.total_paid_amount = info_partial_down_payment+parseFloat(this.partial_payment_fee);
             console.log('partial_payment_fee',this.partial_payment_fee);
          }

          console.log('total_paid_amount',this.total_paid_amount);
          
            this.step1=false;
            this.step2=false;
            this.step3=true;
            this.step4=false;

         }else{
           this.toastr.errorToastr("Please select payment type",'Error!');
         }

      }else{
        this.toastr.errorToastr("Please Add room",'Error!');
      }

    }else{
      this.toastr.errorToastr("Please Select Atleast one user",'Error!');
    }

  }


  public saveTicket(){
    if(this.eventTermsConditionFlag == true){
       $('#authorizedPaymentModal').modal('show');
    }else{
       this.toastr.errorToastr("Please accept terms and conditions",'Error!');
    }
    
  }


  public savePayment() {

        const data = this.paymentgetwayForm.value;
        if (this.paymentgetwayForm.valid) {
      
          var newobj={
              
              'event_id':this.event_id,
              'event_price':this.eventPrice,
              'user_id': this.user_id,
              'promo_code_id':this.commonServe.promo_code_id,
              "membership_discount":this.membership_discount_price,
              "primocode_price":this.commonServe.discount_price,
              "total_amount":this.final_total,
              "pay_amount":this.total_paid_amount,
              
              "cardNumber":this.paymentgetwayForm.value.cardNumber,
              "cardCode":this.paymentgetwayForm.value.cardCode,
              "month":this.paymentgetwayForm.value.month,
              "year":this.paymentgetwayForm.value.year,
              "amount":this.total_paid_amount,


              "prefix":'',
              "first_name":this.paymentgetwayForm.value.first_name,
              "middle_name":this.paymentgetwayForm.value.middle_name,
              "last_name":this.paymentgetwayForm.value.last_name,
              "address1":this.paymentgetwayForm.value.address1,
              "address2":this.paymentgetwayForm.value.address2,
              "city":this.paymentgetwayForm.value.city,
              "state":this.paymentgetwayForm.value.state,
              "country":this.paymentgetwayForm.value.country,
              "pin_code":this.paymentgetwayForm.value.pin_code,
              "phone":this.paymentgetwayForm.value.phone,
              "fax":'',
           
              "add_room_list":this.infoRoomArray,
              "add_room_user_list":this.addRoomUserList,
              "add_user_list":this.usenameArray,
              "add_additional_night_list":this.addAdditionalNightList,
              "add_partial_payment_list":this.addPartialPaymentArrayList
          }

          $('#preloader').show();
          this.callapi.post('/payment/book_event', newobj).subscribe(result => {
           $('#preloader').hide();
            
            if ((result.status == 200) || (result.status === '200')) {
              $('#authorizedPaymentModal').modal('hide');
              
              setTimeout(()=>{                          
                  $('#preloader').hide();
                  this.router.navigate(['/event-payment-success'], { queryParams: { transaction_id: btoa(result.transaction_id),payment_type: btoa(this.partial_payment_name)}}); 
              }, 1000);
  
              
  
            } else if ((result.status == 4041) || (result.status === '4041')){
              setTimeout(()=>{                          
                  $('#preloader').hide();
                  this.router.navigate(['/event-payment-failed'], { queryParams: { transaction_id: btoa(result.transaction_id) }}); 
              }, 1000);
              
            }else{
              this.toastr.errorToastr(result.message, 'Error!');
            }
          },err => {
            $('#preloader').hide();
            this.toastr.errorToastr('Something Wrong!', 'Error!');
          });


        }else{
          this.submitted1 = true;
           return;
        }
   }

   public readTerms(){

     this.callapi.get('/auth/event_terms_condition').subscribe(data => {
      if(data.status == 200){
        this.event_terms_condition = data.data[0];
        $('#readTermsModal').modal('show');
      }else{
        this.event_terms_condition = '';
        $('#readTermsModal').modal('hide');
      }
    }); 

   }



   public checkTermsCondition(event: any){
      const isChecked = event.target.checked;
       
      if(isChecked == true)
      {
        this.eventTermsConditionFlag =true;
        
        
      }else{
        this.eventTermsConditionFlag =false;
       
      }
  }

  public showNameInfo(){
   
    if(this.fullNameFlag){
       $('#fullNameModal').modal('show', { backdrop: true, keyboard: true });
        this.fullNameFlag = false;
    }
   
  }








}
