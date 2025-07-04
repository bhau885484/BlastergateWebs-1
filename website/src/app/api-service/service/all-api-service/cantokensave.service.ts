import { Injectable } from '@angular/core';


@Injectable()
export class CanTokenSaveService {

  getAccessToken(): string {
    return window.sessionStorage['Access-Token'];
  }

  getAgoraChatToken(): string {
    return window.sessionStorage['Agora-Chat-Token'];
  }
  
  getAccessSign(): string {
    return  window.sessionStorage['Access-Sign'];
  }

  getProfileType(): string {
    return  window.sessionStorage['profile-type'];
  }

  getUserId(): string {
    return  window.sessionStorage['user-id'];
  }

  getUserMembership(): string {
    return  window.sessionStorage['membership'];
  }

  saveAccessToken(accesstoken: string, accesssign: string) {
    window.sessionStorage['Access-Token'] = accesstoken;
    window.sessionStorage['Access-Sign'] = accesssign;
  }

  saveAgoraChatToken(accesstoken: string) {
    window.sessionStorage['Agora-Chat-Token'] = accesstoken;
  }

  saveProfileType(profileType: string) {
    window.sessionStorage['profile-type'] = profileType;
    // window.sessionStorage['Access-Sign'] = accesssign;
  }

  saveUserId(user_id: string) {
    window.sessionStorage['user-id'] = user_id;
    // window.sessionStorage['Access-Sign'] = accesssign;
  }
  saveUserMembership(membership: string) {
    window.sessionStorage['membership'] = membership;
    // window.sessionStorage['Access-Sign'] = accesssign;
  }


  destroyAccessToken() {
    window.sessionStorage.removeItem('Access-Token');
    window.sessionStorage.removeItem('Access-Sign');
    window.sessionStorage.removeItem('profile-type');
    window.sessionStorage.removeItem('user-id');
  }

  getCookie(): string {
    return window.sessionStorage['business_type'];
  }

  saveCookie(token: string) {
    window.sessionStorage['business_type'] = token;
    // window.sessionStorage['X-UserTokenSign'] = sign;
  }

  

}
