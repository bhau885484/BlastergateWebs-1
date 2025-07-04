import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacilitiesComponent } from './facilities.component'
// import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    FacilitiesComponent
  ],
  imports: [
  CommonModule,
  // OwlModule,
  FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: FacilitiesComponent },
     
    ])
  ],
 
})
export class FacilitiesModule { }


