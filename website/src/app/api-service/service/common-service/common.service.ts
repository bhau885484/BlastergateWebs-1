import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { CallApiService } from '../../service/all-api-service/callapi.service';
import { CanTokenRemoveService } from '../../service/all-api-service/cantokenremove.service';
import { environment } from '../../../../environments/environment';

@Injectable()

export class CommonService {
 
 // private baseurl = "http://68.178.200.197:3000/";
 // private baseurl = 'http://localhost:3000'; 
 private baseurl = environment.socket_url; 
  public sum:any=0;
  public promo_discount_sum:any=0;
  public promocode_sum:any=0;
  public promocode_discount:any=0;
  public discount_type='';

  public selectcity;
  public promo_code_id='';
  public sub_total:any=0;
  public discount_price:any=0;
  public final_amount:any=0;
  public total_member:any=1;

  public room_price:any=0;
  public room_name='';
  public room_id='';

 public timeoutId:any;

  public all_viewedme_count:any=0;
  public all_validation_request_count:any=0;
   public all_video_count:any=0;
   public all_online_user_count:any=0;
   public all_event_notification_count:any=0;
   public all_friend_count:any=0;
   public all_friend_request_count:any=0;
   public all_who_i_viewed_count:any=0;
   public all_likes_count:any=0;
   public all_block_count:any=0;
   public all_notes_count:any=0;
   public all_remember_count:any=0;
   public all_blaster_notification_count:any=0;
   public all_speed_date_count:any=0;
   // public all_blaster_notification_count:any=0;


   public event_total_sum_amount:any=0;
   public event_sub_total_sum_amount:any=0;
   public pay_per_id;

   public username:any='';
   public showvideo:any = '0';

   public search_value = '';
   public searchUserData:any='';
  constructor(
    private callapi: CallApiService,
    private http: HttpClient,
    private tokenRemove: CanTokenRemoveService) {}


   login(email:string , pswd:string){
      const param = new HttpParams()
        .set("email",email)
        .set("userpswd",pswd);
      return this.http.post<any>(this.baseurl + "user/login", param).toPromise();
    }

    getAllUsers(user:any){

      // alert(this.baseurl);
      const param = new HttpParams()
        .set("username",<string>localStorage.getItem("chatapp_user_id"))
        .set("Access-Token",<string>localStorage.getItem("Access-Token"))
        .set("user",user);
      return this.http.post<any>(this.baseurl + "user/allusers", param).toPromise();
    } 

    getAllMessages(user1:any, user2:any){
      const param = new HttpParams()
        .set("id",<string>localStorage.getItem("chatapp_user_id"))
        .set("cookie",<string>localStorage.getItem("chatapp_cookie"))
        .set("user1",user1)
        .set("user2", user2);
      return this.http.post<any>(this.baseurl + "messages/getAllMessages", param).toPromise();
    }

    logout(){
      const param = new HttpParams()
        .set("id",<string>localStorage.getItem("chatapp_user_id"))
        .set("cookie",<string>localStorage.getItem("chatapp_cookie"));
      return this.http.post<any>(this.baseurl + "user/logout", param).toPromise();
    }
    
  
  
}
