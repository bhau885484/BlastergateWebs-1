import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CanTokenSaveService } from './cantokensave.service';
import { map, catchError, filter } from 'rxjs/operators';

@Injectable()
export class CallApiService {

  authCheck: any;
  serverUrl = environment.api_url;

  constructor(private http: HttpClient,
              private tokenSaveService: CanTokenSaveService) {}

   private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json; charset=UTF-8'
    };

    if (this.tokenSaveService.getAccessToken() && this.tokenSaveService.getAccessSign()) {

    headersConfig['Access-Token'] = `${this.tokenSaveService.getAccessToken()}`;
    headersConfig['Access-Sign'] = `${this.tokenSaveService.getAccessSign()}`;
    }
    return new HttpHeaders(headersConfig);
  }


  private setAgoraChatHeaders(): HttpHeaders {
    
    const headersAgoraChatConfig = {
      'Content-Type': 'application/json; charset=UTF-8'
    };

    if (this.tokenSaveService.getAgoraChatToken()) {
       headersAgoraChatConfig['Authorization'] = 'Bearer '+`${this.tokenSaveService.getAgoraChatToken()}`;
    }

    return new HttpHeaders(headersAgoraChatConfig);
  }


  private setAgoraChatPutHeaders(): HttpHeaders {
    
    const headersAgoraChatPutConfig = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    if (this.tokenSaveService.getAgoraChatToken()) {
       headersAgoraChatPutConfig['Authorization'] = 'Bearer '+`${this.tokenSaveService.getAgoraChatToken()}`;
    }

    return new HttpHeaders(headersAgoraChatPutConfig);
  }


  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params: params })
    .pipe(
      map((res: Response) => res),
      catchError(this.Httperror)
      );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`,JSON.stringify(body),{ headers: this.setHeaders() }).pipe(
      map((res: Response) => res),
      catchError(this.Httperror)
      );
  }


  getagorachat(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.agora_chat_url}${path}`, { headers: this.setAgoraChatHeaders(), params: params })
    .pipe(
      map((res: Response) => res),
      catchError(this.Httperror)
      );
  }

  postagorachat(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.agora_chat_url}${path}`,JSON.stringify(body),{ headers: this.setAgoraChatHeaders() }).pipe(
      map((res: Response) => res),
      catchError(this.Httperror)
      );
  }

  // putagorachat(path: string, body: Object = {}): Observable<any> {


  //   return this.http.put(`${environment.agora_chat_url}${path}`,JSON.stringify(body),{ headers: this.setAgoraChatPutHeaders() }).pipe(
  //     map((res: Response) => res),
  //     catchError(this.Httperror)
  //     );
  // }

   putagorachat(url: string, body: any): Observable<any> {
    // Convert the body object to `x-www-form-urlencoded` format
    const urlEncodedBody = new URLSearchParams();
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        urlEncodedBody.set(key, body[key]);
      }
    }

    // Set headers for `x-www-form-urlencoded`
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':'Bearer '+`${this.tokenSaveService.getAgoraChatToken()}`
    });

    // Send PUT request
    return this.http.put(`${environment.agora_chat_url}${url}`, urlEncodedBody.toString(), { headers });
  }
  // postVideo(path: string,formData) {
  //   return this.http.post(`${environment.api_url}${path}`,formData,{ headers: this.setHeaders() }).pipe(
  //     map((res: Response) => res),
  //     catchError(this.Httperror)
  //     );
  // }

 

 
  private Httperror(error: any) {
    return throwError(error);
  }
}
