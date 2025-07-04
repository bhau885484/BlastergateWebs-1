import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component'
import { NgMarqueeModule } from 'ng-marquee';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
  CommonModule,
   FormsModule,
    ReactiveFormsModule,
    NgMarqueeModule,
  
   MDBBootstrapModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: SignupComponent },
     
    ])
  ],
 
})
export class SignupModule { }
