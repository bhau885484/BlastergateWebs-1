
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { LoginHeaderComponent } from './login-header/login-header.component';
import { LoginFooterComponent } from './login-footer/login-footer.component';

import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
   imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
       
    ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginHeaderComponent,
    LoginFooterComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginHeaderComponent,
    LoginFooterComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ],
 
  providers: [],
 
})
export class CoreModule { }
