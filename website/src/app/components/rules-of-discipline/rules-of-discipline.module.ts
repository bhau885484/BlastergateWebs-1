import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RulesOfDisciplineComponent } from './rules-of-discipline.component'
// import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    RulesOfDisciplineComponent
  ],
  imports: [
  CommonModule,
  // OwlModule,
  FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: RulesOfDisciplineComponent },
     
    ])
  ],
 
})
export class RulesOfDisciplineModule { }


