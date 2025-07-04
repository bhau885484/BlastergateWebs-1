import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoupleProfileComponent } from './couple-profile.component'
import { NgMarqueeModule } from 'ng-marquee';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { OwlModule } from 'ngx-owl-carousel';
import { ImageCropperModule } from "ngx-image-cropper";
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    CoupleProfileComponent
  ],
  imports: [
  CommonModule,
   FormsModule,
    ReactiveFormsModule,
    NgMarqueeModule,
    CoreModule,
    ImageCropperModule,
  
      NgSelectModule,
   MDBBootstrapModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: CoupleProfileComponent },
     
    ])
  ],
 
})
export class CoupleProfileModule { }
