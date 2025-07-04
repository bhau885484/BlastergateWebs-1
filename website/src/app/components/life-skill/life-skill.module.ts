import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LifeSkillComponent } from './life-skill.component'
// import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    LifeSkillComponent
  ],
  imports: [
  CommonModule,
  // OwlModule,
  FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: LifeSkillComponent },
     
    ])
  ],
 
})
export class LifeSkillModule { }


