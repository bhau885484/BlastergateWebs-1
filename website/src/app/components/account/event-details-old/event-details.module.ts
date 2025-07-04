import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../api-service/api-service.module';
import { EventDetailsComponent } from './event-details.component'
import { NgMarqueeModule } from 'ng-marquee';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { OwlModule } from 'ngx-owl-carousel';
import { ImageCropperModule } from "ngx-image-cropper";


@NgModule({
  declarations: [
    EventDetailsComponent
  ],
  imports: [
  CommonModule,
   FormsModule,
    ReactiveFormsModule,
    NgMarqueeModule,
    CoreModule,
    ImageCropperModule,
    SharedModule,
  
   MDBBootstrapModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: EventDetailsComponent },
     
    ])
  ],
 
})
export class EventDetailsModule { }
