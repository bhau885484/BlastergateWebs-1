import { EventEmitter } from '@angular/core';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../api-service/service/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare const $: any;


@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {

  public serviceArrayOne:any=[];
  public serviceArrayTwo:any=[];

 constructor(private formBuilder: FormBuilder,
                private api: service.CallApiService,
                private tokenService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenExpService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,
                private route: ActivatedRoute,) { }

  ngOnInit() {

   //  this.serviceArrayOne =
   //     [{'image':'assets/images/faculties/IMG_20210210_115930.jpg'},{'image':'assets/images/faculties/IMG_20210210_120114.jpg'}]

   //  this.serviceArrayTwo =
   //     [{'image':'assets/images/faculties/IMG_20210210_115930.jpg'},{'image':'assets/images/faculties/IMG_20210210_120114.jpg'}]
 

   //  $('.mission-faculties-one li a').click(function () {

   //       $('.mission-faculties-one li a').removeClass('life-skill-tag');
   //       $(this).addClass('life-skill-tag');
         

   // });

}

// public planning_committee(){
//   this.serviceArrayOne =
//    [
//      {'image':'assets/images/faculties/IMG_20210210_115930.jpg'},
//      {'image':'assets/images/faculties/IMG_20210210_120114.jpg'}
//    ]

// }

// public community_service(){
//   this.serviceArrayOne =
//    [
//      {'image':'assets/images/faculties/014.jpg'},
//      {'image':'assets/images/faculties/016.JPG'}
//    ]
// }

// public fee_revision(){
//   // this.serviceArrayOne =
//   //  [
//   //    {'image':'assets/images/faculties/014.jpg'},
//   //    {'image':'assets/images/faculties/016.JPG'}
//   //  ]
// }

// public anti_bullying(){

// }

// public sexual_harassment(){

// }
// public camps(){

//   this.serviceArrayOne =
//    [
//      {'image':'assets/images/faculties/about-us-banipark.jpg'},
//      {'image':'assets/images/faculties/about-us-nirmarnagar.jpeg'}
//    ]

// }

// public quality_control(){
//   this.serviceArrayOne =
//    [
//      {'image':'assets/images/faculties/126.jpg'},
//      {'image':'assets/images/faculties/131.jpg'}
//    ]
// }

// public carrer_guidance(){
//   this.serviceArrayOne =
//    [
//      {'image':'assets/images/faculties/A145.jpg'},
//      {'image':'assets/images/faculties/A146.jpg'}
//    ]
// }

// public olympiads(){
//   this.serviceArrayOne =
//    [
//      {'image':'assets/images/faculties/Olymp (1).jpg'},
//      {'image':'assets/images/faculties/Olymp (2).jpg'}
//    ]
// }

// public service_tranning(){
//   this.serviceArrayTwo =
//    [
//      {'image':'assets/images/faculties/IMG_20210210_115930.jpg'},
//      {'image':'assets/images/faculties/IMG_20210210_120114.jpg'}
//    ]
// }

// public tranning_staff(){
//   this.serviceArrayTwo =
//    [
//      {'image':'assets/images/faculties/ASISC-Conference-1.jpg'},
//      {'image':'assets/images/faculties/H1-  (3).jpg'}
//    ]
// }

// public smart_classroom(){
//   this.serviceArrayTwo =
//    [
//      {'image':'assets/images/faculties/IMG_20210210_115930.jpg'},
//      {'image':'assets/images/faculties/IMG_20210210_120114.jpg'}
//    ]
// }
// public labs(){
//   this.serviceArrayTwo =
//    [
//      {'image':'assets/images/faculties/Physics Lab.JPG'},
//      {'image':'assets/images/faculties/Lab-Comp (1).jpg'},
//      {'image':'assets/images/faculties/Chem (2).jpg'},
//      {'image':'assets/images/faculties/Bioloab.JPG'}
//    ]
// }

// public art_center(){
//    [
//      {'image':'assets/images/faculties/155.jpg'} 
//    ]
// }

// public music_studio(){
//   [
//      {'image':'assets/images/faculties/A148.jpg'},
//      {'image':'assets/images/faculties/016.JPG'} 
//    ]
// }

// public library(){
//  this.serviceArrayTwo =
//    [
//      {'image':'assets/images/faculties/Lib (1).JPG'},
     
//    ] 
// }

// public play_ground(){
//   this.serviceArrayTwo =
//    [
//      {'image':'assets/images/faculties/img-120.jpg'},
//      {'image':'assets/images/faculties/National Programe-3.jpg'},
//      {'image':'assets/images/faculties/CISCE National Circket-2.JPG'},
//      {'image':'assets/images/faculties/CISCE National Circket-3.JPG'},
//      {'image':'assets/images/faculties/CMS IYMCA.jpg'},
//    ] 
// }

// public inclusion(){
//   this.serviceArrayTwo =
//    [
//      {'image':'assets/images/faculties/A148.jpg'},
//      {'image':'assets/images/faculties/AB-2.jpg'},
    
//    ] 
// }

// public transport(){
//   // this.serviceArrayTwo =
//   //  [
//   //    {'image':'assets/images/faculties/A148.jpg'},
//   //    {'image':'assets/images/faculties/AB-2.jpg'},
    
//   //  ] 
// }

// public boarding_loading(){

// }

// public national_event(){
//   this.serviceArrayTwo =
//    [
//      {'image':'assets/images/faculties/13th Macfair International -2018.jpg'},
//      {'image':'assets/images/faculties/img-120.jpg'},
//      {'image':'assets/images/faculties/H1-  (3).jpg'},
//      {'image':'assets/images/faculties/ASISC-Conference-2.jpg'},
//      {'image':'assets/images/faculties/A145.jpg'},
//       {'image':'assets/images/faculties/020.jpeg'},
//    ] 
// }




}
