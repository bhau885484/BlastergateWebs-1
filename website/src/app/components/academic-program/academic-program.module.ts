import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcademicProgramComponent } from './academic-program.component'
// import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    AcademicProgramComponent
  ],
  imports: [
  CommonModule,
  // OwlModule,
  FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: AcademicProgramComponent },
     
    ])
  ],
 
})
export class AcademicProgramModule { }


