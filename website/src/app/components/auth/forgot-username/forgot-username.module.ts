import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForgotUsernameComponent } from './forgot-username.component'
import { NgMarqueeModule } from 'ng-marquee';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    ForgotUsernameComponent
  ],
  imports: [
  CommonModule,
   FormsModule,
    ReactiveFormsModule,
    NgMarqueeModule,
  
   MDBBootstrapModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: ForgotUsernameComponent },
     
    ])
  ],
 
})
export class ForgotUsernameModule { }
