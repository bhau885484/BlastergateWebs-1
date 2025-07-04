import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LinkExpireComponent } from './link-expire.component'
import { NgMarqueeModule } from 'ng-marquee';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { OwlModule } from 'ngx-owl-carousel';
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  declarations: [
    LinkExpireComponent
  ],
  imports: [
  CommonModule,
   FormsModule,
   ImageCropperModule,
    ReactiveFormsModule,
    NgMarqueeModule,
    CoreModule,
  
   MDBBootstrapModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: LinkExpireComponent },
     
    ])
  ],
 
})
export class LinkExpireModule { }
