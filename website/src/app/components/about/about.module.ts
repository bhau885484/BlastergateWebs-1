import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about.component'
// import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
  CommonModule,
  // OwlModule,
  FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: AboutComponent },
     
    ])
  ],
 
})
export class AboutModule { }


