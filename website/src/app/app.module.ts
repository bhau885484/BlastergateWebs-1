
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './components/core/core.module'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SharedModule } from './api-service/api-service.module';
import { CallAuthenticationService } from './api-service/service/all-api-service/callauthentication.service';
import { CallCanactivechildService } from './api-service/service/all-api-service/callcanactivechild.service';
import { ChatService } from './api-service/service/all-api-service/chat.service';
import * as service from './api-service/service/index';
import { environment } from '../environments/environment';
// import { commonMe } from './api-service/service/common/commondashboard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ImageCropperModule } from 'ngx-image-cropper';
import { SwiperModule } from 'ngx-swiper-wrapper';
// import { MatSliderModule } from '@angular/material/slider';

import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ImageCropperModule,
    SwiperModule,
    MDBBootstrapModule.forRoot(),
   BrowserModule,
   // MatSliderModule,
    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
 providers: [
    
      service.CallApiService,
       service.CommonAuthService,
       service.CommonService,
       service.CanTokenRemoveService,
       service.CanTokenSaveService,
       CallAuthenticationService,
       CallCanactivechildService,
       ChatService,
       
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
