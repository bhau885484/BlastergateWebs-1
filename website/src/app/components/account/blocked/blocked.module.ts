import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlockedComponent } from './blocked.component'
import { NgMarqueeModule } from 'ng-marquee';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { OwlModule } from 'ngx-owl-carousel';
import { ImageCropperModule } from "ngx-image-cropper";


@NgModule({
  declarations: [
    BlockedComponent
  ],
  imports: [
  CommonModule,
   FormsModule,
    ReactiveFormsModule,
    NgMarqueeModule,
    CoreModule,
    ImageCropperModule,
  
   MDBBootstrapModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: BlockedComponent },
     
    ])
  ],
 
})
export class BlockedModule { }
