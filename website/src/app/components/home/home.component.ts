import { Component, AfterViewInit, ViewChild, ElementRef,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { map, startWith } from 'rxjs/operators';
import * as service from '../../api-service/service/index';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

declare const $: any;
import AOS from 'aos';
import 'aos/dist/aos.css';

import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {


public landingPageData;
public videoPath:any;
public landingPageSlider=[];

 // @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;
 // @ViewChild('videoPlayer1', { static: false }) videoPlayer1!: ElementRef;

  constructor(private formBuilder: FormBuilder,
                private callapi: service.CallApiService,
                private tokenSaveService: service.CanTokenSaveService,
                private router: Router,
                private toastr: ToastrManager,
                private tokenRemoveService: service.CanTokenRemoveService,
                public commonServe: service.CommonService) { }

  ngAfterViewInit() {
    $('#preloader').show();
     console.log('this.commonServe.showvideo',this.commonServe.showvideo);

      setTimeout(() => {
        this.commonServe.showvideo = this.commonServe.showvideo;
         this.landingData();
      }, 1000);
    
    setTimeout(() => {

       var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3, // Default for large screens
        spaceBetween: 30,
        freeMode: true,
        autoplay: {
          delay: 2000, // Delay between transitions (in milliseconds)
          disableOnInteraction: false, // Continue autoplay after user interaction
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          // Define breakpoints for different screen widths
          0: {
            slidesPerView: 1, // Show 1 slide on mobile
            spaceBetween: 10, // Reduce spacing for smaller screens
          },
           640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2, // Show 2 slides on medium screens
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4, // Show 3 slides on larger screens
            spaceBetween: 30,
          },
        },
      });

       document.getElementById('preloader_video').style.transition = "opacity 0.5s ease-out";
       document.getElementById('preloader_video').style.opacity = '0';
        $('#preloader_video').css('display','none');
        this.commonServe.showvideo = '1';
         
  
       
    }, 8000);

   
     
}

public landingData(){
   this.callapi.get('/auth/getLandingPageData').subscribe(data => {
     $('#preloader').hide();
      if(data.status=='200'){
        this.landingPageData = data.data[0];
        this.landingPageSlider = this.landingPageData.slider_image;
        $('#preloader').hide();
        console.log('this.landingPageSlider',this.landingPageSlider);
        
      }else{
        this.landingPageData = '';
      }
   }); 
}

public unmute(){
  $("#unmute").css('display', 'none');
  $("#mute").css('display', 'block');
  $("#home_video").prop('muted', false);
}


public mute(){
  $("#mute").css('display', 'none');
  $("#unmute").css('display', 'block');
  $("#home_video").prop('muted', true);
}


  public linkRouterEvent(link){

    if (!this.tokenSaveService.getAccessToken()){
       this.router.navigate(['/login']);
     }else{
       this.router.navigate([link]);
     }
  
 }

 public linkRouter(link){
    this.router.navigate([link]);
  }

  

}
