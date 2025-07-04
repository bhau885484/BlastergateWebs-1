import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account.component'
// import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    MyAccountComponent
  ],
  imports: [
  CommonModule,
  // OwlModule,
  FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: MyAccountComponent },
     
    ])
  ],
 
})
export class MyAccountModule { }


