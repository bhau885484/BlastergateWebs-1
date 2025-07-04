import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewPayPerClickComponent } from './view-pay-per-click.component'
import { NgMarqueeModule } from 'ng-marquee';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { OwlModule } from 'ngx-owl-carousel';
import { ImageCropperModule } from "ngx-image-cropper";

import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    ViewPayPerClickComponent
  ],
  imports: [
  CommonModule,
   FormsModule,
    ReactiveFormsModule,
    NgMarqueeModule,
    CoreModule,
    ImageCropperModule,
    NgxSliderModule,
  
   MDBBootstrapModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: ViewPayPerClickComponent },
     
    ])
  ],
 
})
export class ViewPayPerClickModule { }
