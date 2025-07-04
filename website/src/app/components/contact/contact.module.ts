import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component'
// import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
  CommonModule,
  // OwlModule,
  FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ContactComponent },
     
    ])
  ],
 
})
export class ContactModule { }


