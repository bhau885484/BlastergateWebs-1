import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component'
import { NgMarqueeModule } from 'ng-marquee';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { OwlModule } from 'ngx-owl-carousel';
import { SwiperModule } from 'ngx-swiper-wrapper';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
  CommonModule,
  SwiperModule,
   FormsModule,
    ReactiveFormsModule,
    NgMarqueeModule,
    CoreModule,
  
   MDBBootstrapModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: HomeComponent },
     
    ])
  ],
 
})
export class HomeModule { }
