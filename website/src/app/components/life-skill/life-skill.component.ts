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
  selector: 'app-life-skill',
  templateUrl: './life-skill.component.html',
  styleUrls: ['./life-skill.component.css']
})
export class LifeSkillComponent implements OnInit {
public lifeskillArray:any=[];
 constructor(private formBuilder: FormBuilder,
                private api: service.CallApiService,
                private tokenService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenExpService: service.CanTokenRemoveService,
                public commonServe: service.CommonService,
                private route: ActivatedRoute,) { }

  ngOnInit() {

   //  this.lifeskillArray =
   //     [{'image':'assets/images/life-skill/Development of Life Skills-1.jpg'}]


   //  $('.mission-faculties li a').click(function () {

      
   //       $('.mission-faculties li a').removeClass('life-skill-tag');
   //       $(this).addClass('life-skill-tag');
         

   // });


}

// public life_skill_ncc(){
//   this.lifeskillArray =
//    [{'image':'assets/images/life-skill/M-99.JPG'},
//       {'image':'assets/images/life-skill/M-99.JPG'}]
//  }

//  public life_skill_scouts(){

//    this.lifeskillArray =
//    [{'image':'assets/images/life-skill/L1- (2).jpg'}]
//  }

//  public life_skill_interact(){
//    this.lifeskillArray =
//    [{'image':'assets/images/life-skill/060.jpg'}]
//    }

// public life_skill_music_vocal(){
//    this.lifeskillArray =
//    [{'image':'assets/images/life-skill/082.jpg'}]
//    }

// public life_skill_dance(){
//    // this.lifeskillArray =
//    // [{'image':'assets/images/life-skill/082.jpg'}]
// }

// public life_skill_sport(){
//   this.lifeskillArray =
//    [{'image':'assets/images/life-skill/Sports5 (1).jpg'},
//    {'image':'assets/images/life-skill/Sports5 (2).jpg'},
//    {'image':'assets/images/life-skill/Sports8.JPG'},
//    {'image':'assets/images/life-skill/sport-052.jpg'},
//    {'image':'assets/images/life-skill/sport-054.jpeg'},
//    {'image':'assets/images/life-skill/sport-056.jpg'},
//    {'image':'assets/images/life-skill/sport-108.JPG'},
//    {'image':'assets/images/life-skill/sport-051.jpg'},

//   ]
// }


// public life_skill_olympiads(){
//    this.lifeskillArray =
//    [{'image':'assets/images/life-skill/L1- (2).jpg'}]
// }

// public life_skill_field_trips(){
//   this.lifeskillArray =
//    [{'image':'assets/images/life-skill/FieldTrip-1 (2).jpg'},
//    {'image':'assets/images/life-skill/FieldTrip6.jpg'},
  
//   ]
// }

// public life_skill_workshop(){
//   this.lifeskillArray =
//    [{'image':'assets/images/life-skill/064.jpg'},
//    {'image':'assets/images/life-skill/066-067.jpeg'},
  
//   ]
// }

// public life_skill_craft(){
//   this.lifeskillArray =
//    [{'image':'assets/images/life-skill/Art Craft.jpg'},
//    {'image':'assets/images/life-skill/Art Craft2.jpg'},
  
//   ]
// }




 

 


}
